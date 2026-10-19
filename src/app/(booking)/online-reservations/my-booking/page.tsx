import type { Metadata } from "next";
import { Suspense } from "react";
import MyBooking from "@/components/booking/MyBooking";

export const metadata: Metadata = { title: "My booking", robots: { index: false } };

export default function MyBookingPage() {
  return (
    <Suspense>
      <MyBooking />
    </Suspense>
  );
}
