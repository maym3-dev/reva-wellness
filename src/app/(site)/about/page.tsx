import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import ScrollReveal from "@/components/sections/ScrollReveal";
import FeatureGrid from "@/components/sections/FeatureGrid";
import KpisHome from "@/components/sections/KpisHome";
import LocationsStack from "@/components/sections/LocationsStack";
import TabLinks from "@/components/sections/TabLinks";
import { media } from "@/content/media";
import { about } from "@/content/pages";
import { hero } from "@/content/site";

export const metadata: Metadata = {
  title: "About REVA",
  description: "Temple-inspired architecture, five-star comfort and wellness on Choeng Mon Beach — part of the Muang Samui Family Hospitality Group.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        size="full"
        image={hero.poster}
        video={hero.video}
        label="About us"
        title={{ before: "Reva by Royal ", emphasis: "Muang Samui Villas" }}
        text="Located on the peaceful sands of Choeng Mon, Koh Samui."
      />

      <IntroBlock
        lineTitle="Our story"
        heading={{ before: "Thai heritage, ", emphasis: "five-star comfort" }}
        text={[
          "REVA blends authentic Thai temple-inspired architecture with 5-star comfort. The resort features 79 luxurious suites and pool villas (90, 125 and 160 m²), surrounded by lush tropical gardens, each designed for privacy and relaxation.",
          "Wellness facilities include a freeform beachfront swimming pool, a renowned cave-inspired spa, a traditional Thai medicine clinic and a partner Reformer Pilates studio. Guests can enjoy three dining concepts: Spice Zone, Ciccio and Nanyuan.",
          "Muang Samui is proud to be part of the Muang Samui Family Hospitality Group.",
        ]}
        image={media.gallery[0]}
        video={hero.video}
      />

      <ScrollReveal />

      <FeatureGrid
        lineTitle="What guides us"
        text="The architecture of REVA draws inspiration from Buddhist philosophy, timeless wisdom, and the heritage of Songkhla and Ayutthaya."
        items={about.pillars}
        columns={4}
        tone="dark"
        numbered
      />

      <KpisHome />
      <LocationsStack />
      <TabLinks />
    </>
  );
}
