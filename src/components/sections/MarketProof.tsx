"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { marketProof } from "@/content/site";
import "./market-proof.css";

/**
 * SHA "market-proof": on desktop a continuous linear marquee (Swiper loop, autoplay
 * delay 0, speed 7000); on mobile one quote at a time every 4s with dots.
 */
export default function MarketProof() {
  const el = useRef<HTMLDivElement>(null);
  const dots = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current) return;
    const s = new Swiper(el.current, {
      modules: [Autoplay, Pagination],
      loop: true,
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 30,
      speed: 800,
      allowTouchMove: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: dots.current, clickable: true },
      breakpoints: {
        768: {
          slidesPerView: "auto",
          centeredSlides: false,
          spaceBetween: 60,
          speed: 7000,
          autoplay: { delay: 0, disableOnInteraction: false },
        },
      },
    });
    return () => {
      s.destroy(true, true);
    };
  }, []);

  return (
    <>
      <section className="market-proof-title">
        <div className="contenedor">
          <h2 className="headline-S uppercase" data-reveal="fade-up">
            {marketProof.title[0]}
            <br />
            {marketProof.title[1].replace(/proof$/i, "")}
            <span className="regular">PROOF</span>
          </h2>
        </div>
      </section>

      <section className="market-proof" aria-label="Press and awards">
        <div className="swiper market-proof__swiper" ref={el}>
          <div className="swiper-wrapper">
            {/* duplicated so the loop always has enough slides to fill wide screens */}
            {[...marketProof.items, ...marketProof.items].map((p, i) => (
              <div className="swiper-slide" key={`${p.logo}-${i}`}>
                <div className="proof-item">
                  <div className="proof-item__logo">{p.logo}</div>
                  <p className="title-S regular proof-item__text">{p.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="contenedor market-proof__dots" ref={dots} />
      </section>
    </>
  );
}
