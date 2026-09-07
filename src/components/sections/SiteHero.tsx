import Link from "next/link";

import { cn } from "@/lib/cn";
import { film } from "@/content/media";
import { primaryAction, site } from "@/content/site";

/**
 * Homepage hero.
 *
 * A silent looping cut fills the frame and the name sits on top of it at the
 * largest type on the site. The video is decorative: it carries no information
 * that is not also in the text, so it is `aria-hidden` and the poster does the
 * work whenever motion is unavailable or the file has not loaded.
 *
 * `band-dark` rather than a one-off palette, so the header inverts with it.
 */
export function SiteHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="band-dark relative isolate flex hero-viewport flex-col justify-end overflow-hidden"
    >
      <video
        aria-hidden="true"
        className="media-cover -z-20 opacity-70"
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

      {/* Legibility wash. Heavier at the foot, where the type sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/55 to-[var(--color-ink)]/25"
      />

      <div className="container-wide pb-16 md:pb-24">
        <p className="eyebrow">{site.name}</p>

        <h1
          id="hero-heading"
          className="display mt-8 text-mega text-[var(--text-strong)]"
        >
          SageView
        </h1>

        <p className="mt-6 max-w-xl text-lead text-[var(--text-body-color)]">
          {site.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <HeroLink href="/work" solid>
            View Work
          </HeroLink>
          <HeroLink href={primaryAction.href}>{primaryAction.label}</HeroLink>
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
          ? "bg-[var(--text-strong)] text-[var(--color-ink)] hover:bg-[var(--accent)]"
          : "border border-[var(--line-strong)] text-[var(--text-strong)] hover:border-[var(--text-strong)] hover:bg-[var(--text-strong)] hover:text-[var(--color-ink)]",
      )}
    >
      {children}
    </Link>
  );
}
