import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import FeatureGrid from "@/components/sections/FeatureGrid";
import CardGrid from "@/components/sections/CardGrid";
import MediaSplit from "@/components/sections/MediaSplit";
import FaqSection from "@/components/sections/FaqSection";
import { media } from "@/content/media";
import { membership, offers } from "@/content/pages";
import { BOOKING_URL } from "@/content/site";

export const metadata: Metadata = {
  title: "Special Offers",
  description: "Book direct for 10% off, early check-in, late check-out and seasonal savings at REVA, Koh Samui.",
};

export default function OffersPage() {
  return (
    <>
      <PageHero
        image={media["special-offers"][5]}
        label="Special offers"
        title={{ before: "Stay longer, ", emphasis: "save more" }}
        text="Unlock more value and serenity when you book directly with us."
        ctas={[{ label: "Book now", href: BOOKING_URL }]}
      />

      <IntroBlock
        lineTitle="Book direct"
        heading={{ before: "Exclusive direct ", emphasis: "booking benefits" }}
        text="Every reservation made on our official website includes these benefits — on top of the offer you choose."
      />

      <FeatureGrid variant="list" columns={2} items={offers.benefits.map((title) => ({ title }))} />

      <CardGrid
        heading={{ before: "Current ", emphasis: "offers" }}
        items={offers.items}
        ratio="landscape"
        tone="light"
      />

      <MediaSplit
        label="Membership"
        title="Become a member and save on every stay"
        text="10% off the best available rate, early check-in, late check-out and complimentary classes."
        cta={{ label: "Membership benefits", href: "/become-a-member" }}
        image={membership.image}
      />

      <FaqSection
        items={[
          { q: "Can offers be combined?", a: "Offers cannot be combined with each other, but direct-booking benefits apply to all reservations made on our website." },
          { q: "Are offer rates refundable?", a: "Most offers require full pre-payment and are non-refundable. Each offer lists its own terms." },
          { q: "How do I pay by bank transfer?", a: "Only transfer to the official account provided by our reservations team, and send the slip to reservations right away." },
        ]}
      />
    </>
  );
}
