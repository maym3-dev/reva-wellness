"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { bookingApi } from "@/lib/booking/client";
import { useBooking } from "@/lib/booking/store";
import type { Booking } from "@/lib/booking/types";
import AccessDialog from "./AccessDialog";
import BookingDetails from "./BookingDetails";
import { CheckIcon, CloseIcon } from "@/components/ui/Icons";

/**
 * Return page after the gateway. Polls the payment status (SHA polls
 * `sha_polling_redsys` the same way) and clears the draft once confirmed.
 */
export default function Confirmation() {
  const ref = useSearchParams().get("ref") ?? "";
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const reset = useBooking((s) => s.reset);
  const goTo = useBooking((s) => s.goTo);
  const [access, setAccess] = useState(false);
  const closeAccess = useCallback(() => setAccess(false), []);

  useEffect(() => {
    if (!ref) return;
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const poll = async () => {
      try {
        const b = await bookingApi.paymentStatus(ref);
        setBooking(b);
        if (b.status === "pending_payment" && tries++ < 10) timer = setTimeout(poll, 1500);
        if (b.status === "confirmed") reset();
      } catch (e) {
        setError((e as Error).message);
      }
    };
    poll();
    return () => clearTimeout(timer);
  }, [ref, reset]);

  if (!ref || error) return <p className="bk-alert bk-center">{error || "Missing payment reference."}</p>;
  if (!booking || booking.status === "pending_payment")
    return (
      <div className="bk-loading">
        <span className="bk-spinner" />
        <p>Confirming your payment…</p>
      </div>
    );

  if (booking.status === "payment_failed")
    return (
      <div className="bk-result">
        <span className="bk-result__icon is-error">
          <CloseIcon />
        </span>
        <h1 className="bk-result__title">We couldn’t confirm your payment</h1>
        <p className="bk-lead">Your card was not charged. Here’s what you can do:</p>
        <ul className="bk-result__tips">
          <li>Check that your card details, expiry date and security code are correct.</li>
          <li>Make sure your card is enrolled in 3-D Secure and allows online payments.</li>
          <li>Try a different card, or contact us and we’ll help you complete the booking.</li>
        </ul>
        <Link href="/online-reservations/" className="bk-btn bk-btn--primary" onClick={() => goTo(5)}>
          Try again
        </Link>
      </div>
    );

  return (
    <div className="bk-result">
      <span className="bk-result__icon">
        <CheckIcon />
      </span>
      <p className="bk-result__kicker">Booking confirmed</p>
      <h1 className="bk-result__title">Thank you, {booking.draft.guestsInfo[0].firstName}. See you on Koh Samui.</h1>
      <p className="bk-lead">
        Your reference is <strong>{booking.locator}</strong>. We’ve sent the confirmation to {booking.draft.guestsInfo[0].email} (mock — no email is sent yet).
      </p>
      <BookingDetails booking={booking} />
      <div className="bk-actions bk-actions--center">
        <Link href="/" className="bk-btn bk-btn--outline">
          Back to the website
        </Link>
        <button type="button" className="bk-btn bk-btn--primary" onClick={() => setAccess(true)}>
          Manage my booking
        </button>
      </div>
      <AccessDialog open={access} onClose={closeAccess} initialLocator={booking.locator} />
    </div>
  );
}
