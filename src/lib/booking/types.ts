/**
 * Booking domain model. Mirrors the shape SHA's engine works with
 * (destinations → programmes → rooms → packs → guests → payment) so the
 * mock provider can later be swapped for a PMS / channel-manager backend.
 */

export type ISODate = string; // "YYYY-MM-DD"

export type Destination = {
  code: string;
  name: string;
  location: string;
  image: string;
  currency: string;
  /** Share of the total charged at checkout; the rest is due before arrival. */
  depositPercent: number;
  minNights: number;
  checkInTime: string;
  checkOutTime: string;
  paymentGateway: "reddot";
  /** Shown in the "Your stay always includes" panel. */
  includes: { text: string; detail?: string }[];
};

export type RoomType = {
  code: string;
  destination: string;
  name: string;
  category: "suite" | "villa";
  size: string;
  bed: string;
  maxGuests: number;
  desc: string;
  images: string[];
  features: string[];
  /** Number of physical units of this type (inventory). */
  units: number;
  /** Base nightly rate before seasonality, in destination currency. */
  baseRate: number;
};

export type Programme = {
  code: string;
  destination: string[];
  name: string;
  family: "stay" | "wellness" | "movement" | "healing" | "culture";
  shortDescription: string;
  /** Per guest, per night. 0 = accommodation only. */
  pricePerNight: number;
  minNights: number;
  color: string;
  included: { category: string; items: string[] }[];
};

export type AddOn = {
  code: string;
  destination: string[];
  name: string;
  desc: string;
  image: string;
  /** Flat price per guest it is assigned to. */
  price: number;
  /** Programme codes it can be combined with (empty = any). */
  compatibleWith: string[];
};

export type Promo = {
  code: string;
  label: string;
  description: string;
  percent: number;
  minNights?: number;
  minDaysAhead?: number;
  /** Promos that require paying 100% up front instead of the deposit. */
  payAll?: boolean;
};

export type BookingContent = {
  destinations: Destination[];
  rooms: RoomType[];
  programmes: Programme[];
  addOns: AddOn[];
  featuredPromo: Promo | null;
};

/** One night's availability per room type: free units and price. */
export type NightAvailability = Record<string, { available: number; price: number }>;
/** "YYYYMMDD" → per-room-type availability, for one destination and month. */
export type MonthAvailability = Record<string, NightAvailability>;

export type GuestInfo = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phonePrefix: string;
  /** ISO code of the picked country, since several share a dial code (+1, +7). */
  phoneCountry?: string;
  phone: string;
  nationality: string;
  passport: string;
  programme: string | null;
  addOns: string[];
};

export type BookingDraft = {
  locator: string;
  step: 1 | 2 | 3 | 4 | 5;
  unlockedStep: 1 | 2 | 3 | 4 | 5;
  destination: string;
  dates: [ISODate, ISODate] | ["", ""];
  guests: number;
  /** One programme per guest (index = guest). */
  programmes: (string | null)[];
  room: string;
  addOns: { code: string; guest: number }[];
  couponCode: string;
  guestsInfo: GuestInfo[];
  details: string;
  consents: { privacy: boolean; marketing: boolean };
  updatedAt: string;
};

export type PriceLine = { label: string; amount: number; detail?: string };

export type PriceBreakdown = {
  nights: number;
  roomPerNight: number;
  programmesPerNight: number;
  /** Room + programmes, per night (SHA's "Fixed rate"). */
  fixedRatePerNight: number;
  lines: PriceLine[];
  subtotal: number;
  discount: number;
  total: number;
  deposit: number;
  balance: number;
  payAll: boolean;
  taxes: PriceLine[];
};

export type BookingStatus = "pending_payment" | "confirmed" | "payment_failed" | "cancelled";

export type Booking = {
  locator: string;
  status: BookingStatus;
  createdAt: string;
  draft: BookingDraft;
  price: PriceBreakdown;
  paymentRef: string;
  paidAmount: number;
};
