import type { Metadata } from "next";
import { Suspense } from "react";
import PageSkeleton from "@/components/templates/PageSkeleton";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import Prose from "@/components/sections/Prose";
import CardGrid from "@/components/sections/CardGrid";
import { articles, getArticle } from "@/content/pages";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/press/[slug]">): Promise<Metadata> {
  const a = getArticle((await params).slug);
  return a ? { title: a.title, description: a.text } : {};
}

export default function ArticlePage({ params }: PageProps<"/press/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: PageProps<"/press/[slug]">["params"] }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  return (
    <>
      <PageHero size="large" image={article.image} label={article.label} title={{ before: article.title }} />
      <Prose blocks={article.body} />
      <CardGrid
        lineTitle="More news"
        items={articles.filter((a) => a.slug !== article.slug)}
        columns={2}
        ratio="landscape"
        tone="light"
      />
    </>
  );
}
