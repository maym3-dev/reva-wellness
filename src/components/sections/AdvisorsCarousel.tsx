"use client";

import { useEffect, useRef, useState } from "react";
import { advisors as homeAdvisors } from "@/content/site";
import { ChevronLeft, ChevronRight } from "@/components/ui/Icons";
import SmartLink from "@/components/ui/SmartLink";
import "./advisors.css";

const EASE = "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)";
const DURATION = 500;
const SWIPE_MIN = 50;

/**
 * Port of SHA's advisors carousel.
 * Desktop/tablet: the active image is the LAST item in the track, pinned to the right edge
 * and enlarged; "next" grows the previous item while the track slides right, then the old
 * active item is recycled to the front of the DOM (infinite loop).
 * Mobile (<768px): active is the FIRST item; the track slides left by one step.
 */
export default function AdvisorsCarousel({ data: advisors = homeAdvisors }: { data?: typeof homeAdvisors }) {
  const total = advisors.items.length;
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const api = useRef<{ next: () => void; prev: () => void; goTo: (i: number) => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const track = trackRef.current!;
    let animating = false;
    let currentIndex = 0;
    let suppressClickUntil = 0;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
    const isDesktop = () => window.matchMedia("(min-width: 992px)").matches;
    const items = () => Array.from(track.children) as HTMLElement[];
    const idxOf = (el: HTMLElement) => Number(el.dataset.index);

    const metrics = () => {
      if (isDesktop()) return { small: 205, large: 335, gap: 25 };
      const list = items();
      const active = track.querySelector<HTMLElement>(".is-active") ?? list[list.length - 1];
      const other = list.find((i) => i !== active) ?? active;
      return {
        large: active.getBoundingClientRect().width,
        small: other.getBoundingClientRect().width,
        gap: parseFloat(getComputedStyle(track).gap) || 0,
      };
    };

    const setPosition = (x: number, animate: boolean) => {
      track.style.transition = animate ? EASE : "none";
      track.style.transform = `translateX(${x}px)`;
      if (!animate) void track.offsetHeight;
    };

    const currentTranslate = () => new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;

    // Offset so the (enlarged) last item sits flush with the right edge of the column.
    const baseOffset = () => {
      const m = metrics();
      const list = items();
      const width = list.reduce(
        (sum, el, i) => sum + (el.classList.contains("is-active") ? m.large : m.small) + (i < list.length - 1 ? m.gap : 0),
        0,
      );
      return container.offsetWidth - width;
    };

    const activeFromTrack = () => {
      const list = items();
      return idxOf(isMobile() ? list[0] : list[list.length - 1]);
    };

    const updateUI = () => {
      currentIndex = activeFromTrack();
      setCurrent(currentIndex);
    };

    const markActiveDesktop = () =>
      items().forEach((el, i, arr) => el.classList.toggle("is-active", i === arr.length - 1));
    const markActiveMobile = () => items().forEach((el, i) => el.classList.toggle("is-active", i === 0));

    // Rotate DOM so item `target` is last (desktop) / first (mobile).
    const orderFor = (target: number) => {
      for (let guard = 0; guard < total; guard++) {
        const list = items();
        if (isMobile() ? idxOf(list[0]) === target : idxOf(list[list.length - 1]) === target) break;
        if (isMobile()) track.appendChild(list[0]);
        else track.insertBefore(list[list.length - 1], list[0]);
      }
    };

    const sync = (target: number) => {
      orderFor(target);
      if (isMobile()) {
        markActiveMobile();
        setPosition(0, false);
      } else {
        markActiveDesktop();
        setPosition(baseOffset(), false);
      }
      updateUI();
    };

    const nextMobile = () => {
      if (animating || total < 2) return;
      animating = true;
      const m = metrics();
      const first = items()[0];
      setPosition(-(m.small + m.gap), true);
      later(() => {
        track.appendChild(first);
        markActiveMobile();
        setPosition(0, false);
        updateUI();
        animating = false;
      }, DURATION);
    };

    const prevMobile = () => {
      if (animating || total < 2) return;
      animating = true;
      const m = metrics();
      const list = items();
      track.insertBefore(list[list.length - 1], list[0]);
      setPosition(-(m.small + m.gap), false);
      requestAnimationFrame(() => {
        markActiveMobile();
        setPosition(0, true);
      });
      later(() => {
        updateUI();
        animating = false;
      }, DURATION);
    };

    // Desktop "next": active shrinks, previous grows, track slides right, recycle.
    const next = () => {
      if (animating || total < 2) return;
      if (isMobile()) return nextMobile();
      animating = true;
      const list = items();
      const last = list[list.length - 1];
      const secondLast = list[list.length - 2];
      last.classList.remove("is-active");
      secondLast.classList.add("is-active");
      const m = metrics();
      setPosition(baseOffset() + m.small + m.gap, true);
      setCurrent(idxOf(secondLast));
      later(() => {
        track.insertBefore(last, track.firstElementChild);
        setPosition(baseOffset(), false);
        updateUI();
        animating = false;
      }, DURATION);
    };

    const prev = () => {
      if (animating || total < 2) return;
      if (isMobile()) return prevMobile();
      animating = true;
      track.appendChild(items()[0]);
      const list = items();
      const newLast = list[list.length - 1];
      const oldActive = list[list.length - 2];
      oldActive.classList.add("is-active");
      newLast.classList.remove("is-active");
      const m = metrics();
      setPosition(baseOffset() + m.small + m.gap, false);
      requestAnimationFrame(() => {
        oldActive.classList.remove("is-active");
        newLast.classList.add("is-active");
        setPosition(baseOffset(), true);
        updateUI();
      });
      later(() => {
        updateUI();
        animating = false;
      }, DURATION);
    };

    const goTo = (target: number) => {
      if (animating || target === currentIndex) return;
      if (isMobile()) {
        const fwd = (target - currentIndex + total) % total;
        const back = (currentIndex - target + total) % total;
        if (fwd <= back) nextMobile();
        else prevMobile();
      } else {
        // In this layout "next" walks the index backwards.
        const viaNext = (currentIndex - target + total) % total;
        const viaPrev = (target - currentIndex + total) % total;
        if (viaNext <= viaPrev) next();
        else prev();
      }
      later(() => currentIndex !== target && goTo(target), DURATION + 50);
    };

    api.current = { next, prev, goTo };

    // Click a small image to bring it forward.
    const onClick = (e: MouseEvent) => {
      if (Date.now() < suppressClickUntil) return;
      const item = (e.target as HTMLElement).closest<HTMLElement>(".advisor-image");
      if (item && !item.classList.contains("is-active")) goTo(idxOf(item));
    };

    // Drag / swipe.
    let startX = 0;
    let curX = 0;
    let dragging = false;
    let moved = false;
    let base = 0;
    const dragStart = (x: number) => {
      if (animating) return;
      dragging = true;
      moved = false;
      startX = curX = x;
      base = currentTranslate();
      track.style.transition = "none";
      container.style.cursor = "grabbing";
    };
    const dragMove = (x: number) => {
      if (!dragging) return;
      curX = x;
      if (Math.abs(curX - startX) > 3) moved = true;
      track.style.transform = `translateX(${base + curX - startX}px)`;
    };
    const dragEnd = () => {
      if (!dragging) return;
      dragging = false;
      container.style.cursor = "";
      const diff = curX - startX;
      const reset = () => setPosition(isMobile() ? 0 : baseOffset(), true);
      if (!moved || Math.abs(diff) <= SWIPE_MIN) return reset();
      suppressClickUntil = Date.now() + 350;
      if (isMobile()) {
        if (diff > 0) prev();
        else next();
      } else if (diff > 0) next();
      else prev();
    };

    const onMouseDown = (e: MouseEvent) => {
      dragStart(e.clientX);
      e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => dragMove(e.clientX);
    const onTouchStart = (e: TouchEvent) => dragStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => dragMove(e.touches[0].clientX);

    container.addEventListener("click", onClick);
    container.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", dragEnd);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", dragEnd, { passive: true });

    let resizeT = 0;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = window.setTimeout(() => sync(currentIndex), 100);
    };
    window.addEventListener("resize", onResize);

    sync(0);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resizeT);
      container.removeEventListener("click", onClick);
      container.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", dragEnd);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", dragEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [total]);

  const dots = (
    <div className="advisors__pagination">
      {advisors.items.map((a, i) => (
        <button
          key={a.name}
          type="button"
          className={`advisors__dot${i === current ? " is-active" : ""}`}
          aria-label={`Show ${a.name}`}
          onClick={() => api.current?.goTo(i)}
        />
      ))}
    </div>
  );

  return (
    <section className="advisors" aria-label={advisors.heading}>
      <div className="contenedor">
        <div className="advisors__header">
          <h2 className="headline-S light uppercase">{advisors.heading}</h2>
          <p className="subtitle-M advisors__intro">{advisors.text}</p>
        </div>

        <div className="advisors__columns">
          <div className="advisors__images-column">
            <div className="advisors__images-wrapper" ref={containerRef}>
              <div className="advisors__track" ref={trackRef}>
                {advisors.items.map((a, i) => (
                  <div
                    key={a.name}
                    className="advisor-image"
                    data-index={i}
                    role="img"
                    aria-label={`${a.name}, ${a.role}`}
                    style={{ backgroundImage: `url(${a.image})` }}
                  />
                ))}
              </div>
            </div>
            <div className="advisors__pagination-slot--desktop">{dots}</div>
          </div>

          <div className="advisors__content-column">
            {advisors.items.map((a, i) => (
              <div key={a.name} className={`advisor-card${i === current ? " is-active" : ""}`} aria-hidden={i !== current}>
                <h3 className="title-L light advisor-card__title">
                  <em>{a.name}</em>
                </h3>
                <div className="subtitle-S regular advisor-card__role">{a.role}</div>
                <p className="disclaimer-L light advisor-card__text">
                  <em>{a.text}</em>
                </p>
                {"href" in a && a.href && (
                  <SmartLink href={a.href} className="boton boton--ghost-dark advisor-card__cta" tabIndex={i === current ? 0 : -1}>
                    Discover
                  </SmartLink>
                )}
              </div>
            ))}
            <div className="advisors__navigation">
              <button type="button" className="advisors__arrow" aria-label="Previous" onClick={() => api.current?.prev()}>
                <ChevronLeft />
              </button>
              <button type="button" className="advisors__arrow" aria-label="Next" onClick={() => api.current?.next()}>
                <ChevronRight />
              </button>
              <div className="advisors__pagination-slot--mobile">{dots}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
