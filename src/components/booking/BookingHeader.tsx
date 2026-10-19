"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/content/site";
import { useBooking } from "@/lib/booking/store";
import { useBookingErrors } from "@/lib/booking/validate";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import AccessDialog from "./AccessDialog";
import ConfirmDialog from "./ConfirmDialog";

/** SHA booking header: language left, logo centre, Reset / My booking / contact right. */
export default function BookingHeader() {
  const reset = useBooking((s) => s.reset);
  const clearErrors = useBookingErrors((s) => s.clear);
  const router = useRouter();
  const pathname = usePathname();
  const hasSelection = useBooking((s) => !!s.draft.destination);
  const [confirming, setConfirming] = useState(false);
  const closeConfirm = useCallback(() => setConfirming(false), []);
  const [access, setAccess] = useState(false);
  const closeAccess = useCallback(() => setAccess(false), []);

  const startOver = () => {
    setConfirming(false);
    reset();
    clearErrors();
    if (!pathname.endsWith("/online-reservations/")) router.push("/online-reservations/");
  };

  return (
    <header className="bk-header">
      <div className="bk-header__inner">
        <div className="bk-header__left">
          <span className="bk-header__lang">EN</span>
        </div>
        <Link href="/" className="bk-header__logo" aria-label={`${site.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.logo} alt={site.fullName} width={500} height={283} />
        </Link>
        <nav className="bk-header__right" aria-label="Booking">
          <button
            type="button"
            className="bk-header__link"
            onClick={() => (hasSelection ? setConfirming(true) : startOver())}
          >
            Reset
          </button>
          <span className="bk-header__sep" aria-hidden />
          <button type="button" className="bk-header__link" aria-haspopup="dialog" onClick={() => setAccess(true)}>
            My booking
          </button>
          <span className="bk-header__sep bk-hide-sm" aria-hidden />
          <a className="bk-header__icon bk-hide-sm" href={`tel:${site.phone.replace(/\s/g, "")}`} aria-label={`Call ${site.phone}`}>
            <PhoneIcon />
          </a>
          <a className="bk-header__icon bk-hide-sm" href={site.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
        </nav>
      </div>
      <AccessDialog open={access} onClose={closeAccess} />
      <ConfirmDialog
        open={confirming}
        title="Start your booking over?"
        text="You will lose your dates, room and wellness programmes, along with the price you’ve secured today. It may not be available if you search again."
        cancelLabel="Keep my selection"
        confirmLabel="Clear and start over"
        onCancel={closeConfirm}
        onConfirm={startOver}
      />
    </header>
  );
}
