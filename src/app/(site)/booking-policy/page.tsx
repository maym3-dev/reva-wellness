import LegalView, { legalMetadata } from "@/components/templates/LegalView";

export const metadata = legalMetadata("booking-policy");

export default function BookingPolicyPage() {
  return <LegalView slug="booking-policy" />;
}
