"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { MediaFrame, type MediaAspect } from "./MediaFrame";

type VideoFrameProps = {
  /** Path to the video file, e.g. "/media/makoko-reel.mp4". */
  src?: string;
  /** Still shown before playback and while the video loads. */
  poster?: string;
  /** Describes the video for assistive technology and placeholder states. */
  alt: string;
  label?: string;
  caption?: string;
  aspect?: MediaAspect;
  className?: string;
};

/**
 * Click-to-play cinematic video frame.
 *
 * Nothing is downloaded until the visitor asks for it (`preload="none"`), which
 * matters on a video-led site over a mobile connection. With no `src` supplied
 * it degrades to the same clearly-marked placeholder used for images, carrying
 * a "video" label so the reserved slot is obvious.
 */
export function VideoFrame({
  src,
  poster,
  alt,
  label = "Film",
  caption,
  aspect = "cinema",
  className,
}: VideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <MediaFrame
        src={poster}
        alt={alt}
        aspect={aspect}
        caption={caption}
        label={errored ? "Video unavailable" : `${label}, placeholder`}
        className={className}
        interactive={false}
      />
    );
  }

  return (
    <figure className={cn("m-0", className)}>
      <div className="relative isolate w-full overflow-hidden bg-charcoal">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controls={started}
          onError={() => setErrored(true)}
          className={cn(
            "w-full",
            aspect === "cinema" ? "aspect-[2.39/1]" : "aspect-video",
            "object-cover",
          )}
        >
          {/* Falls back to a direct link if the element is unsupported. */}
          <a href={src} download>
            Download the video
          </a>
        </video>

        {!started ? (
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              void videoRef.current?.play();
            }}
            className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-void/35 transition-colors duration-500 hover:bg-void/15 focus-visible:bg-void/15"
          >
            <span className="sr-only">Play film: {alt}</span>
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/40 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:border-brass sm:h-20 sm:w-20"
            >
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-5 w-5 fill-bone transition-colors duration-500 group-hover:fill-brass"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        ) : null}
      </div>

      {caption ? (
        <figcaption className="eyebrow-muted mt-3 flex items-center gap-2">
          <span aria-hidden="true" className="h-px w-6 bg-ash/50" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
