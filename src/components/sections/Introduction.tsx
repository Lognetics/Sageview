import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, Eyebrow } from "@/components/primitives/Section";
import { TextLink } from "@/components/primitives/Button";
import { about } from "@/content/about";
import { photo } from "@/content/media";
import { partnerSectors } from "@/content/site";

/**
 * The first thing the visitor reads after the hero: who SageView is and who
 * they work with. Asymmetric two-column editorial — statement left, evidence
 * right — so the eye has somewhere to travel.
 */
export function Introduction() {
  return (
    <Section
      id="introduction"
      labelledBy="introduction-heading"
      container="wide"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{about.introduction.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h2
              id="introduction-heading"
              className="font-display mt-7 text-h2 text-paper"
            >
              Stories carry meaning.
              <span className="block text-brass italic">
                We bring that meaning to the screen.
              </span>
            </h2>
          </Reveal>

          <div className="mt-8 max-w-xl space-y-5">
            {about.introduction.body.map((paragraph, index) => (
              <Reveal key={paragraph} delay={160 + index * 80}>
                <p className="text-body-lg leading-relaxed text-fog">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={360}>
            <div className="mt-9">
              <TextLink href="/about">Read our full story</TextLink>
            </div>
          </Reveal>
        </div>

        {/* Who we partner with — a quiet credibility panel. */}
        <div className="lg:col-span-5 lg:pt-4">
          <Reveal variant="clip" delay={140}>
            <MediaFrame
              src={photo.boyWheelchair.src}
              alt={photo.boyWheelchair.alt}
              aspect="classic"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 border-t border-bone/15 pt-8">
              <p className="eyebrow-muted">We partner with</p>
              <ul className="mt-6 flex flex-col">
                {partnerSectors.map((sector, index) => (
                  <li
                    key={sector}
                    className="flex items-baseline gap-5 border-b border-bone/10 py-4 last:border-b-0"
                  >
                    <span className="index-numeral text-[0.625rem] text-brass/70">
                      0{index + 1}
                    </span>
                    <span className="font-display text-h4 leading-tight text-bone">
                      {sector}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
