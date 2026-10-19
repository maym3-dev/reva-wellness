"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Cta, Fact, Heading } from "@/content/types";
import HeadingText from "@/components/ui/HeadingText";
import SmartLink from "@/components/ui/SmartLink";
import "./page-hero.css";

type SubnavItem = { label: string; href: string };

const trim = (p: string) => p.replace(/\/+$/, "") || "/";

type Props = {
  image: string;
  video?: string;
  label?: string;
  title: Heading;
  text?: string;
  ctas?: Cta[];
  /** full = 100vh (destination pages), large = 80vh, short = 60vh (utility pages) */
  size?: "full" | "large" | "short";
  align?: "left" | "center";
  /** Sibling-page strip pinned to the bottom of the hero (SHA program heroes). */
  subnav?: SubnavItem[];
  /** Key facts shown in a row at the bottom of the hero (size, guests…). */
  facts?: Fact[];
};

/**
 * Inner-page hero in the SHA language: dark image/video with the same
 * overlay + bottom blend as the home hero, label/title static, sub-copy and
 * CTAs fading up 100px (0.4s / 0.8s), and a slow Ken Burns zoom on stills.
 */
export default function PageHero({
  image,
  video,
  label,
  title,
  text,
  ctas,
  size = "large",
  align = "left",
  subnav,
  facts,
}: Props) {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => setTimeout(() => v.play().catch(() => {}), 150));
  }, []);

  return (
    <section className={`page-hero page-hero--${size} page-hero--${align}`}>
      <div className="page-hero__media">
        {video ? (
          <video ref={videoRef} className="page-hero__video" muted loop playsInline autoPlay poster={image} aria-hidden>
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <div className="page-hero__image" style={{ backgroundImage: `url(${image})` }} />
        )}
      </div>
      <div className="page-hero__blend" aria-hidden />

      <div className="contenedor page-hero__content">
        {label && <div className="label-M page-hero__label page-hero__motion page-hero__motion--label">{label}</div>}
        <h1 className="page-hero__title">
          <HeadingText h={title} />
        </h1>
        {text && <p className="page-hero__text page-hero__motion page-hero__motion--sub">{text}</p>}
        {ctas && ctas.length > 0 && (
          <div className="page-hero__ctas page-hero__motion page-hero__motion--cta">
            {ctas.map((c, i) => (
              <SmartLink key={c.label} className={`boton ${i === 0 ? "boton--ghost" : "boton--ghost page-hero__cta-2"}`} href={c.href}>
                {c.label}
              </SmartLink>
            ))}
          </div>
        )}
      </div>

      {facts && facts.length > 0 && (
        <div className="contenedor page-hero__facts page-hero__motion page-hero__motion--cta">
          {facts.map((f) => (
            <div key={f.label} className="page-hero__fact">
              <span className="page-hero__fact-label">{f.label}</span>
              <span className="page-hero__fact-value">{f.value}</span>
            </div>
          ))}
        </div>
      )}

      {subnav && subnav.length > 0 && (
        <nav className="page-hero__subnav" aria-label="Section pages">
          <div className="contenedor page-hero__subnav-inner">
            {subnav.map((s) => (
              <SmartLink key={s.href} href={s.href} className={`page-hero__subnav-link${trim(pathname) === trim(s.href) ? " is-active" : ""}`}>
                {s.label}
              </SmartLink>
            ))}
          </div>
        </nav>
      )}
    </section>
  );
}
