import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import Prose from "@/components/sections/Prose";
import { media } from "@/content/media";
import { getLegalPage, legalPages } from "@/content/legal";

/** Legal page body; each policy keeps its old top-level URL (e.g. /privacy-policy/). */
export default function LegalView({ slug }: { slug: string }) {
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero
        size="short"
        image={media.gallery[4]}
        label="Legal"
        title={{ before: page.title }}
        subnav={legalPages.map((p) => ({ label: p.title, href: `/${p.slug}/` }))}
      />
      <Prose blocks={page.blocks} updated={page.updated} />
    </>
  );
}

export const legalMetadata = (slug: string) => ({ title: getLegalPage(slug)?.title });
