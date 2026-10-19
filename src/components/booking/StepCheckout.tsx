"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError, bookingApi } from "@/lib/booking/client";
import { formatDate } from "@/lib/booking/dates";
import { formatMoney } from "@/lib/booking/pricing";
import { useBooking, usePrice } from "@/lib/booking/store";
import { useBookingErrors } from "@/lib/booking/validate";
import { CheckIcon } from "@/components/ui/Icons";

/** Step 5 — review, payment method (Red Dot card) and deposit, then hand off to the gateway. */
export default function StepCheckout() {
  const { draft, content } = useBooking();
  const price = usePrice();
  const setError = useBookingErrors((s) => s.set);
  const goTo = useBooking((s) => s.goTo);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  if (!content || !price) return null;

  const dest = content.destinations.find((d) => d.code === draft.destination)!;
  const room = content.rooms.find((r) => r.code === draft.room)!;
  const main = draft.guestsInfo[0];
  const money = (n: number) => formatMoney(n, dest.currency);

  const pay = async () => {
    setBusy(true);
    setMessage("");
    try {
      const { paymentUrl } = await bookingApi.checkout(draft);
      router.push(paymentUrl);
    } catch (e) {
      const err = e instanceof ApiError ? e : null;
      setMessage(err?.message ?? "Something went wrong. Please try again.");
      // send the guest back to the step that needs fixing
      if (err?.fields && Object.keys(err.fields).some((k) => k.startsWith("guest."))) {
        setError(err.message, err.fields);
        goTo(4);
      } else if (err?.status === 409) {
        setError(err.message, { room: err.message });
        goTo(2);
      }
      setBusy(false);
    }
  };

  return (
    <div className="bk-checkout">
      <h2 className="bk-h2 bk-h2--italic">Review and pay</h2>

      <section className="bk-review">
        <div className="bk-review__row">
          <span>Destination</span>
          <strong>{dest.name}</strong>
          <button type="button" className="bk-link" onClick={() => goTo(1)}>
            Edit
          </button>
        </div>
        <div className="bk-review__row">
          <span>Dates</span>
          <strong>
            {formatDate(draft.dates[0])} – {formatDate(draft.dates[1])} · {price.nights} nights
          </strong>
          <span className="bk-review__aside">
            Check-in {dest.checkInTime} · Check-out {dest.checkOutTime}
          </span>
        </div>
        <div className="bk-review__row">
          <span>Accommodation</span>
          <strong>{room.name}</strong>
          <button type="button" className="bk-link" onClick={() => goTo(2)}>
            Edit
          </button>
        </div>
        <div className="bk-review__row">
          <span>Guests</span>
          <strong>
            {draft.guestsInfo
              .slice(0, draft.guests)
              .map((g, i) => `${g.firstName} ${g.lastName} — ${content.programmes.find((p) => p.code === draft.programmes[i])?.name ?? ""}`)
              .join(" · ")}
          </strong>
          <button type="button" className="bk-link" onClick={() => goTo(4)}>
            Edit
          </button>
        </div>
        <div className="bk-review__row">
          <span>Contact</span>
          <strong>
            {main.email} · {main.phonePrefix} {main.phone}
          </strong>
        </div>
      </section>

      <section className="bk-block">
        <h2 className="bk-h2">Price details</h2>
        <ul className="bk-lines">
          {price.lines.map((l) => (
            <li key={l.label + l.detail}>
              <span>
                {l.label}
                {l.detail && <em> · {l.detail}</em>}
              </span>
              <span>{money(l.amount)}</span>
            </li>
          ))}
          {price.discount > 0 && (
            <li className="bk-lines__promo">
              <span>Promotion {draft.couponCode}</span>
              <span>− {money(price.discount)}</span>
            </li>
          )}
          <li className="bk-lines__total">
            <span>Total</span>
            <span>{money(price.total)}</span>
          </li>
        </ul>
        <p className="bk-taxes">Includes {price.taxes.map((t) => `${t.label} ${money(t.amount)}`).join(" · ")}</p>
      </section>

      <section className="bk-block">
        <h2 className="bk-h2">Payment</h2>
        <div className="bk-paymethod is-selected">
          <span className="bk-paymethod__radio" aria-hidden>
            <CheckIcon width={12} height={12} />
          </span>
          <div>
            <strong>Credit or debit card</strong>
            <p>Secure payment with Red Dot · Visa, Mastercard, JCB, UnionPay. You’ll be redirected to complete the payment with 3-D Secure.</p>
          </div>
        </div>
        <ul className="bk-lines bk-lines--pay">
          <li className="bk-lines__total">
            <span>{price.payAll ? "Total to pay now (100%)" : `Deposit to pay now (${dest.depositPercent}%)`}</span>
            <span>{money(price.deposit)}</span>
          </li>
          {!price.payAll && (
            <li>
              <span>Remaining payment, due 14 days before arrival</span>
              <span>{money(price.balance)}</span>
            </li>
          )}
        </ul>
        <p className="bk-lead">
          {price.payAll
            ? "This promotion requires full payment at booking and is non-refundable."
            : "Standard deposit and cancellation policies apply. Free cancellation up to 30 days before arrival."}
        </p>
      </section>

      {message && (
        <p className="bk-alert" role="alert">
          {message}
        </p>
      )}
      <div className="bk-actions">
        <button type="button" className="bk-btn bk-btn--primary bk-btn--wide" onClick={pay} disabled={busy}>
          {busy ? <span className="bk-spinner bk-spinner--light" /> : `Confirm and pay ${money(price.deposit)}`}
        </button>
      </div>
    </div>
  );
}
