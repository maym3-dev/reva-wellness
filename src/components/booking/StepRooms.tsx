"use client";

import { useState } from "react";
import { nightsBetween } from "@/lib/booking/dates";
import { formatMoney, roomStay } from "@/lib/booking/pricing";
import { useBooking } from "@/lib/booking/store";
import { useBookingErrors } from "@/lib/booking/validate";
import type { RoomType } from "@/lib/booking/types";
import { CheckIcon, ChevronLeft, ChevronRight, InfoIcon } from "@/components/ui/Icons";
import Modal from "./Modal";

const PAGE = 5;
const FILTERS = [
  { id: "all", label: "All" },
  { id: "suite", label: "Suites" },
  { id: "villa", label: "Villas" },
] as const;

/** Step 2 — room types with live price for the stay; sold-out / too-small rooms are shown but disabled. */
export default function StepRooms({ onContinue }: { onContinue: () => void }) {
  const { draft, content, availability, loading, setRoom } = useBooking();
  const fieldErrors = useBookingErrors((s) => s.fields);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [page, setPage] = useState(0);
  const [info, setInfo] = useState<RoomType | null>(null);
  if (!content) return null;

  const dest = content.destinations.find((d) => d.code === draft.destination)!;
  const nights = draft.dates[0] && draft.dates[1] ? nightsBetween(draft.dates[0], draft.dates[1]) : 0;
  const avail = availability[draft.destination] ?? {};
  const rooms = content.rooms
    .filter((r) => r.destination === draft.destination && (filter === "all" || r.category === filter))
    .map((r) => ({ room: r, stay: roomStay(r.code, draft, avail), fits: draft.guests <= r.maxGuests }))
    // available rooms first, then by price
    .sort((a, b) => Number(!!b.stay && b.fits) - Number(!!a.stay && a.fits) || (a.stay?.perNight ?? 9e9) - (b.stay?.perNight ?? 9e9));
  const pages = Math.max(1, Math.ceil(rooms.length / PAGE));
  const shown = rooms.slice(page * PAGE, page * PAGE + PAGE);

  return (
    <div className="bk-rooms">
      <h2 className="bk-h2 bk-h2--italic">Choose your accommodation</h2>
      <div className="bk-tabs" role="tablist" aria-label="Room type">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" role="tab" aria-selected={filter === f.id} className={`bk-tab${filter === f.id ? " is-active" : ""}`} onClick={() => { setFilter(f.id); setPage(0); }}>
            {f.label}
          </button>
        ))}
      </div>
      {fieldErrors.room && <p className="bk-field-error">{fieldErrors.room}</p>}
      {loading > 0 && !Object.keys(avail).length ? (
        <div className="bk-loading bk-loading--inline">
          <span className="bk-spinner" />
        </div>
      ) : (
        <ul className="bk-cards">
          {shown.map(({ room, stay, fits }) => {
            const selected = draft.room === room.code;
            const bookable = !!stay && fits;
            return (
              <li key={room.code} className={`bk-card bk-room${selected ? " is-selected" : ""}${bookable ? "" : " is-unavailable"}`}>
                <Gallery images={room.images} name={room.name} />
                <div className="bk-card__body">
                  <h3 className="bk-card__title">
                    {room.name}
                    <button type="button" className="bk-info" aria-label={`About ${room.name}`} onClick={() => setInfo(room)}>
                      <InfoIcon />
                    </button>
                  </h3>
                  <p className="bk-room__meta">
                    {room.size} · {room.bed} · up to {room.maxGuests} guests
                  </p>
                  <p className="bk-card__text bk-clamp">{room.desc}</p>
                  <div className="bk-card__foot">
                    <div className="bk-price">
                      {stay ? (
                        <>
                          <span className="bk-price__main">
                            {formatMoney(stay.perNight, dest.currency)} <em>/ night</em>
                          </span>
                          <span className="bk-price__sub">
                            <em>
                              {formatMoney(stay.total, dest.currency)} / {nights} nights
                            </em>
                          </span>
                        </>
                      ) : (
                        <span className="bk-price__warn">Not available for your dates</span>
                      )}
                      {stay && !fits && <span className="bk-price__warn">Up to {room.maxGuests} guests</span>}
                    </div>
                    <button type="button" className={`bk-btn ${selected ? "bk-btn--primary" : "bk-btn--outline"}`} disabled={!bookable} onClick={() => setRoom(selected ? "" : room.code)}>
                      {selected ? (
                        <>
                          <CheckIcon width={14} height={14} /> Selected
                        </>
                      ) : (
                        "Select"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {pages > 1 && (
        <div className="bk-pager">
          <button type="button" className="bk-icon-btn" aria-label="Previous page" disabled={page === 0} onClick={() => setPage(page - 1)}>
            <ChevronLeft />
          </button>
          <span>
            {page + 1} of {pages}
          </span>
          <button type="button" className="bk-icon-btn" aria-label="Next page" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>
            <ChevronRight />
          </button>
        </div>
      )}
      <div className="bk-actions">
        <button type="button" className="bk-btn bk-btn--primary" onClick={onContinue}>
          Continue
        </button>
      </div>

      <Modal open={!!info} onClose={() => setInfo(null)} title={info?.name ?? ""}>
        {info && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bk-modal__img" src={info.images[0]} alt="" />
            <p className="bk-modal__lead">{info.desc}</p>
            <ul className="bk-modal__facts">
              <li>{info.size}</li>
              <li>{info.bed}</li>
              <li>Up to {info.maxGuests} guests</li>
            </ul>
            <div className="bk-modal__group">
              <h4>Highlights</h4>
              <ul>
                {info.features.map((f) => (
                  <li key={f}>
                    <CheckIcon width={14} height={14} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

/** Small image carousel with dots (room cards). */
function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="bk-gallery">
      {images.map((src, n) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt={n === i ? name : ""} className={n === i ? "is-active" : ""} loading="lazy" />
      ))}
      {images.length > 1 && (
        <>
          <button type="button" className="bk-gallery__nav bk-gallery__nav--prev" aria-label="Previous photo" onClick={() => setI((i - 1 + images.length) % images.length)}>
            <ChevronLeft width={14} height={14} />
          </button>
          <button type="button" className="bk-gallery__nav bk-gallery__nav--next" aria-label="Next photo" onClick={() => setI((i + 1) % images.length)}>
            <ChevronRight width={14} height={14} />
          </button>
          <div className="bk-gallery__dots" aria-hidden>
            {images.map((src, n) => (
              <span key={src} className={n === i ? "is-active" : ""} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
