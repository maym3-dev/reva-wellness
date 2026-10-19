import { BookingError } from "@/lib/booking/provider";
import { provider, readJson, respond } from "@/lib/booking/server";
import { mockProvider } from "@/lib/booking/mock/provider";

/** a***e@example.com */
const mask = (email: string) => email.replace(/^(.)(.*)(.)@/, (_, a, mid, z) => `${a}${"*".repeat(Math.min(mid.length, 6))}${z}@`);

/** Request an access link: verify reference + passport/ID or e-mail, then e-mail a tokenised link. */
export async function POST(req: Request) {
  return respond(async () => {
    const { locator, identifier } = await readJson(req);
    const res = await provider.requestAccess(String(locator ?? ""), String(identifier ?? ""));
    if (!res) throw new BookingError("We couldn’t find a booking with these details. Please check them and try again.", 404);
    // TODO: send the e-mail. The mock has no mailer, so it hands the link back for testing.
    const isMock = provider === mockProvider;
    return { sentTo: mask(res.email), ...(isMock && { previewToken: res.token }) };
  });
}

/** Open an access link. */
export async function GET(req: Request) {
  return respond(async () => {
    const token = new URL(req.url).searchParams.get("token") ?? "";
    const booking = await provider.getBookingByToken(token);
    if (!booking) throw new BookingError("This access link is invalid or has expired. Please request a new one.", 404);
    return booking;
  });
}
