"use client";

import { create } from "zustand";
import { nightsBetween } from "./dates";
import { roomStay } from "./pricing";
import { extraGuestSchema, mainGuestSchema, toFieldErrors, type FieldErrors } from "./schema";
import type { BookingContent, BookingDraft, MonthAvailability } from "./types";

/** Transient UI errors (not persisted). */
export const useBookingErrors = create<{
  message: string;
  fields: FieldErrors;
  set: (message: string, fields?: FieldErrors) => void;
  clear: () => void;
}>((set) => ({
  message: "",
  fields: {},
  set: (message, fields = {}) => set({ message, fields }),
  clear: () => set({ message: "", fields: {} }),
}));

/** Returns null when the step is complete, otherwise what's missing. */
export function validateStep(
  step: number,
  draft: BookingDraft,
  content: BookingContent | null,
  availability: MonthAvailability,
): { message: string; fields?: FieldErrors } | null {
  if (!content) return { message: "Loading…" };
  const dest = content.destinations.find((d) => d.code === draft.destination);
  const [from, to] = draft.dates;

  if (step === 1) {
    if (!dest) return { message: "Choose a destination.", fields: { destination: "Choose a destination" } };
    if (!from || !to) return { message: "Choose your dates.", fields: { dates: "Choose your check-in and check-out dates" } };
    const nights = nightsBetween(from, to);
    if (nights < dest.minNights) return { message: `Minimum stay is ${dest.minNights} nights.`, fields: { dates: `Minimum stay is ${dest.minNights} nights` } };
    const missing = draft.programmes.slice(0, draft.guests).findIndex((p) => !p);
    if (missing >= 0)
      return { message: `Choose a programme for guest ${missing + 1}.`, fields: { programmes: "Add one programme per guest" } };
    for (const code of draft.programmes) {
      const p = content.programmes.find((x) => x.code === code);
      if (p && nights < p.minNights) return { message: `${p.name} requires at least ${p.minNights} nights.`, fields: { programmes: `${p.name} requires at least ${p.minNights} nights` } };
    }
    return null;
  }

  if (step === 2) {
    if (!draft.room) return { message: "Choose your accommodation.", fields: { room: "Choose your accommodation" } };
    if (!roomStay(draft.room, draft, availability)) return { message: "This room is no longer available for your dates.", fields: { room: "Not available" } };
    return null;
  }

  if (step === 3) return null; // add-ons are optional

  if (step === 4) {
    const fields: FieldErrors = {};
    const main = mainGuestSchema.safeParse(draft.guestsInfo[0]);
    if (!main.success) Object.assign(fields, toFieldErrors("guest.0", main.error));
    draft.guestsInfo.slice(1, draft.guests).forEach((g, i) => {
      const r = extraGuestSchema.safeParse(g);
      if (!r.success) Object.assign(fields, toFieldErrors(`guest.${i + 1}`, r.error));
    });
    if (!draft.consents.privacy) fields.privacy = "You must accept the privacy policy to continue with the reservation.";
    return Object.keys(fields).length ? { message: "Please complete the highlighted fields.", fields } : null;
  }

  return null;
}
