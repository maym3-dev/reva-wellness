"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Global config: don't recalc on mobile address-bar resize.
  ScrollTrigger.normalizeScroll(false);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "DOMContentLoaded,load,resize",
  });
}

/** <= 991px counts as "mobile": native scroll, no Lenis. */
export const MOBILE_QUERY = "(max-width: 991px)";

export const isMobileViewport = () =>
  typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };
