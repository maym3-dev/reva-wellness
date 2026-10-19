"use client";

import { Splide } from "@splidejs/splide";
import { useEffect, useRef, useState } from "react";
import type { Card, Cta, Filter, Heading } from "@/content/types";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/ui/Icons";
import HeadingText from "@/components/ui/HeadingText";
import SmartLink from "@/components/ui/SmartLink";
import { useHoverVideo } from "@/lib/useHoverVideo";
import "./programs.css";

// Same bleed SHA uses: first card aligns with the container, cards overflow to the viewport edge.
const SIDE_OFFSET = "max(var(--contenedor-padding), calc((100vw - var(--contenedor-width)) / 2))";

/** Splide with autoWidth + padding lets go(N) run past the real end; find the true last index. */
function getRealEndIndex(splide: Splide) {
  const move = splide.Components.Move;
  const length = splide.length;
  const endPos = move.toPosition(length - 1, true);
  for (let i = 0; i < length - 1; i++) {
    if (move.toPosition(i, true) === endPos) return i;
  }
  return length - 1;
}

type Props = {
  id?: string;
  heading: Heading;
  text?: string;
  allLink?: Cta;
  filters?: Filter[];
  items: Card[];
  /** Muted clip that fades in over a card on hover (desktop). */
  previewVideo?: string;
  tone?: "white" | "light";
};

/** SHA "carrusel-programas": optional filter tabs + Splide carousel + hover video preview. */
export default function CardCarousel({ id, heading, text, allLink, filters, items, previewVideo, tone = "white" }: Props) {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(0);
  const [realEnd, setRealEnd] = useState(0);
  const splideEl = useRef<HTMLDivElement>(null);
  const splide = useRef<Splide | null>(null);

  const visible = items.filter((p) => filter === "all" || p.terms?.includes(filter));

  useEffect(() => {
    if (!splideEl.current) return;
    const s = new Splide(splideEl.current, {
      type: "slide",
      autoWidth: true,
      perMove: 1,
      gap: "32px",
      padding: { left: SIDE_OFFSET, right: SIDE_OFFSET },
      arrows: false,
      pagination: false,
      drag: true,
      speed: 400,
      easing: "ease",
      breakpoints: { 768: { gap: "16px" } },
    });
    const sync = () => {
      setIndex(s.index);
      setRealEnd(getRealEndIndex(s));
    };
    s.on("mounted move moved updated resized", sync);
    s.mount();
    sync();
    splide.current = s;
    return () => {
      s.destroy(true);
      splide.current = null;
    };
  }, [filter]);

  const go = (dir: 1 | -1) => {
    const s = splide.current;
    if (!s) return;
    if (dir < 0 && s.index <= 0) return;
    if (dir > 0 && s.index >= getRealEndIndex(s)) return;
    s.go(dir > 0 ? "+1" : "-1");
  };

  return (
    <section className={`programs programs--${tone}`} id={id}>
      <div className="contenedor programs__layout">
        <div className="programs__header">
          <div className="programs__cabecera">
            <h2 className="headline-S light programs__title">
              <HeadingText h={heading} />
            </h2>
            {(text || allLink) && (
              <div className="programs__row">
                {text && <p className="programs__subtitle">{text}</p>}
                {allLink && (
                  <SmartLink className="programs__all label-S regular" href={allLink.href}>
                    <span>{allLink.label}</span>
                    <ArrowRight />
                  </SmartLink>
                )}
              </div>
            )}
          </div>

          <div className={`programs__controls${filters ? "" : " programs__controls--no-filters"}`}>
            {filters && (
              <div className="programs__filters-wrapper">
                <div className="programs__filters" role="tablist">
                  {filters.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={filter === f.id}
                      className={`boton boton--ghost-dark filter-button${filter === f.id ? " is-active" : ""}`}
                      onClick={() => setFilter(f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="programs__arrows">
              <button type="button" className="programs__arrow" aria-label="Previous" disabled={index <= 0} onClick={() => go(-1)}>
                <ChevronLeft />
              </button>
              <button type="button" className="programs__arrow" aria-label="Next" disabled={index >= realEnd} onClick={() => go(1)}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="programs__carousel">
        {/* keyed by filter so React hands Splide a fresh list each time */}
        <div className="splide" ref={splideEl} key={filter} aria-label={heading.emphasis ?? heading.before}>
          <div className="splide__track">
            <ul className="splide__list">
              {visible.map((p) => (
                <li className="splide__slide program-card" key={p.title}>
                  <SmartLink className="program-card__link" href={p.href} aria-label={p.title}>
                    <PreviewMedia image={p.image} video={previewVideo} />
                    <div>
                      {p.label && <div className="program-card__type label-M light">{p.label}</div>}
                      <h3 className="program-card__title title-S regular">{p.title}</h3>
                      {p.text && <p className="program-card__excerpt">{p.text}</p>}
                    </div>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="contenedor">
        <div className="programs__dots">
          {visible.length > 1 &&
            visible.map((p, i) => (
              <button
                key={p.title}
                type="button"
                className={`programs__dot${i === index ? " is-active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => splide.current?.go(Math.min(i, realEnd))}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

/** Desktop hover: a muted looping video fades in over the cover (0.7s), removed on leave. */
function PreviewMedia({ image, video }: { image: string; video?: string }) {
  const { hostRef, hostProps, mounted, videoProps, visible } = useHoverVideo<HTMLDivElement>();
  return (
    <div
      ref={hostRef}
      className="program-card__media"
      style={{ backgroundImage: `url(${image})` }}
      {...(video ? hostProps : {})}
    >
      {video && mounted && (
        <video {...videoProps} className={`program-card__preview-video${visible ? " is-visible" : ""}`} src={video} />
      )}
    </div>
  );
}
