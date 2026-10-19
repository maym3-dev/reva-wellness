"use client";

import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { team as homeTeam } from "@/content/site";
import { ChevronLeft, ChevronRight } from "@/components/ui/Icons";
import SmartLink from "@/components/ui/SmartLink";
import "./team.css";

/**
 * SHA "clinical-team" carousel: Swiper (slidesPerView auto, speed 600), 5 visible on
 * desktop, greyscale cards with bottom gradient, arrows disabled at the ends,
 * one dot per slide (last dot active once the track reaches its end).
 */
export default function TeamCarousel({ data: team = homeTeam }: { data?: typeof homeTeam }) {
  const el = useRef<HTMLDivElement>(null);
  const swiper = useRef<Swiper | null>(null);
  const [state, setState] = useState({ index: 0, isBeginning: true, isEnd: false });
  const total = team.items.length;

  useEffect(() => {
    if (!el.current) return;
    const s = new Swiper(el.current, {
      slidesPerView: "auto",
      spaceBetween: 0,
      speed: 600,
      grabCursor: true,
      threshold: 10,
      touchAngle: 30,
      breakpoints: { 768: { touchAngle: 45, threshold: 5 } },
    });
    const sync = () => setState({ index: s.activeIndex, isBeginning: s.isBeginning, isEnd: s.isEnd });
    s.on("slideChange", sync);
    s.on("reachEnd", sync);
    s.on("resize", sync);
    sync();
    swiper.current = s;
    return () => {
      s.destroy(true, true);
    };
  }, []);

  const activeDot = state.isEnd ? total - 1 : state.index;

  return (
    <section className="team" aria-label={team.heading}>
      <div className="contenedor team__header">
        <div className="line-title">
          <span className="line-title__line" aria-hidden />
          <h2 className="line-title__text headline-S light">{team.heading}</h2>
        </div>
        <div className="label-M light team__label">{team.label}</div>
        <p className="disclaimer-L light team__text">
          <em>{team.text}</em>
        </p>
      </div>

      <div className="contenedor team__toolbar">
        <div className="team__navigation">
          <button
            type="button"
            className="team__arrow"
            aria-label="Previous"
            disabled={state.isBeginning}
            onClick={() => swiper.current?.slidePrev(600)}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="team__arrow"
            aria-label="Next"
            disabled={state.isEnd}
            onClick={() => swiper.current?.slideNext(600)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="contenedor team__container">
        <div className="team__block">
          <div className="swiper team__swiper" ref={el}>
            <div className="swiper-wrapper">
              {team.items.map((m) => (
                <div className="swiper-slide" key={m.name}>
                  <SmartLink
                    href={"href" in m && m.href ? m.href : "#"}
                    className="team-card"
                    aria-label={`${m.name}, ${m.role}`}
                    style={{ backgroundImage: `url(${m.image})` }}
                    draggable={false}
                  >
                    <div className="team-card__overlay" />
                    <div className="team-card__content">
                      <h4 className="title-M light">{m.name}</h4>
                      <div className="team-card__role regular">{m.role}</div>
                      <div className="team-card__place light">{m.place}</div>
                    </div>
                  </SmartLink>
                </div>
              ))}
            </div>
          </div>
          <div className="team__pagination" aria-hidden>
            {team.items.map((m, i) => (
              <span key={m.name} className={`team__dot${i === activeDot ? " is-active" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
