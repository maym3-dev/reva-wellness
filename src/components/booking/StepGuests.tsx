"use client";

import { useBooking } from "@/lib/booking/store";
import { useBookingErrors } from "@/lib/booking/validate";
import type { GuestInfo } from "@/lib/booking/types";
import { COUNTRIES } from "@/lib/booking/countries";
import { TITLES } from "./options";
import Select from "./Select";
import CountryCodePicker from "./CountryCodePicker";

const TITLE_OPTIONS = TITLES.map((t) => ({ value: t, label: t }));
const NATIONALITY_OPTIONS = COUNTRIES.map((c) => ({ value: c.name, label: c.name }));

/** Step 4 — main guest details, names for other guests, assignments and consents. */
export default function StepGuests({ onContinue }: { onContinue: () => void }) {
  const { draft, content, setGuestInfo, setProgramme, assignAddOn, setDetails, setConsent } = useBooking();
  const errors = useBookingErrors((s) => s.fields);
  if (!content) return null;

  const err = (i: number, k: keyof GuestInfo) => errors[`guest.${i}.${k}`];
  const programmes = content.programmes.filter((p) => p.destination.includes(draft.destination));
  const guestOptions = Array.from({ length: draft.guests }, (_, g) => ({ value: String(g), label: `Guest ${g + 1}` }));

  const field = (i: number, k: keyof GuestInfo, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className={`bk-field${err(i, k) ? " has-error" : ""}`}>
      <input
        {...props}
        placeholder=" "
        value={String(draft.guestsInfo[i]?.[k] ?? "")}
        onChange={(e) => setGuestInfo(i, { [k]: e.target.value })}
        aria-invalid={!!err(i, k)}
      />
      <span className="bk-field__label">{label}</span>
      {err(i, k) && <span className="bk-field-error">{err(i, k)}</span>}
    </label>
  );

  return (
    <div className="bk-guestform">
      {Array.from({ length: draft.guests }, (_, i) => (
        <section key={i} className="bk-block">
          <h2 className="bk-h2">{i === 0 ? "Main guest" : `Guest ${i + 1}`}</h2>
          <div className="bk-form-grid">
            {i === 0 && (
              <Select
                className="bk-col-3"
                label="Title*"
                options={TITLE_OPTIONS}
                value={draft.guestsInfo[0].title}
                onChange={(title) => setGuestInfo(0, { title })}
                error={err(0, "title")}
              />
            )}
            <div className={i === 0 ? "bk-col-4" : "bk-col-6"}>{field(i, "firstName", "First name*", { autoComplete: i === 0 ? "given-name" : "off" })}</div>
            <div className={i === 0 ? "bk-col-5" : "bk-col-6"}>{field(i, "lastName", "Last name*", { autoComplete: i === 0 ? "family-name" : "off" })}</div>

            {i === 0 && (
              <>
                <div className="bk-col-6">{field(0, "email", "E-mail*", { type: "email", autoComplete: "email" })}</div>
                <div className={`bk-col-6 bk-phone${err(0, "phone") ? " has-error" : ""}`}>
                  <span className="bk-phone__label">Phone number*</span>
                  <CountryCodePicker
                    dial={draft.guestsInfo[0].phonePrefix}
                    iso={draft.guestsInfo[0].phoneCountry}
                    onChange={(c) => setGuestInfo(0, { phonePrefix: c.dial, phoneCountry: c.iso })}
                  />
                  <input type="tel" autoComplete="tel-national" placeholder="123 456 789" value={draft.guestsInfo[0].phone} onChange={(e) => setGuestInfo(0, { phone: e.target.value })} aria-label="Phone number" aria-invalid={!!err(0, "phone")} />
                  {err(0, "phone") && <span className="bk-field-error">{err(0, "phone")}</span>}
                </div>
                <Select
                  className="bk-col-6"
                  label="Nationality*"
                  searchable
                  options={NATIONALITY_OPTIONS}
                  value={draft.guestsInfo[0].nationality}
                  onChange={(nationality) => setGuestInfo(0, { nationality })}
                  error={err(0, "nationality")}
                />
                <div className="bk-col-6">{field(0, "passport", "Passport number (optional)")}</div>
              </>
            )}

            <Select
              className="bk-col-6"
              label="Assigned programme"
              toggleValue
              options={programmes.map((p) => ({ value: p.code, label: p.name }))}
              value={draft.programmes[i] ?? ""}
              onChange={(code) => setProgramme(i, code || null)}
            />
            {draft.addOns
              .map((a, idx) => ({ ...a, idx }))
              .filter((a) => a.guest === i)
              .map((a) => (
                <Select
                  key={a.code + a.idx}
                  className="bk-col-6"
                  label={`Assigned add-on · ${content.addOns.find((x) => x.code === a.code)?.name}`}
                  options={guestOptions}
                  value={String(i)}
                  onChange={(g) => assignAddOn(a.code, i, Number(g))}
                />
              ))}
          </div>
        </section>
      ))}

      <section className="bk-block">
        <h2 className="bk-h2">Additional information</h2>
        <label className="bk-field bk-field--area">
          <textarea rows={2} placeholder=" " maxLength={1000} value={draft.details} onChange={(e) => setDetails(e.target.value)} />
          <span className="bk-field__label">Share allergies, dietary needs, health conditions or arrival time… (optional)</span>
        </label>
      </section>

      <section className="bk-block">
        <h2 className="bk-h2">Cookies & policies</h2>
        <p className="bk-lead">REVA values your privacy. Your information is used solely to process your reservation and provide the services requested.</p>
        <label className={`bk-check${errors.privacy ? " has-error" : ""}`}>
          <input type="checkbox" checked={draft.consents.privacy} onChange={(e) => setConsent("privacy", e.target.checked)} />
          <span>
            I confirm that I have read and accept the{" "}
            <a href="../privacy-policy/" target="_blank">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="../booking-policy/" target="_blank">
              Booking Policy
            </a>
            .*
          </span>
        </label>
        <label className="bk-check">
          <input type="checkbox" checked={draft.consents.marketing} onChange={(e) => setConsent("marketing", e.target.checked)} />
          <span>I would like to receive news and exclusive offers from REVA by Royal Muang Samui Villas.</span>
        </label>
        {errors.privacy && <p className="bk-field-error">{errors.privacy}</p>}
      </section>

      <div className="bk-actions">
        <button type="button" className="bk-btn bk-btn--primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
