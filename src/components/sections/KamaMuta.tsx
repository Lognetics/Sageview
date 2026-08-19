import { Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/Button";
import { philosophy } from "@/content/philosophy";

/**
 * The philosophy band: the most distinctive surface on the site.
 *
 * A single term, set enormous, with the four principles beneath it as a
 * numbered editorial grid. The oversized ghost word behind the type gives the
 * section depth without adding a single asset.
 */
export function KamaMuta({ showLink = true }: { showLink?: boolean }) {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="relative isolate overflow-hidden bg-void"
    >
      {/* Ghost word, decorative, never announced. Sized so the full phrase
          spans the viewport rather than reading as a clipped fragment. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[6vw] left-1/2 -translate-x-1/2 font-display text-[21vw] leading-none whitespace-nowrap text-bone/[0.035] italic select-none"
      >
        moved by love
      </span>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_50%_0%,rgba(194,160,90,0.12)_0%,transparent_60%)]"
      />

      <div className="container-wide section-y">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow">{philosophy.eyebrow}</p>
          </Reveal>

          <Reveal variant="clip" delay={120}>
            <h2
              id="philosophy-heading"
              className="font-display mt-8 text-display text-paper"
            >
              {philosophy.term}
            </h2>
          </Reveal>

          <Reveal delay={280}>
            <p className="font-display mt-2 text-h3 text-brass italic">
              {philosophy.termTranslation}
            </p>
          </Reveal>

          <Reveal delay={380}>
            <p className="mt-12 max-w-3xl font-display text-h3 leading-tight text-bone">
              &ldquo;{philosophy.statement}&rdquo;
            </p>
          </Reveal>

          <Reveal delay={460}>
            <p className="mt-8 max-w-2xl text-body leading-relaxed text-mist">
              {philosophy.intro}
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {philosophy.principles.map((principle, index) => (
            <Reveal as="li" key={principle.index} delay={index * 110}>
              <div className="group flex h-full flex-col bg-void p-8 transition-colors duration-[var(--dur-base)] hover:bg-charcoal">
                <span className="index-numeral text-[0.6875rem] text-brass">
                  {principle.index}
                </span>

                <h3 className="font-display mt-6 text-h4 text-paper">
                  {principle.title}
                </h3>

                <p className="mt-4 flex-1 text-body-sm leading-relaxed text-mist">
                  {principle.summary}
                </p>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {principle.points.map((point) => (
                    <li
                      key={point}
                      className="border border-bone/12 px-2.5 py-1 text-[0.6875rem] leading-snug text-ash transition-colors duration-[var(--dur-base)] group-hover:border-brass/30 group-hover:text-fog"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>

        {showLink ? (
          <Reveal delay={200}>
            <div className="mt-12 flex justify-center">
              <TextLink href="/philosophy">
                Read the storytelling philosophy
              </TextLink>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
