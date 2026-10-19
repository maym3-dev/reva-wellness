import "server-only";
import { BookingError, type BookingProvider } from "./provider";
import { mockProvider } from "./mock/provider";

/** Swap this for the real provider (PMS / channel manager + Red Dot) later. */
export const provider: BookingProvider = mockProvider;

/** JSON responses with consistent error shape: { error, fields? }. */
export async function respond<T>(fn: () => Promise<T>) {
  try {
    return Response.json(await fn());
  } catch (e) {
    if (e instanceof BookingError) return Response.json({ error: e.message, fields: e.fields }, { status: e.status });
    console.error(e);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export const readJson = async (req: Request) => {
  try {
    return await req.json();
  } catch {
    throw new BookingError("Invalid request body");
  }
};
