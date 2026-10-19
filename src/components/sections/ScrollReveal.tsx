"use client";

import { Fragment, useEffect, useRef } from "react";
import { scrollReveal as homeReveal } from "@/content/site";

type Lines = typeof homeReveal.lines;
import { gsap } from "@/lib/gsap";
import "./scroll-reveal.css";

function Headline({ lines, breakLines }: { lines: Lines; breakLines: boolean }) {
  return (
    <div className="headline-XL">
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && (breakLines ? <br /> : " ")}
          {line.map((part, j) => {
            let node: React.ReactNode = part.t;
            if (part.b) node = <span className="regular">{node}</span>;
            if (part.i) node = <em>{node}</em>;
            return <Fragment key={j}>{node}</Fragment>;
          })}
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Two stacked copies of the headline: dark base layer, light reveal layer on top.
 * The light layer's clip-path is scrubbed from inset(100% 0 0 0) → inset(0) as the
 * section travels from "top bottom" to "bottom top" (SHA gsap-scroll-reveal).
 */
export default function ScrollReveal({ lines = homeReveal.lines }: { lines?: Lines }) {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        layerRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, sectionRef);
    // Shown only once GSAP owns the clip-path (avoids a flash of the light layer).
    sectionRef.current?.classList.add("is-ready");
    return () => ctx.revert();
  }, []);

  const layer = (
    <div className="contenedor">
      <div className="only-desktop">
        <Headline lines={lines} breakLines />
      </div>
      <div className="only-mobile">
        <Headline lines={lines} breakLines={false} />
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="scroll-reveal" aria-label="Statement">
      <div className="scroll-reveal__base">{layer}</div>
      <div className="scroll-reveal__reveal" ref={layerRef} aria-hidden>
        {layer}
      </div>
    </section>
  );
}
