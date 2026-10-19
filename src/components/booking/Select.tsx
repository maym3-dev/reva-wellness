"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, CheckIcon } from "@/components/ui/Icons";

export type SelectOption = { value: string; label: string };

type Common = {
  label: string;
  options: SelectOption[];
  /** SHA "sercheable": typing in the box filters the list. */
  searchable?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
};

type Single = Common & {
  multiple?: false;
  value: string;
  onChange: (v: string) => void;
  /** SHA toggleValue: picking the current option again clears it. */
  toggleValue?: boolean;
};

type Multi = Common & {
  multiple: true;
  value: string[];
  onChange: (v: string[]) => void;
  toggleValue?: never;
};

/**
 * SHA custom select (tm-custom-select): a 48px box with a floating label,
 * the value and a chevron; opens a list below it. Keyboard: Enter/Space/↓
 * opens, ↑↓ move, Enter picks, Esc/Tab close.
 */
export default function Select(props: Single | Multi) {
  const { label, options, searchable, error, className = "", disabled } = props;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();

  const selected = props.multiple ? props.value : props.value ? [props.value] : [];
  const display = options
    .filter((o) => selected.includes(o.value))
    .map((o) => o.label)
    .join(", ");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  const openList = () => {
    if (disabled) return;
    const i = options.findIndex((o) => selected.includes(o.value));
    setActive(Math.max(0, i));
    setQuery("");
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    setQuery("");
    if (refocus) trigger.current?.focus();
  };

  const pick = (v: string) => {
    if (props.multiple) {
      props.onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
      return;
    }
    props.onChange(props.toggleValue && v === props.value ? "" : v);
    close();
  };

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (root.current?.contains(e.target as Node)) return;
      setOpen(false);
      setQuery("");
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // on open: focus search, bring the list into view (SHA does this on mobile), keep active option visible
  useEffect(() => {
    if (!open) return;
    if (searchable) search.current?.focus();
    else list.current?.focus();
    const box = root.current?.getBoundingClientRect();
    if (box && box.bottom + 260 > window.innerHeight) root.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [open, searchable]);

  useEffect(() => {
    if (open) list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      close(false);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const d = e.key === "ArrowDown" ? 1 : -1;
      setActive((a) => (shown.length ? (a + d + shown.length) % shown.length : 0));
    } else if (e.key === "Enter" || (e.key === " " && !searchable)) {
      e.preventDefault();
      if (shown[active]) pick(shown[active].value);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      setActive(e.key === "Home" ? 0 : shown.length - 1);
    }
  };

  const filled = selected.length > 0 || (open && searchable);

  return (
    <div
      ref={root}
      className={`bk-select${open ? " is-open" : ""}${filled ? " is-filled" : ""}${error ? " has-error" : ""}${disabled ? " is-disabled" : ""} ${className}`}
      onKeyDown={onKey}
    >
      <button
        ref={trigger}
        type="button"
        className="bk-select__box"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        disabled={disabled}
        onClick={() => (open ? close() : openList())}
        tabIndex={open && searchable ? -1 : 0}
      >
        <span className="bk-select__label" id={`${id}-label`}>
          {label}
        </span>
        <span className="bk-select__value">{display}</span>
        <ChevronDown className="bk-select__chevron" width={12} height={12} />
      </button>
      {open && searchable && (
        <input
          ref={search}
          className="bk-select__search"
          value={query}
          placeholder={display || "Search…"}
          aria-label={`Search ${label.replace("*", "")}`}
          aria-controls={`${id}-list`}
          aria-activedescendant={shown[active] ? `${id}-opt-${active}` : undefined}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
        />
      )}

      {open && (
        <ul
          ref={list}
          id={`${id}-list`}
          className="bk-select__list"
          role="listbox"
          aria-labelledby={`${id}-label`}
          aria-multiselectable={props.multiple || undefined}
          aria-activedescendant={shown[active] ? `${id}-opt-${active}` : undefined}
          tabIndex={-1}
          data-lenis-prevent
        >
          {shown.map((o, i) => {
            const isSel = selected.includes(o.value);
            return (
              <li
                key={o.value}
                id={`${id}-opt-${i}`}
                data-index={i}
                role="option"
                aria-selected={isSel}
                className={`bk-select__option${i === active ? " is-active" : ""}${isSel ? " is-selected" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(o.value)}
              >
                {props.multiple && (
                  <span className="bk-select__tick" aria-hidden>
                    {isSel && <CheckIcon width={10} height={10} />}
                  </span>
                )}
                {o.label}
              </li>
            );
          })}
          {!shown.length && <li className="bk-select__empty">No results</li>}
        </ul>
      )}
      {error && <span className="bk-field-error">{error}</span>}
    </div>
  );
}
