"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/booking/pricing";
import { useBooking } from "@/lib/booking/store";
import { CheckIcon } from "@/components/ui/Icons";

/** Step 3 — optional enhancements, added per guest (SHA "Boost your results"). */
export default function StepAddOns({ onContinue }: { onContinue: () => void }) {
  const { draft, content, toggleAddOn } = useBooking();
  const [expanded, setExpanded] = useState<string | null>(null);
  if (!content) return null;

  const dest = content.destinations.find((d) => d.code === draft.destination)!;
  const chosen = new Set(draft.programmes.filter(Boolean) as string[]);
  const addOns = content.addOns.filter(
    (a) => a.destination.includes(draft.destination) && (!a.compatibleWith.length || a.compatibleWith.some((c) => chosen.has(c))),
  );

  return (
    <div className="bk-addons">
      <h2 className="bk-h2 bk-h2--italic">Enhance your stay with optional experiences</h2>
      <p className="bk-lead">Add as many as you like — you can also book them during your stay.</p>
      <ul className="bk-cards">
        {addOns.map((a) => {
          const guests = draft.addOns.filter((x) => x.code === a.code).map((x) => x.guest);
          const isOpen = expanded === a.code;
          return (
            <li key={a.code} className={`bk-card bk-addon${guests.length ? " is-selected" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="bk-addon__img" src={a.image} alt="" loading="lazy" />
              <div className="bk-card__body">
                <h3 className="bk-card__title">{a.name}</h3>
                <p className="bk-addon__kicker">Designed to complement your stay</p>
                <p className={`bk-card__text${isOpen ? "" : " bk-clamp"}`}>{a.desc}</p>
                <div className="bk-card__foot">
                  <div className="bk-price">
                    <span className="bk-price__main">
                      {formatMoney(a.price, dest.currency)} <em>/ guest</em>
                    </span>
                  </div>
                  <div className="bk-addon__guests">
                    {Array.from({ length: draft.guests }, (_, g) => {
                      const on = guests.includes(g);
                      return (
                        <button key={g} type="button" className={`bk-btn ${on ? "bk-btn--primary" : "bk-btn--outline"}`} aria-pressed={on} onClick={() => toggleAddOn(a.code, g)}>
                          {on && <CheckIcon width={14} height={14} />}
                          {draft.guests > 1 ? `Guest ${g + 1}` : on ? "Added" : "Add"}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {a.desc.length > 90 && (
                  <button type="button" className="bk-link" onClick={() => setExpanded(isOpen ? null : a.code)}>
                    {isOpen ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="bk-actions">
        <button type="button" className="bk-btn bk-btn--primary" onClick={onContinue}>
          {draft.addOns.length ? "Continue" : "Continue without add-ons"}
        </button>
      </div>
    </div>
  );
}
