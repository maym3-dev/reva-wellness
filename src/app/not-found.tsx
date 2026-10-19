import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { media } from "@/content/media";

export default function NotFound() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <PageHero
          size="full"
          align="center"
          image={media["sea-sand-serenity"][1]}
          label="404"
          title={{ before: "This page has ", emphasis: "drifted away" }}
          text="The page you’re looking for doesn’t exist — but the beach is still here."
          ctas={[
            { label: "Back to home", href: "/" },
            { label: "Suites & villas", href: "/suites" },
          ]}
        />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
