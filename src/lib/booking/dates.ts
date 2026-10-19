import type { ISODate } from "./types";

/** All booking dates are calendar days handled in UTC to avoid DST/timezone drift. */

export const toISO = (d: Date): ISODate => d.toISOString().slice(0, 10);

export const fromISO = (s: ISODate) => new Date(`${s}T00:00:00Z`);

export const addDays = (s: ISODate, n: number): ISODate => {
  const d = fromISO(s);
  d.setUTCDate(d.getUTCDate() + n);
  return toISO(d);
};

export const nightsBetween = (from: ISODate, to: ISODate) =>
  Math.round((fromISO(to).getTime() - fromISO(from).getTime()) / 86_400_000);

/** Every night of the stay (check-in inclusive, check-out exclusive). */
export const eachNight = (from: ISODate, to: ISODate): ISODate[] => {
  const out: ISODate[] = [];
  for (let d = from; d < to; d = addDays(d, 1)) out.push(d);
  return out;
};

export const todayISO = () => toISO(new Date());

export const monthKey = (s: ISODate) => s.slice(0, 7); // "YYYY-MM"

export const dayKey = (s: ISODate) => s.replaceAll("-", ""); // "YYYYMMDD"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "10 Nov 2026" */
export const formatDate = (s: ISODate) => {
  const d = fromISO(s);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

export const monthLabel = (month: string) => {
  const [y, m] = month.split("-").map(Number);
  return `${MONTHS_LONG[m - 1]} ${y}`;
};

/** Calendar grid for a month (Monday first), padded with nulls. */
export const monthGrid = (month: string): (ISODate | null)[] => {
  const first = fromISO(`${month}-01`);
  const lead = (first.getUTCDay() + 6) % 7;
  const days: (ISODate | null)[] = Array(lead).fill(null);
  for (let d = `${month}-01`; monthKey(d) === month; d = addDays(d, 1)) days.push(d);
  return days;
};

export const addMonths = (month: string, n: number) => {
  const d = fromISO(`${month}-01`);
  d.setUTCMonth(d.getUTCMonth() + n);
  return toISO(d).slice(0, 7);
};
