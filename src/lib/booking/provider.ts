import type { Booking, BookingContent, BookingDraft, MonthAvailability, Promo } from "./types";

/**
 * Everything the booking UI needs from a backend. The mock implementation lives
 * in ./mock/provider.ts; a production one would talk to the PMS / channel
 * manager and the payment gateway (Red Dot) behind the same methods.
 */
export interface BookingProvider {
  getContent(): Promise<BookingContent>;
  getAvailability(destination: string, month: string): Promise<MonthAvailability>;
  /** Persist the in-progress draft (abandoned-booking recovery, like SHA's sha_sync_booking). */
  saveDraft(draft: BookingDraft): Promise<void>;
  checkCoupon(code: string, draft: BookingDraft): Promise<{ valid: true; promo: Promo } | { valid: false; reason: string }>;
  /** Re-price on the server, hold inventory and open a payment session. */
  checkout(draft: BookingDraft): Promise<{ booking: Booking; paymentUrl: string }>;
  /** Called by the payment gateway (mock: by the mock payment page). */
  completePayment(paymentRef: string, outcome: "success" | "failure"): Promise<Booking>;
  /**
   * SHA "Access my booking": verify reference + main guest's passport/ID (or e-mail)
   * and issue a short-lived access token that is e-mailed as a link.
   */
  requestAccess(locator: string, identifier: string): Promise<{ email: string; token: string } | null>;
  /** Resolve an access-link token (SHA sha_selfservice_verify). */
  getBookingByToken(token: string): Promise<Booking | null>;
  getBookingByPaymentRef(paymentRef: string): Promise<Booking | null>;
}

export class BookingError extends Error {
  constructor(
    message: string,
    public status = 400,
    public fields?: Record<string, string>,
  ) {
    super(message);
  }
}
