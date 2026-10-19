"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { tabLinks as homeTabLinks } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import SmartLink from "@/components/ui/SmartLink";
import "./tab-links.css";

const AUTOPLAY_MS = 7000;

/**
 * Tab links: big uppercase tab titles (active one shifts 20px right),
 * stacked images that slide vertically to the active index, 7s autoplay that
 * pauses on hover and restarts after a click; arrow keys / Home / End navigate.
 */
export default function TabLinks({ data: tabLinks = homeTabLinks }: { data?: typeof homeTabLinks }) {
  const [active, setActive] = useState(0);
  const timer = useRef<number | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const count = tabLinks.items.length;

  const stop = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  }, []);
  const start = useCallback(() => {
    stop();
    timer.current = window.setInterval(() => setActive((i) => (i + 1) % count), AUTOPLAY_MS);
  }, [stop, count]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = {
      ArrowUp: (i - 1 + count) % count,
      ArrowLeft: (i - 1 + count) % count,
      ArrowDown: (i + 1) % count,
      ArrowRight: (i + 1) % count,
      Home: 0,
      End: count - 1,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    setActive(map[e.key]);
    buttons.current[map[e.key]]?.focus();
  };

  return (
    <section className="tab-links" onMouseEnter={stop} onMouseLeave={start}>
      <div className="tab-links__container">
        <div className="tab-links__content">
          <div className="label-M light tab-links__label">{tabLinks.label}</div>
          <nav className="tab-links__nav" role="tablist" aria-orientation="vertical">
            {tabLinks.items.map((t, i) => (
              <button
                key={t.title}
                ref={(b) => {
                  buttons.current[i] = b;
                }}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`tab-panel-${i}`}
                className={`tab-links__btn headline-S${i === active ? " is-active" : ""}`}
                onClick={() => {
                  setActive(i);
                  start();
                }}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {t.title}
              </button>
            ))}
          </nav>
        </div>

        <div className="tab-links__images" style={{ "--active-index": active } as React.CSSProperties}>
          {tabLinks.items.map((t, i) => (
            <div
              key={t.title}
              id={`tab-panel-${i}`}
              role="tabpanel"
              aria-hidden={i !== active}
              className={`tab-links__image${i === active ? " is-active" : ""}`}
              style={{ "--tab-index": i, backgroundImage: `url(${t.image})` } as React.CSSProperties}
            >
              <SmartLink className="tab-links__overlay" href={t.href} tabIndex={i === active ? 0 : -1} aria-label={`Discover ${t.title}`}>
                <div className="tab-links__footer">
                  <div className="line-title">
                    <span className="line-title__line" aria-hidden />
                    <span className="line-title__text title-L">
                      <em>{t.text}</em>
                    </span>
                  </div>
                  <span className="circle-link" aria-hidden>
                    <ArrowUpRight />
                  </span>
                </div>
              </SmartLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
