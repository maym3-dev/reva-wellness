import { provider, readJson, respond } from "@/lib/booking/server";

export async function POST(req: Request) {
  return respond(async () => provider.checkout((await readJson(req)).draft));
}
