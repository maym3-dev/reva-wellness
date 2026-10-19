/**
 * Instant-navigation shell for detail routes: the same dark, full-height block the
 * hero renders on, so the header stays transparent and nothing jumps when the
 * page content streams in (usually from the prefetched static render).
 */
export default function PageSkeleton() {
  return <div aria-hidden style={{ height: "100dvh", background: "var(--hero-bg)" }} />;
}
