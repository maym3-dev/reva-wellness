import type { Metadata } from "next";
import { Suspense } from "react";
import Confirmation from "@/components/booking/Confirmation";

export const metadata: Metadata = { title: "Your reservation", robots: { index: false } };

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="bk-loading"><span className="bk-spinner" /></div>}>
      <Confirmation />
    </Suspense>
  );
}
