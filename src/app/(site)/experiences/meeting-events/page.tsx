import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import FeatureGrid from "@/components/sections/FeatureGrid";
import DataTable from "@/components/sections/DataTable";
import ImageStrip from "@/components/sections/ImageStrip";
import MediaSplit from "@/components/sections/MediaSplit";
import { media } from "@/content/media";
import { meetings } from "@/content/pages";

export const metadata: Metadata = {
  title: "Meetings & Events",
  description: "Two function rooms for up to 150 guests, catering and beachfront venues at REVA, Koh Samui.",
};

export default function MeetingsPage() {
  const enquire = { label: "Request a proposal", href: "/contact" };

  return (
    <>
      <PageHero
        image={media["meetings-events"][0]}
        label="Meetings & events"
        title={{ before: "Meet where the ", emphasis: "island", after: " inspires" }}
        text="State-of-the-art function rooms and a dedicated team for meetings, seminars and events."
        ctas={[enquire]}
      />

      <IntroBlock
        align="split"
        lineTitle="Meeting rooms"
        heading={{ before: "Business, ", emphasis: "beautifully hosted" }}
        text="We proudly present ideal meeting facilities with the exceptional assistance of our dedicated team, ready to accommodate business meetings, seminars, events and more in our sophisticated function rooms."
        facts={[
          { label: "Function rooms", value: "2" },
          { label: "Largest room", value: "120 m²" },
          { label: "Theatre style", value: "Up to 150" },
        ]}
      />

      <DataTable
        title="Room configurations"
        text="Capacities by layout. Our events team can tailor any set-up."
        columns={meetings.columns}
        rows={meetings.rows}
      />

      <FeatureGrid items={meetings.features} columns={4} tone="light" />

      <ImageStrip title="Venues" images={media["meetings-events"]} />

      <MediaSplit
        title="Plan your event with us"
        text="Share your dates, guest numbers and ideas — we’ll come back with a tailored proposal."
        cta={enquire}
        image={media["meetings-events"][2]}
      />
    </>
  );
}
