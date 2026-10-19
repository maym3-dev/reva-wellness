"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import "./disclosure.css";

const DURATION = 300; // height 0.3s ease-out

/**
 * Accordion row: the panel animates its real
 * measured height (0 → scrollHeight → auto, and back), the plus turns into a
 * minus, and the answer fades in. Padding lives inside the content so nothing
 * snaps. Works uncontrolled (`defaultOpen`) or controlled (`open` + `onToggle`)
 * so a group can keep a single item open.
 */
export default function Disclosure({
  title,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  size = "sm",
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: (open: boolean) => void;
  size?: "sm" | "lg";
}) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = controlledOpen ?? innerOpen;
  const id = useId();
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;
    // First paint: no animation, just the resting state.
    if (first.current) {
      first.current = false;
      el.style.height = open ? "auto" : "0px";
      return;
    }

    const from = el.getBoundingClientRect().height;
    const to = open ? el.scrollHeight : 0;
    el.style.height = `${from}px`;
    void el.offsetHeight; // commit the start height before transitioning
    el.style.height = `${to}px`;

    const done = (e?: TransitionEvent) => {
      if (e && (e.target !== el || e.propertyName !== "height")) return;
      if (open) el.style.height = "auto"; // follow content (resizes, fonts)
      el.removeEventListener("transitionend", done);
    };
    el.addEventListener("transitionend", done);
    // Safety net if the transition is skipped (reduced motion, hidden tab).
    const t = window.setTimeout(done, DURATION + 100);
    return () => {
      window.clearTimeout(t);
      el.removeEventListener("transitionend", done);
    };
  }, [open]);

  const toggle = () => {
    if (onToggle) onToggle(!open);
    else setInnerOpen((o) => !o);
  };

  return (
    <div className={`disclosure disclosure--${size}${open ? " is-open" : ""}`}>
      <button type="button" className="disclosure__trigger" aria-expanded={open} aria-controls={id} onClick={toggle}>
        <span>{title}</span>
        <span className="disclosure__icon" aria-hidden />
      </button>
      <div
        ref={panel}
        className="disclosure__panel"
        id={id}
        role="region"
        aria-hidden={!open}
        style={{ height: defaultOpen ? "auto" : 0 }}
      >
        <div className="disclosure__inner">{children}</div>
      </div>
    </div>
  );
}
