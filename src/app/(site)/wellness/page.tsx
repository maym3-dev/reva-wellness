import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import LocationsStack from "@/components/sections/LocationsStack";
import CardGrid from "@/components/sections/CardGrid";
import ScrollReveal from "@/components/sections/ScrollReveal";
import MediaSplit from "@/components/sections/MediaSplit";
import FaqSection from "@/components/sections/FaqSection";
import { media } from "@/content/media";
import { experiences, venueCard, venueHref, wellness } from "@/content/venues";

export const metadata: Metadata = {
  title: "Integrative Wellness",
  description: "Cave Reva Spa, Vitra Clinic, Mudras & Movements and our fitness gym — wellness on Choeng Mon Beach.",
};

export default function WellnessPage() {
  const energy = experiences.venues.find((v) => v.slug === "wellness-energy")!;

  return (
    <>
      <PageHero
        size="full"
        image={media.wellness[0]}
        label="Integrative wellness"
        title={{ before: "Restore body, ", emphasis: "mind & spirit" }}
        text="A cave-inspired spa, a traditional Thai and Chinese medicine clinic, mindful movement and a fitness gym — all steps from the sand."
        ctas={[{ label: "Plan your wellness", href: "/contact" }]}
        subnav={wellness.venues.map((v) => ({ label: v.title, href: venueHref(wellness, v) }))}
      />

      <IntroBlock
        lineTitle="Wellness at REVA"
        heading={{ before: "Four ways to ", emphasis: "feel well" }}
        text="Massage and pampering, Thai and Chinese medicine, Reformer Pilates and yoga, cardio and strength — choose a moment of calm or build a full wellness programme around your stay."
        facts={wellness.venues.map((v) => ({ label: v.title, value: v.facts[0].value }))}
      />

      <LocationsStack
        data={{
          heading: { strong: "Spa, clinic & studio", plain: "by the beach" },
          text: "",
          items: wellness.venues.slice(0, 3).map((v) => ({ title: v.title, image: v.images[0], href: venueHref(wellness, v) })),
        }}
      />

      <CardGrid
        heading={{ before: "Our ", emphasis: "facilities" }}
        items={wellness.venues.map((v) => venueCard(wellness, v))}
        columns={2}
        ratio="landscape"
      />

      <ScrollReveal
        lines={[
          [{ t: "Ancient " }, { t: "rituals", b: true }, { t: "," }],
          [{ t: "modern " }, { t: "wellbeing", b: true, i: true }, { t: "." }],
        ]}
      />

      <MediaSplit
        label="Experience"
        title={energy.title}
        text={energy.intro}
        cta={{ label: "Discover", href: venueHref(experiences, energy) }}
        image={energy.images[1]}
      />

      <FaqSection
        items={[
          { q: "Do I need to book spa treatments in advance?", a: "We recommend booking at least a day ahead, especially for couple’s treatments and evening slots." },
          { q: "Are the yoga sessions included?", a: "Yoga on the beach is complimentary for guests. Reformer Pilates and sound baths are run by our partner Mudras & Movements." },
          { q: "What should I bring to Reformer Pilates?", a: "Grip socks are compulsory for safety — bring your own pair or purchase them at the studio." },
          { q: "Is the Vitra Clinic open?", a: "Vitra Clinic is opening soon. Contact us to be notified and to plan treatments for your stay." },
        ]}
        tone="light"
      />
    </>
  );
}
