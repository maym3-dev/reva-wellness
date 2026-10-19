import type { Heading } from "@/content/types";

/** Renders SHA's mixed-weight headings: light text with a regular, italic emphasis. */
export default function HeadingText({ h, upper = true }: { h: Heading; upper?: boolean }) {
  const t = (s?: string) => (s && upper ? s.toUpperCase() : s);
  return (
    <>
      {t(h.before)}
      {h.emphasis && (
        <em>
          <span className="regular">{t(h.emphasis)}</span>
        </em>
      )}
      {t(h.after)}
    </>
  );
}
