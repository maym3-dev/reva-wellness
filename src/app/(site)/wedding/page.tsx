import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import VerticalTabs from "@/components/sections/VerticalTabs";
import ImageStrip from "@/components/sections/ImageStrip";
import ScrollReveal from "@/components/sections/ScrollReveal";
import MediaSplit from "@/components/sections/MediaSplit";
import FaqSection from "@/components/sections/FaqSection";
import { media } from "@/content/media";
import { weddings } from "@/content/pages";

export const metadata: Metadata = {
  title: "Weddings & Celebrations",
  description: "Beach weddings, receptions, vow renewals and honeymoons on Koh Samui — curated by our wedding specialists.",
};

export default function WeddingsPage() {
  const enquire = { label: "Plan your wedding", href: "/contact" };

  return (
    <>
      <PageHero
        size="full"
        image={media.wedding[0]}
        label="Weddings & events"
        title={{ before: "Your day on ", emphasis: "Honeymoon Island" }}
        text="Signature weddings, proposals, vow renewals and celebrations — meticulously curated with love."
        ctas={[enquire]}
      />

      <IntroBlock
        lineTitle="Special events"
        heading={{ before: "Every detail, ", emphasis: "perfected" }}
        text={[
          "Make the most of your bespoke signature wedding, proposal, vow renewal, birthday or any special celebration.",
          "We understand the significance of this treasured moment. Our dedicated specialists are ready to craft and perfect every detail.",
        ]}
        image={media.wedding[1]}
      />

      <VerticalTabs
        heading="Packages"
        text="From the ceremony on the sand to the honeymoon that follows."
        items={weddings.packages.map((p) => ({ ...p, cta: enquire }))}
      />

      <ScrollReveal
        lines={[
          [{ t: "Say " }, { t: "yes", b: true }, { t: " by the sea," }],
          [{ t: "stay for the " }, { t: "honeymoon", b: true, i: true }, { t: "." }],
        ]}
      />

      <ImageStrip title="Moments" images={media.wedding.slice(2)} />

      <MediaSplit
        label="Honeymoon"
        title="Romance, the island way"
        text="Candlelit beach dinners, couple’s spa journeys and private pool villas — everything for the perfect honeymoon."
        cta={enquire}
        secondaryCta={{ label: "Pool villas", href: "/suites" }}
        image={media.wedding[7]}
      />

      <FaqSection items={weddings.faq} tone="light" />
    </>
  );
}
