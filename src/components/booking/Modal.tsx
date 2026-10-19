"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/providers/SmoothScroll";
import { CloseIcon } from "@/components/ui/Icons";

/** Side panel modal: slides in from the right over a blurred page. */
export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const lenis = useLenis();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.classList.add("is-locked");
    const raf = requestAnimationFrame(() => setActive(true));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      setActive(false);
      lenis?.start();
      document.documentElement.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  if (!open) return null;
  return createPortal(
    <div className={`bk-modal${active ? " is-active" : ""}`} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bk-modal__panel" data-lenis-prevent>
        <div className="bk-modal__head">
          <h3>{title}</h3>
          <button type="button" className="bk-icon-btn" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="bk-modal__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
