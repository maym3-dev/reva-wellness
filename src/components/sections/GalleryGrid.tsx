"use client";

import { useState } from "react";
import type { Filter } from "@/content/types";
import Lightbox from "@/components/ui/Lightbox";
import "./programs.css";
import "./gallery-grid.css";

export type GalleryImage = { src: string; terms: string[] };

/** Masonry photo wall with filter pills; images rise in staggered, click opens the lightbox. */
export default function GalleryGrid({ filters, images }: { filters: Filter[]; images: GalleryImage[] }) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const visible = images.filter((i) => filter === "all" || i.terms.includes(filter));
  const srcs = visible.map((v) => v.src);

  return (
    <section className="gallery-grid">
      <div className="contenedor">
        <div className="programs__filters gallery-grid__filters" role="tablist">
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
        <ul className="gallery-grid__list" key={filter}>
          {visible.map((img, i) => (
            <li key={img.src} className="gallery-grid__item" style={{ animationDelay: `${Math.min(i, 12) * 0.05}s` }}>
              <button type="button" className="gallery-grid__btn" aria-label={`Open photo ${i + 1}`} onClick={() => setOpen(i)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox images={srcs} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
