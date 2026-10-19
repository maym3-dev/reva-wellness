import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import RevealObserver from "@/components/providers/RevealObserver";
import "./globals.css";

// Free stand-in for SHA's licensed "Graphik" — swap for the brand font later.
const brandFont = Hanken_Grotesk({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "REVA by Royal Muang Samui Villas | Luxury Beachfront Wellness Resort, Koh Samui",
    template: "%s | REVA by Royal Muang Samui Villas",
  },
  description:
    "A 5-star beachfront wellness resort on Choeng Mon Beach, Koh Samui — 79 suites and pool villas, Cave Reva Spa and three dining concepts.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={brandFont.variable}>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
