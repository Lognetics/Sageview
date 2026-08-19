import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow } from "@/components/primitives/Section";
import { about } from "@/content/about";

/**
 * "We don't just create visual content. We are narrative designers."
 *
 * The company's central claim, given a full band of its own and broken into
 * the three verbs that make the claim concrete: seen, felt, remembered.
 */
export function NarrativeDesigners() {
  return (
    <section
      id="difference"
      aria-labelledby="difference-heading"
      className="relative isolate overflow-hidden border-y border-bone/10 bg-ink"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(80%_120%_at_85%_0%,rgba(194,160,90,0.10)_0%,transparent_60%)]"
      />

      <div className="container-wide section-y">
        <Reveal>
          <Eyebrow>{about.difference.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal variant="clip" delay={100}>
          <h2
            id="difference-heading"
            className="font-display mt-8 max-w-5xl text-h1 text-paper"
          >
            {about.difference.headline}{" "}
            <span className="text-brass italic">
              {about.difference.emphasis}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-9 max-w-2xl text-body-lg leading-relaxed text-fog">
            {about.difference.body}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-3">
          {about.difference.verbs.map((verb, index) => (
            <Reveal key={verb.label} delay={index * 120} className="bg-ink">
              <div className="group h-full p-8 transition-colors duration-[var(--dur-base)] hover:bg-charcoal sm:p-10">
                <p className="font-display text-h2 leading-none text-brass transition-transform duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:-translate-y-1">
                  {verb.label}
                </p>
                <p className="mt-5 text-body-sm leading-relaxed text-mist">
                  {verb.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
