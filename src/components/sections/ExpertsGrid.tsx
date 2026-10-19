"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { experts, type GuestStory } from "@/content/site";
import { useLenis } from "@/components/providers/SmoothScroll";
import VideoModal from "@/components/ui/VideoModal";
import { CloseIcon, PlayIcon } from "@/components/ui/Icons";
import "./experts.css";

/**
 * SHA "experts" masonry: 5-column grid of people cards that rise in with a
 * staggered delay; image zooms on hover; video tiles open a lightbox, the rest
 * open a full-bleed story card.
 */
export default function ExpertsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [story, setStory] = useState<GuestStory | null>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".masonry-item");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }),
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const tiles = experts.items.map((p, i) => (
    <button
      key={p.name}
      type="button"
      className={`masonry-item masonry-item--card expert-${i + 1}${p.video ? " has-video" : ""}`}
      onClick={() => (p.video ? setVideo(p.video) : setStory(p))}
      aria-label={p.video ? `Play ${p.name}'s video` : `Read ${p.name}'s story`}
    >
      <div className="people-card" style={{ "--bg-image": `url(${p.image})` } as React.CSSProperties}>
        {p.video && (
          <span className="people-card__play" aria-hidden>
            <PlayIcon width={14} height={14} />
          </span>
        )}
        <div className="people-card__info">
          <div className="subtitle-S regular">{p.name}</div>
          <p className="people-card__title">{p.role}</p>
        </div>
      </div>
    </button>
  ));

  return (
    <section className="experts">
      <div className="contenedor">
        <div className="experts__masonry" ref={gridRef}>
          <div className="masonry-item masonry-item--text">
            <div className="line-title">
              <span className="line-title__line" aria-hidden />
              <h3 className="line-title__text title-L">
                <em>
                  {experts.heading[0]}
                  <br />
                  {experts.heading[1]}
                </em>
              </h3>
            </div>
            <p className="regular experts__text">{experts.text}</p>
          </div>
          {tiles.slice(0, 4)}
          <div className="masonry-item masonry-item--empty" aria-hidden />
          {tiles.slice(4)}
        </div>
      </div>

      <VideoModal url={video} onClose={() => setVideo(null)} />
      <StoryModal story={story} onClose={() => setStory(null)} />
    </section>
  );
}

function StoryModal({ story, onClose }: { story: GuestStory | null; onClose: () => void }) {
  const lenis = useLenis();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!story) return;
    lenis?.stop();
    const raf = requestAnimationFrame(() => setActive(true));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      setActive(false);
      lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [story, lenis, onClose]);

  if (!story) return null;
  return createPortal(
    <div
      className={`video-modal story-modal${active ? " is-active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={story.name}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="story-modal__container" style={{ backgroundImage: `url(${story.image})` }}>
        <button type="button" className="video-modal__close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="story-modal__content">
          <div className="title-M regular">{story.name}</div>
          <p className="story-modal__role">{story.role}</p>
          <p className="story-modal__quote">
            <em>{story.quote}</em>
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
