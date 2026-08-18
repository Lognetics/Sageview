import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Reveal } from "@/components/primitives/Reveal";
import { HeroBackdrop, type HeroFrame } from "./HeroBackdrop";

/**
 * Inner-page opener.
 *
 * Shorter than the homepage hero but built from the same parts, so every page
 * reads as the same publication. `meta` renders the small slate row used to
 * carry contextual detail (focus, role, location) without inventing claims.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  image,
  frames,
  size = "default",
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  meta?: readonly { label: string; value: string }[];
  /** The single still behind this page's opener. */
  image?: { src: string; alt: string };
  /** Or a sequence, if the page warrants one. */
  frames?: readonly HeroFrame[];
  size?: "default" | "tall";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className={cn(
        // `isolate` keeps the -z-10 backdrop inside this section's stacking
        // context, above its background and below its content.
        "relative isolate flex flex-col justify-end overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20",
        size === "tall" ? "min-h-[78svh]" : "min-h-[58svh]",
        className,
      )}
    >
      <HeroBackdrop frames={frames ?? (image ? [image] : [])} />

      <div className="container-wide">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-brass/60" />
            {eyebrow}
          </p>
        </Reveal>

        <Reveal variant="clip" delay={100}>
          <h1
            id="page-hero-heading"
            className="font-display mt-6 max-w-5xl text-h1 text-paper"
          >
            {title}
          </h1>
        </Reveal>

        {lead ? (
          <Reveal delay={260}>
            <div className="mt-7 max-w-2xl text-body-lg leading-relaxed text-fog">
              {lead}
            </div>
          </Reveal>
        ) : null}

        {meta && meta.length > 0 ? (
          <Reveal delay={360}>
            <dl className="mt-12 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-6 border-t border-bone/10 pt-8 sm:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="eyebrow-muted">{item.label}</dt>
                  <dd className="mt-2 text-body-sm text-bone">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}

        {children}
      </div>
    </section>
  );
}
