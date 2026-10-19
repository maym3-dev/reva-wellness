import { suiteCard, suiteFilters, suiteHref, suites } from "./suites";
import { dining, experiences, venueHref, wellness, type Collection } from "./venues";
import type { Card } from "./types";
import { media } from "./media";
import { asset } from "@/lib/basePath";

/**
 * Site-wide settings, navigation and homepage copy.
 * The content is REVA placeholder copy taken from the current muangsamui.com
 * site — replace freely.
 */

/** Our own booking flow (mock backend for now). */
export const BOOKING_URL = "/online-reservations/";
/** The live SmartBooking Pro engine, kept for reference until the new backend is connected. */
export const LEGACY_BOOKING_URL =
  "https://royalmuang.smartbooking-pro.com/en/bookcore/availability/tomorrow/royalmuang/";

const m = (file: string) => asset(`/media/${file}`);

export const site = {
  name: "REVA",
  fullName: "REVA by Royal Muang Samui Villas",
  logo: m("reva-logo.png"),
  phone: "+66 77 428 700",
  whatsapp: "+66 98 017 3669",
  whatsappLink: "https://wa.me/66980173669",
  email: "rsvn_msg@muangsamui.com",
  address: ["89 Moo 5, Choengmon Beach, Bophut,", "Koh Samui, Suratthani 84320 Thailand"],
  languages: ["EN", "TH", "ZH", "RU"],
  copyrightYear: 2026,
};

export type MenuItem = { label: string; href?: string; children?: MenuItem[] };

const venueLinks = (c: Collection) => [
  ...c.venues.map((v) => ({ label: v.title, href: venueHref(c, v) })),
  { label: `See all ${c.name}`, href: c.base },
];

export const menu: MenuItem[] = [
  {
    label: "Suites & Villas",
    children: [
      ...suites.map((s) => ({ label: s.title, href: suiteHref(s) })),
      { label: "See All Suites & Villas", href: "/suites" },
    ],
  },
  { label: "Wellness", children: venueLinks(wellness) },
  { label: "Dining", children: venueLinks(dining) },
  { label: "Experiences", children: venueLinks(experiences) },
  {
    label: "Explore REVA",
    children: [
      { label: "About", href: "/about" },
      { label: "Meetings & Events", href: "/experiences/meeting-events" },
      { label: "Weddings", href: "/wedding" },
      { label: "Gallery", href: "/gallery" },
      { label: "Press", href: "/press" },
    ],
  },
  { label: "Offers", href: "/special-offers" },
  { label: "Membership", href: "/become-a-member" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  video: m("hero.mp4"),
  poster: m("muang-samui-pool.jpeg"),
  heading: { plain: "The true home of ", emphasis: "Beachfront Wellness" },
  sub: "Where Thai heritage, restorative rituals and the calm of Choeng Mon Beach meet.",
  cta: { label: "Discover", href: "/suites" },
};

export const intro = {
  heading: { plain: "Luxury wellness resort on ", emphasis: "Choeng Mon Beach" },
  lineTitle: ["What To Expect", "From a REVA Stay"],
  sub: "79 suites and pool villas wrapped in lush tropical gardens.",
  kpis: [
    { icon: "villa", value: 79, suffix: "", text: "Luxurious suites and private pool villas." },
    { icon: "leaf", value: 160, suffix: "m²", text: "Of private space in our largest pool villas." },
    { icon: "dining", value: 3, suffix: "", text: "Dining concepts, from beachfront Thai to Italian." },
    { icon: "spa", value: 100, suffix: "%", text: "Thai temple-inspired architecture and craft." },
  ],
  footnote: {
    strong: "A natural paradise.",
    text: "Away from the crowded world, within white sand and crystal clear sea.",
  },
};

export const programs = {
  heading: { emphasis: "Suites", after: " & Villas" },
  text: "Thai elegance, private pools and spa-style bathrooms — every space designed for privacy and relaxation.",
  allLink: { label: "All suites", href: "/suites" },
  filters: suiteFilters.filter((f) => f.id !== "pool"),
  items: suites.map(suiteCard) satisfies Card[],
};

export const advisors = {
  heading: "REVA's wellness sanctuary",
  text: "Our practitioners work alongside guests to shape each stay — blending traditional Thai medicine, movement and restorative rituals.",
  items: wellness.venues.map((v) => ({
    name: v.title,
    role: v.label,
    text: v.summary,
    image: v.images[0],
    href: venueHref(wellness, v),
  })),
};

export const bigOne = {
  quote:
    "“For us, REVA is where the island slows down. It’s the right place to rest, reconnect and leave renewed.”",
  text: "Inspired by Buddhist philosophy and the heritage of Songkhla and Ayutthaya, REVA harmonises with nature, climate and community.",
  cta: { label: "Explore more REVA journeys", href: "/about" },
  image: m("muang-samui-honeymoon-img03.jpeg"),
  video: m("hero.mp4"),
};

type RevealPart = { t: string; b?: boolean; i?: boolean };

export const scrollReveal: { lines: RevealPart[][] } = {
  lines: [
    [{ t: "The spirit of " }, { t: "Thai heritage", b: true }, { t: "," }],
    [{ t: "the art of " }, { t: "living well", b: true, i: true }, { t: "." }],
  ],
};

export const team = {
  heading: "The Heart of REVA",
  label: "Experiences",
  text: "Curated moments across the island and the resort — from sunrise on the sand to evenings under the stars.",
  items: experiences.venues.map((v) => ({
    name: v.title,
    role: v.label,
    place: v.facts[0].value,
    image: v.images[0],
    href: venueHref(experiences, v),
  })),
};

export const locations = {
  heading: { strong: "Wellness, dining & celebrations", plain: "for every kind of escape" },
  text: "Three ways to experience REVA — each one a world of its own.",
  items: [
    { title: "Cave Reva Spa", image: media["cave-reva-spa"][0], href: "/wellness/cave-rai-ra" },
    { title: "Beachfront Dining", image: media["spice-zone-beach-restaurant"][0], href: "/dining" },
    { title: "Weddings & Honeymoons", image: media.wedding[0], href: "/wedding" },
  ],
};

export type GuestStory = {
  name: string;
  role: string;
  image: string;
  quote: string;
  /** When set, the tile shows a play icon and opens the video lightbox. */
  video?: string;
};

export const experts = {
  heading: ["Loved by guests", "Trusted by travellers"],
  text: "Families, couples and wellness seekers who return to REVA year after year.",
  // Order matters: tiles 1–10 map to the masonry layout (see experts.css).
  items: [
    { name: "The Andersons", role: "Family stay · Pool Villa", image: m("family-pool-villa-garden-view-img01.jpeg"), quote: "“The kids lived in the pool, we lived in the spa. A perfect family holiday.”" },
    { name: "Mika & Jun", role: "Honeymoon", image: m("muang-samui-honeymoon-img03.jpeg"), quote: "“Every sunset felt like it was arranged just for us.”" },
    { name: "Claire D.", role: "Wellness retreat", image: m("pic-suite800-02.jpg"), quote: "“Cave Reva Spa is unlike anything I have experienced in Thailand.”" },
    { name: "Thomas R.", role: "Returning guest", image: m("grand-deluxe-suite-img01.jpeg"), quote: "“Our fifth stay — the team remembers everything.”", video: m("hero.mp4") },
    { name: "Ana & Luis", role: "Destination wedding", image: m("muang-samui-wedding-reception-m01.jpeg"), quote: "“They turned our beach wedding into a dream.”" },
    { name: "Priya S.", role: "Spa journey", image: m("pic-villa800-02.jpg"), quote: "“I left lighter, calmer and completely restored.”", video: m("hero.mp4") },
    { name: "The Müllers", role: "Family Pool Suite", image: m("family-pool-suite-garden-view-img03.jpeg"), quote: "“Space, privacy and the kindest staff.”", video: m("hero.mp4") },
    { name: "Daniel K.", role: "Pool Villa Sea View", image: m("pool-villa-sea-view-img03.jpeg"), quote: "“Waking up to that sea view is worth the trip alone.”", video: m("hero.mp4") },
    { name: "Sofia & Marco", role: "Anniversary", image: m("pool-suite-garden-view-img02.jpeg"), quote: "“A private pool, a quiet garden, total peace.”", video: m("hero.mp4") },
    { name: "Hannah W.", role: "Solo traveller", image: m("muang-samui-pool.jpeg"), quote: "“The beachfront pool is my happy place.”", video: m("hero.mp4") },
  ] satisfies GuestStory[],
};

export const kpis = {
  title: ["What makes", "REVA unique"],
  text: "REVA blends authentic Thai temple-inspired architecture with 5-star comfort — surrounded by tropical gardens and the calm of Choeng Mon Beach, and part of the Muang Samui Family Hospitality Group.",
  items: [
    { value: 79, prefix: "", suffix: "", text: "Suites and pool villas, each designed for privacy and relaxation." },
    { value: 3, prefix: "", suffix: "", text: "Dining concepts: Spice Zone, Ciccio and Nanyuan." },
    { value: 160, prefix: "", suffix: " m²", text: "Of space in our signature pool villas." },
    { value: 24, prefix: "", suffix: "h", text: "Reception and concierge, every day of the year." },
    { value: 5, prefix: "", suffix: "★", text: "Luxury beachfront resort on Koh Samui." },
    { value: 1, prefix: "#", suffix: "", text: "Address on peaceful Choeng Mon Beach." },
  ],
};

export const marketProof = {
  title: ["Don’t take our word for it", "look at the proof"],
  items: [
    { logo: "Tripadvisor", quote: "“Travellers’ Choice — among the top hotels worldwide.”" },
    { logo: "Booking.com", quote: "“Exceptional guest review score for comfort and staff.”" },
    { logo: "Condé Nast", quote: "“A serene beachfront sanctuary on Koh Samui.”" },
    { logo: "Travel+Leisure", quote: "“Temple-inspired design meets five-star calm.”" },
    { logo: "Agoda", quote: "“Gold Circle Award for outstanding hospitality.”" },
    { logo: "Expedia", quote: "“Loved by guests for families and couples alike.”" },
  ],
};

export const tabLinks = {
  label: "Discover",
  items: [
    { title: "The REVA Way", text: "Thai heritage, Buddhist philosophy and five-star comfort, in harmony with nature.", image: media.gallery[2], href: "/about" },
    { title: "Membership", text: "Become a member for exclusive rates, upgrades and loyalty rewards.", image: media["become-a-member"][0], href: "/become-a-member" },
    { title: "Offers", text: "Plan ahead and save, flash sales and seasonal packages.", image: media["special-offers"][4], href: "/special-offers" },
    { title: "Weddings", text: "Beach weddings and destination honeymoons on “honeymoon island”.", image: media.wedding[1], href: "/wedding" },
  ],
};

export const preFooter = {
  heading: { plain1: "Your journey to ", emphasis: "island serenity", plain2: " starts here." },
};

export const footer = {
  columns: [
    {
      title: "About REVA",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Offers", href: "/special-offers" },
        { label: "Membership", href: "/become-a-member" },
        { label: "Meetings & Events", href: "/experiences/meeting-events" },
        { label: "Weddings", href: "/wedding" },
        { label: "Gallery", href: "/gallery" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Cookies Policy", href: "/cookies-policy" },
        { label: "Booking Policy", href: "/booking-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
      ],
    },
    {
      title: "Stay in touch",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "Press", href: "/press" },
        { label: "My Booking", href: "/online-reservations/my-booking/" },
      ],
    },
  ],
  newsletter: {
    title: "Join our newsletter",
    text: "Receive news, offers and stories from REVA.",
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/Royalmuangsamuivillas" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "TikTok", href: "#" },
  ],
};
