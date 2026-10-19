import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import IntroBlock from "@/components/sections/IntroBlock";
import FeatureGrid from "@/components/sections/FeatureGrid";
import MediaSplit from "@/components/sections/MediaSplit";
import FaqSection from "@/components/sections/FaqSection";
import { media } from "@/content/media";
import { membership } from "@/content/pages";

const JOIN_URL = "https://royalmuang.smartbooking-pro.com/en/bookcore/loyalty/account";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join the REVA membership for 10% off, early check-in, late check-out, a free shuttle and complimentary classes.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHero
        image={membership.image}
        label="Membership"
        title={{ before: "Become a ", emphasis: "member" }}
        text="Welcome to our exclusive membership programme — benefits on every direct stay."
        ctas={[{ label: "Join now", href: JOIN_URL }]}
      />

      <IntroBlock
        lineTitle="Member benefits"
        heading={{ before: "More island, ", emphasis: "for less" }}
        text="As a member you’ll have access to a range of exclusive benefits whenever you book directly through the REVA website."
      />

      <FeatureGrid items={membership.benefits} columns={3} tone="light" />

      <MediaSplit
        label="Join"
        title="It only takes a minute"
        text="Create your account with our booking engine and your benefits apply from your next direct reservation."
        cta={{ label: "Join now", href: JOIN_URL }}
        image={media.gallery[5]}
        imageSide="left"
      />

      <FaqSection items={membership.faq} />
    </>
  );
}
