import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import CardGrid from "@/components/sections/CardGrid";
import ScrollReveal from "@/components/sections/ScrollReveal";
import MediaSplit from "@/components/sections/MediaSplit";
import TabLinks from "@/components/sections/TabLinks";
import { media } from "@/content/media";
import { dining, experiences, venueCard, venueHref } from "@/content/venues";

export const metadata: Metadata = {
  title: "Dining",
  description: "Beachfront Thai at Spice Zone, Italian at Ciccio and Chinese at Nanyuan — three dining concepts at REVA.",
};

export default function DiningPage() {
  const evenings = experiences.venues.find((v) => v.slug === "dining-evening-magic")!;

  return (
    <>
      <PageHero
        size="full"
        image={media.dining[0]}
        label="Dining"
        title={{ before: "Three kitchens, ", emphasis: "one island" }}
        text="Thai, Italian and Chinese specialties, with vegan and wellness-focused dishes — beachfront, in open-air pavilions and all day long."
        ctas={[{ label: "Reserve a table", href: "/contact" }]}
        subnav={dining.venues.map((v) => ({ label: v.title, href: venueHref(dining, v) }))}
      />

      <IntroBlock
        lineTitle="Dining at REVA"
        heading={{ before: "A taste of ", emphasis: "everywhere" }}
        text="Savour a diverse selection of global cuisines, from Thai and Italian to Chinese specialties, with vegan and wellness-focused dishes available. Enjoy beachfront dining, open-air pavilions and all-day dining options."
        facts={dining.venues.map((v) => ({ label: v.title, value: v.facts[0].value }))}
        image={media.dining[1]}
      />

      <CardGrid
        heading={{ before: "Our ", emphasis: "restaurants" }}
        items={dining.venues.map((v) => venueCard(dining, v))}
        tone="light"
      />

      <ScrollReveal
        lines={[
          [{ t: "Fresh from the " }, { t: "sea", b: true }, { t: "," }],
          [{ t: "served on the " }, { t: "sand", b: true, i: true }, { t: "." }],
        ]}
      />

      <MediaSplit
        label="Evenings"
        title={evenings.title}
        text={evenings.intro}
        cta={{ label: "Discover", href: venueHref(experiences, evenings) }}
        image={evenings.images[1]}
      />

      <TabLinks
        data={{
          label: "Taste REVA",
          items: dining.venues.map((v) => ({ title: v.title.split(" ")[0], text: v.summary, image: v.images[1] ?? v.images[0], href: venueHref(dining, v) })),
        }}
      />
    </>
  );
}
