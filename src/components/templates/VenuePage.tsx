import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import VerticalTabs from "@/components/sections/VerticalTabs";
import ImageStrip from "@/components/sections/ImageStrip";
import MediaSplit from "@/components/sections/MediaSplit";
import CardCarousel from "@/components/sections/CardCarousel";
import type { Cta } from "@/content/types";
import { venueCard, venueHref, type Collection, type Venue } from "@/content/venues";

/**
 * Detail page shared by wellness facilities, restaurants and experiences:
 * hero with sibling sub-nav + key facts → intro → offerings tabs → gallery →
 * CTA split → "more" carousel.
 */
export default function VenuePage({
  collection,
  venue,
  cta,
  ctaTitle,
  ctaText,
}: {
  collection: Collection;
  venue: Venue;
  cta: Cta;
  ctaTitle: string;
  ctaText: string;
}) {
  const others = collection.venues.filter((v) => v.slug !== venue.slug);
  const img = (i: number) => venue.images[i % venue.images.length];

  return (
    <>
      <PageHero
        size="full"
        image={img(0)}
        label={venue.label}
        title={{ before: venue.title }}
        text={venue.summary}
        ctas={[cta]}
        facts={venue.facts}
        subnav={collection.venues.map((v) => ({ label: v.title, href: venueHref(collection, v) }))}
      />

      <IntroBlock
        align="split"
        lineTitle={collection.name}
        heading={{ before: venue.title }}
        text={venue.note ? [...venue.intro, venue.note] : venue.intro}
        image={venue.images.length > 1 ? img(1) : undefined}
      />

      {venue.offerings && (
        <VerticalTabs
          heading={collection.name === "Dining" ? "On the menu" : "What we offer"}
          text={venue.summary}
          items={venue.offerings.map((o, i) => ({
            title: o.title,
            text: o.text,
            image: img(i + 2),
            cta,
          }))}
        />
      )}

      {venue.images.length > 2 && <ImageStrip images={[...venue.images]} />}

      <MediaSplit title={ctaTitle} text={ctaText} cta={cta} secondaryCta={{ label: "Contact us", href: "/contact" }} image={img(3)} />

      {others.length > 0 && (
        <CardCarousel
          heading={{ before: "More ", emphasis: collection.name }}
          allLink={{ label: `All ${collection.name.toLowerCase()}`, href: collection.base }}
          items={others.map((v) => venueCard(collection, v))}
          tone="light"
        />
      )}
    </>
  );
}
