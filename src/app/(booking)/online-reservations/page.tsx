import type { Metadata } from "next";
import BookingApp from "@/components/booking/BookingApp";

export const metadata: Metadata = {
  title: "Reserve Your Stay",
  description: "Book your stay, wellness programme and experiences at REVA by Royal Muang Samui Villas.",
  robots: { index: false },
};

export default function OnlineReservationsPage() {
  return <BookingApp />;
}
