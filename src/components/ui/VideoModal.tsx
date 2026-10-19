"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/providers/SmoothScroll";
import { CloseIcon } from "./Icons";
import "./video-modal.css";

/** Extracts a YouTube id from watch / youtu.be / embed URLs. */
function youTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m?.[1] ?? null;
}

/**
 * Blurred full-screen video lightbox (media split / experts modal).
 * Accepts self-hosted MP4 or YouTube URLs. Esc or backdrop click closes.
 */
export default function VideoModal({ url, onClose }: { url: string | null; onClose: () => void }) {
  const lenis = useLenis();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!url) return;
    lenis?.stop();
    document.documentElement.classList.add("is-locked");
    const raf = requestAnimationFrame(() => setActive(true));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      setActive(false);
      lenis?.start();
      document.documentElement.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [url, lenis, onClose]);

  if (!url) return null;
  const yt = youTubeId(url);

  return createPortal(
    <div
      className={`video-modal${active ? " is-active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Video"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="video-modal__container">
        <button type="button" className="video-modal__close" aria-label="Close video" onClick={onClose}>
          <CloseIcon />
        </button>
        {yt ? (
          <iframe
            src={`https://www.youtube.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Video"
          />
        ) : (
          <video src={url} autoPlay controls playsInline controlsList="nodownload" />
        )}
      </div>
    </div>,
    document.body,
  );
}
