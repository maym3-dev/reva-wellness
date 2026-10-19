import LegalView, { legalMetadata } from "@/components/templates/LegalView";

export const metadata = legalMetadata("privacy-policy");

export default function PrivacyPolicyPage() {
  return <LegalView slug="privacy-policy" />;
}
