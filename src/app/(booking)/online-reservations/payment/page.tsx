import type { Metadata } from "next";
import { Suspense } from "react";
import MockPayment from "@/components/booking/MockPayment";

export const metadata: Metadata = { title: "Secure payment", robots: { index: false } };

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="bk-loading"><span className="bk-spinner" /></div>}>
      <MockPayment />
    </Suspense>
  );
}
