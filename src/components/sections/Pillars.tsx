import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { corePillars } from "@/content/philosophy";

/**
 * The three core pillars.
 *
 * Every pillar shows its full text at every breakpoint: the hover interaction
 * is purely visual (a slow image push and a brass rule wiping across). Hiding
 * the explanation behind a hover would cost mobile and keyboard visitors real
 * content in exchange for a trick.
 */
export function Pillars() {
  return (
    <Section
      id="core-pillars"
      labelledBy="pillars-heading"
      container="wide"
      className="border-b border-bone/10"
    >
      <SectionIntro
        eyebrow="Core Pillars"
        headingId="pillars-heading"
        heading={
          <>
            What we hold to,
            <span className="text-brass italic"> on every project.</span>
          </>
        }
        lead="Three beliefs decide what survives our edit, and what never makes it into the frame."
      />

      <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
        {corePillars.map((pillar, index) => (
          <Reveal as="li" key={pillar.index} delay={index * 140}>
            <article className="group flex h-full flex-col">
              <MediaFrame
                src={pillar.image.src}
                alt={pillar.image.alt}
                aspect="tall"
                label={pillar.index}
                sizes="(min-width: 768px) 32vw, 100vw"
              />

              <div className="relative mt-7 flex flex-1 flex-col">
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-full bg-bone/15"
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-[var(--dur-slow)] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-x-100"
                />

                <p className="eyebrow-muted mt-6">{pillar.tagline}</p>

                <h3 className="font-display mt-4 text-h3 text-paper">
                  {pillar.title}
                </h3>

                <p className="mt-4 text-body-sm leading-relaxed text-mist">
                  {pillar.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
