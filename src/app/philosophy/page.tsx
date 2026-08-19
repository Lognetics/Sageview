import type { Metadata } from "next";

import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { KamaMuta } from "@/components/sections/KamaMuta";
import { PageHero } from "@/components/sections/PageHero";
import { Pillars } from "@/components/sections/Pillars";
import { philosophy } from "@/content/philosophy";
import { photo } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Storytelling Philosophy",
  description:
    "Kama Muta, moved by love. Emotional honesty, cinematic realism, human-centered focus and ethical integrity: the four principles behind every SageView film.",
  path: "/philosophy",
});

export default function PhilosophyPage() {
  return (
    <>
      <PageHero
        eyebrow="Storytelling Philosophy"
        title={
          <>
            Revealing the truth
            <span className="block text-brass italic">hidden within them.</span>
          </>
        }
        lead={philosophy.statement}
        image={photo.girlResting}
        meta={philosophy.principles.map((principle) => ({
          label: principle.index,
          value: principle.title,
        }))}
      />

      <KamaMuta showLink={false} />

      {/* Each principle, at length */}
      <Section labelledBy="principles-heading" container="wide">
        <SectionIntro
          eyebrow="In Practice"
          headingId="principles-heading"
          heading={
            <>
              What these principles
              <span className="text-brass italic"> cost us.</span>
            </>
          }
          lead="Principles that never change a decision are decoration. These change what we shoot, what we cut, and occasionally whether we take a project at all."
        />

        <ol className="mt-16">
          {philosophy.principles.map((principle, index) => (
            <li key={principle.index}>
              <article
                className={`grid gap-10 border-t border-bone/12 py-14 lg:grid-cols-12 lg:gap-16 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-7">
                  <Reveal>
                    <div className="flex items-baseline gap-5">
                      <span className="index-numeral text-[0.6875rem] text-brass">
                        {principle.index}
                      </span>
                      <h3 className="font-display text-h2 text-paper">
                        {principle.title}
                      </h3>
                    </div>
                  </Reveal>

                  <Reveal delay={100}>
                    <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-fog">
                      {principle.summary}
                    </p>
                  </Reveal>

                  <Reveal delay={180}>
                    <ul className="mt-8 flex flex-wrap gap-2">
                      {principle.points.map((point) => (
                        <li
                          key={point}
                          className="border border-bone/15 px-3 py-1.5 text-micro text-mist"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>

                <div className="lg:col-span-5">
                  <Reveal variant="clip" delay={120}>
                    <MediaFrame
                      src={principle.image.src}
                      alt={principle.image.alt}
                      aspect="classic"
                      label={principle.index}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </Reveal>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Section>

      <Pillars />

      <CTASection />
    </>
  );
}

