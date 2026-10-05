import Link from "next/link";

import { cn } from "@/lib/cn";
import { film } from "@/content/media";
import { primaryAction, site } from "@/content/site";

/**
 * Letterform hero.
 *
 * The film plays behind a solid black plate, and the word SAGEVIEW is cut out
 * of that plate, so the footage is visible only inside the letters. For a
 * visual communication company it states the whole idea of the business in one
 * image: the picture and the language are the same object.
 *
 * Done with an SVG mask rather than `background-clip: text`, because that
 * property cannot take a video as its source. White in the mask keeps the
 * plate, black punches through it, so the text is painted black over a white
 * rect and the result is a knockout.
 *
 * Sizing is the whole trick. `meet` scales the word to fit rather than
 * cropping it, and the plate is drawn far outside the viewBox so it still
 * covers the section once the viewBox has been letterboxed inside it. The
 * mask's white ground is drawn to the same extent, or the uncovered area
 * would punch through as a second, accidental window. `textLength` pins the
 * word to a fixed share of the width, so it fills the frame identically
 * whatever metrics the display face happens to load with.
 *
 * Inline SVG rather than a CSS mask from a data URI, because a data URI gets
 * no access to the page's webfonts and would cut the letters in a fallback
 * typeface.
 *
 * Below the fold the plate lifts away under a scroll-linked animation, which
 * is the aperture opening onto the full frame.
 */
export function LetterformHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex hero-viewport flex-col overflow-hidden bg-[var(--color-black)]"
    >
      <video
        aria-hidden="true"
        className="media-cover hero-film -z-20"
        poster={film.heroLoop.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={film.heroLoop.webm} type="video/webm" />
        <source src={film.heroLoop.mp4} type="video/mp4" />
      </video>

      {/*
        The knockout plate. aria-hidden because the heading below carries the
        accessible name: this is the picture of the word, not the word.
      */}
      <svg
        aria-hidden="true"
        className="hero-plate absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1000 300"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id="sageview-knockout">
            <rect x="-3000" y="-3000" width="7000" height="7000" fill="white" />
            <text
              x="500"
              y="196"
              textAnchor="middle"
              textLength="940"
              lengthAdjust="spacingAndGlyphs"
              className="hero-cut"
              fill="black"
            >
              SAGEVIEW
            </text>
          </mask>
        </defs>

        <rect
          x="-3000"
          y="-3000"
          width="7000"
          height="7000"
          fill="var(--color-black)"
          mask="url(#sageview-knockout)"
        />
      </svg>

      <div className="relative flex flex-1 flex-col justify-between py-28 md:py-32">
        <div className="container-wide">
          <p className="eyebrow">{site.name}</p>
        </div>

        {/* The visible heading for assistive technology and for search. */}
        <h1 id="hero-heading" className="sr-only">
          SageView, {site.tagline}
        </h1>

        <div className="container-wide">
          <p className="max-w-md text-lead text-[var(--text-strong)]">
            {site.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <HeroLink href="/work" solid>
              View Work
            </HeroLink>
            <HeroLink href={primaryAction.href}>{primaryAction.label}</HeroLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroLink({
  href,
  children,
  solid = false,
}: {
  href: string;
  children: string;
  solid?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center px-7 py-4 font-mono text-[0.7rem] tracking-[0.18em] uppercase",
        "transition-colors duration-[var(--dur-fast)]",
        solid
          ? "bg-[var(--text-strong)] text-[var(--color-black)] hover:bg-[var(--accent)]"
          : "border border-[var(--line-strong)] text-[var(--text-strong)] hover:bg-[var(--text-strong)] hover:text-[var(--color-black)]",
      )}
    >
      {children}
    </Link>
  );
}
