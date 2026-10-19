"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { gsap, ScrollTrigger, isMobileViewport } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/** Exponential ease-out used by SHA for both Lenis and programmatic scrolls. */
export const shaEase = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Lenis smooth scrolling on desktop only (SHA disables it <= 991px and on iOS),
 * driven by GSAP's ticker so ScrollTrigger stays perfectly in sync.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isMobileViewport() || isIOS) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: shaEase,
      smoothWheel: true,
      touchMultiplier: 2,
      autoRaf: false,
    });

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Lenis is an external system created here; exposing it to consumers is the point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Scroll helper that uses Lenis when present and native smooth scroll otherwise. */
export function scrollToY(lenis: Lenis | null, y: number) {
  if (lenis) {
    lenis.scrollTo(y, { duration: 1.2, easing: shaEase });
  } else {
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
