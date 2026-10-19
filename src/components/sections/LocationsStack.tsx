"use client";

import { useEffect, useRef } from "react";
import { locations as homeLocations } from "@/content/site";
import { gsap, ScrollTrigger, isMobileViewport, prefersReducedMotion } from "@/lib/gsap";
import { ArrowUpRight } from "@/components/ui/Icons";
import SmartLink from "@/components/ui/SmartLink";
import "./locations.css";

/**
 * Curtain/stack effect: the wrapper pins for 300% of the
 * viewport while panel 2, then panel 3, slide up (yPercent 100 → 0) over panel 1.
 */
export default function LocationsStack({ data: locations = homeLocations }: { data?: typeof homeLocations }) {
  const rootRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrapper = wrapperRef.current!;
    const panels = wrapper.querySelectorAll<HTMLElement>(".locations__panel");
    const mobile = isMobileViewport();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "locations-main",
          trigger: wrapper,
          start: "top top",
          end: "+=300%",
          pin: wrapper,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 0,
          invalidateOnRefresh: !mobile,
        },
      });
      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 1, ease: "none" }, i - 1);
      });
    }, rootRef);

    // Recompute pin spacing once mounted (React may re-run this effect in dev) and
    // again when web fonts / late content change the height of sections above.
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section className="locations" ref={rootRef}>
      <div className="contenedor locations__intro">
        <div className="line-title">
          <span className="line-title__line" aria-hidden />
          <h2 className="line-title__text headline-S light uppercase">
            <span className="regular">{locations.heading.strong}</span>
            <br />
            {locations.heading.plain}
          </h2>
        </div>
      </div>

      <div className="locations__wrapper" ref={wrapperRef}>
        {locations.items.map((item, i) => (
          <div key={item.title} className="locations__panel" style={{ zIndex: i + 1 }}>
            <div className="locations__image" role="img" aria-label={item.title} style={{ backgroundImage: `url(${item.image})` }} />
            <div className="locations__overlay" />
            <div className="locations__content">
              <SmartLink href={item.href} className="locations__link">
                <h3 className="headline-S light">{item.title.toUpperCase()}</h3>
                <span className="circle-link" aria-hidden>
                  <ArrowUpRight />
                </span>
              </SmartLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
