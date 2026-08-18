import { Reveal } from "@/components/primitives/Reveal";
import { clientWorkflow } from "@/content/process";

/**
 * What happens after a client reaches SageView.
 *
 * Kept visually distinct from the five-stage creative process: a horizontal
 * three-step track with a connecting rule, rather than the vertical timeline.
 * Same information architecture, different register — one is how the work is
 * made, this is how the engagement runs.
 */
export function WorkflowTimeline() {
  return (
    <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
      {/* Connecting track — desktop only, decorative. */}
      <span
        aria-hidden="true"
        className="absolute top-[0.4375rem] right-0 left-0 hidden h-px bg-bone/12 md:block"
      />

      {clientWorkflow.map((step, index) => (
        <Reveal as="li" key={step.index} delay={index * 140}>
          <div className="group relative">
            {/* Node */}
            <span
              aria-hidden="true"
              className="relative z-10 block h-3.5 w-3.5 rounded-full border border-brass bg-void transition-colors duration-[var(--dur-base)] group-hover:bg-brass"
            />

            <div className="mt-8">
              <span className="index-numeral text-[0.6875rem] text-brass">
                {step.index}
              </span>

              <h3 className="font-display mt-4 text-h3 text-paper">
                {step.title}
              </h3>

              <p className="mt-4 text-body-sm leading-relaxed text-mist">
                {step.description}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-bone/12 pt-5">
                {step.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-body-sm text-fog"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-3 shrink-0 bg-brass/60"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
