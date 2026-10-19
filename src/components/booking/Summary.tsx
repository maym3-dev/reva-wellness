"use client";

import { useState } from "react";
import { formatDate } from "@/lib/booking/dates";
import { formatMoney } from "@/lib/booking/pricing";
import { useBooking, usePrice } from "@/lib/booking/store";
import { useBookingErrors } from "@/lib/booking/validate";
import Disclosure from "@/components/ui/Disclosure";
import { CalendarIcon, CheckIcon, ChevronDown, KpiIcon, PlusIcon } from "@/components/ui/Icons";

/** Right-hand booking summary (SHA). Becomes a bottom bar + sheet on mobile. */
export default function Summary({ onContinue }: { onContinue?: () => void }) {
  const { draft, content, promo } = useBooking();
  const price = usePrice();
  const error = useBookingErrors((s) => s.message);
  const [open, setOpen] = useState(false);
  if (!content) return null;

  const dest = content.destinations.find((d) => d.code === draft.destination);
  const room = content.rooms.find((r) => r.code === draft.room);
  const currency = dest?.currency ?? "THB";
  const nights = price?.nights ?? 0;
  const counts = new Map<string, number>();
  draft.programmes.forEach((p) => p && counts.set(p, (counts.get(p) ?? 0) + 1));

  return (
    <aside className={`bk-summary${open ? " is-open" : ""}`} aria-label="Booking summary">
      <div className="bk-summary__card">
        <h2 className="bk-summary__title">
          Booking summary{dest ? <span> | {dest.name}</span> : null}
        </h2>
        {!draft.dates[0] ? (
          <p className="bk-summary__muted">Select your stay</p>
        ) : (
          <>
            <p className="bk-summary__sub">
              {nights > 0 && `${nights} nights · `}
              {draft.guests} adult{draft.guests > 1 ? "s" : ""}
            </p>
            <ul className="bk-summary__list">
              {draft.dates[1] && (
                <li>
                  <CalendarIcon width={16} height={16} />
                  {formatDate(draft.dates[0])} – {formatDate(draft.dates[1])}
                </li>
              )}
              {room && (
                <li>
                  <KpiIcon name="bed" width={16} height={16} />
                  {room.name}
                </li>
              )}
              {[...counts].map(([code, n]) => (
                <li key={code}>
                  <KpiIcon name="heart" width={16} height={16} />
                  {content.programmes.find((p) => p.code === code)?.name} · {n} guest{n > 1 ? "s" : ""}
                </li>
              ))}
              {draft.addOns.map((a) => (
                <li key={`${a.code}-${a.guest}`}>
                  <PlusIcon width={14} height={14} />
                  Extra · {content.addOns.find((x) => x.code === a.code)?.name} · guest {a.guest + 1}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="bk-summary__totals">
          {price && price.fixedRatePerNight > 0 && (
            <div className="bk-summary__row bk-summary__row--muted">
              <span>Fixed rate</span>
              <span>{formatMoney(price.fixedRatePerNight, currency)} per night</span>
            </div>
          )}
          {price && price.discount > 0 && (
            <div className="bk-summary__row bk-summary__row--promo">
              <span>Promotion {promo?.code}</span>
              <span>− {formatMoney(price.discount, currency)}</span>
            </div>
          )}
          <div className="bk-summary__row bk-summary__total">
            <span>Total</span>
            <span>{formatMoney(price?.total ?? 0, currency)}</span>
          </div>
        </div>

        {onContinue && (
          <button type="button" className="bk-btn bk-btn--primary bk-btn--block bk-summary__cta" onClick={onContinue}>
            Continue
          </button>
        )}
        {error && onContinue && (
          <p className="bk-summary__error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="bk-summary__includes">
        <h3>Your stay always includes</h3>
        <ul>
          {(dest ?? content.destinations[0]).includes.map((inc) =>
            inc.detail ? (
              <li key={inc.text} className="bk-summary__include--more">
                <CheckIcon />
                <Disclosure title={inc.text}>
                  <p>{inc.detail}</p>
                </Disclosure>
              </li>
            ) : (
              <li key={inc.text}>
                <CheckIcon />
                <span>{inc.text}</span>
              </li>
            ),
          )}
        </ul>
      </div>

      {/* Mobile bottom bar */}
      <div className="bk-summary__bar">
        <button type="button" className="bk-summary__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <span>Total</span>
          <strong>{formatMoney(price?.total ?? 0, currency)}</strong>
          <ChevronDown className={open ? "is-flipped" : ""} />
        </button>
        {onContinue && (
          <button type="button" className="bk-btn bk-btn--primary" onClick={onContinue}>
            Continue
          </button>
        )}
      </div>
    </aside>
  );
}
