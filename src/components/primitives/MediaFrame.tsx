"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/cn";

export type MediaAspect =
  | "cinema" // 2.39:1, anamorphic
  | "wide" // 16:9
  | "classic" // 4:3
  | "photo" // 4:5: the standard portrait crop
  | "portrait" // 3:4
  | "tall" // 2:3
  | "square"
  | "fill"; // parent controls height

const ASPECT_CLASS: Record<MediaAspect, string> = {
  cinema: "aspect-[2.39/1]",
  wide: "aspect-video",
  classic: "aspect-[4/3]",
  photo: "aspect-[4/5]",
  portrait: "aspect-[3/4]",
  tall: "aspect-[2/3]",
  square: "aspect-square",
  fill: "h-full",
};

export type MediaFrameProps = {
  /**
   * Path to a real SageView asset (e.g. "/media/makoko-01.jpg").
   * Leave undefined until the asset exists: the frame then renders a clearly
   * marked placeholder rather than passing stock imagery off as SageView work.
   */
  src?: string;
  /** Always required: describes what belongs in this frame. */
  alt: string;
  aspect?: MediaAspect;
  /** Visible caption printed beneath the frame. */
  caption?: string;
  /** Small mono label printed inside the frame's top-left corner. */
  label?: string;
  /** Loads eagerly with high priority, use only for above-the-fold frames. */
  priority?: boolean;
  /** Responsive `sizes` hint. Defaults to a sensible full-width-ish value. */
  sizes?: string;
  className?: string;
  /** Applies a slow zoom on hover of the nearest `.group` ancestor. */
  interactive?: boolean;
};

/**
 * The single image component for the whole site.
 *
 * Three states, all designed:
 *   1. Real asset      , optimised, lazy, responsive <Image />
 *   2. No asset yet    , a cinematic, clearly-labelled placeholder
 *   3. Asset failed    , falls back to state 2 rather than a broken icon
 *
 * Swapping placeholders for real work is a one-line change per frame: add
 * `src`. Nothing else in the page needs to move.
 */
export function MediaFrame({
  src,
  alt,
  aspect = "wide",
  caption,
  label,
  priority = false,
  sizes = "(min-width: 1280px) 60vw, (min-width: 768px) 80vw, 100vw",
  className,
  interactive = true,
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  return (
    <figure className={cn("group/frame m-0", className)}>
      <div
        className={cn(
          "relative isolate w-full overflow-hidden bg-charcoal",
          ASPECT_CLASS[aspect],
        )}
      >
        {showPlaceholder ? (
          <PlaceholderSurface alt={alt} label={label} failed={failed} />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            onError={() => setFailed(true)}
            className={cn(
              "object-cover",
              interactive &&
                "transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.04]",
            )}
          />
        )}

        {label && !showPlaceholder ? (
          <span className="eyebrow absolute top-4 left-4 z-10 text-bone/70 mix-blend-difference">
            {label}
          </span>
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

/**
 * The placeholder surface.
 *
 * It is deliberately handsome: this site will be shown to clients before the
 * photography exists, but it never pretends to be a photograph. The framing
 * marks and the explicit label make its status unambiguous.
 */
function PlaceholderSurface({
  alt,
  label,
  failed,
}: {
  alt: string;
  label?: string;
  failed: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 flex flex-col justify-between overflow-hidden p-4 sm:p-6"
    >
      {/* Layered cinematic ground, no image request.
          Kept a clear step lighter than the page so a reserved frame reads as
          a deliberate slot rather than a hole in the layout. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_110%_at_22%_0%,#333b3d_0%,#212729_45%,#121718_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 bg-[linear-gradient(115deg,transparent_32%,rgba(194,160,90,0.22)_50%,transparent_68%)]"
      />
      {/* Fine registration grid, reads as a framing chart, not decoration. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.09] bg-[linear-gradient(to_right,#e9e5dd_1px,transparent_1px),linear-gradient(to_bottom,#e9e5dd_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      {/* Framing marks. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-4">
        <span className="absolute top-0 left-0 h-4 w-4 border-t border-l border-bone/40" />
        <span className="absolute top-0 right-0 h-4 w-4 border-t border-r border-bone/40" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-bone/40" />
        <span className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-bone/40" />
        {/* Centre framing cross: the visual cue that this is a reserved frame. */}
        <span className="absolute top-1/2 left-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-bone/20" />
        <span className="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-bone/20" />
      </div>

      <span className="eyebrow-muted relative z-10">
        {label ?? (failed ? "Media unavailable" : "Asset placeholder")}
      </span>

      <span className="relative z-10 max-w-md text-body-sm leading-snug text-mist">
        {failed
          ? "This image could not be loaded. The frame is reserved and the asset can be replaced without any layout change."
          : alt}
      </span>
    </div>
  );
}
