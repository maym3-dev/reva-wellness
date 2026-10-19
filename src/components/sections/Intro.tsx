"use client";

import { CountUp } from "countup.js";
import { useEffect } from "react";
import { intro } from "@/content/site";
import { useInView } from "@/lib/useInView";
import { KpiIcon } from "@/components/ui/Icons";
import "./hero.css";

/** Dark "home-hero-2026" block: heading, line-title and 2×2 count-up KPIs. */
export default function Intro() {
  const [gridRef, inView] = useInView<HTMLDivElement>(0.2);

  useEffect(() => {
    if (!inView || !gridRef.current) return;
    const nodes = gridRef.current.querySelectorAll<HTMLSpanElement>("[data-end-val]");
    const t = setTimeout(() => {
      nodes.forEach((el) => {
        const c = new CountUp(el, Number(el.dataset.endVal), { duration: 2.5, separator: "," });
        if (c.error) el.textContent = el.dataset.endVal ?? "";
        else c.start();
      });
    }, 200);
    return () => clearTimeout(t);
  }, [inView, gridRef]);

  return (
    <section className="intro">
      <div className="contenedor intro__zone-2">
        <h2 className="headline-S light intro__heading">
          {intro.heading.plain}
          <span className="regular">
            <em>{intro.heading.emphasis}</em>
          </span>
        </h2>
        <div className="intro__gap-24" />
        <div className="line-title">
          <span className="line-title__line" aria-hidden />
          <h3 className="line-title__text title-L">
            <em>
              {intro.lineTitle[0]}
              <br />
              {intro.lineTitle[1]}
            </em>
          </h3>
        </div>
        <p className="subtitle-M regular intro__sub" data-reveal="fade-up" data-reveal-delay="400">
          {intro.sub}
        </p>
      </div>

      <div className="contenedor intro__zone-3">
        <div className="intro__kpi-grid" ref={gridRef}>
          {intro.kpis.map((k) => (
            <div className="kpi-hero" key={k.text}>
              <div className="kpi-hero__icon">
                <KpiIcon name={k.icon} />
              </div>
              <div>
                <div className="kpi-hero__number">
                  <span className="headline-S">
                    <span data-end-val={k.value}>0</span>
                  </span>
                  {k.suffix && <span className="headline-S">{k.suffix}</span>}
                </div>
                <p className="title-S regular">{k.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contenedor intro__zone-4" data-reveal="fade-in" data-reveal-delay="400">
        <div className="title-M">
          <span className="regular uppercase">{intro.footnote.strong}</span>
          <br />
          {intro.footnote.text}
        </div>
      </div>
    </section>
  );
}
