"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { bookingApi } from "@/lib/booking/client";
import { formatMoney } from "@/lib/booking/pricing";
import type { Booking } from "@/lib/booking/types";

/**
 * Stand-in for Red Dot's hosted payment page. No card data is collected —
 * the two buttons simulate the gateway's success / failure callback so the
 * whole flow (pending → confirmed / failed) can be exercised.
 */
export default function MockPayment() {
  const ref = useSearchParams().get("ref") ?? "";
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<"" | "success" | "failure">("");

  useEffect(() => {
    if (!ref) return;
    bookingApi.paymentStatus(ref).then(setBooking, (e) => setError(e.message));
  }, [ref]);

  const finish = async (outcome: "success" | "failure") => {
    setBusy(outcome);
    await bookingApi.pay(ref, outcome).catch(() => {});
    router.replace(`/online-reservations/confirmation/?ref=${encodeURIComponent(ref)}`);
  };

  if (!ref || error) return <p className="bk-alert bk-center">{error || "Missing payment reference."}</p>;
  if (!booking) return <div className="bk-loading"><span className="bk-spinner" /></div>;

  return (
    <div className="bk-pay">
      <div className="bk-pay__card">
        <div className="bk-pay__brand">
          <span className="bk-pay__logo">RED DOT</span>
          <span className="bk-pay__badge">Test mode · mock gateway</span>
        </div>
        <dl className="bk-pay__details">
          <div>
            <dt>Merchant</dt>
            <dd>REVA by Royal Muang Samui Villas</dd>
          </div>
          <div>
            <dt>Booking reference</dt>
            <dd>{booking.locator}</dd>
          </div>
          <div>
            <dt>Amount</dt>
            <dd className="bk-pay__amount">{formatMoney(booking.price.deposit)}</dd>
          </div>
        </dl>
        <p className="bk-pay__note">
          This is a simulated payment page for development. In production the guest enters card details on Red Dot’s secure page and
          completes 3-D Secure; Red Dot then notifies our server.
        </p>
        <div className="bk-pay__actions">
          <button type="button" className="bk-btn bk-btn--primary bk-btn--block" disabled={!!busy} onClick={() => finish("success")}>
            {busy === "success" ? <span className="bk-spinner bk-spinner--light" /> : "Simulate successful payment"}
          </button>
          <button type="button" className="bk-btn bk-btn--outline bk-btn--block" disabled={!!busy} onClick={() => finish("failure")}>
            {busy === "failure" ? <span className="bk-spinner" /> : "Simulate declined card"}
          </button>
        </div>
      </div>
    </div>
  );
}
