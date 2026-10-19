import type { Feature, Heading } from "@/content/types";
import HeadingText from "@/components/ui/HeadingText";
import { KpiIcon } from "@/components/ui/Icons";
import "./feature-grid.css";

type Props = {
  lineTitle?: string;
  heading?: Heading;
  text?: string;
  items: Feature[];
  /** cards = icon/number tiles (SHA "beneficios"), list = two-column checklist (amenities) */
  variant?: "cards" | "list";
  columns?: 2 | 3 | 4;
  tone?: "white" | "light" | "dark";
  numbered?: boolean;
};

/** SHA benefits grid: line-title header, tiles rising in with a staggered delay. */
export default function FeatureGrid({
  lineTitle,
  heading,
  text,
  items,
  variant = "cards",
  columns = 3,
  tone = "white",
  numbered = false,
}: Props) {
  return (
    <section className={`feature-grid feature-grid--${tone} feature-grid--${variant}`}>
      <div className="contenedor">
        {(lineTitle || heading || text) && (
          <div className={`feature-grid__header${text ? "" : " feature-grid__header--solo"}`}>
            <div>
              {lineTitle && (
                <div className="line-title">
                  <span className="line-title__line" aria-hidden />
                  <h2 className="line-title__text title-L">
                    <em>{lineTitle}</em>
                  </h2>
                </div>
              )}
              {heading && (
                <h2 className="headline-S light feature-grid__heading">
                  <HeadingText h={heading} />
                </h2>
              )}
            </div>
            {text && <p className="feature-grid__text">{text}</p>}
          </div>
        )}

        <ul className={`feature-grid__items feature-grid__items--${columns}`}>
          {items.map((it, i) => (
            <li
              key={it.title}
              className="feature-grid__item"
              data-reveal="fade-up"
              data-reveal-delay={String((i % columns) * 100)}
            >
              {variant === "list" ? (
                <span className="feature-grid__check" aria-hidden />
              ) : numbered ? (
                <span className="feature-grid__number">{String(i + 1).padStart(2, "0")}</span>
              ) : it.icon ? (
                <span className="feature-grid__icon">
                  <KpiIcon name={it.icon} />
                </span>
              ) : null}
              <div>
                <h3 className={variant === "list" ? "feature-grid__item-title--list" : "title-S regular feature-grid__item-title"}>
                  {it.title}
                </h3>
                {it.text && <p className="feature-grid__item-text">{it.text}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
