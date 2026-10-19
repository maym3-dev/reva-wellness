"use client";

import { useEffect } from "react";

/**
 * Site-wide scroll-in observer for reveals and `.line-title`.
 * - `[data-reveal]` gets `.is-revealed` (honours `data-reveal-delay` in ms)
 * - `.line-title` gets `.line-title--in-view`
 */
export default function RevealObserver() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay || 0);
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-revealed");
          reveal.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -120px 0px" },
    );

    const lines = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("line-title--in-view");
          lines.unobserve(entry.target);
        });
      },
      { threshold: 0.3 },
    );

    const scan = () => {
      document
        .querySelectorAll("[data-reveal]:not(.is-revealed)")
        .forEach((el) => reveal.observe(el));
      document
        .querySelectorAll(".line-title:not(.line-title--in-view)")
        .forEach((el) => lines.observe(el));
    };
    scan();

    // Pick up elements rendered later (carousels, filtered lists).
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      reveal.disconnect();
      lines.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
