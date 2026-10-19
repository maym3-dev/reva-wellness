import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CardGrid from "@/components/sections/CardGrid";
import { media } from "@/content/media";
import { articles } from "@/content/pages";

export const metadata: Metadata = {
  title: "News & Press",
  description: "Awards, sustainability projects and stories from REVA by Royal Muang Samui Villas.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero size="short" image={media.press[1]} label="News & press" title={{ before: "Stories from ", emphasis: "REVA" }} />
      <CardGrid lineTitle="Latest" items={articles} ratio="landscape" />
    </>
  );
}
