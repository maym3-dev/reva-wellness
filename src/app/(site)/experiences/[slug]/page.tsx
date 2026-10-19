import type { Metadata } from "next";
import { Suspense } from "react";
import PageSkeleton from "@/components/templates/PageSkeleton";
import { notFound } from "next/navigation";
import VenuePage from "@/components/templates/VenuePage";
import { experiences } from "@/content/venues";

const getVenue = (slug: string) => experiences.venues.find((v) => v.slug === slug);

export function generateStaticParams() {
  return experiences.venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps<"/experiences/[slug]">): Promise<Metadata> {
  const venue = getVenue((await params).slug);
  return venue ? { title: venue.title, description: venue.summary } : {};
}

export default function ExperiencesVenuePage({ params }: PageProps<"/experiences/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: PageProps<"/experiences/[slug]">["params"] }) {
  const venue = getVenue((await params).slug);
  if (!venue) notFound();
  return (
    <VenuePage
      collection={experiences}
      venue={venue}
      cta={{ label: "Plan this experience", href: "/contact" }}
      ctaTitle="Make it part of your stay"
      ctaText="Our team will arrange times, transfers and private touches — just let us know before you arrive."
    />
  );
}
