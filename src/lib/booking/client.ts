import { asset } from "@/lib/basePath";
import type { Booking, BookingContent, BookingDraft, MonthAvailability, Promo } from "./types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields?: Record<string, string>,
  ) {
    super(message);
  }
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  // fetch() is not basePath-aware, so prefix it like any other raw URL
  const res = await fetch(asset(`/api/booking/${path}`), {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(body.error ?? "Request failed", res.status, body.fields);
  return body as T;
}

const post = <T>(path: string, data: unknown) => api<T>(path, { method: "POST", body: JSON.stringify(data) });

export const bookingApi = {
  content: () => api<BookingContent>("content/"),
  availability: (destination: string, month: string) =>
    api<MonthAvailability>(`availability/?destination=${destination}&month=${month}`),
  saveDraft: (draft: BookingDraft) => post<{ ok: true }>("draft/", draft),
  coupon: (code: string, draft: BookingDraft) =>
    post<{ valid: true; promo: Promo } | { valid: false; reason: string }>("coupon/", { code, draft }),
  checkout: (draft: BookingDraft) => post<{ booking: Booking; paymentUrl: string }>("checkout/", { draft }),
  paymentStatus: (ref: string) => api<Booking>(`payment/?ref=${encodeURIComponent(ref)}`),
  pay: (ref: string, outcome: "success" | "failure") => post<Booking>("payment/", { ref, outcome }),
  requestAccess: (locator: string, identifier: string) =>
    post<{ sentTo: string; previewToken?: string }>("access/", { locator, identifier }),
  bookingByToken: (token: string) => api<Booking>(`access/?token=${encodeURIComponent(token)}`),
};
