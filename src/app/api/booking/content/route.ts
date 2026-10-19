import { connection } from "next/server";
import { provider, respond } from "@/lib/booking/server";

export async function GET() {
  await connection(); // content will come from the backend at request time
  return respond(() => provider.getContent());
}
