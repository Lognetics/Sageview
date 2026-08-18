import { Reveal } from "@/components/primitives/Reveal";
import { processStages } from "@/content/process";

/**
 * Condensed process for the homepage.
 *
 * The full scroll-linked timeline lives on /process; putting it on the
 * homepage as well would make the page enormous and bury the case study. This
 * gives the shape of the method in five lines and sends people onward.
 */
export function ProcessPreview() {
  return (
    <ol className="border-t border-bone/15">
      {processStages.map((stage, index) => (
        <Reveal as="li" key={stage.id} delay={index * 80}>
          <a
            href={`/process#${stage.id}`}
            className="group grid gap-3 border-b border-bone/15 py-7 transition-colors duration-[var(--dur-base)] lg:grid-cols-12 lg:items-baseline lg:gap-8"
          >
            <div className="flex items-baseline gap-5 lg:col-span-5">
              <span className="index-numeral shrink-0 text-[0.6875rem] text-brass">
                {stage.index}
              </span>
              <h3 className="font-display text-h3 text-paper transition-colors duration-[var(--dur-base)] group-hover:text-brass">
                {stage.title}
              </h3>
            </div>

            <p className="text-body-sm leading-relaxed text-mist lg:col-span-6">
              {stage.description}
            </p>

            <span
              aria-hidden="true"
              className="hidden justify-self-end lg:col-span-1 lg:block"
            >
              <svg
                viewBox="0 0 20 12"
                className="h-2.5 w-4 fill-none stroke-ash stroke-[1.5] transition-all duration-[var(--dur-fast)] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:stroke-brass motion-safe:group-hover:translate-x-1"
              >
                <path d="M0 6h18M13 1l5 5-5 5" strokeLinecap="square" />
              </svg>
            </span>
          </a>
        </Reveal>
      ))}
    </ol>
  );
}
