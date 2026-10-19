"use client";

import { useState } from "react";
import { addDays, addMonths, formatDate, monthGrid, monthKey, monthLabel, nightsBetween, todayISO } from "@/lib/booking/dates";
import type { ISODate } from "@/lib/booking/types";
import { CalendarIcon, ChevronLeft, ChevronRight, CloseIcon } from "@/components/ui/Icons";

const DAY_NAMES = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MAX_MONTHS_AHEAD = 18;

/**
 * SHA date selector: a trigger showing "Check-in → Check-out" that opens a
 * two-month calendar (one on phones). First click = check-in, second =
 * check-out; nights below the minimum stay are disabled while choosing.
 */
export default function DateRangePicker({
  value,
  onChange,
  minNights,
  open,
  onOpenChange,
  disabled,
  error,
}: {
  value: [ISODate, ISODate] | ["", ""];
  onChange: (v: [ISODate, ISODate]) => void;
  minNights: number;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  disabled?: boolean;
  error?: string;
}) {
  const today = todayISO();
  const first = monthKey(addDays(today, 1));
  const [from, to] = value;
  const [start, setStart] = useState<ISODate | "">("");
  const [hover, setHover] = useState<ISODate | "">("");
  const [month, setMonth] = useState(from ? monthKey(from) : first);

  const picking = start || "";
  const rangeFrom = picking || from;
  const rangeTo = picking ? hover : to;

  const isDisabled = (d: ISODate) => d <= today || (!!picking && d > picking && nightsBetween(picking, d) < minNights);
  const inRange = (d: ISODate) => !!rangeFrom && !!rangeTo && d > rangeFrom && d < rangeTo;

  const click = (d: ISODate) => {
    if (isDisabled(d)) return;
    if (!picking || d <= picking) {
      setStart(d);
      return;
    }
    onChange([picking, d]);
    setStart("");
    setHover("");
    onOpenChange(false);
  };

  const months = [month, addMonths(month, 1)];
  const maxMonth = addMonths(first, MAX_MONTHS_AHEAD);

  return (
    <div className={`bk-dates${error ? " has-error" : ""}${disabled ? " is-disabled" : ""}`}>
      <button
        type="button"
        className={`bk-dates__trigger${open ? " is-open" : ""}`}
        disabled={disabled}
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
      >
        <CalendarIcon />
        <span className={from ? "" : "bk-placeholder"}>{from ? formatDate(from) : "Check-in"}</span>
        <ChevronRight width={14} height={14} />
        <span className={to ? "" : "bk-placeholder"}>{to ? formatDate(to) : "Check-out"}</span>
      </button>

      {open && (
        <div className="bk-calendar" role="dialog" aria-label="Choose dates">
          <div className="bk-calendar__head">
            <p className="bk-calendar__hint">
              {picking ? "Select departure date" : "Select arrival date"}
              <span>Min. stay is {minNights} nights</span>
            </p>
            <button type="button" className="bk-icon-btn" aria-label="Close" onClick={() => onOpenChange(false)}>
              <CloseIcon width={16} height={16} />
            </button>
          </div>
          <div className="bk-calendar__nav">
            <button type="button" className="bk-icon-btn" aria-label="Previous month" disabled={month <= first} onClick={() => setMonth(addMonths(month, -1))}>
              <ChevronLeft />
            </button>
            <button type="button" className="bk-icon-btn" aria-label="Next month" disabled={month >= maxMonth} onClick={() => setMonth(addMonths(month, 1))}>
              <ChevronRight />
            </button>
          </div>
          <div className="bk-calendar__months" onMouseLeave={() => setHover("")}>
            {months.map((m, mi) => (
              <div key={m} className={`bk-calendar__month${mi === 1 ? " bk-calendar__month--second" : ""}`}>
                <p className="bk-calendar__label">{monthLabel(m)}</p>
                <div className="bk-calendar__grid" role="grid">
                  {DAY_NAMES.map((n) => (
                    <span key={n} className="bk-calendar__dow">
                      {n}
                    </span>
                  ))}
                  {monthGrid(m).map((d, i) =>
                    d ? (
                      <button
                        key={d}
                        type="button"
                        role="gridcell"
                        disabled={isDisabled(d)}
                        aria-selected={d === rangeFrom || d === rangeTo}
                        className={[
                          "bk-calendar__day",
                          d === rangeFrom && "is-start",
                          d === rangeTo && "is-end",
                          inRange(d) && "is-range",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => click(d)}
                        onMouseEnter={() => picking && !isDisabled(d) && d > picking && setHover(d)}
                      >
                        {Number(d.slice(8))}
                      </button>
                    ) : (
                      <span key={`pad-${i}`} />
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <p className="bk-field-error">{error}</p>}
    </div>
  );
}
