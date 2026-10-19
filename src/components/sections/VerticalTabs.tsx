"use client";

import { useRef, useState } from "react";
import type { Cta } from "@/content/types";
import SmartLink from "@/components/ui/SmartLink";
import "./vertical-tabs.css";

export type TabItem = {
  title: string;
  text: string;
  image: string;
  bullets?: string[];
  meta?: string;
  cta?: Cta;
};

type Props = {
  heading: string;
  text?: string;
  items: TabItem[];
  tone?: "white" | "light";
};

/**
 * SHA "experience-design" module: tab list on the left (active shifts right and
 * darkens), content + image on the right cross-fading between panels.
 * Arrow keys / Home / End move between tabs.
 */
export default function VerticalTabs({ heading, text, items, tone = "light" }: Props) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
    const next: Record<string, number> = {
      ArrowDown: (i + 1) % n,
      ArrowRight: (i + 1) % n,
      ArrowUp: (i - 1 + n) % n,
      ArrowLeft: (i - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (!(e.key in next)) return;
    e.preventDefault();
    setActive(next[e.key]);
    tabs.current[next[e.key]]?.focus();
  };

  return (
    <section className={`vtabs vtabs--${tone}`}>
      <div className="contenedor vtabs__grid">
        <div className="vtabs__aside">
          <h2 className="title-L vtabs__heading" data-reveal="fade-up">
            {heading}
          </h2>
          {text && (
            <p className="vtabs__text" data-reveal="fade-up" data-reveal-delay="100">
              {text}
            </p>
          )}
          <ul className="vtabs__list" role="tablist" aria-orientation="vertical">
            {items.map((it, i) => (
              <li key={it.title} role="presentation">
                <button
                  ref={(b) => {
                    tabs.current[i] = b;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`vtabs__tab${i === active ? " is-active" : ""}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  {it.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="vtabs__panels">
          {items.map((it, i) => (
            <div key={it.title} role="tabpanel" aria-hidden={i !== active} className={`vtabs__panel${i === active ? " is-active" : ""}`}>
              <div className="vtabs__image" style={{ backgroundImage: `url(${it.image})` }} />
              <div className="vtabs__body">
                {it.meta && <div className="label-M light vtabs__meta">{it.meta}</div>}
                <h3 className="title-L">{it.title}</h3>
                <p>{it.text}</p>
                {it.bullets && (
                  <ul className="vtabs__bullets">
                    {it.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {it.cta && (
                  <SmartLink className="boton boton--ghost-dark" href={it.cta.href} tabIndex={i === active ? 0 : -1}>
                    {it.cta.label}
                  </SmartLink>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
