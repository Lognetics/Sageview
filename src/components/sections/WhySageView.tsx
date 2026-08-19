import { Reveal } from "@/components/primitives/Reveal";
import { whySageView } from "@/content/about";

/**
 * Five differentiators as full-width editorial rows.
 *
 * Large type, generous rules, and a hover state that lets the brass rule wipe
 * across the row, restrained enough to read as a document rather than a
 * feature grid.
 */
export function WhySageView() {
  return (
    <ol className="border-t border-bone/15">
      {whySageView.map((reason, index) => (
        <Reveal as="li" key={reason.index} delay={index * 90}>
          <article className="group relative border-b border-bone/15">
            <span
              aria-hidden="true"
              className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-[var(--dur-slow)] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-x-100"
            />

            <div className="grid gap-5 py-10 sm:py-12 lg:grid-cols-12 lg:items-baseline lg:gap-10">
              <div className="flex items-baseline gap-5 lg:col-span-5">
                <span className="index-numeral shrink-0 text-[0.6875rem] text-brass">
                  {reason.index}
                </span>
                <h3 className="font-display text-h3 text-paper transition-colors duration-[var(--dur-base)] group-hover:text-brass">
                  {reason.title}
                </h3>
              </div>

              <p className="text-body leading-relaxed text-mist lg:col-span-7">
                {reason.body}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </ol>
  );
}
