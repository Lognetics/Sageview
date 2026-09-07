import Image from "next/image";

import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";
import { founder } from "@/content/about";
import { founderPortraits } from "@/content/media";
import { assetExists } from "@/lib/asset-exists";

/**
 * The founder.
 *
 * Renders the first portrait that is actually present on disk, so the section
 * is never waiting on a file to look finished. When none has been supplied the
 * portrait column is dropped and the biography runs at prose width instead of
 * sitting beside an empty frame.
 */
export function FounderPortrait() {
  const portrait = founderPortraits.find((candidate) =>
    assetExists(candidate.src),
  );

  return (
    <Section id="founder" labelledBy="founder-heading" container="wide" tone="raised">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
        {portrait ? (
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-sunken)]">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        <div className={portrait ? "lg:col-span-7" : "lg:col-span-8"}>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
              {founder.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 id="founder-heading" className="display mt-6 text-h1">
              {founder.name}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-4 font-mono text-[0.68rem] tracking-[0.18em] text-[var(--text-muted)] uppercase">
              {founder.role}
            </p>
          </Reveal>

          <div className="mt-10 max-w-xl space-y-5">
            {founder.bio.map((paragraph, index) => (
              <Reveal key={paragraph} delay={140 + index * 50}>
                <p className="text-body-lg leading-relaxed text-[var(--text-body-color)]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
