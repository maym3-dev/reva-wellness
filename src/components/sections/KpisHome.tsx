"use client";

import { CountUp } from "countup.js";
import { useEffect } from "react";
import { kpis as homeKpis } from "@/content/site";
import { useInView } from "@/lib/useInView";
import "./kpis.css";

/** SHA "kpis-home": blush block with staggered count-ups (150ms apart) at 50% visibility. */
export default function KpisHome({ data: kpis = homeKpis }: { data?: typeof homeKpis }) {
  const [gridRef, inView] = useInView<HTMLDivElement>(0.5);

  useEffect(() => {
    if (!inView || !gridRef.current) return;
    const timers: number[] = [];
    gridRef.current.querySelectorAll<HTMLSpanElement>("[data-end-val]").forEach((el, i) => {
      timers.push(
        window.setTimeout(() => {
          const c = new CountUp(el, Number(el.dataset.endVal), { duration: 2.5, separator: "," });
          if (c.error) el.textContent = el.dataset.endVal ?? "";
          else c.start();
        }, i * 150),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, gridRef]);

  return (
    <section className="kpis">
      <div className="contenedor">
        <div className="kpis__intro">
          <div className="line-title">
            <span className="line-title__line" aria-hidden />
            <h3 className="line-title__text title-L">
              <em>
                {kpis.title[0]}
                <br />
                {kpis.title[1]}
              </em>
            </h3>
          </div>
          <p className="kpis__intro-text">{kpis.text}</p>
        </div>

        <div className="kpis__grid" ref={gridRef}>
          {kpis.items.map((k) => (
            <div className="kpi-item" key={k.text}>
              <div className="kpi-item__number">
                {k.prefix && <span className="headline-S">{k.prefix}</span>}
                <span className="headline-S" data-end-val={k.value}>
                  0
                </span>
                {k.suffix && <span className="headline-S">{k.suffix}</span>}
              </div>
              <p className="title-S regular kpi-item__description">{k.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
