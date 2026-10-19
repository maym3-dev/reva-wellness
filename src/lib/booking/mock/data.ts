import { media } from "@/content/media";
import { suites } from "@/content/suites";
import type { AddOn, BookingContent, Destination, Programme, Promo, RoomType } from "../types";

/**
 * MOCK CATALOGUE — every price, inventory count, programme and add-on here is a
 * placeholder to drive the UI. Replace with data from the PMS / channel manager.
 * REVA rooms reuse the real room content; Muang Samui Spa Resort (the group's
 * sister resort in Chaweng) is included only to exercise the destination step.
 */

const includes: Destination["includes"] = [
  { text: "Daily breakfast for every guest." },
  { text: "Your wellness programme of choice." },
  { text: "Access to the beachfront pool, gym and Hydro Zone." },
  { text: "Complimentary yoga on the beach." },
  { text: "Round-trip airport transfer.", detail: "Included for stays of 4 or more nights (Samui International Airport)." },
  { text: "Taxes & service charge included.", detail: "10% service charge, 7% VAT and 1% city tax are included in every price." },
];

export const destinations: Destination[] = [
  {
    code: "REVA",
    name: "REVA Choeng Mon",
    location: "Choeng Mon Beach, Koh Samui, Thailand",
    image: media.gallery[0],
    currency: "THB",
    depositPercent: 50,
    minNights: 2,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    paymentGateway: "reddot",
    includes,
  },
  {
    code: "MSSR",
    name: "Muang Samui Spa Resort",
    location: "Chaweng Beach, Koh Samui, Thailand",
    image: media.gallery[6],
    currency: "THB",
    depositPercent: 50,
    minNights: 2,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    paymentGateway: "reddot",
    includes,
  },
];

// REVA: real room content; units add up to the resort's 79 keys.
const revaUnits: Record<string, [number, number]> = {
  "grand-deluxe-suite-garden-view": [32, 9900],
  "pool-suite-garden-view": [18, 12500],
  "family-pool-suite-garden-view": [10, 14500],
  "pool-villa-garden-view": [10, 16500],
  "family-pool-villa-garden-view": [7, 19500],
  "pool-villa-sea-view": [2, 22000],
};

const revaRooms: RoomType[] = suites.map((s) => {
  const guests = Number(s.facts.find((f) => f.label === "Guests")?.value ?? 2);
  const [units, baseRate] = revaUnits[s.slug];
  return {
    code: `REVA-${s.slug}`,
    destination: "REVA",
    name: s.title,
    category: s.category === "Pool Villa" ? "villa" : "suite",
    size: s.facts.find((f) => f.label === "Size")?.value ?? "",
    bed: s.facts.find((f) => f.label === "Bed")?.value ?? "",
    maxGuests: guests,
    desc: s.summary,
    images: s.images.slice(0, 5),
    features: s.highlights,
    units,
    baseRate,
  };
});

const mssrRooms: RoomType[] = [
  {
    code: "MSSR-deluxe-garden",
    destination: "MSSR",
    name: "Deluxe Room Garden View",
    category: "suite",
    size: "45 m²",
    bed: "1 King-size bed",
    maxGuests: 2,
    desc: "A calm garden-view room steps from Chaweng Beach (mock data).",
    images: media.gallery.slice(10, 13),
    features: ["Garden view", "Balcony", "Rain shower"],
    units: 40,
    baseRate: 6900,
  },
  {
    code: "MSSR-beachfront-villa",
    destination: "MSSR",
    name: "Beachfront Pool Villa",
    category: "villa",
    size: "110 m²",
    bed: "1 King-size bed",
    maxGuests: 2,
    desc: "A private pool villa on the sand of Chaweng Beach (mock data).",
    images: media.gallery.slice(13, 16),
    features: ["Private pool", "Beachfront", "Outdoor shower"],
    units: 8,
    baseRate: 18900,
  },
];

export const rooms: RoomType[] = [...revaRooms, ...mssrRooms];

const both = ["REVA", "MSSR"];

export const programmes: Programme[] = [
  {
    code: "STAY",
    destination: both,
    name: "Stay Your Way",
    family: "stay",
    shortDescription: "Accommodation with breakfast and full access to the resort’s wellness facilities.",
    pricePerNight: 0,
    minNights: 2,
    color: "#b7a88f",
    included: [{ category: "Every day", items: ["Breakfast", "Beach yoga", "Pool, gym & Hydro Zone access"] }],
  },
  {
    code: "ISLAND-ESCAPE",
    destination: both,
    name: "Island Wellness Escape",
    family: "wellness",
    shortDescription: "A restorative island stay with a daily massage and Hydro Zone rituals.",
    pricePerNight: 2400,
    minNights: 3,
    color: "#8fa7a0",
    included: [
      { category: "Spa", items: ["60-min Thai or oil massage per night", "Hydro Zone ritual"] },
      { category: "Movement", items: ["Morning beach yoga", "Sound bath (1 per stay)"] },
    ],
  },
  {
    code: "DETOX-RENEW",
    destination: ["REVA"],
    name: "Detox & Renew",
    family: "healing",
    shortDescription: "Anti-inflammatory menu, herbal therapies and lymphatic treatments to reset.",
    pricePerNight: 4200,
    minNights: 5,
    color: "#a3b18a",
    included: [
      { category: "Nutrition", items: ["Detox meal plan (3 meals)", "Daily herbal tonics"] },
      { category: "Vitra Clinic", items: ["Initial consultation", "Cupping therapy", "Lymphatic drainage massage"] },
      { category: "Spa", items: ["Herbal compress massage", "Milky bath ritual"] },
    ],
  },
  {
    code: "MINDFUL-MOVEMENT",
    destination: ["REVA"],
    name: "Mindful Movement Retreat",
    family: "movement",
    shortDescription: "Reformer Pilates, yoga and sound healing with our partner Mudras & Movements.",
    pricePerNight: 3600,
    minNights: 4,
    color: "#c7a18b",
    included: [
      { category: "Mudras & Movements", items: ["Daily Reformer Pilates class", "Private posture assessment", "Sound healing"] },
      { category: "Recovery", items: ["Sports massage (2 per stay)", "Hydro Zone access"] },
    ],
  },
  {
    code: "THAI-HEALING",
    destination: ["REVA"],
    name: "Thai Heritage Healing",
    family: "culture",
    shortDescription: "Traditional Thai medicine, Tui Na and acupuncture guided by our on-site doctor.",
    pricePerNight: 3900,
    minNights: 3,
    color: "#9c8fb0",
    included: [
      { category: "Vitra Clinic", items: ["Thai medicine consultation", "Acupuncture", "Tui Na session"] },
      { category: "Culture", items: ["Thai cooking class", "Garland making"] },
    ],
  },
];

export const addOns: AddOn[] = [
  {
    code: "COUPLE-SPA",
    destination: both,
    name: "Couple’s Spa Journey",
    desc: "Side-by-side 90-minute journey in a private Cave Reva Spa suite.",
    image: media["cave-reva-spa"][2],
    price: 4500,
    compatibleWith: [],
  },
  {
    code: "BEACH-DINNER",
    destination: both,
    name: "Private Beach Dinner",
    desc: "A candlelit table on the sand with a personal four-course menu.",
    image: media["dining-evening-magic"][1],
    price: 6800,
    compatibleWith: [],
  },
  {
    code: "COOKING",
    destination: ["REVA"],
    name: "Thai Cooking Class",
    desc: "Market-fresh ingredients and three classic recipes with our chef.",
    image: media["thai-heritage-local-discovery"][0],
    price: 1900,
    compatibleWith: [],
  },
  {
    code: "REFORMER-PRIVATE",
    destination: ["REVA"],
    name: "Private Reformer Session",
    desc: "One-to-one Reformer Pilates with a certified coach at the Horizon Studio.",
    image: media["mudras-movements"][0],
    price: 2200,
    compatibleWith: [],
  },
  {
    code: "SOUND-HEALING",
    destination: ["REVA"],
    name: "Sound Healing Session",
    desc: "A private sound bath to settle the nervous system and deepen sleep.",
    image: media["mudras-movements"][3],
    price: 1500,
    compatibleWith: [],
  },
  {
    code: "ISLAND-TOUR",
    destination: both,
    name: "Private Island Tour",
    desc: "A half-day tour to Fisherman’s Village and the temples with a private driver.",
    image: media["island-exploration"][0],
    price: 3200,
    compatibleWith: [],
  },
];

export const promos: Promo[] = [
  {
    code: "PLANAHEAD",
    label: "Plan ahead",
    description: "Extra 15% off when you book 60+ days in advance for 4 or more nights.",
    percent: 15,
    minNights: 4,
    minDaysAhead: 60,
    payAll: true,
  },
  {
    code: "REVA10",
    label: "Direct booking",
    description: "10% off the best available rate when you book with us.",
    percent: 10,
  },
];

export const content: BookingContent = {
  destinations,
  rooms,
  programmes,
  addOns,
  featuredPromo: promos[0],
};
