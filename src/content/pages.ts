import { media } from "./media";
import { BOOKING_URL, site } from "./site";
import type { Card, FaqItem, Feature } from "./types";
import type { GalleryImage } from "@/components/sections/GalleryGrid";
import type { ProseBlock } from "@/components/sections/Prose";

/* ------------------------------------------------------------------ Offers */

const directBenefits = [
  "An exclusive 10% discount on our best available rates.",
  "Priority early check-in and late check-out (subject to availability).",
  "Complimentary shuttle between Muang Samui Spa Resort and REVA.",
  "Yoga on the Beach (reserve at least 24 hours in advance).",
  "Pandan Leaf Origami and Basic Thai Language classes (reserve 24 hours ahead).",
];

const offerTerms = {
  title: "Terms & conditions",
  items: [
    "Pre-payment of the full amount (100%) is required at the time of reservation.",
    "Exclusively available for reservations made through our official website.",
    "Non-refundable in the event of cancellation, modification or no-show.",
  ],
};

export const offers = {
  benefits: directBenefits,
  items: [
    {
      title: "Plan ahead. Stay longer. Save more.",
      href: BOOKING_URL,
      image: media["special-offers"][4],
      label: "Extra 15% off",
      text: "Get an extra 15% off when you book 60+ days in advance for 4 or more nights, with daily breakfast.",
      meta: ["Min. 4 nights", "Book 60 days ahead"],
      details: [
        {
          title: "Terms & conditions",
          items: [
            "Booking period: now – 30 June 2027.",
            "Stay period: now – 20 December 2026 | 11 January – 30 June 2027.",
            "A minimum stay of 4 consecutive nights is required.",
            "Daily breakfast included.",
          ],
        },
      ],
      ctas: [{ label: "Book now", href: BOOKING_URL }],
    },
    {
      title: "Stay longer · 14 nights",
      href: BOOKING_URL,
      image: media["special-offers"][2],
      label: "Best value",
      text: "Your ultimate island retreat — our best value rate for those who want to call paradise home for 14 nights or more.",
      meta: ["Min. 14 nights", "Valid to 31 Oct 2027"],
      details: [offerTerms],
      ctas: [{ label: "Book now", href: BOOKING_URL }],
    },
    {
      title: "Stay longer · 7 nights",
      href: BOOKING_URL,
      image: media["special-offers"][3],
      label: "A full week",
      text: "Turn your vacation into a full week of relaxation with exclusive savings on stays of 7 nights or longer.",
      meta: ["Min. 7 nights"],
      details: [offerTerms],
      ctas: [{ label: "Book now", href: BOOKING_URL }],
    },
    {
      title: "Stay longer · 4 nights",
      href: BOOKING_URL,
      image: media["special-offers"][0],
      label: "Unwind deeply",
      text: "Stay a little longer and unwind deeply — special savings when you escape to paradise for 4 nights or more.",
      meta: ["Min. 4 nights"],
      details: [offerTerms],
      ctas: [{ label: "Book now", href: BOOKING_URL }],
    },
    {
      title: "3 days advance purchase",
      href: BOOKING_URL,
      image: media["special-offers"][6],
      label: "Plan ahead",
      text: "Reward your proactive planning — save more on your island escape by booking at least 3 days in advance.",
      meta: ["Book 3 days ahead"],
      details: [offerTerms],
      ctas: [{ label: "Book now", href: BOOKING_URL }],
    },
    {
      title: "Flash sale",
      href: BOOKING_URL,
      image: media["special-offers"][1],
      label: "18% additional off",
      text: "Limited-time flash sale with an additional 18% off and complimentary daily breakfast.",
      meta: ["Limited time", "Breakfast included"],
      details: [
        offerTerms,
        {
          title: "Cancellation policy",
          items: [
            "This payment is non-refundable in the event of cancellation, modification or no-show.",
            "A 100% penalty for the entire booking period applies to no-shows and early departures.",
          ],
        },
      ],
      ctas: [{ label: "Book now", href: BOOKING_URL }],
    },
  ] satisfies Card[],
};

/* -------------------------------------------------------------- Membership */

export const membership = {
  benefits: [
    { icon: "gift", title: "10% off", text: "On top of the best available rate when you book directly with us." },
    { icon: "clock", title: "Early in, late out", text: "Early check-in and late check-out, subject to availability." },
    { icon: "car", title: "Free shuttle", text: "Scheduled shuttle between Muang Samui Spa Resort and REVA." },
    { icon: "sun", title: "Beach yoga", text: "Yoga on the Beach — reserve at least one day in advance." },
    { icon: "heart", title: "Thai culture classes", text: "Pandan Leaf Origami and Basic Thai Language classes." },
    { icon: "star", title: "Member rates", text: "Exclusive member pricing on selected offers through the year." },
  ] satisfies Feature[],
  faq: [
    { q: "How do I become a member?", a: "Sign up on our website — membership is free and benefits apply from your first direct booking." },
    { q: "Where are the benefits valid?", a: "Benefits are only valid for reservations made directly through the REVA website." },
    { q: "Do I need to reserve the classes?", a: "Yes. Yoga on the Beach and our Thai culture classes require a reservation at least one day in advance." },
  ] satisfies FaqItem[],
  image: media["become-a-member"][0],
};

/* --------------------------------------------------------------- Weddings */

export const weddings = {
  packages: [
    {
      title: "Themed wedding packages",
      text: "Every wedding — on the beach or indoors — needs décor to tie it together. Choose from themed packages such as Rustic Beach and Tropical Beach.",
      image: media.wedding[0],
      bullets: ["Rustic Beach Wedding", "Tropical Beach Wedding", "Bespoke décor on request"],
    },
    {
      title: "Wedding reception",
      text: "Beachfront, banquet hall, al fresco or rooftop dining — we have the perfect venue for your reception.",
      image: media.wedding[2],
      bullets: ["Beachfront", "Banquet hall", "Al fresco & rooftop"],
    },
    {
      title: "Package rates & details",
      text: "Professional guidance, planning and organising with our wedding coordinator, and a ceremonial celebrant for Western or Thai weddings.",
      image: media.wedding[4],
      bullets: ["Dedicated coordinator", "Western or Thai celebrant", "Family & friends welcome"],
    },
    {
      title: "Honeymoon packages",
      text: "Koh Samui is known around the world as Honeymoon Island. Our packages include everything to make REVA your perfect honeymoon.",
      image: media.wedding[6],
      bullets: ["Romantic turndown", "Candlelit beach dinner", "Couple’s spa journey"],
    },
  ],
  faq: [
    { q: "Can we hold a Thai ceremony?", a: "Yes — we arrange ceremonial celebrants for both Western and traditional Thai weddings." },
    { q: "Which celebrations do you host?", a: "Weddings, proposals, vow renewals, birthdays and any special celebration — each curated by our specialists." },
    { q: "How do we start planning?", a: `Contact our team at ${site.email} and our wedding coordinator will guide you through every detail.` },
  ] satisfies FaqItem[],
};

/* -------------------------------------------------------- Meetings & events */

export const meetings = {
  columns: ["Meeting room", "Size (m²)", "Classroom", "Theatre", "I-shape", "U-shape"],
  rows: [
    ["Chaweng", 96, 42, 60, 32, 42],
    ["Choengmon", 120, 110, 150, 42, 84],
  ],
  features: [
    { icon: "key", title: "State-of-the-art rooms", text: "Two sophisticated function rooms for meetings, seminars and events." },
    { icon: "guests", title: "Dedicated team", text: "Exceptional assistance from planning through to the day itself." },
    { icon: "dining", title: "Catering", text: "Coffee breaks, working lunches and gala dinners from our kitchens." },
    { icon: "wave", title: "Beachfront venues", text: "Take the event outside with cocktails and dinners by the sea." },
  ] satisfies Feature[],
};

/* ------------------------------------------------------------------ About */

export const about = {
  pillars: [
    { title: "Thai heritage", text: "Temple-inspired architecture drawing on Buddhist philosophy and the heritage of Songkhla and Ayutthaya." },
    { title: "In harmony with nature", text: "Designed to harmonise with nature, the climate and the community of Choeng Mon." },
    { title: "Five-star comfort", text: "79 suites and pool villas of 90, 125 and 160 m², each designed for privacy and relaxation." },
    { title: "Wellness at heart", text: "A beachfront pool, cave-inspired spa, traditional Thai medicine clinic and Reformer Pilates studio." },
  ] satisfies Feature[],
};

/* ---------------------------------------------------------------- Gallery */

const tag = (keys: (keyof typeof media)[], term: string): GalleryImage[] =>
  keys.flatMap((k) => media[k].map((src) => ({ src, terms: [term] })));

const galleryAll: GalleryImage[] = [
  ...tag(["suites"], "rooms"),
  ...tag(["cave-reva-spa", "mudras-movements", "vitra-clinic"], "wellness"),
  ...tag(["spice-zone-beach-restaurant", "nanyuan", "dining-evening-magic"], "dining"),
  ...tag(["sea-sand-serenity", "float-unwind"], "beach"),
  ...tag(["wedding", "meetings-events"], "events"),
  ...tag(["gallery"], "resort"),
];

export const gallery = {
  filters: [
    { id: "all", label: "All" },
    { id: "resort", label: "Resort" },
    { id: "rooms", label: "Suites & Villas" },
    { id: "wellness", label: "Wellness" },
    { id: "dining", label: "Dining" },
    { id: "beach", label: "Beach & Pool" },
    { id: "events", label: "Weddings & Events" },
  ],
  // de-duplicate photos that appear on several pages
  images: galleryAll.filter((img, i, arr) => arr.findIndex((x) => x.src === img.src) === i),
};

/* ------------------------------------------------------------------- News */

export type Article = Card & { slug: string; date: string; body: ProseBlock[] };

export const articles: Article[] = [
  {
    slug: "seagrass-restoration-project",
    title: "The seagrass protection and restoration project launched",
    date: "Press",
    href: "/press/seagrass-restoration-project",
    image: media.press[0],
    label: "Sustainability",
    text: "A partnership with the Department of Marine and Coastal Resources to plant and restore seagrass around Koh Samui’s coast.",
    body: [
      {
        type: "p",
        text: "We are honoured to launch a partnership with the Department of Marine and Coastal Resources to help plant and restore seagrass around Koh Samui’s coast.",
      },
      {
        type: "p",
        text: "Seagrass meadows shelter marine life, protect the shoreline and store carbon. Guests will be invited to join planting days throughout the year.",
      },
    ],
  },
  {
    slug: "five-star-accommodation-award",
    title: "Five Star Accommodation award received",
    date: "Press",
    href: "/press/five-star-accommodation-award",
    image: media.press[2],
    label: "Awards",
    text: "Awarded five stars in the Accommodation Standard for Tourism by the Thailand Tourism Standard.",
    body: [
      {
        type: "p",
        text: "We are thrilled to announce that we have been awarded five stars in the ‘Accommodation Standard for Tourism’ by the Thailand Tourism Standard, organised by the Department of Tourism and the Ministry of Tourism and Sports of Thailand.",
      },
    ],
  },
  {
    slug: "thailand-tourism-awards-2019",
    title: "12th Thailand Tourism Awards 2019",
    date: "Press",
    href: "/press/thailand-tourism-awards-2019",
    image: media.press[3],
    label: "Awards",
    text: "Recognising the Thai travel industry’s best and brightest for remarkable service and experience.",
    body: [
      {
        type: "p",
        text: "The 12th Thailand Tourism Awards 2019, held at Samyan Mitrtown, recognise the Thai travel industry’s best and brightest for their excellence in delivering remarkable service and experiences to local and international travellers.",
      },
      {
        type: "p",
        text: "On behalf of the Muang Samui Group, we would like to express our sincerest gratitude to everyone who took part.",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

/* ---------------------------------------------------------------- Contact */

export const contact = {
  subjects: [
    "Make a booking",
    "Inquiries about a booking (amendment, cancellation, etc.)",
    "Weddings & events",
    "General inquiries",
    "Feedback",
  ],
  offices: [
    {
      name: site.fullName,
      lines: [...site.address],
      phone: site.phone,
      whatsapp: site.whatsapp,
      email: site.email,
    },
    {
      name: "Sales & Marketing Office",
      lines: ["13/1 Moo 2, Chaweng Beach, Bophut,", "Koh Samui, Suratthani 84320 Thailand"],
      phone: "+66 (0) 77 429 700",
    },
  ],
};
