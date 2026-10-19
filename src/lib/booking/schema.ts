import { z } from "zod";

/** Shared validation for the guest form (client) and checkout (server). */

const iso = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const mainGuestSchema = z.object({
  title: z.string().min(1, "Select a title"),
  firstName: z.string().trim().min(1, "Enter a first name"),
  lastName: z.string().trim().min(1, "Enter a last name"),
  email: z.string().trim().email("Enter a valid e-mail"),
  phonePrefix: z.string().regex(/^\+\d{1,4}$/, "Prefix"),
  phone: z.string().trim().regex(/^[\d\s-]{6,15}$/, "Enter a valid phone number"),
  nationality: z.string().min(2, "Select a nationality"),
  passport: z.string().trim().max(20).optional().or(z.literal("")),
});

export const extraGuestSchema = z.object({
  firstName: z.string().trim().min(1, "Enter a first name"),
  lastName: z.string().trim().min(1, "Enter a last name"),
});

export const draftSchema = z.object({
  locator: z.string().min(6),
  step: z.number().int().min(1).max(5),
  unlockedStep: z.number().int().min(1).max(5),
  destination: z.string().min(1),
  dates: z.tuple([iso, iso]),
  guests: z.number().int().min(1).max(4),
  programmes: z.array(z.string().nullable()),
  room: z.string().min(1),
  addOns: z.array(z.object({ code: z.string(), guest: z.number().int().min(0) })),
  couponCode: z.string(),
  guestsInfo: z.array(z.record(z.string(), z.unknown())),
  details: z.string().max(1000),
  consents: z.object({ privacy: z.literal(true), marketing: z.boolean() }),
  updatedAt: z.string(),
});

export type FieldErrors = Record<string, string>;

/** Flatten zod issues to { "guest.0.email": "Enter a valid e-mail" }. */
export const toFieldErrors = (prefix: string, error: z.ZodError): FieldErrors =>
  Object.fromEntries(error.issues.map((i) => [`${prefix}.${i.path.join(".")}`, i.message]));
