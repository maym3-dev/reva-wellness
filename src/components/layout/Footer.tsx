import { BOOKING_URL, footer, preFooter, site } from "@/content/site";
import SmartLink from "@/components/ui/SmartLink";
import "./footer.css";

export default function Footer() {
  return (
    <>
      <section className="pre-footer" id="contact">
        <div className="contenedor">
          <h2 className="headline-S light">
            {preFooter.heading.plain1}
            <span className="regular">
              <em>{preFooter.heading.emphasis}</em>
            </span>
            <br />
            {preFooter.heading.plain2}
          </h2>
          <div className="pre-footer__actions">
            <SmartLink className="boton boton--ghost" href={BOOKING_URL}>
              Book now
            </SmartLink>
            <SmartLink className="regular pre-footer__link" href="/contact">
              CONTACT
            </SmartLink>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="contenedor">
          <div className="site-footer__grid">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <div className="site-footer__title label-M light">{col.title}</div>
                <ul className="site-footer__menu">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <SmartLink href={l.href}>{l.label}</SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="site-footer__newsletter">
              <div className="site-footer__title label-M light">{footer.newsletter.title}</div>
              <p>{footer.newsletter.text}</p>
              {/* UI only — not wired to a newsletter provider yet */}
              <form className="site-footer__form" action="#">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email
                </label>
                <input id="newsletter-email" type="email" placeholder="Email" autoComplete="email" />
                <button type="button" className="boton boton--ghost">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="site-footer__brand">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.logo} alt={site.fullName} width={100} height={57} />
              <address>
                {site.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
                <span>
                  T. <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a> · {site.email}
                </span>
              </address>
            </div>
          </div>

          <div className="site-footer__divider" />

          <div className="site-footer__bottom">
            <div className="site-footer__copyright">
              © {site.copyrightYear} {site.fullName}. All rights reserved
            </div>
            <div className="site-footer__social">
              {footer.social.map((s) => (
                <SmartLink key={s.label} href={s.href} aria-label={s.label}>
                  {s.label}
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
