"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { bookingApi } from "@/lib/booking/client";
import type { Booking } from "@/lib/booking/types";
import AccessDialog from "./AccessDialog";
import BookingDetails from "./BookingDetails";

/**
 * Where the e-mailed access link lands (SHA self-service): ?token=… shows the
 * booking. Without a valid token it offers the "Access my booking" dialog.
 */
export default function MyBooking() {
  const token = useSearchParams().get("token") ?? "";
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!!token);
  // arriving without a link (e.g. from the site footer) goes straight to the dialog
  const [dialog, setDialog] = useState(!token);
  const closeDialog = useCallback(() => setDialog(false), []);

  useEffect(() => {
    if (!token) return;
    let live = true;
    bookingApi
      .bookingByToken(token)
      .then((b) => live && (setBooking(b), setError("")))
      .catch((e: Error) => live && (setBooking(null), setError(e.message)))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, [token]);

  return (
    <div className="bk-mybooking">
      <h1 className="bk-result__title">My booking</h1>
      {loading ? (
        <span className="bk-spinner" aria-label="Loading your booking" />
      ) : booking ? (
        <>
          <BookingDetails booking={booking} />
          <p className="bk-lead bk-center">
            To change or cancel your stay, contact our reservations team — online changes will be available soon.
          </p>
          <div className="bk-actions bk-actions--center">
            <Link href="/online-reservations/" className="bk-btn bk-btn--primary">
              New booking
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="bk-lead bk-center">{error || "Request an access link to view, modify or cancel your reservation."}</p>
          <div className="bk-actions bk-actions--center">
            <button type="button" className="bk-btn bk-btn--primary" onClick={() => setDialog(true)}>
              {error ? "Request a new link" : "Access my booking"}
            </button>
          </div>
        </>
      )}
      <AccessDialog open={dialog} onClose={closeDialog} />
    </div>
  );
}
