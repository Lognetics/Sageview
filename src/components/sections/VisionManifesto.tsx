import { Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Section";
import { missionStatement, visionStatement } from "@/content/vision";

/**
 * The full vision narrative.
 *
 * Six beats, each given its own band so the argument builds as the visitor
 * scrolls rather than arriving as a paragraph. Every line is aspirational by
 * construction, what SageView is building toward, never a claim of a
 * position already held.
 */
export function VisionManifesto() {
  return (
    <div className="relative">
      {/* Opening statement */}
      <section
        aria-labelledby="vision-heading"
        className="container-wide section-y"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{visionStatement.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal variant="clip" delay={100}>
              <h2
                id="vision-heading"
                className="font-display mt-8 text-h1 text-paper"
              >
                Built in Africa.
                <span className="block text-brass italic">
                  Made for the world&rsquo;s most important rooms.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-24">
            <Reveal delay={220}>
              <p className="border-l border-brass/40 pl-6 text-body-lg leading-relaxed text-fog">
                {visionStatement.short}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The beats */}
      <section aria-label="The vision, in six parts" className="border-t border-bone/10">
        <ol>
          {visionStatement.beats.map((beat, index) => (
            <li
              key={beat.id}
              className="group border-b border-bone/10 odd:bg-ink/60"
            >
              <div className="container-wide py-14 sm:py-20">
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <Reveal>
                      <div className="flex items-baseline gap-5 lg:sticky lg:top-32">
                        <span className="index-numeral text-[0.6875rem] text-brass">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="eyebrow-muted">{beat.label}</span>
                      </div>
                    </Reveal>
                  </div>

                  <div className="lg:col-span-8">
                    <Reveal delay={80}>
                      <h3 className="font-display text-h2 text-paper">
                        {beat.heading}
                      </h3>
                    </Reveal>

                    <Reveal delay={180}>
                      <p className="mt-6 max-w-2xl text-body-lg leading-relaxed text-fog">
                        {beat.body}
                      </p>
                    </Reveal>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Pull quote */}
      <section className="relative isolate overflow-hidden border-b border-bone/10">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(194,160,90,0.14)_0%,transparent_62%)]"
        />
        <div className="container-editorial section-y">
          <Reveal variant="clip">
            <blockquote className="text-center">
              <p className="font-display text-h1 leading-[1.05] text-paper">
                &ldquo;{visionStatement.pullQuote}&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* The ambition ladder */}
      <section
        aria-labelledby="ladder-heading"
        className="container-wide section-y"
      >
        <Reveal>
          <Eyebrow>{visionStatement.ladderIntro}</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h2
            id="ladder-heading"
            className="font-display mt-7 max-w-3xl text-h2 text-paper"
          >
            Four steps we are measuring ourselves against.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {visionStatement.ladder.map((step, index) => (
            <Reveal as="li" key={step.index} delay={index * 110}>
              <div className="group flex h-full flex-col bg-void p-8 transition-colors duration-[var(--dur-base)] hover:bg-charcoal">
                <span className="font-display index-numeral text-h2 text-brass/40 transition-colors duration-[var(--dur-base)] group-hover:text-brass">
                  {step.index}
                </span>
                <h3 className="font-display mt-6 text-h4 text-paper">
                  {step.title}
                </h3>
                <p className="mt-4 text-body-sm leading-relaxed text-mist">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Mission */}
      <section
        aria-labelledby="mission-heading"
        className="relative border-t border-bone/10 bg-ink"
      >
        <div className="container-wide section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{missionStatement.eyebrow}</Eyebrow>
              </Reveal>

              <Reveal delay={100}>
                <h2
                  id="mission-heading"
                  className="font-display mt-8 text-h2 text-paper"
                >
                  {missionStatement.headline}
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-6">
                {missionStatement.body.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={120 + index * 90}>
                    <p className="text-body-lg leading-relaxed text-fog">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* See. Feel. Act. */}
              <Reveal delay={400}>
                <div className="mt-12 border-t border-bone/15 pt-10">
                  <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                    {missionStatement.imperative.map((word) => (
                      <li
                        key={word}
                        className="font-display text-h1 leading-none text-brass"
                      >
                        {word}
                        <span className="text-bone/30">.</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 max-w-md text-body-sm text-mist">
                    {missionStatement.imperativeCaption}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Compact vision teaser for the homepage: the manifesto's opening move plus
 * a route into the full narrative.
 */
export function VisionTeaser() {
  return (
    <section
      aria-labelledby="vision-teaser-heading"
      className="relative isolate overflow-hidden border-y border-bone/10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(75%_110%_at_15%_0%,rgba(194,160,90,0.12)_0%,transparent_58%)]"
      />

      <div className="container-wide section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{visionStatement.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal variant="clip" delay={100}>
              <h2
                id="vision-teaser-heading"
                className="font-display mt-8 text-h1 text-paper"
              >
                Africa has never lacked stories.
                <span className="block text-brass italic">
                  It has lacked the studios the world calls first.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-8 max-w-2xl text-body-lg leading-relaxed text-fog">
                {visionStatement.short}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9">
                <TextLink href="/vision">Read the full vision</TextLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <ol className="flex flex-col border-t border-bone/15">
                {visionStatement.ladder.map((step) => (
                  <li
                    key={step.index}
                    className="flex items-baseline gap-5 border-b border-bone/10 py-5"
                  >
                    <span className="index-numeral text-[0.625rem] text-brass/70">
                      {step.index}
                    </span>
                    <span className="font-display text-h4 leading-tight text-bone">
                      {step.title}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
