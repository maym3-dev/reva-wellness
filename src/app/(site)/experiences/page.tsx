import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import TeamCarousel from "@/components/sections/TeamCarousel";
import CardGrid from "@/components/sections/CardGrid";
import MediaSplit from "@/components/sections/MediaSplit";
import { media } from "@/content/media";
import { team } from "@/content/site";
import { experiences, venueCard, venueHref } from "@/content/venues";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Beach days, pool time, wellness, Thai culture, BBQ nights and island exploration at REVA, Koh Samui.",
};

export default function ExperiencesPage() {
  const island = experiences.venues.find((v) => v.slug === "island-exploration")!;

  return (
    <>
      <PageHero
        size="full"
        image={media.experiences[1]}
        label="Facilities & services"
        title={{ before: "A natural ", emphasis: "paradise" }}
        text="Away from the crowded world, within a pure and unspoiled environment of greenery, white sand and crystal-clear sea."
        ctas={[{ label: "Plan your stay", href: "/contact" }]}
        subnav={experiences.venues.map((v) => ({ label: v.title, href: venueHref(experiences, v) }))}
      />

      <IntroBlock
        lineTitle="Experiences"
        heading={{ before: "Relax, ", emphasis: "rejuvenate", after: " & discover" }}
        text="It is a natural paradise for vacationers looking for a peaceful and romantic holiday haven — from sunrise yoga on the sand to fire shows under the stars."
      />

      <TeamCarousel data={{ ...team, heading: "Days at REVA", label: "Six ways to spend them" }} />

      <CardGrid
        heading={{ before: "All ", emphasis: "experiences" }}
        items={experiences.venues.map((v) => venueCard(experiences, v))}
        tone="light"
        ratio="landscape"
      />

      <MediaSplit
        label="Koh Samui"
        title={island.title}
        text={island.intro}
        cta={{ label: "Discover", href: venueHref(experiences, island) }}
        image={island.images[0]}
        imageSide="left"
      />
    </>
  );
}
