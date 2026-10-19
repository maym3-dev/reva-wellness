"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const canHover = () =>
  !("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
  window.matchMedia("(min-width: 769px)").matches;

/**
 * SHA's hover-preview pattern (programs cards, big-one): on mouseenter (desktop,
 * non-touch) mount a muted looping <video>, fade it in once it plays; on mouseleave
 * or when scrolled out of view, fade it out and unmount after the transition.
 */
export function useHoverVideo<T extends HTMLElement>(visibleThreshold = 0.35) {
  const hostRef = useRef<T>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const onMouseEnter = useCallback(() => {
    if (canHover()) setMounted(true);
  }, []);
  const stop = useCallback(() => setVisible(false), []);

  useEffect(() => {
    const v = videoRef.current;
    if (!mounted || !v) return;
    v.muted = true;
    v.play()
      .then(() => setVisible(true))
      .catch(() => setMounted(false));
  }, [mounted]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && setVisible(false), {
      threshold: visibleThreshold,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [visibleThreshold]);

  const onTransitionEnd = useCallback(() => {
    if (visible) return;
    videoRef.current?.pause();
    setMounted(false);
  }, [visible]);

  return {
    hostRef,
    hostProps: { onMouseEnter, onMouseLeave: stop },
    stop,
    mounted,
    videoProps: { ref: videoRef, muted: true, loop: true, playsInline: true, onTransitionEnd },
    visible,
  };
}
