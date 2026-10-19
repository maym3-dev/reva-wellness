import LegalView, { legalMetadata } from "@/components/templates/LegalView";

export const metadata = legalMetadata("terms-and-conditions");

export default function TermsAndConditionsPage() {
  return <LegalView slug="terms-and-conditions" />;
}
