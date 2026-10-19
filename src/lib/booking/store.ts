"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { bookingApi } from "./client";
import { addMonths, monthKey } from "./dates";
import { priceBooking } from "./pricing";
import type { BookingContent, BookingDraft, GuestInfo, MonthAvailability, Promo } from "./types";

type Step = BookingDraft["step"];

const emptyGuest = (): GuestInfo => ({
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  phonePrefix: "+66",
  phoneCountry: "TH",
  phone: "",
  nationality: "",
  passport: "",
  programme: null,
  addOns: [],
});

const newLocator = () =>
  `RV-${Math.random().toString(36).slice(2, 6).toUpperCase()}${Date.now().toString(36).slice(-4).toUpperCase()}`;

export const emptyDraft = (): BookingDraft => ({
  locator: newLocator(),
  step: 1,
  unlockedStep: 1,
  destination: "",
  dates: ["", ""],
  guests: 1,
  programmes: [null],
  room: "",
  addOns: [],
  couponCode: "",
  guestsInfo: [emptyGuest()],
  details: "",
  consents: { privacy: false, marketing: false },
  updatedAt: new Date().toISOString(),
});

let contentRequest: Promise<void> | null = null;

type State = {
  draft: BookingDraft;
  promo: Promo | null;
  content: BookingContent | null;
  /** destination → merged month availability */
  availability: Record<string, MonthAvailability>;
  loadedMonths: Record<string, true>;
  loading: number;
  hydrated: boolean;
};

type Actions = {
  loadContent: () => Promise<void>;
  ensureMonths: (destination: string, from: string, to?: string) => Promise<void>;
  setDestination: (code: string) => void;
  setDates: (dates: BookingDraft["dates"]) => void;
  setGuests: (n: number) => void;
  setProgramme: (guest: number, code: string | null) => void;
  setRoom: (code: string) => void;
  toggleAddOn: (code: string, guest?: number) => void;
  assignAddOn: (code: string, from: number, to: number) => void;
  setGuestInfo: (i: number, patch: Partial<GuestInfo>) => void;
  setDetails: (s: string) => void;
  setConsent: (k: keyof BookingDraft["consents"], v: boolean) => void;
  setPromo: (p: Promo | null) => void;
  goTo: (step: Step) => void;
  next: () => void;
  reset: () => void;
};

export const useBooking = create<State & Actions>()(
  persist(
    (set, get) => {
      const patch = (fn: (d: BookingDraft) => Partial<BookingDraft>) =>
        set((s) => ({ draft: { ...s.draft, ...fn(s.draft), updatedAt: new Date().toISOString() } }));

      return {
        draft: emptyDraft(),
        promo: null,
        content: null,
        availability: {},
        loadedMonths: {},
        loading: 0,
        hydrated: false,

        loadContent() {
          if (get().content) return Promise.resolve();
          // Share one request between concurrent callers (e.g. React Strict Mode's double mount in dev).
          contentRequest ??= (async () => {
            set((s) => ({ loading: s.loading + 1 }));
            try {
              set({ content: await bookingApi.content() });
            } finally {
              set((s) => ({ loading: s.loading - 1 }));
              contentRequest = null;
            }
          })();
          return contentRequest;
        },

        async ensureMonths(destination, from, to = from) {
          const months: string[] = [];
          for (let m = monthKey(from); m <= monthKey(to); m = addMonths(m, 1)) months.push(m);
          const missing = months.filter((m) => !get().loadedMonths[`${destination}:${m}`]);
          if (!missing.length) return;
          set((s) => ({ loading: s.loading + 1 }));
          try {
            const res = await Promise.all(missing.map((m) => bookingApi.availability(destination, m)));
            set((s) => ({
              availability: { ...s.availability, [destination]: Object.assign({}, s.availability[destination], ...res) },
              loadedMonths: { ...s.loadedMonths, ...Object.fromEntries(missing.map((m) => [`${destination}:${m}`, true])) },
            }));
          } finally {
            set((s) => ({ loading: s.loading - 1 }));
          }
        },

        setDestination(code) {
          // a new destination invalidates everything chosen after it
          patch((d) => ({
            destination: code,
            room: "",
            addOns: [],
            programmes: Array(d.guests).fill(null),
            unlockedStep: 1,
          }));
        },

        setDates(dates) {
          patch(() => ({ dates, room: "", unlockedStep: 1 }));
        },

        setGuests(n) {
          patch((d) => ({
            guests: n,
            programmes: Array.from({ length: n }, (_, i) => d.programmes[i] ?? null),
            guestsInfo: Array.from({ length: n }, (_, i) => d.guestsInfo[i] ?? emptyGuest()),
            addOns: d.addOns.filter((a) => a.guest < n),
            room: "",
            unlockedStep: 1,
          }));
        },

        setProgramme(guest, code) {
          patch((d) => {
            const programmes = [...d.programmes];
            programmes[guest] = code;
            return { programmes };
          });
        },

        setRoom(code) {
          patch(() => ({ room: code }));
        },

        toggleAddOn(code, guest = 0) {
          patch((d) => {
            const has = d.addOns.some((a) => a.code === code && a.guest === guest);
            return { addOns: has ? d.addOns.filter((a) => !(a.code === code && a.guest === guest)) : [...d.addOns, { code, guest }] };
          });
        },

        assignAddOn(code, from, to) {
          patch((d) => ({ addOns: d.addOns.map((a) => (a.code === code && a.guest === from ? { ...a, guest: to } : a)) }));
        },

        setGuestInfo(i, p) {
          patch((d) => {
            const guestsInfo = [...d.guestsInfo];
            guestsInfo[i] = { ...guestsInfo[i], ...p };
            return { guestsInfo };
          });
        },

        setDetails(details) {
          patch(() => ({ details }));
        },

        setConsent(k, v) {
          patch((d) => ({ consents: { ...d.consents, [k]: v } }));
        },

        setPromo(promo) {
          set({ promo });
          patch(() => ({ couponCode: promo?.code ?? "" }));
        },

        goTo(step) {
          if (step <= get().draft.unlockedStep) patch(() => ({ step }));
        },

        next() {
          patch((d) => {
            const step = Math.min(5, d.step + 1) as Step;
            return { step, unlockedStep: Math.max(d.unlockedStep, step) as Step };
          });
        },

        reset() {
          set({ draft: emptyDraft(), promo: null });
        },
      };
    },
    {
      name: "reva-booking-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ draft: s.draft, promo: s.promo }),
    },
  ),
);

/** Live price for the summary; null until content + availability are loaded. */
export function usePrice() {
  const { draft, content, availability, promo } = useBooking();
  if (!content || !draft.destination) return null;
  return priceBooking(draft, content, availability[draft.destination] ?? {}, promo);
}

// Flag when the saved draft has been restored from localStorage.
if (typeof window !== "undefined") {
  if (useBooking.persist.hasHydrated()) useBooking.setState({ hydrated: true });
  else useBooking.persist.onFinishHydration(() => useBooking.setState({ hydrated: true }));
}

// Mirror the draft to the server (abandoned-booking recovery), debounced.
let syncTimer: ReturnType<typeof setTimeout> | undefined;
if (typeof window !== "undefined") {
  useBooking.subscribe((s, prev) => {
    if (s.draft === prev.draft || !s.draft.destination) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => bookingApi.saveDraft(s.draft).catch(() => {}), 800);
  });
}
