import { dayKey, eachNight, nightsBetween, todayISO } from "./dates";
import type { BookingContent, BookingDraft, MonthAvailability, PriceBreakdown, Promo } from "./types";

/** Thai hotel taxes, all included in displayed prices: 10% service, then 7% VAT, 1% city tax. */
const TAX_RATES = [
  { label: "Service charge (10%)", rate: 0.1 },
  { label: "VAT (7%)", rate: 0.07 },
  { label: "City tax (1%)", rate: 0.01 },
];

export function promoApplies(promo: Promo, draft: Pick<BookingDraft, "dates">) {
  const [from, to] = draft.dates;
  if (!from || !to) return false;
  if (promo.minNights && nightsBetween(from, to) < promo.minNights) return false;
  if (promo.minDaysAhead && nightsBetween(todayISO(), from) < promo.minDaysAhead) return false;
  return true;
}

/** Room price per night for the stay, or null if the room isn't free every night. */
export function roomStay(roomCode: string, draft: Pick<BookingDraft, "dates">, availability: MonthAvailability) {
  const [from, to] = draft.dates;
  if (!from || !to) return null;
  let total = 0;
  for (const night of eachNight(from, to)) {
    const n = availability[dayKey(night)]?.[roomCode];
    if (!n || n.available < 1) return null;
    total += n.price;
  }
  return { total, perNight: Math.round(total / nightsBetween(from, to)) };
}

/**
 * The single source of truth for money. Runs on the client (live summary) and
 * on the server (checkout), so both always agree.
 */
export function priceBooking(
  draft: BookingDraft,
  content: BookingContent,
  availability: MonthAvailability,
  promo: Promo | null,
): PriceBreakdown {
  const dest = content.destinations.find((d) => d.code === draft.destination);
  const [from, to] = draft.dates;
  const nights = from && to ? nightsBetween(from, to) : 0;
  const lines: PriceBreakdown["lines"] = [];

  const stay = draft.room ? roomStay(draft.room, draft, availability) : null;
  const room = content.rooms.find((r) => r.code === draft.room);
  if (stay && room) lines.push({ label: room.name, amount: stay.total, detail: `${nights} nights` });

  let programmesPerNight = 0;
  const chosen = draft.programmes.filter(Boolean) as string[];
  for (const code of new Set(chosen)) {
    const p = content.programmes.find((x) => x.code === code);
    if (!p) continue;
    const count = chosen.filter((c) => c === code).length;
    programmesPerNight += p.pricePerNight * count;
    if (p.pricePerNight > 0)
      lines.push({ label: p.name, amount: p.pricePerNight * count * nights, detail: `${count} guest${count > 1 ? "s" : ""} · ${nights} nights` });
  }

  for (const a of draft.addOns) {
    const addOn = content.addOns.find((x) => x.code === a.code);
    if (addOn) lines.push({ label: addOn.name, amount: addOn.price, detail: `Guest ${a.guest + 1}` });
  }

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const discount = promo && promoApplies(promo, draft) ? Math.round((subtotal * promo.percent) / 100) : 0;
  const total = subtotal - discount;
  const payAll = !!(promo && discount > 0 && promo.payAll);
  const deposit = payAll ? total : Math.round((total * (dest?.depositPercent ?? 100)) / 100);

  // back the included taxes out of the total (service first, VAT + city tax on top of it)
  const base = total / ((1 + 0.1) * (1 + 0.07 + 0.01));
  const service = base * 0.1;
  const taxes = TAX_RATES.map((t) => ({
    label: t.label,
    amount: Math.round(t.rate === 0.1 ? service : (base + service) * t.rate),
  }));

  const roomPerNight = stay?.perNight ?? 0;
  return {
    nights,
    roomPerNight,
    programmesPerNight,
    fixedRatePerNight: roomPerNight + programmesPerNight,
    lines,
    subtotal,
    discount,
    total,
    deposit,
    balance: total - deposit,
    payAll,
    taxes,
  };
}

export const formatMoney = (amount: number, currency = "THB") =>
  `${currency} ${Math.round(amount).toLocaleString("en-US")}`;
