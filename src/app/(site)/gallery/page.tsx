import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { media } from "@/content/media";
import { gallery } from "@/content/pages";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Suites, villas, spa, dining, beach and celebrations at REVA by Royal Muang Samui Villas.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        size="short"
        image={media.gallery[1]}
        label="Photo gallery"
        title={{ before: "The finest Thai ", emphasis: "beachfront resort" }}
      />
      <GalleryGrid filters={gallery.filters} images={gallery.images} />
    </>
  );
}
