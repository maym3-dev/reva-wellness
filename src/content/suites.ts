import { media } from "./media";
import type { Card, Fact } from "./types";

/** Copy, specs and amenities from the current REVA suites pages. */
export type Suite = {
  slug: string;
  title: string;
  category: "Suite" | "Pool Villa";
  terms: string[];
  summary: string;
  intro: string[];
  facts: Fact[];
  highlights: string[];
  amenities: string[];
  images: readonly string[];
};

/** A suite page's photos also include "More rooms" thumbnails — keep only its own. */
const own = (slug: keyof typeof media) =>
  media[slug].filter((src) => (src.split("/").pop() ?? "").startsWith("royalmuangsamui-villas-"));

const commonAmenities = [
  "Whirlpool Jacuzzi",
  "Wide-screen LCD TV",
  "Fridge with mini-bar",
  "Coffee and tea making facilities",
  "Safety deposit box",
  "Wi-Fi internet",
];

export const suites: Suite[] = [
  {
    slug: "grand-deluxe-suite-garden-view",
    title: "Grand Deluxe Suite Garden View",
    category: "Suite",
    terms: ["suite"],
    summary: "Set amid lush tropical gardens, the suite displays Thai elegance with hand-picked crafted wooden furniture.",
    intro: [
      "Set amid lush tropical gardens, the suite displays Thai elegance with hand-picked crafted wooden furniture. The private balcony creates an ideal space for rest.",
      "Warm wooden furnishings and ceilings inspired by traditional fishing boats bring the surrounding nature indoors.",
    ],
    facts: [
      { label: "Size", value: "90 m²" },
      { label: "Bed", value: "1 King-size bed | Sofa" },
      { label: "Guests", value: "2" },
      { label: "Location", value: "32 Suites · Second floor" },
    ],
    highlights: ["Jacuzzi whirlpool", "Garden view", "Outdoor terrace"],
    amenities: [...commonAmenities, "Spacious balcony with outdoor living area"],
    images: own("grand-deluxe-suite-garden-view"),
  },
  {
    slug: "pool-suite-garden-view",
    title: "Pool Suite Garden View",
    category: "Suite",
    terms: ["suite", "pool"],
    summary: "The elegant suite features a private plunge pool amid lush greenery, with a Jacuzzi bathroom for calm and wellness.",
    intro: [
      "The elegant suite features a private plunge pool amid lush greenery. Its refined interiors and Jacuzzi bathroom promise calm and wellness.",
    ],
    facts: [
      { label: "Size", value: "125 m²" },
      { label: "Bed", value: "1 King-size bed | Sofa" },
      { label: "Guests", value: "2" },
      { label: "Pool", value: "Private plunge pool" },
    ],
    highlights: ["Private terrace and pool", "Jacuzzi whirlpool", "Garden view"],
    amenities: [...commonAmenities, "Private plunge pool", "Spacious balcony with outdoor living area"],
    images: own("pool-suite-garden-view"),
  },
  {
    slug: "family-pool-suite-garden-view",
    title: "Family Pool Suite Garden View",
    category: "Suite",
    terms: ["suite", "pool", "family"],
    summary: "A private pool and tranquil garden views — spacious and soothing, ideal for shared relaxation and comfort.",
    intro: [
      "The suite offers a private pool and tranquil garden views. Spacious and soothing, it’s ideal for shared relaxation and comfort.",
    ],
    facts: [
      { label: "Size", value: "125 m²" },
      { label: "Bed", value: "1 King-size & 1 single bed" },
      { label: "Guests", value: "3" },
      { label: "Pool", value: "Private pool" },
    ],
    highlights: ["Private terrace and pool", "Jacuzzi whirlpool", "Garden view"],
    amenities: [...commonAmenities, "Private pool", "Spacious balcony with outdoor living area"],
    images: own("family-pool-suite-garden-view"),
  },
  {
    slug: "pool-villa-garden-view",
    title: "Pool Villa Garden View",
    category: "Pool Villa",
    terms: ["villa", "pool"],
    summary: "A private pool and garden terrace for dining in complete privacy, framed by lush tropical greenery.",
    intro: [
      "The villa features a private pool and a garden terrace, perfect for enjoying meals in complete privacy, framed by lush tropical greenery.",
      "Elegant interiors and a Jacuzzi bathroom enhance the serene, indulgent setting — a private sanctuary adorned with décor rich in Buddhist symbolism.",
    ],
    facts: [
      { label: "Size", value: "160 m²" },
      { label: "Bed", value: "1 King-size bed" },
      { label: "Guests", value: "2" },
      { label: "Extras", value: "Indoor Jacuzzi · Kitchenette" },
    ],
    highlights: ["Spacious private pool", "Indoor Jacuzzi", "Kitchenette"],
    amenities: [...commonAmenities, "Private pool", "Kitchenette facilities", "Garden terrace with dining area"],
    images: own("pool-villa-garden-view"),
  },
  {
    slug: "family-pool-villa-garden-view",
    title: "Family Pool Villa Garden View",
    category: "Pool Villa",
    terms: ["villa", "pool", "family"],
    summary: "Two separate bedrooms, a sunbathing deck and a private infinity pool — perfect for family enjoyment.",
    intro: [
      "Offering 2 separate bedrooms, a sunbathing deck and a terrace with panoramic views, the villa is perfect for family enjoyment.",
      "The private infinity pool and spa-style bathroom complete the experience.",
    ],
    facts: [
      { label: "Size", value: "160 m²" },
      { label: "Bed", value: "2 King-size beds" },
      { label: "Guests", value: "4" },
      { label: "Pool", value: "Private infinity pool" },
    ],
    highlights: ["Two bedrooms", "Sunbathing deck", "Private infinity pool"],
    amenities: [...commonAmenities, "Private infinity pool", "Kitchenette facilities", "Sunbathing deck"],
    images: own("family-pool-villa-garden-view"),
  },
  {
    slug: "pool-villa-sea-view",
    title: "Pool Villa Sea View",
    category: "Pool Villa",
    terms: ["villa", "pool"],
    summary: "A living room with breathtaking, ever-changing sea views and a 30 m² private pool.",
    intro: [
      "This spacious villa features a living room with breathtaking, ever-changing sea views.",
      "Refined details invite guests to experience true relaxation in luxurious comfort.",
    ],
    facts: [
      { label: "Size", value: "160 m²" },
      { label: "Bed", value: "1 King-size bed | Living room" },
      { label: "Guests", value: "2" },
      { label: "Location", value: "2 Villas · Third floor" },
    ],
    highlights: ["Sea view", "Pool 3.5 × 7.5 × 1.40 m", "Jacuzzi"],
    amenities: [
      ...commonAmenities,
      "30 m² private pool",
      "Kitchenette facilities",
      "Sunbathing deck",
      "Dining area",
      "Spacious balcony with outdoor living area",
    ],
    images: own("pool-villa-sea-view"),
  },
];

export const suiteFilters = [
  { id: "all", label: "All" },
  { id: "suite", label: "Suites" },
  { id: "villa", label: "Pool Villas" },
  { id: "pool", label: "Private pool" },
  { id: "family", label: "Family" },
];

export const getSuite = (slug: string) => suites.find((s) => s.slug === slug);

export const suiteHref = (s: Suite) => `/suites/${s.slug}`;

export const suiteCard = (s: Suite): Card => ({
  title: s.title,
  href: suiteHref(s),
  image: s.images[0],
  label: `${s.category} · ${s.facts[0].value}`,
  text: s.summary,
  terms: s.terms,
  meta: s.facts.slice(1, 3).map((f) => (f.label === "Guests" ? `${f.value} guests` : f.value)),
});
