"use client";

import { CheckIcon } from "@/components/ui/Icons";

type Step = 1 | 2 | 3 | 4 | 5;

/** SHA progress line: labels above, circles below; done = filled tick, current = ring. */
export default function Stepper({
  steps,
  current,
  unlocked,
  onGo,
}: {
  steps: readonly string[];
  current: number;
  unlocked: number;
  onGo: (s: Step) => void;
}) {
  return (
    <ol className="bk-stepper" aria-label="Booking steps">
      {steps.map((label, i) => {
        const n = (i + 1) as Step;
        const state = n === current ? "current" : n < current || n <= unlocked ? "done" : "todo";
        const reachable = n <= unlocked && n !== current;
        return (
          <li key={label} className={`bk-stepper__item is-${state}`} aria-current={n === current ? "step" : undefined}>
            <button type="button" className="bk-stepper__btn" disabled={!reachable} onClick={() => onGo(n)}>
              <span className="bk-stepper__label">{label}</span>
              <span className="bk-stepper__dot">{state === "done" && <CheckIcon width={10} height={10} />}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
