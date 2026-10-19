import HeroSlideshow from "@/components/sections/HeroSlideshow";
import Intro from "@/components/sections/Intro";
import CardCarousel from "@/components/sections/CardCarousel";
import AdvisorsCarousel from "@/components/sections/AdvisorsCarousel";
import MediaSplit from "@/components/sections/MediaSplit";
import { bigOne, hero, programs } from "@/content/site";
import ScrollReveal from "@/components/sections/ScrollReveal";
import TeamCarousel from "@/components/sections/TeamCarousel";
import LocationsStack from "@/components/sections/LocationsStack";
import ExpertsGrid from "@/components/sections/ExpertsGrid";
import KpisHome from "@/components/sections/KpisHome";
import MarketProof from "@/components/sections/MarketProof";
import TabLinks from "@/components/sections/TabLinks";

/** Homepage — section order mirrors shawellness.com/en/ */
export default function Home() {
  return (
    <>
      <HeroSlideshow />
      <Intro />
      <CardCarousel id="suites" {...programs} previewVideo={hero.video} />
      <AdvisorsCarousel />
      <MediaSplit quote={bigOne.quote} text={bigOne.text} cta={bigOne.cta} image={bigOne.image} video={bigOne.video} />
      <ScrollReveal />
      <TeamCarousel />
      <LocationsStack />
      <ExpertsGrid />
      <KpisHome />
      <MarketProof />
      <TabLinks />
    </>
  );
}
