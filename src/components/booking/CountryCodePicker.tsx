"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { COUNTRIES_FEATURED, type Country } from "@/lib/booking/countries";
import { ChevronDown, CloseIcon } from "@/components/ui/Icons";

/**
 * SHA phone prefix: the field shows the dial code; clicking it opens a
 * centred "Select country code" dialog with a search by code or country.
 */
export default function CountryCodePicker({
  dial,
  iso,
  onChange,
}: {
  dial: string;
  iso?: string;
  onChange: (c: Country) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = COUNTRIES_FEATURED.find((c) => c.iso === iso) ?? COUNTRIES_FEATURED.find((c) => c.dial === dial);

  return (
    <>
      <button type="button" className="bk-phone__prefix" aria-haspopup="dialog" aria-label={`Country code ${dial}${current ? `, ${current.name}` : ""}`} onClick={() => setOpen(true)}>
        {current && <span className="bk-flag">{current.flag}</span>}
        {dial}
        <ChevronDown width={12} height={12} />
      </button>
      {open && (
        <CountryDialog
          selected={current?.iso}
          onClose={() => setOpen(false)}
          onPick={(c) => {
            onChange(c);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

function CountryDialog({ selected, onClose, onPick }: { selected?: string; onClose: () => void; onPick: (c: Country) => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const opener = useRef<Element | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, "");
    if (!q) return COUNTRIES_FEATURED;
    return COUNTRIES_FEATURED.filter((c) => c.name.toLowerCase().includes(q) || c.dial.slice(1).startsWith(q));
  }, [query]);

  useEffect(() => {
    opener.current = document.activeElement;
    document.documentElement.classList.add("is-locked");
    const raf = requestAnimationFrame(() => setShown(true));
    input.current?.focus();
    list.current?.querySelector(".is-selected")?.scrollIntoView({ block: "center" });
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("is-locked");
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    if (active >= 0) list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const d = e.key === "ArrowDown" ? 1 : -1;
      setActive((a) => (results.length ? (a + d + results.length) % results.length : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const c = results[active] ?? (results.length === 1 ? results[0] : undefined);
      if (c) onPick(c);
    }
  };

  return createPortal(
    <div className={`bk-cc${shown ? " is-active" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()} onKeyDown={onKey}>
      <div className="bk-cc__panel" role="dialog" aria-modal="true" aria-labelledby="bk-cc-title">
        <div className="bk-cc__head">
          <h3 id="bk-cc-title">Select country code</h3>
          <button type="button" className="bk-icon-btn" aria-label="Close" onClick={onClose}>
            <CloseIcon width={16} height={16} />
          </button>
        </div>
        <input
          ref={input}
          className="bk-cc__search"
          type="text"
          autoComplete="off"
          placeholder="Search by code or country..."
          value={query}
          role="combobox"
          aria-expanded
          aria-controls="bk-cc-list"
          aria-activedescendant={active >= 0 ? `bk-cc-${results[active]?.iso}` : undefined}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
          }}
        />
        <ul ref={list} id="bk-cc-list" className="bk-cc__list" role="listbox" aria-label="Countries" data-lenis-prevent>
          {results.map((c, i) => (
            <li
              key={c.iso}
              id={`bk-cc-${c.iso}`}
              data-index={i}
              role="option"
              aria-selected={c.iso === selected}
              className={`bk-cc__item${c.iso === selected ? " is-selected" : ""}${i === active ? " is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => onPick(c)}
            >
              <span className="bk-flag">{c.flag}</span>
              <span className="bk-cc__name">{c.name}</span>
              <span className="bk-cc__dial">{c.dial}</span>
            </li>
          ))}
          {!results.length && <li className="bk-cc__empty">No countries match “{query}”</li>}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
