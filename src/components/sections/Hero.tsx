import { ButtonLink } from "@/components/primitives/Button";
import { Reveal } from "@/components/primitives/Reveal";
import { film } from "@/content/media";
import { site } from "@/content/site";
import { HeroBackdrop } from "./HeroBackdrop";

/**
 * The opening scene.
 *
 * Full-viewport, minimal chrome, one statement. Height uses `svh` so mobile
 * browser UI cannot crop the call to action, with a `vh` fallback first for
 * older engines.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      // `isolate` is load-bearing: it makes this section a stacking context so
      // the -z-10 backdrop paints above the section's own background rather
      // than disappearing behind it.
      className="hero-viewport relative isolate flex flex-col justify-end overflow-hidden pt-32 pb-14 sm:pb-20"
    >
      {/* A silent 6.8s loop cut from the Makoko documentary: the opening scene
          of the company's own film, as the opening scene of the site. */}
      <HeroBackdrop video={film.heroLoop} />

      <div className="container-wide">
        <div className="max-w-5xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brass/60" />
              {site.name}
            </p>
          </Reveal>

          <Reveal variant="clip" delay={120}>
            <h1
              id="hero-heading"
              className="font-display mt-7 text-display text-paper"
            >
              Framing the Meaning
              <span className="block text-brass italic">That Moves</span>
              Human Minds
            </h1>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-8 max-w-2xl text-body-lg leading-relaxed text-fog">
              {site.description}
            </p>
          </Reveal>

          <Reveal delay={460}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <ButtonLink href="/contact" size="lg" withArrow>
                Start a Project
              </ButtonLink>
              <ButtonLink href="/case-studies" size="lg" variant="outline">
                Explore Our Work
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Contextual metadata strip — the "slate" of the opening frame. */}
        <Reveal delay={620}>
          <div className="mt-14 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-6 border-t border-bone/10 pt-8 sm:grid-cols-4">
            {[
              { label: "Discipline", value: "Documentary" },
              { label: "Practice", value: "Visual Strategy" },
              { label: "Scope", value: "Full Production" },
              { label: "Standard", value: "Cinema-grade" },
            ].map((item) => (
              <div key={item.label}>
                <p className="eyebrow-muted">{item.label}</p>
                <p className="mt-2 text-body-sm text-bone">{item.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Scroll cue. Decorative — the metadata strip already signals depth. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[var(--spacing-gutter)] bottom-8 hidden lg:block"
      >
        <span className="flex h-14 w-px overflow-hidden bg-bone/15">
          <span className="block h-full w-full origin-top animate-[scroll-cue_2.4s_ease-in-out_infinite] bg-brass" />
        </span>
      </div>
    </section>
  );
}
