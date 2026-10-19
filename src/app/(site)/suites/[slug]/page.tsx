import type { Metadata } from "next";
import { Suspense } from "react";
import PageSkeleton from "@/components/templates/PageSkeleton";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import FeatureGrid from "@/components/sections/FeatureGrid";
import ImageStrip from "@/components/sections/ImageStrip";
import MediaSplit from "@/components/sections/MediaSplit";
import CardCarousel from "@/components/sections/CardCarousel";
import { offers } from "@/content/pages";
import { BOOKING_URL } from "@/content/site";
import { getSuite, suiteCard, suiteHref, suites } from "@/content/suites";

export function generateStaticParams() {
  return suites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/suites/[slug]">): Promise<Metadata> {
  const suite = getSuite((await params).slug);
  return suite ? { title: suite.title, description: suite.summary } : {};
}

const highlightIcon = (h: string) =>
  /pool/i.test(h) ? "pool" : /jacuzzi/i.test(h) ? "spa" : /sea/i.test(h) ? "wave" : /garden/i.test(h) ? "leaf" : /bed/i.test(h) ? "bed" : "villa";

export default function SuitePage({ params }: PageProps<"/suites/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: PageProps<"/suites/[slug]">["params"] }) {
  const suite = getSuite((await params).slug);
  if (!suite) notFound();

  const book = { label: "Book this room", href: BOOKING_URL };
  const others = suites.filter((s) => s.slug !== suite.slug);

  return (
    <>
      <PageHero
        size="full"
        image={suite.images[0]}
        label={suite.category}
        title={{ before: suite.title }}
        text={suite.summary}
        ctas={[book]}
        facts={suite.facts}
        subnav={suites.map((s) => ({ label: s.title, href: suiteHref(s) }))}
      />

      <IntroBlock
        align="split"
        lineTitle="The room"
        heading={{ before: "Designed for ", emphasis: "rest" }}
        text={suite.intro}
        image={suite.images[1]}
      />

      <FeatureGrid
        lineTitle="The room is equipped with"
        items={suite.highlights.map((h) => ({ title: h, icon: highlightIcon(h) }))}
        columns={3}
        tone="dark"
      />

      <FeatureGrid lineTitle="Amenities" variant="list" columns={2} items={suite.amenities.map((title) => ({ title }))} />

      <ImageStrip images={[...suite.images]} />

      <MediaSplit
        label="Book direct"
        title="Exclusive benefits when you book with us"
        text={offers.benefits.slice(0, 3)}
        cta={book}
        secondaryCta={{ label: "See offers", href: "/special-offers" }}
        image={suite.images[2] ?? suite.images[0]}
        imageSide="left"
      />

      <CardCarousel
        heading={{ before: "More ", emphasis: "rooms" }}
        allLink={{ label: "All suites", href: "/suites" }}
        items={others.map(suiteCard)}
        tone="light"
      />
    </>
  );
}
