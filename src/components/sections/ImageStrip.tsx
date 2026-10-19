"use client";

import { Splide } from "@splidejs/splide";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/ui/Icons";
import Lightbox from "@/components/ui/Lightbox";
import "./programs.css";
import "./image-strip.css";

const SIDE_OFFSET = "max(var(--contenedor-padding), calc((100vw - var(--contenedor-width)) / 2))";

/**
 * Photo gallery strip: same bleed + drag behaviour as the card carousel,
 * images of mixed widths at a fixed height; click opens the lightbox.
 */
export default function ImageStrip({ title = "Gallery", images }: { title?: string; images: readonly string[] }) {
  const el = useRef<HTMLDivElement>(null);
  const splide = useRef<Splide | null>(null);
  const [state, setState] = useState({ index: 0, end: false });
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (!el.current) return;
    const s = new Splide(el.current, {
      type: "slide",
      autoWidth: true,
      gap: "16px",
      padding: { left: SIDE_OFFSET, right: SIDE_OFFSET },
      arrows: false,
      pagination: false,
      drag: "free",
      snap: true,
      speed: 500,
    });
    const sync = () => setState({ index: s.index, end: s.Components.Controller.getEnd() <= s.index });
    s.on("mounted move moved resized", sync);
    s.mount();
    splide.current = s;
    return () => {
      s.destroy(true);
    };
  }, []);

  return (
    <section className="image-strip">
      <div className="contenedor image-strip__header">
        <div className="line-title">
          <span className="line-title__line" aria-hidden />
          <h2 className="line-title__text title-L">
            <em>{title}</em>
          </h2>
        </div>
        <div className="programs__arrows">
          <button type="button" className="programs__arrow" aria-label="Previous" disabled={state.index <= 0} onClick={() => splide.current?.go("<")}>
            <ChevronLeft />
          </button>
          <button type="button" className="programs__arrow" aria-label="Next" disabled={state.end} onClick={() => splide.current?.go(">")}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="splide" ref={el} aria-label={title}>
        <div className="splide__track">
          <ul className="splide__list">
            {images.map((src, i) => (
              <li key={src} className="splide__slide image-strip__slide">
                <button type="button" className="image-strip__btn" aria-label={`Open photo ${i + 1}`} onClick={() => setOpen(i)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" draggable={false} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
