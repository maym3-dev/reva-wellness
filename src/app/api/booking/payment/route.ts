import type { NextRequest } from "next/server";
import { BookingError } from "@/lib/booking/provider";
import { provider, readJson, respond } from "@/lib/booking/server";

/** Payment session status (the payment page and confirmation page poll this). */
export async function GET(req: NextRequest) {
  return respond(async () => {
    const booking = await provider.getBookingByPaymentRef(req.nextUrl.searchParams.get("ref") ?? "");
    if (!booking) throw new BookingError("Payment session not found.", 404);
    return booking;
  });
}

/** Mock gateway callback. A real Red Dot integration would verify a signed webhook here. */
export async function POST(req: Request) {
  return respond(async () => {
    const { ref, outcome } = await readJson(req);
    return provider.completePayment(String(ref), outcome === "success" ? "success" : "failure");
  });
}
