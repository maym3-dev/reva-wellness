import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import CardGrid from "@/components/sections/CardGrid";
import ScrollReveal from "@/components/sections/ScrollReveal";
import MediaSplit from "@/components/sections/MediaSplit";
import FeatureGrid from "@/components/sections/FeatureGrid";
import { media } from "@/content/media";
import { BOOKING_URL } from "@/content/site";
import { suiteCard, suiteFilters, suites } from "@/content/suites";

export const metadata: Metadata = {
  title: "Suites & Pool Villas",
  description: "79 suites and pool villas on Choeng Mon Beach — garden and sea views, private pools and Jacuzzi bathrooms.",
};

export default function SuitesPage() {
  return (
    <>
      <PageHero
        size="full"
        image={media.suites[0]}
        label="Accommodation"
        title={{ before: "Suites & ", emphasis: "Pool Villas" }}
        text="Tranquil suites with private terraces and breathtaking pool villas with a treetop view."
        ctas={[{ label: "Book now", href: BOOKING_URL }]}
      />

      <IntroBlock
        lineTitle="Accommodation"
        heading={{ before: "Thai elegance, ", emphasis: "designed for privacy" }}
        text={[
          "Tranquil suites with private terraces feature warm wooden furnishings and ceilings inspired by traditional fishing boats and the surrounding natural beauty.",
          "Our pool villas are private sanctuaries with a treetop view, adorned with décor rich in Buddhist symbolism.",
        ]}
        facts={[
          { label: "Suites & villas", value: "79" },
          { label: "Sizes", value: "90 – 160 m²" },
          { label: "Private pools", value: "5 room types" },
          { label: "Views", value: "Garden & sea" },
        ]}
      />

      <CardGrid
        heading={{ before: "Find your ", emphasis: "room" }}
        filters={suiteFilters}
        items={suites.map(suiteCard)}
        tone="light"
      />

      <ScrollReveal
        lines={[
          [{ t: "Tranquil " }, { t: "suites", b: true }, { t: "," }],
          [{ t: "treetop " }, { t: "pool villas", b: true, i: true }, { t: "." }],
        ]}
      />

      <FeatureGrid
        lineTitle="In every room"
        text="Every suite and villa comes with the comforts you need to slow down."
        variant="list"
        columns={2}
        items={[
          "Whirlpool Jacuzzi",
          "Spacious balcony or terrace",
          "Wide-screen LCD TV",
          "Fridge with mini-bar",
          "Coffee and tea making facilities",
          "Safety deposit box",
          "Wi-Fi internet",
          "Daily housekeeping",
        ].map((title) => ({ title }))}
      />

      <MediaSplit
        label="Book direct"
        title="Enjoy 10% off and exclusive benefits when you book with us"
        text="Early check-in and late check-out, a complimentary shuttle, beach yoga and Thai culture classes — only on our official website."
        cta={{ label: "Book now", href: BOOKING_URL }}
        secondaryCta={{ label: "See offers", href: "/special-offers" }}
        image={media.suites[2]}
      />
    </>
  );
}
