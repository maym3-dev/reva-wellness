import LegalView, { legalMetadata } from "@/components/templates/LegalView";

export const metadata = legalMetadata("cookies-policy");

export default function CookiesPolicyPage() {
  return <LegalView slug="cookies-policy" />;
}
