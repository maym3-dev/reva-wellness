import { provider, readJson, respond } from "@/lib/booking/server";

export async function POST(req: Request) {
  return respond(async () => {
    await provider.saveDraft(await readJson(req));
    return { ok: true };
  });
}
