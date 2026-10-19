import "server-only";
import { addMonths, monthKey, nightsBetween } from "../dates";
import { priceBooking, promoApplies, roomStay } from "../pricing";
import { BookingError, type BookingProvider } from "../provider";
import { draftSchema, extraGuestSchema, mainGuestSchema, toFieldErrors } from "../schema";
import type { Booking, BookingDraft, MonthAvailability } from "../types";
import { monthAvailability } from "./availability";
import { content, promos } from "./data";

/**
 * In-memory mock. Data lives for the life of the server process (resets on
 * restart / deploy) — enough to click through the whole flow end to end.
 */
type Store = {
  drafts: Map<string, BookingDraft>;
  bookings: Map<string, Booking>;
  byPaymentRef: Map<string, string>;
  /** access token → { locator, expires } */
  access: Map<string, { locator: string; expires: number }>;
};
const g = globalThis as unknown as { __revaBookingStore?: Store };
const store: Store = (g.__revaBookingStore ??= { drafts: new Map(), bookings: new Map(), byPaymentRef: new Map(), access: new Map() });
store.access ??= new Map(); // stores created before access links existed (dev HMR)
const ACCESS_TTL = 30 * 60 * 1000;
const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "");

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const LATENCY = 250; // feel a little like a real API

async function availabilityForStay(draft: BookingDraft): Promise<MonthAvailability> {
  const [from, to] = draft.dates;
  if (!from || !to) return {};
  const out: MonthAvailability = {};
  for (let m = monthKey(from); m <= monthKey(to); m = addMonths(m, 1)) Object.assign(out, monthAvailability(draft.destination, m));
  return out;
}

export const mockProvider: BookingProvider = {
  async getContent() {
    await wait(LATENCY);
    return content;
  },

  async getAvailability(destination, month) {
    if (!content.destinations.some((d) => d.code === destination)) throw new BookingError("Unknown destination", 404);
    if (!/^\d{4}-\d{2}$/.test(month)) throw new BookingError("Invalid month");
    await wait(LATENCY);
    return monthAvailability(destination, month);
  },

  async saveDraft(draft) {
    store.drafts.set(draft.locator, draft);
  },

  async checkCoupon(code, draft) {
    await wait(LATENCY);
    const promo = promos.find((p) => p.code === code.trim().toUpperCase());
    if (!promo) return { valid: false, reason: "This code isn’t valid." };
    if (!promoApplies(promo, draft)) {
      const reasons = [
        promo.minNights ? `a minimum of ${promo.minNights} nights` : "",
        promo.minDaysAhead ? `booking ${promo.minDaysAhead}+ days ahead` : "",
      ].filter(Boolean);
      return { valid: false, reason: `This code requires ${reasons.join(" and ")}.` };
    }
    return { valid: true, promo };
  },

  async checkout(raw) {
    const parsed = draftSchema.safeParse(raw);
    if (!parsed.success) throw new BookingError("Your booking is incomplete.", 422, toFieldErrors("draft", parsed.error));
    const draft = raw;

    const fields: Record<string, string> = {};
    const main = mainGuestSchema.safeParse(draft.guestsInfo[0]);
    if (!main.success) Object.assign(fields, toFieldErrors("guest.0", main.error));
    draft.guestsInfo.slice(1, draft.guests).forEach((gi, i) => {
      const r = extraGuestSchema.safeParse(gi);
      if (!r.success) Object.assign(fields, toFieldErrors(`guest.${i + 1}`, r.error));
    });
    if (Object.keys(fields).length) throw new BookingError("Please check the guest details.", 422, fields);

    const dest = content.destinations.find((d) => d.code === draft.destination);
    const room = content.rooms.find((r) => r.code === draft.room && r.destination === draft.destination);
    const [from, to] = draft.dates;
    if (!dest || !room) throw new BookingError("Destination or room not found.");
    if (nightsBetween(from, to) < dest.minNights) throw new BookingError(`Minimum stay is ${dest.minNights} nights.`);
    if (draft.guests > room.maxGuests) throw new BookingError("Too many guests for this room.");
    if (draft.programmes.slice(0, draft.guests).some((p) => !p)) throw new BookingError("Choose a programme for every guest.");

    // Server re-prices from scratch — never trust the client's totals.
    await wait(LATENCY * 2);
    const availability = await availabilityForStay(draft);
    if (!roomStay(room.code, draft, availability)) throw new BookingError("Sorry, this room was just booked for your dates.", 409);
    const promo = promos.find((p) => p.code === draft.couponCode) ?? null;
    const price = priceBooking(draft, content, availability, promo);

    const paymentRef = `RD-${draft.locator}-${Date.now().toString(36).toUpperCase()}`;
    const booking: Booking = {
      locator: draft.locator,
      status: "pending_payment",
      createdAt: new Date().toISOString(),
      draft,
      price,
      paymentRef,
      paidAmount: 0,
    };
    store.bookings.set(booking.locator, booking);
    store.byPaymentRef.set(paymentRef, booking.locator);
    return { booking, paymentUrl: `/online-reservations/payment/?ref=${encodeURIComponent(paymentRef)}` };
  },

  async completePayment(paymentRef, outcome) {
    const locator = store.byPaymentRef.get(paymentRef);
    const booking = locator ? store.bookings.get(locator) : undefined;
    if (!booking) throw new BookingError("Payment session not found.", 404);
    await wait(LATENCY * 3);
    if (booking.status !== "confirmed") {
      booking.status = outcome === "success" ? "confirmed" : "payment_failed";
      booking.paidAmount = outcome === "success" ? booking.price.deposit : 0;
    }
    return booking;
  },

  async requestAccess(locator, identifier) {
    await wait(LATENCY);
    const b = store.bookings.get(locator.trim().toUpperCase());
    const main = b?.draft.guestsInfo[0];
    const id = norm(identifier);
    if (!b || !main || !id || (id !== norm(main.passport) && id !== norm(main.email))) return null;
    const token = crypto.randomUUID().replace(/-/g, "");
    store.access.set(token, { locator: b.locator, expires: Date.now() + ACCESS_TTL });
    return { email: main.email, token };
  },

  async getBookingByToken(token) {
    await wait(LATENCY);
    const a = store.access.get(token);
    if (!a || a.expires < Date.now()) return null;
    return store.bookings.get(a.locator) ?? null;
  },

  async getBookingByPaymentRef(paymentRef) {
    const locator = store.byPaymentRef.get(paymentRef);
    return (locator && store.bookings.get(locator)) || null;
  },
};
