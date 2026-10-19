import type { NextRequest } from "next/server";
import { provider, respond } from "@/lib/booking/server";

export async function GET(req: NextRequest) {
  const destination = req.nextUrl.searchParams.get("destination") ?? "";
  const month = req.nextUrl.searchParams.get("month") ?? "";
  return respond(() => provider.getAvailability(destination, month));
}
