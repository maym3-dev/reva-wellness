"use client";

import { useEffect, useRef } from "react";
import { useBooking } from "@/lib/booking/store";
import { useBookingErrors, validateStep } from "@/lib/booking/validate";
import { useLenis } from "@/components/providers/SmoothScroll";
import { ArrowLeft } from "@/components/ui/Icons";
import Stepper from "./Stepper";
import Summary from "./Summary";
import StepStay from "./StepStay";
import StepRooms from "./StepRooms";
import StepAddOns from "./StepAddOns";
import StepGuests from "./StepGuests";
import StepCheckout from "./StepCheckout";

export const STEPS = ["Stay and programmes", "Accommodation", "Add-ons", "Personal details", "Checkout"] as const;

/**
 * SHA "online-reservations" flow: 5 steps on the left, sticky booking summary on
 * the right (bottom sheet on mobile). The draft persists in localStorage and is
 * mirrored to the server, so a refresh or a later visit resumes where you left.
 */
export default function BookingApp() {
  const { draft, content, availability, hydrated, loadContent, ensureMonths, next, goTo } = useBooking();
  const setError = useBookingErrors((s) => s.set);
  const clearErrors = useBookingErrors((s) => s.clear);
  const top = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    loadContent().catch(() => setError("We couldn’t load the booking engine. Please refresh the page."));
  }, [loadContent, setError]);

  // Restore availability for a resumed draft.
  useEffect(() => {
    if (hydrated && draft.destination && draft.dates[0] && draft.dates[1])
      ensureMonths(draft.destination, draft.dates[0], draft.dates[1]).catch(() => {});
  }, [hydrated, draft.destination, draft.dates, ensureMonths]);

  const scrollTop = () => {
    const y = (top.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 80;
    if (lenis) lenis.scrollTo(Math.max(0, y), { duration: 0.8 });
    else window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  const handleContinue = () => {
    const problem = validateStep(draft.step, draft, content, availability[draft.destination] ?? {});
    if (problem) {
      setError(problem.message, problem.fields);
      return;
    }
    clearErrors();
    next();
    scrollTop();
  };

  const back = () => {
    clearErrors();
    goTo((draft.step - 1) as 1 | 2 | 3 | 4);
    scrollTop();
  };

  if (!hydrated || !content) {
    return (
      <div className="bk-loading" aria-busy="true">
        <span className="bk-spinner" />
      </div>
    );
  }

  const steps: React.ComponentType<{ onContinue: () => void }>[] = [StepStay, StepRooms, StepAddOns, StepGuests, StepCheckout];
  const Step = steps[draft.step - 1];

  return (
    <div className="bk-shell" ref={top}>
      <Stepper steps={STEPS} current={draft.step} unlocked={draft.unlockedStep} onGo={(s) => { clearErrors(); goTo(s); }} />
      <div className="bk-grid">
        <section className="bk-content" aria-label={STEPS[draft.step - 1]}>
          {draft.step > 1 && (
            <button type="button" className="bk-back" onClick={back}>
              <ArrowLeft /> Back
            </button>
          )}
          <div className="bk-step" key={draft.step}>
            <Step onContinue={handleContinue} />
          </div>
        </section>
        <Summary onContinue={draft.step < 5 ? handleContinue : undefined} />
      </div>
    </div>
  );
}
