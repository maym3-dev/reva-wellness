import type { FaqItem } from "@/content/types";
import FaqList from "./FaqList";
import "./faq.css";

/** SHA "faqs-section": title + intro on the left, accordion on the right. */
export default function FaqSection({
  title = "Frequently asked questions",
  text,
  items,
  tone = "white",
}: {
  title?: string;
  text?: string;
  items: FaqItem[];
  tone?: "white" | "light";
}) {
  return (
    <section className={`faq faq--${tone}`}>
      <div className="contenedor faq__grid">
        <div className="faq__aside">
          <div className="line-title">
            <span className="line-title__line" aria-hidden />
            <h2 className="line-title__text title-L">
              <em>{title}</em>
            </h2>
          </div>
          {text && <p className="faq__text">{text}</p>}
        </div>
        <div className="faq__list" data-reveal="fade-up">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
