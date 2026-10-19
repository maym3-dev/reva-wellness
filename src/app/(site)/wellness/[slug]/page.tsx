import type { Metadata } from "next";
import { Suspense } from "react";
import PageSkeleton from "@/components/templates/PageSkeleton";
import { notFound } from "next/navigation";
import VenuePage from "@/components/templates/VenuePage";
import { wellness } from "@/content/venues";

const getVenue = (slug: string) => wellness.venues.find((v) => v.slug === slug);

export function generateStaticParams() {
  return wellness.venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps<"/wellness/[slug]">): Promise<Metadata> {
  const venue = getVenue((await params).slug);
  return venue ? { title: venue.title, description: venue.summary } : {};
}

export default function WellnessVenuePage({ params }: PageProps<"/wellness/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: PageProps<"/wellness/[slug]">["params"] }) {
  const venue = getVenue((await params).slug);
  if (!venue) notFound();
  return (
    <VenuePage
      collection={wellness}
      venue={venue}
      cta={{ label: "Book a treatment", href: "/contact" }}
      ctaTitle="Plan your wellness journey"
      ctaText="Tell us how you would like to feel and our team will shape a programme around your stay."
    />
  );
}
