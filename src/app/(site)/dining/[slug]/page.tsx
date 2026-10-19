import type { Metadata } from "next";
import { Suspense } from "react";
import PageSkeleton from "@/components/templates/PageSkeleton";
import { notFound } from "next/navigation";
import VenuePage from "@/components/templates/VenuePage";
import { dining } from "@/content/venues";

const getVenue = (slug: string) => dining.venues.find((v) => v.slug === slug);

export function generateStaticParams() {
  return dining.venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps<"/dining/[slug]">): Promise<Metadata> {
  const venue = getVenue((await params).slug);
  return venue ? { title: venue.title, description: venue.summary } : {};
}

export default function DiningVenuePage({ params }: PageProps<"/dining/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: PageProps<"/dining/[slug]">["params"] }) {
  const venue = getVenue((await params).slug);
  if (!venue) notFound();
  return (
    <VenuePage
      collection={dining}
      venue={venue}
      cta={{ label: "Reserve a table", href: "/contact" }}
      ctaTitle="Reserve your table"
      ctaText="Book ahead for beachfront dinners, BBQ nights and private candlelit tables on the sand."
    />
  );
}
