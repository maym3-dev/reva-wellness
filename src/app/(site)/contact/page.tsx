import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContactSection from "@/components/sections/ContactSection";
import MediaSplit from "@/components/sections/MediaSplit";
import { media } from "@/content/media";
import { contact } from "@/content/pages";
import { BOOKING_URL, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reservations, weddings, events and general enquiries — 24-hour reception at REVA, Choeng Mon Beach, Koh Samui.",
};

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.fullName}, Choeng Mon Beach, Koh Samui`)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero size="short" image={media.gallery[3]} label="Contact" title={{ before: "We’re here ", emphasis: "24 hours a day" }} />

      <ContactSection
        title="Send us a message"
        text="Our team will reply as soon as possible. For immediate help, call our 24-hour reception or message us on WhatsApp."
        subjects={contact.subjects}
        offices={contact.offices}
      />

      <MediaSplit
        label="Find us"
        title="Choeng Mon Beach, Koh Samui"
        text={[...site.address]}
        cta={{ label: "Open in Google Maps", href: MAPS_URL }}
        secondaryCta={{ label: "Book now", href: BOOKING_URL }}
        image={media["sea-sand-serenity"][0]}
        theme="light"
      />
    </>
  );
}
