type P = React.SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ChevronDown = (p: P) => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden {...base} {...p}>
    <path d="M1.5 3.5 5 7l3.5-3.5" />
  </svg>
);

export const ChevronRight = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...base} {...p}>
    <path d="m6 3 5 5-5 5" />
  </svg>
);

export const ChevronLeft = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...base} {...p}>
    <path d="m10 3-5 5 5 5" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...base} {...p}>
    <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...base} {...p}>
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
  </svg>
);

export const PlayIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...p}>
    <path d="M4.5 2.8v10.4L13 8z" fill="currentColor" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden {...base} {...p}>
    <path d="m4 4 12 12M16 4 4 16" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden {...base} strokeWidth={1.4} {...p}>
    <path d="M5 3h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 7.1 7.1l1.4-2.3L21 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden {...base} strokeWidth={1.4} {...p}>
    <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.2Z" />
    <path d="M9 8.5c0 3.5 2.6 6.5 6.5 6.5l1-1.6-2-1-1 .9c-1.2-.5-2.3-1.6-2.8-2.8l.9-1-1-2Z" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...base} {...p}>
    <path d="M8 2v12M2 8h12" />
  </svg>
);

export const MinusIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...base} {...p}>
    <path d="M2 8h12" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...base} {...p}>
    <path d="m2.5 8.5 3.5 3.5 7.5-8" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden {...base} {...p}>
    <rect x="3" y="4" width="14" height="13" rx="1.5" />
    <path d="M3 8h14M7 2.5v3M13 2.5v3" />
  </svg>
);

export const InfoIcon = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden {...base} {...p}>
    <circle cx="8" cy="8" r="6.5" />
    <path d="M8 7v4.5M8 4.8v.2" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...base} {...p}>
    <path d="M14 8H2M6.5 3.5 2 8l4.5 4.5" />
  </svg>
);

/** Thin-line KPI icons. */
export const KpiIcon = ({ name, ...p }: P & { name: string }) => {
  const paths: Record<string, React.ReactNode> = {
    villa: (
      <>
        <path d="M4 18 20 6l16 12" />
        <path d="M8 15v19h24V15" />
        <path d="M17 34v-9h6v9" />
      </>
    ),
    leaf: (
      <>
        <path d="M8 32C8 16 18 8 34 8c0 16-8 26-24 26" />
        <path d="M8 32 24 16" />
      </>
    ),
    dining: (
      <>
        <path d="M12 6v28M8 6v8a4 4 0 0 0 8 0V6" />
        <path d="M28 34V6c-4 2-6 8-6 14h6" />
      </>
    ),
    spa: (
      <>
        <path d="M20 8c4 5 6 9 6 13a6 6 0 0 1-12 0c0-4 2-8 6-13Z" />
        <path d="M6 24c0 7 6 10 14 10s14-3 14-10" />
      </>
    ),
    wave: (
      <>
        <path d="M4 16c4-4 8-4 12 0s8 4 12 0 6-3 8-2" />
        <path d="M4 26c4-4 8-4 12 0s8 4 12 0 6-3 8-2" />
      </>
    ),
    sun: (
      <>
        <circle cx="20" cy="20" r="7" />
        <path d="M20 4v5M20 31v5M4 20h5M31 20h5M8.7 8.7l3.5 3.5M27.8 27.8l3.5 3.5M8.7 31.3l3.5-3.5M27.8 12.2l3.5-3.5" />
      </>
    ),
    bed: (
      <>
        <path d="M4 30V10M4 22h32v8M36 22v-4a4 4 0 0 0-4-4H18v8" />
        <circle cx="11" cy="17" r="3" />
      </>
    ),
    guests: (
      <>
        <circle cx="15" cy="13" r="5" />
        <path d="M5 33c0-6 4-10 10-10s10 4 10 10" />
        <path d="M26 9a5 5 0 0 1 0 9M29 23c4 1 6 5 6 10" />
      </>
    ),
    clock: (
      <>
        <circle cx="20" cy="20" r="15" />
        <path d="M20 11v9l6 4" />
      </>
    ),
    star: <path d="m20 5 4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3L20 28.6l-9.3 4.9 1.8-10.3L5 15.9l10.4-1.5Z" />,
    gift: (
      <>
        <path d="M6 16h28v6H6zM8 22h24v13H8zM20 16v19" />
        <path d="M20 16c-6 0-9-6-5-7s5 7 5 7 1-8 5-7-1 7-5 7" />
      </>
    ),
    key: (
      <>
        <circle cx="13" cy="20" r="7" />
        <path d="M20 20h15M30 20v5M35 20v4" />
      </>
    ),
    car: (
      <>
        <path d="M5 26v-6l4-8h22l4 8v6H5Z" />
        <circle cx="12" cy="28" r="3" />
        <circle cx="28" cy="28" r="3" />
        <path d="M5 20h30" />
      </>
    ),
    heart: <path d="M20 34S5 25 5 15a8 8 0 0 1 15-4 8 8 0 0 1 15 4c0 10-15 19-15 19Z" />,
    calendar: (
      <>
        <rect x="5" y="8" width="30" height="27" rx="2" />
        <path d="M5 16h30M13 4v8M27 4v8" />
      </>
    ),
    map: (
      <>
        <path d="M20 35s-11-10-11-19a11 11 0 0 1 22 0c0 9-11 19-11 19Z" />
        <circle cx="20" cy="16" r="4" />
      </>
    ),
    pool: (
      <>
        <path d="M12 26V8a3 3 0 0 1 6 0M24 26V8a3 3 0 0 1 6 0M12 14h12M12 20h12" />
        <path d="M4 30c3-2 6-2 9 0s6 2 9 0 6-2 9 0 4 1 5 1" />
      </>
    ),
  };
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden {...base} strokeWidth={1} {...p}>
      {paths[name] ?? paths.spa}
    </svg>
  );
};
