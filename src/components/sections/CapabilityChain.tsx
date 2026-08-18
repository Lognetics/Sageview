import { Reveal } from "@/components/primitives/Reveal";
import { about } from "@/content/about";

/**
 * End-to-end capability: concept → pre-production → production → execution.
 *
 * The animation is the point of the section, so it is built into the layout:
 * each link wipes in behind the one before it, and the connecting rule draws
 * itself across as the visitor arrives. Under reduced motion it presents
 * instantly as a static four-column chain.
 */
export function CapabilityChain() {
  return (
    <div className="relative">
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {about.capabilityChain.map((link, index) => (
          <Reveal as="li" key={link.label} delay={index * 160}>
            <div className="group relative h-full lg:pr-8">
              {/* Connector between links (large screens). */}
              {index < about.capabilityChain.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-[0.3125rem] left-0 hidden h-px w-full bg-bone/12 lg:block"
                />
              ) : null}

              <span
                aria-hidden="true"
                className="relative z-10 block h-2.5 w-2.5 rounded-full bg-brass"
              />

              <p className="index-numeral mt-7 text-[0.6875rem] text-brass">
                {link.index}
              </p>

              <h3 className="font-display mt-4 text-h4 text-paper">
                {link.label}
              </h3>

              <p className="mt-3 max-w-[22rem] text-body-sm leading-relaxed text-mist lg:max-w-none lg:pr-6">
                {link.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
