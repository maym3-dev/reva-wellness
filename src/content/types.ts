/** Shared content shapes used by the reusable sections. */

/** Heading with an emphasised (regular + italic) part, SHA style: "<em>HEALTH</em> PROGRAMS". */
export type Heading = { before?: string; emphasis?: string; after?: string };

export type Cta = { label: string; href: string };

export type Card = {
  title: string;
  href: string;
  image: string;
  /** Small uppercase label above the title (category, size…) */
  label?: string;
  text?: string;
  /** Filter ids this card belongs to (CardCarousel / CardGrid filters) */
  terms?: string[];
  /** Short facts rendered as a dotted list (e.g. "90 m²", "2 Guests") */
  meta?: string[];
  /** Extra buttons under the card (e.g. Details + Book now) */
  ctas?: Cta[];
  /** Collapsible blocks under the card (offer terms, cancellation policy…) */
  details?: { title: string; items: string[] }[];
};

export type Filter = { id: string; label: string };

export type Fact = { label: string; value: string };

export type Feature = { title: string; text?: string; icon?: string };

export type FaqItem = { q: string; a: string | string[] };
