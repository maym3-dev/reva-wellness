"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/ui/Icons";

const noop = () => () => {};

/**
 * Centred dialog over a blurred page: close ✕, Esc and backdrop click
 * close it; focus moves in on open and back to the opener on close.
 */
export default function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  role = "dialog",
  className = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  role?: "dialog" | "alertdialog";
  className?: string;
  children: React.ReactNode;
}) {
  const [shown, setShown] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  // portals need document.body: render nothing on the server / before hydration
  const isClient = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    if (!open || !isClient) return;
    const opener = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add("is-locked");
    const raf = requestAnimationFrame(() => setShown(true));
    // first field, else the element marked data-autofocus, else the panel
    const target = panel.current?.querySelector<HTMLElement>("[data-autofocus], input") ?? panel.current;
    target?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      setShown(false);
      document.documentElement.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open, isClient, onClose]);

  if (!open || !isClient) return null;
  return createPortal(
    <div className={`bk-cc${shown ? " is-active" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={panel} tabIndex={-1} className={`bk-dialog ${className}`} role={role} aria-modal="true" aria-labelledby={labelledBy} aria-describedby={describedBy}>
        <button type="button" className="bk-icon-btn bk-dialog__close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
