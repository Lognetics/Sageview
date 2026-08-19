import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow } from "@/components/primitives/Section";
import {
  assetEcosystem,
  deliverablePackages,
} from "@/content/deliverables";

/** The two approved asset packages, as editorial specification sheets. */
export function DeliverablePackages() {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
      {deliverablePackages.map((pack, index) => (
        <Reveal key={pack.id} delay={index * 140}>
          <article
            id={pack.id}
            className="group flex h-full flex-col border border-bone/12 p-8 transition-colors duration-[var(--dur-base)] hover:border-brass/35 sm:p-10"
          >
            <div className="flex items-baseline gap-5">
              <span className="index-numeral text-[0.6875rem] text-brass">
                {pack.index}
              </span>
              <span className="eyebrow-muted">Package</span>
            </div>

            <h3 className="font-display mt-6 text-h2 text-paper">
              {pack.title}
            </h3>

            <p className="mt-5 text-body leading-relaxed text-fog">
              {pack.summary}
            </p>

            <ul className="mt-9 flex flex-1 flex-col border-t border-bone/12">
              {pack.items.map((item) => (
                <li key={item.title} className="border-b border-bone/12 py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-display text-h4 text-bone">
                      {item.title}
                    </h4>
                    {item.spec ? (
                      <span className="index-numeral text-[0.6875rem] text-brass">
                        {item.spec}
                      </span>
                    ) : null}
                    {item.optional ? (
                      <span className="eyebrow-muted">Optional</span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-body-sm leading-relaxed text-mist">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/**
 * The asset ecosystem.
 *
 * Makes the commercial argument visible: a single production is not a single
 * file, it is a set of communication assets that serve different rooms.
 * Drawn with rules and type rather than an SVG diagram, so it reflows cleanly
 * from a four-column fan on desktop to a stacked list on a phone.
 */
export function AssetEcosystem({
  headingId,
  /** Drops to h3 when the section already has its own h2 (e.g. the homepage). */
  level = 2,
}: {
  headingId?: string;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-4">
        <Reveal>
          <Eyebrow>Asset Ecosystem</Eyebrow>
        </Reveal>

        <Reveal delay={90}>
          <Heading id={headingId} className="font-display mt-7 text-h2 text-paper">
            {assetEcosystem.source}
            <span className="block text-brass italic">
              becomes an entire communication set.
            </span>
          </Heading>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-6 max-w-sm text-body-sm leading-relaxed text-mist">
            One field deployment is edited, graded and versioned into every
            format a campaign needs, from the flagship cut down to the vertical
            social edit and the stills that end up in the annual report.
          </p>
        </Reveal>
      </div>

      <div className="lg:col-span-8">
        <ul className="grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
          {assetEcosystem.outputs.map((output, index) => (
            <Reveal as="li" key={output.label} delay={index * 80}>
              <div className="group relative flex h-full flex-col justify-between bg-void p-7 transition-colors duration-[var(--dur-base)] hover:bg-charcoal">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-[var(--dur-slow)] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-x-100"
                />
                <p className="font-display text-h4 text-paper">
                  {output.label}
                </p>
                <p className="eyebrow-muted mt-6">{output.context}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
