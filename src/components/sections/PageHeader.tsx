import { Reveal } from "@/components/primitives/Reveal";

/**
 * Page opener.
 *
 * Type only, on paper. The previous design opened every page with a
 * full-bleed photograph; here the work carries the images and the page
 * headers stay quiet, so arriving on a page does not feel like arriving on
 * the homepage again.
 */
export function PageHeader({
  eyebrow,
  heading,
  accent,
  lead,
}: {
  eyebrow: string;
  heading: string;
  accent?: string;
  lead?: string;
}) {
  return (
    <section className="border-b pt-32 pb-14 md:pt-44 md:pb-20">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
            {eyebrow}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display mt-8 text-display">
            {heading}
            {accent ? (
              <span className="block text-[var(--text-faint)]">{accent}</span>
            ) : null}
          </h1>
        </Reveal>

        {lead ? (
          <Reveal delay={140}>
            <p className="mt-8 max-w-xl text-lead text-[var(--text-body-color)]">
              {lead}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
