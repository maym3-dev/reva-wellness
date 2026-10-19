"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/types";
import Disclosure from "@/components/ui/Disclosure";

/** One answer open at a time — opening a question closes the previous one. */
export default function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      {items.map((it, i) => (
        <Disclosure key={it.q} title={it.q} size="lg" open={open === i} onToggle={(o) => setOpen(o ? i : null)}>
          {(Array.isArray(it.a) ? it.a : [it.a]).map((p) => (
            <p key={p} className="faq__answer">
              {p}
            </p>
          ))}
        </Disclosure>
      ))}
    </>
  );
}
