import { addDays, dayKey, fromISO, monthKey } from "../dates";
import type { MonthAvailability } from "../types";
import { rooms } from "./data";

/**
 * Deterministic fake inventory: the same date always returns the same
 * availability, so prices don't jump between steps. A real provider would read
 * this from the PMS (SHA's `sha_month` returns the same per-night shape).
 */

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967295;
};

/** Seasonality multiplier for Koh Samui. */
const season = (iso: string) => {
  const d = fromISO(iso);
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  const peak = (m === 12 && day >= 20) || (m === 1 && day <= 10);
  const high = m === 7 || m === 8 || m === 4 || (m >= 1 && m <= 3);
  const weekend = d.getUTCDay() === 5 || d.getUTCDay() === 6;
  return (peak ? 1.35 : high ? 1.15 : 1) * (weekend ? 1.05 : 1);
};

const round = (n: number) => Math.round(n / 50) * 50;

export function monthAvailability(destination: string, month: string): MonthAvailability {
  const out: MonthAvailability = {};
  const types = rooms.filter((r) => r.destination === destination);
  for (let d = `${month}-01`; monthKey(d) === month; d = addDays(d, 1)) {
    out[dayKey(d)] = Object.fromEntries(
      types.map((r) => {
        // occupancy between ~35% and 100%; the rarest rooms sell out more often
        const occupancy = 0.35 + hash(`${r.code}${d}`) * 0.75;
        const available = Math.max(0, Math.round(r.units * (1 - occupancy)));
        return [r.code, { available, price: round(r.baseRate * season(d)) }];
      }),
    );
  }
  return out;
}
