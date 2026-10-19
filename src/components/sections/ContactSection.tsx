"use client";

import { useState } from "react";
import "./contact.css";

export type Office = { name: string; lines: string[]; phone?: string; whatsapp?: string; email?: string };

/**
 * Contact form: intro + form on the left, offices on the right.
 * UI only — submitting shows a notice until a backend/CRM is connected.
 */
export default function ContactSection({
  title,
  text,
  subjects,
  offices,
}: {
  title: string;
  text: string;
  subjects: string[];
  offices: Office[];
}) {
  const [sent, setSent] = useState(false);

  return (
    <section className="contact">
      <div className="contenedor contact__grid">
        <div className="contact__form-col">
          <div className="line-title">
            <span className="line-title__line" aria-hidden />
            <h2 className="line-title__text title-L">
              <em>{title}</em>
            </h2>
          </div>
          <p className="contact__intro">{text}</p>

          <form
            className="contact__form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="contact__field contact__field--full">
              <span>Subject*</span>
              <select required defaultValue="">
                <option value="" disabled>
                  Please select a subject
                </option>
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="contact__field">
              <span>First name*</span>
              <input required autoComplete="given-name" />
            </label>
            <label className="contact__field">
              <span>Last name*</span>
              <input required autoComplete="family-name" />
            </label>
            <label className="contact__field">
              <span>Email*</span>
              <input type="email" required autoComplete="email" />
            </label>
            <label className="contact__field">
              <span>Telephone</span>
              <input type="tel" autoComplete="tel" />
            </label>
            <label className="contact__field contact__field--full">
              <span>Message</span>
              <textarea rows={5} />
            </label>
            <label className="contact__consent contact__field--full">
              <input type="checkbox" required />
              <span>I have read and accept the privacy policy.</span>
            </label>
            <div className="contact__field--full contact__submit">
              <button type="submit" className="boton boton--primary">
                Send message
              </button>
              {sent && (
                <p className="contact__notice" role="status">
                  Thank you — the form isn’t connected yet, so nothing was sent. Please email us in the meantime.
                </p>
              )}
            </div>
          </form>
        </div>

        <aside className="contact__offices">
          {offices.map((o) => (
            <div key={o.name} className="contact__office" data-reveal="fade-up">
              <h3 className="title-S regular">{o.name}</h3>
              <address>
                {o.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
              <dl>
                {o.phone && (
                  <>
                    <dt>Phone</dt>
                    <dd>
                      <a href={`tel:${o.phone.replace(/[^\d+]/g, "")}`}>{o.phone}</a>
                    </dd>
                  </>
                )}
                {o.whatsapp && (
                  <>
                    <dt>WhatsApp</dt>
                    <dd>
                      <a href={`https://wa.me/${o.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                        {o.whatsapp}
                      </a>
                    </dd>
                  </>
                )}
                {o.email && (
                  <>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${o.email}`}>{o.email}</a>
                    </dd>
                  </>
                )}
              </dl>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
