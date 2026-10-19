"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { bookingApi } from "@/lib/booking/client";
import Dialog from "./Dialog";

/**
 * "Access my booking": reference + main guest's passport/ID, then an
 * access link is e-mailed. The mock has no mailer, so it offers the link directly.
 */
export default function AccessDialog({ open, onClose, initialLocator = "" }: { open: boolean; onClose: () => void; initialLocator?: string }) {
  return open ? <AccessDialogInner onClose={onClose} initialLocator={initialLocator} /> : null;
}

function AccessDialogInner({ onClose, initialLocator }: { onClose: () => void; initialLocator: string }) {
  const router = useRouter();
  const [locator, setLocator] = useState(initialLocator);
  const [identifier, setIdentifier] = useState("");
  const [help, setHelp] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<{ sentTo: string; previewToken?: string } | null>(null);

  // the form unmounts on success: move focus to the next action
  useEffect(() => {
    if (sent) document.querySelector<HTMLElement>(".bk-access [data-autofocus]")?.focus();
  }, [sent]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locator.trim() || !identifier.trim()) {
      setError("Enter your booking reference and the main guest’s passport or ID number.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      setSent(await bookingApi.requestAccess(locator, identifier));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const openLink = () => {
    onClose();
    router.push(`/online-reservations/my-booking/?token=${sent!.previewToken}`);
  };

  return (
    <Dialog open onClose={onClose} labelledBy="bk-access-title" className="bk-access">
      {!sent ? (
        <form onSubmit={submit} noValidate>
          <div className="bk-dialog__body">
            <h3 id="bk-access-title">Access my booking</h3>
            <p>Accessing your booking will allow you to request modifications or cancellations.</p>
            <p>Enter your reservation details. For security reasons, we will send an access link to the email address associated with the reservation.</p>
            <div className="bk-access__fields">
              <label className="bk-field">
                <input value={locator} onChange={(e) => setLocator(e.target.value)} placeholder=" " autoComplete="off" autoCapitalize="characters" />
                <span className="bk-field__label">Booking reference</span>
              </label>
              <label className="bk-field">
                <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder=" " autoComplete="off" />
                <span className="bk-field__label">Main guest’s passport or ID number</span>
              </label>
            </div>
            {error && (
              <p className="bk-field-error" role="alert">
                {error}
              </p>
            )}
            <button type="button" className="bk-link bk-access__help-toggle" aria-expanded={help} onClick={() => setHelp(!help)}>
              Where can I find my booking reference?
            </button>
            {help && (
              <p className="bk-access__help">
                It’s in your confirmation e-mail and on the confirmation page, and starts with “RV-” (e.g. RV-AB12CD34). If you didn’t add a passport number when booking, use the main guest’s e-mail instead.
              </p>
            )}
          </div>
          <div className="bk-dialog__foot">
            <button type="submit" className="bk-btn bk-btn--primary" disabled={busy}>
              {busy ? <span className="bk-spinner bk-spinner--light" /> : "Send access link"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="bk-dialog__body">
            <h3 id="bk-access-title">Check your inbox</h3>
            <p>
              We’ve sent an access link to <strong>{sent.sentTo}</strong>. It’s valid for 30 minutes.
            </p>
            {sent.previewToken && <p className="bk-note-small">Mock mode — no e-mail is sent. Use the button below to open the link.</p>}
          </div>
          <div className="bk-dialog__foot">
            {sent.previewToken ? (
              <button type="button" className="bk-btn bk-btn--primary" data-autofocus onClick={openLink}>
                Open access link
              </button>
            ) : (
              <button type="button" className="bk-btn bk-btn--primary" data-autofocus onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </>
      )}
    </Dialog>
  );
}
