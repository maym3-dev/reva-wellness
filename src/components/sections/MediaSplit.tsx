"use client";

import { useState } from "react";
import type { Cta } from "@/content/types";
import { useHoverVideo } from "@/lib/useHoverVideo";
import { PlayIcon } from "@/components/ui/Icons";
import SmartLink from "@/components/ui/SmartLink";
import VideoModal from "@/components/ui/VideoModal";
import "./big-one.css";

type Props = {
  /** Large italic quote (home) — or use `title` for a regular heading. */
  quote?: string;
  title?: string;
  label?: string;
  text?: string | string[];
  /** Small print under the text (offer terms, booking codes…) */
  note?: string;
  cta?: Cta;
  secondaryCta?: Cta;
  image: string;
  /** If set: hover preview + click opens the lightbox. */
  video?: string;
  theme?: "dark" | "light";
  imageSide?: "right" | "left";
};

/** 50/50 block, text on one side, full-bleed image with optional video on the other. */
export default function MediaSplit({
  quote,
  title,
  label,
  text,
  note,
  cta,
  secondaryCta,
  image,
  video,
  theme = "dark",
  imageSide = "right",
}: Props) {
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const { hostRef, hostProps, stop, mounted, videoProps, visible } = useHoverVideo<HTMLDivElement>(0.5);
  const paragraphs = text ? (Array.isArray(text) ? text : [text]) : [];

  const open = () => {
    if (!video) return;
    stop();
    setModalUrl(video);
  };

  return (
    <section className={`big-one big-one--${theme} big-one--image-${imageSide}`}>
      <div className="big-one__wrapper">
        <div
          ref={hostRef}
          className={`big-one__image-wrapper${video ? " has-video" : ""}`}
          onClick={open}
          {...(video ? hostProps : {})}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" loading="lazy" />
          {video && mounted && (
            <video {...videoProps} className={`big-one__preview-video${visible ? " is-visible" : ""}`} src={video} />
          )}
          {video && (
            <button type="button" className="big-one__play-btn" aria-label="Play video">
              <span className="big-one__play-circle">
                <PlayIcon width={24} height={24} />
              </span>
            </button>
          )}
        </div>

        <div className="big-one__text-wrapper">
          <div className="contenedor big-one__contenedor">
            <div className="big-one__text-content" data-reveal="fade-up">
              {label && <div className="label-M light big-one__label">{label}</div>}
              {quote && (
                <blockquote className="title-L regular big-one__quote">
                  <em>{quote}</em>
                </blockquote>
              )}
              {title && <h2 className="title-L regular big-one__quote">{title}</h2>}
              {paragraphs.map((p) => (
                <p key={p} className="big-one__author">
                  {p}
                </p>
              ))}
              {note && <p className="big-one__note">{note}</p>}
              {(cta || secondaryCta) && (
                <div className="big-one__actions">
                  {cta && (
                    <SmartLink className={`boton ${theme === "dark" ? "boton--ghost" : "boton--primary"}`} href={cta.href}>
                      {cta.label}
                    </SmartLink>
                  )}
                  {secondaryCta && (
                    <SmartLink className={`boton ${theme === "dark" ? "boton--ghost" : "boton--ghost-dark"}`} href={secondaryCta.href}>
                      {secondaryCta.label}
                    </SmartLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <VideoModal url={modalUrl} onClose={() => setModalUrl(null)} />
    </section>
  );
}
