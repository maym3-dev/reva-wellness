# REVA Wellness

Website and online booking engine for REVA by Royal Muang Samui Villas, a wellness resort on Koh Samui.

Next.js 16 (App Router) + Tailwind 4, with GSAP/ScrollTrigger, Lenis, Swiper, Splide and CountUp.js.

```bash
npm install
npm run dev     # http://localhost:3000/royalmuangsamuivillas/
npm run build
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | **All homepage copy, menu, images and links.** Edit here first. |
| `src/app/globals.css` | Design tokens (`:root`), type scale, buttons, line-title and reveal animations |
| `src/app/layout.tsx` | Font (Hanken Grotesk) and root shell |
| `src/components/providers/SmoothScroll.tsx` | Lenis (desktop only, > 991px) driven by GSAP's ticker |
| `src/components/providers/RevealObserver.tsx` | `data-reveal="fade-up|fade-in"` and `.line-title` scroll-in animations |
| `src/components/layout/` | Header (transparent → white at 50px, hides on scroll-down < 1024px), off-canvas menu, footer |
| `src/components/sections/` | One component + CSS file per homepage section (order in `src/app/(site)/page.tsx`) |
| `public/media/` | Placeholder images and hero video taken from the current REVA site |

## Homepage sections

| Component | Interaction |
| --- | --- |
| `HeroSlideshow` | Full-screen video, sub/CTA fade up (0.4s/0.8s), blend into next section |
| `Intro` | Line-title grow, KPI count-up at 20% visibility |
| `CardCarousel` | Splide with filter tabs, end-aware arrows, mobile dots, hover video preview |
| `AdvisorsCarousel` | Custom looping track, active item grows on the right; drag/swipe |
| `MediaSplit` | Hover video preview, click → video lightbox |
| `ScrollReveal` | Scrubbed clip-path reveal of a light layer over a dark one |
| `TeamCarousel` | Swiper, 5 visible, greyscale cards, end-aware arrows + dots |
| `LocationsStack` | Pinned for 300vh; panels 2 and 3 slide up over panel 1 |
| `ExpertsGrid` | 5-col masonry, staggered rise-in, hover zoom, video/story modals |
| `KpisHome` | Staggered count-ups at 50% visibility |
| `MarketProof` | Continuous linear marquee (desktop), 4s autoplay + dots (mobile) |
| `TabLinks` | Vertical image slider, 7s autoplay, pause on hover, keyboard nav |

## Pages

URLs mirror the current REVA site exactly: everything is served under `/royalmuangsamuivillas/` (`basePath`) with a trailing slash (`trailingSlash`). The prefix is defined once in `src/lib/basePath.ts`; set it to `""` to serve from a domain root.

- `next/link` (and `SmartLink`) add the prefix automatically — write links as `/wedding`.
- Files in `public/` do **not** get it automatically: reference them through `asset("/media/…")` or the `media` map, which already applies it.

| Route | Template / sections | Content file |
| --- | --- | --- |
| `/suites/`, `/suites/[slug]/` (6) | Hero with facts + sub-nav, intro, equipped/amenities grids, gallery strip + lightbox, book-direct split, more rooms | `content/suites.ts` |
| `/wellness/`, `/dining/`, `/experiences/` | Hub: hero, intro with facts, pinned stack / grids / carousels, scroll reveal | `content/venues.ts` |
| `/wellness/[slug]/` (4, incl. `cave-rai-ra`), `/dining/[slug]/` (3), `/experiences/[slug]/` (6) | `templates/VenuePage.tsx`: hero, intro, offerings tabs, gallery, CTA, more | `content/venues.ts` |
| `/experiences/meeting-events/`, `/wedding/`, `/special-offers/`, `/become-a-member/`, `/gallery/`, `/press/` (+ articles), `/contact/` | Composed from the shared sections | `content/pages.ts` |
| `/privacy-policy/`, `/cookies-policy/`, `/booking-policy/`, `/terms-and-conditions/` | `templates/LegalView.tsx` | `content/legal.ts` |
| `/about/` | New page (no equivalent on the old site) | `content/pages.ts` |

`/news-events/` (empty on the old site) permanently redirects to `/press/`. The old `/blog/` has not been rebuilt.

Photos in `public/media/reva/` were downloaded from the current REVA site and are mapped per page in `content/media.ts`.

### Inner-page sections (`src/components/sections/`)

`PageHero`, `IntroBlock`, `FeatureGrid` (cards / checklist), `VerticalTabs`, `CardGrid` (filters + collapsible terms), `CardCarousel`, `MediaSplit`, `ImageStrip`, `GalleryGrid`, `FaqSection`, `DataTable`, `ContactSection`, `Prose` — plus the home sections, which all accept a `data` prop.

## To confirm with the REVA team

- Spa/clinic/restaurant "offerings" lists, the wedding package bullets and the FAQ answers are suggested copy.
- The booking policy page is assembled from the terms on the current offers page.
- The Data Protection Officer email in the privacy policy is marked "to be confirmed".
- Instagram / YouTube / TikTok links are placeholders (`#`).

## Not wired up yet (UI only)

- Booking: the engine at `/online-reservations/` runs on mock data (`src/lib/booking/mock/`). Real availability, payments and e-mail are still to connect.
- Newsletter / contact forms: no submission backend.
- Language switcher, cookie consent and analytics.
- `public/media/hero.mp4` is ~24 MB — re-encode or move to a CDN before launch.
