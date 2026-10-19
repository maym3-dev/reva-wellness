"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "@/content/site";
import { BOOKING_URL } from "@/content/site";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/ui/Icons";
import SmartLink from "@/components/ui/SmartLink";

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * SHA-style off-canvas: a 30% panel slides in from the left under the header,
 * the rest of the page is blurred. On desktop, hovering a parent opens its
 * submenu as a second column; on mobile, tapping drills in with a Back button.
 */
export default function OffCanvasMenu({
  items,
  open,
  onClose,
}: {
  items: MenuItem[];
  open: boolean;
  onClose: () => void;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Reset submenus whenever the menu closes (state adjusted during render, no effect).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) setActive(null);
  }

  return (
    <>
      <div className={`blur-overlay${open ? " is-active" : ""}`} onClick={onClose} aria-hidden />

      <nav
        className={`off-canvas${open ? " is-open" : ""}`}
        aria-label="Main menu"
        aria-hidden={!open}
        data-lenis-prevent
      >
        <ul className="off-canvas__list">
          {items.map((item, i) => {
            const hasChildren = !!item.children?.length;
            return (
              <li
                key={item.label}
                className={`off-canvas__item${active === i ? " is-active" : ""}`}
                onMouseEnter={() => isDesktop && setActive(hasChildren ? i : null)}
              >
                <SmartLink
                  href={item.href ?? "#"}
                  className="off-canvas__link"
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => {
                    if (hasChildren) {
                      e.preventDefault();
                      setActive(i);
                    } else {
                      onClose();
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {hasChildren ? (
                    <ChevronRight className="off-canvas__chevron" />
                  ) : (
                    <ArrowRight className="off-canvas__arrow" />
                  )}
                </SmartLink>
              </li>
            );
          })}
        </ul>

        <div className="off-canvas__footer">
          <SmartLink href="/contact" className="boton boton--ghost-dark" tabIndex={open ? 0 : -1} onClick={onClose}>
            Contact
          </SmartLink>
          <SmartLink
            href={BOOKING_URL}
            className="boton boton--primary only-mobile-inline"
            tabIndex={open ? 0 : -1}
          >
            Book now
          </SmartLink>
        </div>
      </nav>

      {items.map((item, i) =>
        item.children?.length ? (
          <div
            key={item.label}
            className={`off-canvas off-canvas--level-2${open && active === i ? " is-open" : ""}`}
            aria-hidden={!(open && active === i)}
            data-lenis-prevent
          >
            <button
              type="button"
              className="off-canvas__back only-mobile-flex"
              onClick={() => setActive(null)}
              tabIndex={open && active === i ? 0 : -1}
            >
              <ChevronLeft /> Back
            </button>
            <p className="off-canvas__heading only-mobile">{item.label}</p>
            <ul className="off-canvas__list">
              {item.children.map((child) => (
                <li key={child.label} className="off-canvas__item">
                  <SmartLink
                    href={child.href ?? "#"}
                    className="off-canvas__link off-canvas__link--child"
                    tabIndex={open && active === i ? 0 : -1}
                    onClick={onClose}
                  >
                    <span>{child.label}</span>
                    <ArrowRight className="off-canvas__arrow" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null,
      )}
    </>
  );
}
