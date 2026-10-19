import { provider, readJson, respond } from "@/lib/booking/server";

export async function POST(req: Request) {
  return respond(async () => {
    const { code, draft } = await readJson(req);
    return provider.checkCoupon(String(code ?? ""), draft);
  });
}
