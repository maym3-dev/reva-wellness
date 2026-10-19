"use client";

import { useState } from "react";
import { bookingApi } from "@/lib/booking/client";
import { nightsBetween } from "@/lib/booking/dates";
import { formatMoney, promoApplies } from "@/lib/booking/pricing";
import { useBooking } from "@/lib/booking/store";
import { useBookingErrors } from "@/lib/booking/validate";
import type { Programme } from "@/lib/booking/types";
import { CheckIcon, InfoIcon, MinusIcon, PlusIcon } from "@/components/ui/Icons";
import DateRangePicker from "./DateRangePicker";
import Modal from "./Modal";

/** Step 1 — destination, dates, guests, promotion and one programme per guest. */
export default function StepStay({ onContinue }: { onContinue: () => void }) {
  const { draft, content, promo, setDestination, setDates, setGuests, setProgramme, ensureMonths } = useBooking();
  const fieldErrors = useBookingErrors((s) => s.fields);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeGuest, setActiveGuest] = useState(0);
  const [info, setInfo] = useState<Programme | null>(null);
  if (!content) return null;

  const dest = content.destinations.find((d) => d.code === draft.destination);
  const [from, to] = draft.dates;
  const nights = from && to ? nightsBetween(from, to) : 0;
  const programmes = content.programmes.filter((p) => p.destination.includes(draft.destination));
  const ready = !!dest && nights > 0;
  const maxGuests = Math.max(...content.rooms.filter((r) => r.destination === draft.destination).map((r) => r.maxGuests), 2);

  return (
    <div className="bk-stay">
      <section className="bk-block">
        <h2 className="bk-h2">Destination</h2>
        <div className="bk-destinations" role="radiogroup" aria-label="Destination">
          {content.destinations.map((d) => (
            <button
              key={d.code}
              type="button"
              role="radio"
              aria-checked={draft.destination === d.code}
              className={`bk-destination${draft.destination === d.code ? " is-selected" : ""}`}
              onClick={() => d.code !== draft.destination && setDestination(d.code)}
            >
              <span>
                <strong>{d.name}</strong>
                <span>{d.location}</span>
              </span>
              <CheckIcon className="bk-destination__check" />
            </button>
          ))}
        </div>
        {fieldErrors.destination && <p className="bk-field-error">{fieldErrors.destination}</p>}
      </section>

      <section className={`bk-block${dest ? "" : " is-muted"}`}>
        <h2 className="bk-h2">
          Length of stay{nights > 0 && <span className="bk-h2__meta"> · {nights} nights</span>}
        </h2>
        <DateRangePicker
          value={draft.dates}
          disabled={!dest}
          minNights={dest?.minNights ?? 2}
          open={calendarOpen && !!dest}
          onOpenChange={setCalendarOpen}
          error={fieldErrors.dates}
          onChange={(dates) => {
            setDates(dates);
            if (dest) ensureMonths(dest.code, dates[0], dates[1]).catch(() => {});
          }}
        />
      </section>

      {ready && content.featuredPromo && (
        <PromoBox applied={promo?.code === content.featuredPromo.code} />
      )}

      <section className={`bk-block bk-guests${dest ? "" : " is-muted"}`}>
        <h2 className="bk-h2">Guests</h2>
        <div className="bk-counter" aria-label="Guests">
          <button type="button" aria-label="Fewer guests" disabled={!dest || draft.guests <= 1} onClick={() => { setGuests(draft.guests - 1); setActiveGuest(0); }}>
            <MinusIcon />
          </button>
          <span aria-live="polite">{draft.guests}</span>
          <button type="button" aria-label="More guests" disabled={!dest || draft.guests >= maxGuests} onClick={() => setGuests(draft.guests + 1)}>
            <PlusIcon />
          </button>
        </div>
      </section>

      {ready && (
        <section className="bk-block bk-programmes">
          <h2 className="bk-h2">Add one programme per guest.</h2>
          <p className="bk-note">
            <CheckIcon /> Round-trip airport transfer included for stays of 4 or more nights.
          </p>
          {draft.guests > 1 && (
            <div className="bk-tabs" role="tablist" aria-label="Guests">
              {draft.programmes.map((p, i) => (
                <button key={i} type="button" role="tab" aria-selected={activeGuest === i} className={`bk-tab${activeGuest === i ? " is-active" : ""}${p ? " is-done" : ""}`} onClick={() => setActiveGuest(i)}>
                  Guest {i + 1}
                  {p && <CheckIcon width={12} height={12} />}
                </button>
              ))}
            </div>
          )}
          {fieldErrors.programmes && <p className="bk-field-error">{fieldErrors.programmes}</p>}
          <ul className="bk-cards">
            {programmes.map((p) => {
              const selected = draft.programmes[activeGuest] === p.code;
              const tooShort = nights < p.minNights;
              return (
                <li key={p.code} className={`bk-card bk-programme${selected ? " is-selected" : ""}${tooShort ? " is-unavailable" : ""}`}>
                  <span className="bk-programme__bar" style={{ background: p.color }} aria-hidden />
                  <div className="bk-card__body">
                    <h3 className="bk-card__title">
                      {p.name}
                      <button type="button" className="bk-info" aria-label={`What’s included in ${p.name}`} onClick={() => setInfo(p)}>
                        <InfoIcon />
                      </button>
                    </h3>
                    <p className="bk-card__text">{p.shortDescription}</p>
                    <div className="bk-card__foot">
                      <div className="bk-price">
                        {p.pricePerNight > 0 ? (
                          <>
                            <span className="bk-price__main">
                              {formatMoney(p.pricePerNight, dest.currency)} <em>/ night</em>
                            </span>
                            <span className="bk-price__sub">
                              <em>
                                {formatMoney(p.pricePerNight * nights, dest.currency)} / {nights} nights
                              </em>
                            </span>
                          </>
                        ) : (
                          <span className="bk-price__main">Included</span>
                        )}
                        {tooShort && <span className="bk-price__warn">Minimum {p.minNights} nights</span>}
                      </div>
                      <button
                        type="button"
                        className={`bk-btn ${selected ? "bk-btn--primary" : "bk-btn--outline"}`}
                        disabled={tooShort}
                        onClick={() => {
                          setProgramme(activeGuest, selected ? null : p.code);
                          if (!selected && activeGuest < draft.guests - 1) setActiveGuest(activeGuest + 1);
                        }}
                      >
                        {selected ? (
                          <>
                            <CheckIcon width={14} height={14} /> Added
                          </>
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="bk-actions">
            <button type="button" className="bk-btn bk-btn--primary" onClick={onContinue}>
              Continue
            </button>
          </div>
        </section>
      )}

      {!ready && (
        <div className="bk-actions">
          <button type="button" className="bk-btn bk-btn--primary" onClick={onContinue}>
            Continue
          </button>
        </div>
      )}

      <Modal open={!!info} onClose={() => setInfo(null)} title={info?.name ?? ""}>
        {info && (
          <>
            <p className="bk-modal__lead">{info.shortDescription}</p>
            {info.included.map((c) => (
              <div key={c.category} className="bk-modal__group">
                <h4>{c.category}</h4>
                <ul>
                  {c.items.map((it) => (
                    <li key={it}>
                      <CheckIcon width={14} height={14} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="bk-modal__note">Minimum stay {info.minNights} nights · price per guest, per night.</p>
          </>
        )}
      </Modal>
    </div>
  );
}

/** SHA promotion banner: featured code with APPLY, plus a free-text code field. */
function PromoBox({ applied }: { applied: boolean }) {
  const { draft, content, promo, setPromo } = useBooking();
  const featured = content!.featuredPromo!;
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const eligible = promoApplies(featured, draft);

  const apply = async (c: string) => {
    setBusy(true);
    setMsg("");
    try {
      const res = await bookingApi.coupon(c, draft);
      if (res.valid) setPromo(res.promo);
      else setMsg(res.reason);
    } catch {
      setMsg("We couldn’t check this code. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={`bk-promo${applied ? " is-applied" : ""}`}>
      <div className="bk-promo__head">
        <strong>Promotion</strong>
        <span className="bk-promo__code">{featured.code}</span>
        {applied ? (
          <button type="button" className="bk-btn bk-btn--small bk-btn--ghost-green" onClick={() => setPromo(null)}>
            Remove
          </button>
        ) : (
          <button type="button" className="bk-btn bk-btn--small bk-btn--green" disabled={!eligible || busy} onClick={() => apply(featured.code)}>
            Apply
          </button>
        )}
      </div>
      <p className="bk-promo__text">
        {featured.description}
        {!eligible && !applied && " Not available for the selected dates."}
      </p>
      {promo && promo.code !== featured.code && <p className="bk-promo__text">Code {promo.code} applied: {promo.description}</p>}
      <form
        className="bk-promo__form"
        onSubmit={(e) => {
          e.preventDefault();
          if (code.trim()) apply(code);
        }}
      >
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Have another code?" aria-label="Promotion code" />
        <button type="submit" className="bk-btn bk-btn--small bk-btn--outline" disabled={busy || !code.trim()}>
          Apply
        </button>
      </form>
      {msg && <p className="bk-field-error">{msg}</p>}
    </section>
  );
}
