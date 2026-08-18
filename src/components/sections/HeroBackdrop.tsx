"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export type HeroFrame = {
  /** Path to a SageView still. */
  src?: string;
  alt: string;
};

export type HeroVideo = {
  mp4: string;
  webm?: string;
  /** Shown before the film loads, and instead of it under reduced motion. */
  poster: string;
  alt: string;
};

/**
 * The cinematic ground behind a hero.
 *
 * Three modes, in order of preference:
 *
 *   • `video`   - a silent looping film over its own poster still.
 *   • `frames`  - a slow cross-fading image sequence with a Ken Burns drift.
 *   • neither   - a designed dark ground, so a page without art still reads
 *                 as deliberate rather than broken.
 *
 * The film is muted, `playsInline` and loops: it can never surprise a visitor
 * with sound. Under `prefers-reduced-motion` it is not loaded at all and the
 * poster still is shown instead, which also saves the download.
 */
export function HeroBackdrop({
  frames = [],
  video,
  reservedNote = "Film reserved - SageView showreel",
}: {
  frames?: readonly HeroFrame[];
  video?: HeroVideo;
  reservedNote?: string;
}) {
  const available = frames.filter(
    (frame): frame is HeroFrame & { src: string } => Boolean(frame.src),
  );
  const [active, setActive] = useState(0);
  const [motionOk, setMotionOk] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Decide about motion on the client only, so the server render is stable.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (video || available.length < 2 || !motionOk) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % available.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [available.length, motionOk, video]);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {video ? (
        <>
          {/* Poster sits underneath so there is never a black flash while the
              film buffers, and it is all that shows under reduced motion. */}
          <Image
            src={video.poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {motionOk ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={video.poster}
              className="absolute inset-0 h-full w-full object-cover"
            >
              {video.webm ? <source src={video.webm} type="video/webm" /> : null}
              <source src={video.mp4} type="video/mp4" />
            </video>
          ) : null}
        </>
      ) : available.length > 0 ? (
        available.map((frame, index) => (
          <Image
            key={frame.src}
            src={frame.src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-opacity duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              index === active ? "opacity-100" : "opacity-0",
            )}
            style={
              motionOk
                ? {
                    transform: index === active ? "scale(1.06)" : "scale(1)",
                    transition:
                      "opacity 2000ms cubic-bezier(0.22,1,0.36,1), transform 9000ms linear",
                  }
                : undefined
            }
          />
        ))
      ) : (
        <DesignedGround note={reservedNote} />
      )}

      {/* Cinematic grade over whatever sits beneath. */}
      <div className="cinema-vignette absolute inset-0" />
    </div>
  );
}

function DesignedGround({ note }: { note: string }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(130%_110%_at_18%_-10%,#232a2c_0%,#141819_42%,#07090a_100%)]" />
      <div className="absolute inset-0 opacity-[0.5] bg-[radial-gradient(60%_60%_at_78%_18%,rgba(194,160,90,0.22)_0%,transparent_62%)]" />
      <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#e9e5dd_1px,transparent_1px),linear-gradient(to_bottom,#e9e5dd_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-x-0 top-[38%] h-px bg-[linear-gradient(to_right,transparent,rgba(217,187,124,0.35),transparent)]" />
      <p className="eyebrow-muted absolute right-[var(--spacing-gutter)] bottom-8 hidden text-right sm:block">
        {note}
      </p>
    </div>
  );
}
