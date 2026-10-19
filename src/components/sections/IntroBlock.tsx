"use client";

import { useState } from "react";
import type { Cta, Fact, Heading } from "@/content/types";
import HeadingText from "@/components/ui/HeadingText";
import SmartLink from "@/components/ui/SmartLink";
import VideoModal from "@/components/ui/VideoModal";
import { PlayIcon } from "@/components/ui/Icons";
import "./big-one.css";
import "./intro-block.css";

type Props = {
  lineTitle?: string;
  heading?: Heading;
  text: string | string[];
  facts?: Fact[];
  cta?: Cta;
  /** Wide image under the copy; with `video`, a play button opens the lightbox. */
  image?: string;
  video?: string;
  align?: "center" | "split";
  tone?: "white" | "light";
};

/**
 * SHA "intro-programa": line-title, big uppercase heading, centred copy that
 * fades up, an optional facts row and a full-width media frame below.
 */
export default function IntroBlock({
  lineTitle,
  heading,
  text,
  facts,
  cta,
  image,
  video,
  align = "center",
  tone = "white",
}: Props) {
  const [modal, setModal] = useState<string | null>(null);
  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <section className={`intro-block intro-block--${align} intro-block--${tone}`}>
      <div className="contenedor intro-block__inner">
        <div className="intro-block__head">
          {lineTitle && (
            <div className="line-title intro-block__line">
              <span className="line-title__line" aria-hidden />
              <span className="line-title__text label-M">{lineTitle}</span>
            </div>
          )}
          {heading && (
            <h2 className="headline-S light intro-block__heading" data-reveal="fade-up">
              <HeadingText h={heading} />
            </h2>
          )}
        </div>
        <div className="intro-block__body" data-reveal="fade-up" data-reveal-delay="150">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {cta && (
            <SmartLink className="boton boton--ghost-dark intro-block__cta" href={cta.href}>
              {cta.label}
            </SmartLink>
          )}
        </div>
      </div>

      {facts && facts.length > 0 && (
        <div className="contenedor">
          <dl className="intro-block__facts">
            {facts.map((f, i) => (
              <div key={f.label} className="intro-block__fact" data-reveal="fade-up" data-reveal-delay={String(i * 100)}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {image && (
        <div className="contenedor">
          <div
            className={`intro-block__media${video ? " has-video" : ""}`}
            data-reveal="fade-up"
            onClick={() => video && setModal(video)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" loading="lazy" />
            {video && (
              <button type="button" className="big-one__play-btn" aria-label="Play video">
                <span className="big-one__play-circle">
                  <PlayIcon width={24} height={24} />
                </span>
              </button>
            )}
          </div>
        </div>
      )}
      <VideoModal url={modal} onClose={() => setModal(null)} />
    </section>
  );
}
