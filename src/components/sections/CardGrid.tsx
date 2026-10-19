"use client";

import { useState } from "react";
import type { Card, Filter, Heading } from "@/content/types";
import HeadingText from "@/components/ui/HeadingText";
import SmartLink from "@/components/ui/SmartLink";
import { ArrowUpRight } from "@/components/ui/Icons";
import Disclosure from "@/components/ui/Disclosure";
import "./programs.css";
import "./card-grid.css";

type Props = {
  id?: string;
  lineTitle?: string;
  heading?: Heading;
  text?: string;
  filters?: Filter[];
  items: Card[];
  columns?: 2 | 3;
  /** portrait = tall images (listings), landscape = 4:3 (offers, news) */
  ratio?: "portrait" | "landscape";
  tone?: "white" | "light";
};

/**
 * Listing grid: image zooms on hover, circular arrow
 * rotates 45°, cards rise in with a stagger; optional filter pills and
 * collapsible detail blocks (offer terms).
 */
export default function CardGrid({
  id,
  lineTitle,
  heading,
  text,
  filters,
  items,
  columns = 3,
  ratio = "portrait",
  tone = "white",
}: Props) {
  const [filter, setFilter] = useState("all");
  const visible = items.filter((c) => filter === "all" || c.terms?.includes(filter));

  return (
    <section className={`card-grid card-grid--${tone}`} id={id}>
      <div className="contenedor">
        {(lineTitle || heading || text || filters) && (
          <div className="card-grid__header">
            {lineTitle && (
              <div className="line-title">
                <span className="line-title__line" aria-hidden />
                <h2 className="line-title__text title-L">
                  <em>{lineTitle}</em>
                </h2>
              </div>
            )}
            {heading && (
              <h2 className="headline-S light card-grid__heading">
                <HeadingText h={heading} />
              </h2>
            )}
            {text && <p className="card-grid__text">{text}</p>}
            {filters && (
              <div className="programs__filters card-grid__filters" role="tablist">
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
            )}
          </div>
        )}

        <ul className={`card-grid__list card-grid__list--${columns}`} key={filter}>
          {visible.map((c, i) => (
            <li key={c.title} className="grid-card" style={{ animationDelay: `${(i % columns) * 0.1}s` }}>
              <SmartLink href={c.href} className="grid-card__link" aria-label={c.title}>
                <div className={`grid-card__media grid-card__media--${ratio}`}>
                  <div className="grid-card__image" style={{ backgroundImage: `url(${c.image})` }} />
                  <span className="circle-link grid-card__arrow" aria-hidden>
                    <ArrowUpRight />
                  </span>
                </div>
                <div className="grid-card__body">
                  {c.label && <div className="label-M light grid-card__label">{c.label}</div>}
                  <h3 className="title-S regular grid-card__title">{c.title}</h3>
                  {c.text && <p className="grid-card__text">{c.text}</p>}
                  {c.meta && (
                    <ul className="grid-card__meta">
                      {c.meta.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </SmartLink>
              {c.details?.map((d) => (
                <Disclosure key={d.title} title={d.title}>
                  <ul className="grid-card__detail-list">
                    {d.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </Disclosure>
              ))}
              {c.ctas && (
                <div className="grid-card__ctas">
                  {c.ctas.map((b, j) => (
                    <SmartLink key={b.label} href={b.href} className={`boton ${j === 0 ? "boton--primary" : "boton--ghost-dark"}`}>
                      {b.label}
                    </SmartLink>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
