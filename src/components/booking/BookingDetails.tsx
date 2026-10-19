"use client";

import { useEffect } from "react";
import { formatDate } from "@/lib/booking/dates";
import { formatMoney } from "@/lib/booking/pricing";
import { useBooking } from "@/lib/booking/store";
import type { Booking } from "@/lib/booking/types";

const STATUS: Record<Booking["status"], string> = {
  confirmed: "Confirmed",
  pending_payment: "Awaiting payment",
  payment_failed: "Payment failed",
  cancelled: "Cancelled",
};

/** Read-only booking card used on the confirmation and My booking pages. */
export default function BookingDetails({ booking }: { booking: Booking }) {
  const { content, loadContent } = useBooking();
  useEffect(() => {
    loadContent().catch(() => {});
  }, [loadContent]);

  const { draft, price } = booking;
  const name = (list: { code: string; name: string }[] | undefined, code: string | null) => list?.find((x) => x.code === code)?.name ?? code ?? "";
  const dest = content?.destinations.find((d) => d.code === draft.destination);
  const money = (n: number) => formatMoney(n, dest?.currency);

  return (
    <div className="bk-details">
      <div className="bk-details__head">
        <div>
          <span className="bk-details__label">Reference</span>
          <strong>{booking.locator}</strong>
        </div>
        <span className={`bk-status is-${booking.status}`}>{STATUS[booking.status]}</span>
      </div>
      <dl className="bk-details__grid">
        <div>
          <dt>Destination</dt>
          <dd>{dest?.name ?? draft.destination}</dd>
        </div>
        <div>
          <dt>Dates</dt>
          <dd>
            {formatDate(draft.dates[0])} – {formatDate(draft.dates[1])} · {price.nights} nights
          </dd>
        </div>
        <div>
          <dt>Accommodation</dt>
          <dd>{name(content?.rooms, draft.room)}</dd>
        </div>
        <div>
          <dt>Guests</dt>
          <dd>
            {draft.guestsInfo.slice(0, draft.guests).map((g, i) => (
              <span key={i} className="bk-details__guest">
                {g.firstName} {g.lastName} · {name(content?.programmes, draft.programmes[i])}
              </span>
            ))}
          </dd>
        </div>
        {draft.addOns.length > 0 && (
          <div>
            <dt>Add-ons</dt>
            <dd>{draft.addOns.map((a) => `${name(content?.addOns, a.code)} (guest ${a.guest + 1})`).join(", ")}</dd>
          </div>
        )}
        <div>
          <dt>Total</dt>
          <dd>{money(price.total)}</dd>
        </div>
        <div>
          <dt>Paid</dt>
          <dd>{money(booking.paidAmount)}</dd>
        </div>
        {price.balance > 0 && booking.status === "confirmed" && (
          <div>
            <dt>Remaining (due 14 days before arrival)</dt>
            <dd>{money(price.balance)}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
