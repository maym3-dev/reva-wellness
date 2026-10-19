"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BOOKING_URL, menu, site } from "@/content/site";
import { useLenis } from "@/components/providers/SmoothScroll";
import OffCanvasMenu from "./OffCanvasMenu";
import { ChevronDown, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import "./header.css";

const SCROLLED_AT = 50; // header turns white
const BODY_SCROLLED_AT = 150; // body.is-scrolled + direction classes
const HIDE_AT = 300; // header hides on scroll-down (mobile/tablet only)

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<"phone" | "whatsapp" | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const lastY = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastY.current;
      setScrolled(y > SCROLLED_AT);

      const body = document.body.classList;
      if (y > BODY_SCROLLED_AT) {
        body.add("is-scrolled");
        body.toggle("scrolling-down", down);
        body.toggle("scrolling-up", !down);
      } else {
        body.remove("is-scrolled", "scrolling-down", "scrolling-up");
      }

      if (window.innerWidth <= 1023 && !document.body.classList.contains("off-canvas-open")) {
        setHidden(y > HIDE_AT && down);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("off-canvas-open", menuOpen);
    document.body.classList.toggle("off-canvas-open", menuOpen);
  }, [menuOpen]);

  // Close dropdowns on outside click / Escape.
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".site-header__dropdown, .lang-menu")) {
        setDropdown(null);
        setLangOpen(false);
      }
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDropdown(null);
      setLangOpen(false);
      setMenuOpen(false);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const solid = scrolled || menuOpen || langOpen;

  return (
    <>
      <header
        className={`site-header${solid ? " is-solid" : ""}${hidden && !menuOpen ? " is-hidden" : ""}`}
        data-lenis-prevent-wheel={menuOpen || undefined}
      >
        <div className="site-header__inner">
          <div className="site-header__left">
            <button
              type="button"
              className={`hamburger${menuOpen ? " is-active" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="hamburger__box">
                <span className="hamburger__line hamburger__line--1" />
                <span className="hamburger__line hamburger__line--2" />
              </span>
            </button>

            <div
              className={`lang-menu${langOpen ? " is-open" : ""}`}
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                type="button"
                className="lang-menu__current"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
              >
                {site.languages[0]}
                <ChevronDown />
              </button>
              <div className="lang-menu__list">
                {site.languages.slice(1).map((l) => (
                  <a key={l} href="#" className="lang-menu__item">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="site-header__center">
            <Link
              href="/"
              className="site-header__logo"
              aria-label={`${site.name} home`}
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  if (lenis) lenis.scrollTo(0, { duration: 1.2 });
                  else window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.logo} alt={site.fullName} width={500} height={283} />
            </Link>
          </div>

          <div className="site-header__right">
            <a className="site-header__icon-btn only-mobile" href={`tel:${site.phone.replace(/\s/g, "")}`} aria-label="Call us">
              <PhoneIcon />
            </a>

            <div className={`site-header__dropdown only-desktop${dropdown === "phone" ? " is-open" : ""}`}>
              <button
                type="button"
                className="site-header__toggle"
                aria-label="Phone numbers"
                aria-expanded={dropdown === "phone"}
                onClick={() => setDropdown((d) => (d === "phone" ? null : "phone"))}
              >
                <PhoneIcon />
                <ChevronDown />
              </button>
              <div className="site-header__dropdown-panel">
                <div className="site-header__dropdown-zone">24 Hour Reception</div>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                <div className="site-header__dropdown-zone">Email</div>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>

            <div className={`site-header__dropdown only-desktop${dropdown === "whatsapp" ? " is-open" : ""}`}>
              <button
                type="button"
                className="site-header__toggle"
                aria-label="WhatsApp"
                aria-expanded={dropdown === "whatsapp"}
                onClick={() => setDropdown((d) => (d === "whatsapp" ? null : "whatsapp"))}
              >
                <WhatsAppIcon />
                <ChevronDown />
              </button>
              <div className="site-header__dropdown-panel">
                <div className="site-header__dropdown-zone">{site.name}</div>
                <a href={site.whatsappLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp · {site.whatsapp}
                </a>
              </div>
            </div>

            <Link className="boton site-header__cta site-header__cta--contact only-desktop" href="/contact">
              Contact
            </Link>
            <Link className="boton site-header__cta site-header__cta--book only-desktop" href={BOOKING_URL}>
              Book now
            </Link>
          </div>
        </div>
      </header>

      <OffCanvasMenu items={menu} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
