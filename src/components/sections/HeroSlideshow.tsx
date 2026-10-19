"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/content/site";
import SmartLink from "@/components/ui/SmartLink";
import "./hero.css";

/**
 * Full-viewport video hero (single-slide variant).
 * Heading is static; sub-heading and CTA fade up 100px with 0.4s / 0.8s delays.
 * The bottom blends into the dark intro section below.
 */
export default function HeroSlideshow() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    // Autoplay can be rejected on first paint; retry once after 150ms.
    p?.catch(() => setTimeout(() => v.play().catch(() => {}), 150));
  }, []);

  return (
    <section className="hero" aria-label="Main slideshow">
      <div className="hero__media">
        <video
          ref={videoRef}
          className="hero__video"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster={hero.poster}
          aria-hidden
        >
          <source src={hero.video} type="video/mp4" />
        </video>
      </div>
      <div className="hero__bottom-blend" aria-hidden />

      <div className="contenedor hero__content">
        <h1 className="hero__heading">
          {hero.heading.plain}
          <strong>
            <em>{hero.heading.emphasis}</em>
          </strong>
        </h1>
        <p className="hero__sub hero__motion hero__motion--sub">{hero.sub}</p>
        <SmartLink className="boton boton--ghost hero__motion hero__motion--cta" href={hero.cta.href}>
          {hero.cta.label}
        </SmartLink>
      </div>
    </section>
  );
}
