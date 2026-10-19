import { media } from "./media";
import type { Card, Fact } from "./types";

/**
 * Wellness facilities, restaurants and experiences share one shape.
 * Summaries, hours and capacities come from the current REVA pages; the
 * "offerings" lists are suggested placeholders for the team to confirm.
 */
export type Venue = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  intro: string[];
  facts: Fact[];
  offerings?: { title: string; text: string }[];
  note?: string;
  images: readonly string[];
};

export type Collection = {
  base: string;
  name: string;
  venues: Venue[];
};

export const wellness: Collection = {
  base: "/wellness",
  name: "Wellness",
  venues: [
    {
      slug: "cave-rai-ra",
      title: "Cave Reva Spa",
      label: "Signature spa",
      summary: "A rejuvenation sanctuary in a unique cave design inspired by the Ang Thong marine park.",
      intro: [
        "Rejuvenation spa sanctuary. Set in a unique cave design, inspired by the Ang Thong marine park.",
        "Indulge in tension-releasing massages and pampering treatments by our skilled, certified therapists.",
      ],
      facts: [
        { label: "Open daily", value: "10:00 – 21:00" },
        { label: "Capacity", value: "5 treatment rooms" },
        { label: "Venue", value: "Cave-themed spa by the beach" },
      ],
      offerings: [
        { title: "Traditional Thai massage", text: "Assisted stretching and acupressure along the body’s energy lines to release deep tension." },
        { title: "Aromatherapy massage", text: "Long, flowing strokes with warm essential oils to calm the mind and soothe the muscles." },
        { title: "Milky bath ritual", text: "A softening bath in the cave grotto, followed by a body scrub and full-body massage." },
        { title: "Couple’s journey", text: "Side-by-side treatments in a private suite — a favourite with honeymooners." },
      ],
      images: media["cave-reva-spa"].filter((s) => !s.includes("honeymoon")),
    },
    {
      slug: "vitra-clinic",
      title: "Vitra Clinic",
      label: "Thai & Chinese medicine",
      summary: "Cupping therapy, Tui Na, acupuncture and physiotherapy with our on-site doctor.",
      intro: [
        "A traditional Thai and Chinese medicine clinic offering an ultimate way to restore energy and spirit.",
        "Cupping Therapy, Tui Na, Acupuncture and Physiotherapy by our honours-graduate on-site doctor.",
      ],
      facts: [
        { label: "Open daily", value: "10:00 – 19:00" },
        { label: "Capacity", value: "6 treatment rooms" },
        { label: "Status", value: "Opening soon" },
      ],
      offerings: [
        { title: "Cupping therapy", text: "Gentle suction to improve circulation and relieve muscle tightness." },
        { title: "Tui Na", text: "Chinese therapeutic massage working on acupressure points and meridians." },
        { title: "Acupuncture", text: "Fine-needle therapy to rebalance energy and support recovery." },
        { title: "Physiotherapy", text: "Assessment and treatment plans for mobility, posture and injury recovery." },
      ],
      images: media["vitra-clinic"],
    },
    {
      slug: "mudras-movements",
      title: "Mudras & Movements",
      label: "Pilates, yoga & sound",
      summary: "Reformer Pilates, yoga, barre and sound healing led by certified partner coaches.",
      intro: [
        "Discover Reformer Pilates, Mat Pilates, Barre, Yoga and Sound Healing — each class thoughtfully led by certified coaches who bring expertise and heart to every session.",
        "Step into a space where mindful movement meets strength.",
      ],
      facts: [
        { label: "Capacity", value: "6 Reformers · up to 10 on mats" },
        { label: "Venue", value: "Horizon View Studio, above Ciccio" },
        { label: "Schedule", value: "See mudrasmovements.com" },
      ],
      offerings: [
        { title: "Reformer Pilates", text: "Small-group sessions on six Reformer machines for strength and control." },
        { title: "Mat Pilates & Barre", text: "Core-focused classes blending Pilates, ballet and functional movement." },
        { title: "Yoga", text: "Flow and restorative classes, including complimentary yoga on the beach." },
        { title: "Sound healing & meditation", text: "Sound baths and guided meditation to settle the nervous system." },
      ],
      note: "Grip socks are required for Reformer Pilates — bring your own or purchase them at the studio. Hotel guests attending complimentary sessions participate at their own risk.",
      images: media["mudras-movements"],
    },
    {
      slug: "fitness-gym",
      title: "Fitness Gym",
      label: "Training",
      summary: "An air-conditioned gym with cardio and strength-training equipment.",
      intro: ["Air-conditioned gym offering a range of cardio and strength-training equipment, open every day."],
      facts: [
        { label: "Open daily", value: "08:00 – 19:00" },
        { label: "Equipment", value: "Cardio & strength" },
        { label: "Access", value: "Complimentary for guests" },
      ],
      images: media["fitness-gym"],
    },
  ],
};

export const dining: Collection = {
  base: "/dining",
  name: "Dining",
  venues: [
    {
      slug: "spice-zone-beach-restaurant",
      title: "Spice Zone Beach Restaurant",
      label: "Thai & International · Beachfront",
      summary: "Royal Thai cuisine, fresh seafood and international favourites in beachfront pavilions.",
      intro: [
        "Enjoy a memorable beachfront dining experience featuring fresh ingredients and a wide choice of Royal Thai cuisine, traditional Italian and fresh seafood alongside a delicious international menu.",
        "We highly recommend creating your own private beach dining theme for an exquisite, romantic evening.",
      ],
      facts: [
        { label: "Breakfast", value: "06:30 – 10:30" },
        { label: "Lunch", value: "11:00 – 18:00" },
        { label: "Dinner", value: "18:00 – 23:30" },
        { label: "Beach bar", value: "08:00 – 00:00" },
      ],
      offerings: [
        { title: "Royal Thai", text: "Classic recipes from the royal kitchens, prepared with island produce." },
        { title: "Fresh seafood", text: "The day’s catch, grilled on the beach during weekly BBQ nights." },
        { title: "International", text: "All-day favourites, vegan and wellness-focused dishes." },
        { title: "Private beach dining", text: "A candlelit table on the sand with a personal menu." },
      ],
      images: media["spice-zone-beach-restaurant"],
    },
    {
      slug: "ciccio-restaurant-pizzeria",
      title: "Ciccio Ristorante & Pizzeria",
      label: "Italian · Outdoor pavilion",
      summary: "Signature oven-baked pizzas, pasta and a creative vegan menu.",
      intro: [
        "Classical Italian cooking and signature ‘fashion’ pizzas, baked in our oven.",
        "Pasta, antipasti and a creative vegan menu, served in the outdoor pavilion at the front of the hotel.",
      ],
      facts: [
        { label: "Open daily", value: "14:00 – 22:00" },
        { label: "Cuisine", value: "Italian · Pizza · Vegan" },
        { label: "Setting", value: "Outdoor pavilion" },
      ],
      offerings: [
        { title: "Fashion pizzas", text: "Signature creations straight from the oven." },
        { title: "Fresh pasta", text: "Italian classics made to order." },
        { title: "Vegan menu", text: "A creative plant-based selection." },
      ],
      images: media["ciccio-restaurant-pizzeria"].filter((s) => !s.includes("Sailor")),
    },
    {
      slug: "nanyuan",
      title: "Nanyuan Noodle",
      label: "Chinese · Handmade noodles",
      summary: "Heart-warming Chinese flavours, handmade noodles and Mango Mania desserts.",
      intro: [
        "An urban Chinese dining space adorned with inspirational Chinese architecture and an authentic Thai touch.",
        "House-made roasted duck, shrimp dumplings, handmade noodles and many more hearty dishes everyone can enjoy.",
      ],
      facts: [
        { label: "Open daily", value: "10:00 – 22:00" },
        { label: "Cuisine", value: "Chinese · Noodles" },
        { label: "Setting", value: "Indoor & outdoor wooden pavilion" },
      ],
      offerings: [
        { title: "Roasted duck", text: "House-made, roasted until crisp." },
        { title: "Handmade noodles", text: "Pulled and cut fresh every day." },
        { title: "Mango Mania", text: "Mango desserts, from sticky rice to bingsu." },
      ],
      images: media["nanyuan"],
    },
  ],
};

export const experiences: Collection = {
  base: "/experiences",
  name: "Experiences",
  venues: [
    {
      slug: "sea-sand-serenity",
      title: "Sea, Sand & Serenity",
      label: "Beach",
      summary: "Choeng Mon’s calm bay, soft white sand and gentle tides — kayaks when the ocean invites adventure.",
      intro: ["Breathe in the beauty of Choeng Mon’s calm bay, soft white sand and gentle tides. Kayaks are available when the ocean invites adventure."],
      facts: [
        { label: "Where", value: "Choeng Mon Beach" },
        { label: "Included", value: "Kayaks · Sun loungers" },
      ],
      images: media["sea-sand-serenity"],
    },
    {
      slug: "float-unwind",
      title: "Float & Unwind",
      label: "Pool",
      summary: "A free-form tropical pool, shaded by cascading waterfalls in a cave-inspired design.",
      intro: ["Our free-form tropical pool, shaded by cascading waterfalls and a cave-inspired design, is the perfect spot to drift and sunbathe."],
      facts: [
        { label: "Where", value: "Beachfront pool" },
        { label: "Highlights", value: "Waterfalls · Cave design" },
      ],
      images: media["float-unwind"],
    },
    {
      slug: "wellness-energy",
      title: "Wellness Energy",
      label: "Wellness",
      summary: "Complimentary beach yoga, massages at Cave Reva Spa, Reformer Pilates, sound baths and meditation.",
      intro: [
        "Awaken your body and mind with complimentary yoga by the beach, followed by a massage at Cave Reva Spa.",
        "Or join our partner-led Reformer Pilates, sound bath and meditation sessions in the Horizon Studio.",
      ],
      facts: [
        { label: "Where", value: "Beach · Spa · Horizon Studio" },
        { label: "Included", value: "Beach yoga" },
      ],
      images: media["wellness-energy"],
    },
    {
      slug: "thai-heritage-local-discovery",
      title: "Thai Heritage & Local Discovery",
      label: "Culture",
      summary: "Thai language, garland making, pandan origami, towel art, cooking and mixology classes.",
      intro: [
        "Connect with our roots through authentic experiences: Thai language introduction, garland making, pandan leaf origami, towel art, cooking and mixology classes.",
        "And pizza-making for our youngest chefs.",
      ],
      facts: [
        { label: "For", value: "All ages" },
        { label: "Booking", value: "One day in advance" },
      ],
      images: media["thai-heritage-local-discovery"],
    },
    {
      slug: "dining-evening-magic",
      title: "Dining & Evening Magic",
      label: "Evenings",
      summary: "Beachfront BBQ nights, live music and a fire show under the stars.",
      intro: [
        "Savour beachfront BBQ nights with freshly grilled seafood, sushi and Thai specialties, accompanied by live music and a fire show under the stars.",
        "For romance, private candlelit dinners await by the sea.",
      ],
      facts: [
        { label: "Where", value: "Spice Zone Beach" },
        { label: "Highlights", value: "BBQ · Live music · Fire show" },
      ],
      images: media["dining-evening-magic"],
    },
    {
      slug: "island-exploration",
      title: "Island Exploration",
      label: "Koh Samui",
      summary: "From Fisherman’s Village to the temples — private transfers or our complimentary shuttle.",
      intro: [
        "Discover Koh Samui’s treasures from Fisherman’s Village to its temples.",
        "Travel with our private transfers or the complimentary shuttle to our sister resort, Muang Samui in Chaweng.",
      ],
      facts: [
        { label: "Shuttle", value: "Complimentary to Chaweng" },
        { label: "Transfers", value: "Private, on request" },
      ],
      images: media["island-exploration"],
    },
  ],
};

export const collections = { wellness, dining, experiences };

export const venueHref = (c: Collection, v: Venue) => `${c.base}/${v.slug}`;

export const venueCard = (c: Collection, v: Venue): Card => ({
  title: v.title,
  href: venueHref(c, v),
  image: v.images[0],
  label: v.label,
  text: v.summary,
  meta: v.facts.slice(0, 2).map((f) => `${f.label}: ${f.value}`),
});
