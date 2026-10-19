"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/providers/SmoothScroll";
import { ChevronLeft, ChevronRight, CloseIcon } from "./Icons";
import "./lightbox.css";

/**
 * Full-screen photo viewer in the same blurred-backdrop style as the video modal.
 * ←/→ and swipe navigate, Esc or backdrop click closes, counter at the bottom.
 */
export default function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: readonly string[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const lenis = useLenis();
  const [active, setActive] = useState(false);
  const touchX = useRef<number | null>(null);
  const open = index !== null;
  const count = images.length;

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      onIndex((index + d + count) % count);
    },
    [index, count, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.classList.add("is-locked");
    const raf = requestAnimationFrame(() => setActive(true));
    return () => {
      cancelAnimationFrame(raf);
      setActive(false);
      lenis?.start();
      document.documentElement.classList.remove("is-locked");
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  if (index === null) return null;

  return createPortal(
    <div
      className={`lightbox${active ? " is-active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button type="button" className="lightbox__close" aria-label="Close" onClick={onClose}>
        <CloseIcon />
      </button>
      {count > 1 && (
        <button type="button" className="lightbox__nav lightbox__nav--prev" aria-label="Previous photo" onClick={() => go(-1)}>
          <ChevronLeft />
        </button>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={images[index]} className="lightbox__img" src={images[index]} alt="" />
      {count > 1 && (
        <button type="button" className="lightbox__nav lightbox__nav--next" aria-label="Next photo" onClick={() => go(1)}>
          <ChevronRight />
        </button>
      )}
      <div className="lightbox__counter">
        {index + 1} / {count}
      </div>
    </div>,
    document.body,
  );
}
