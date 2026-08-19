import type { Metadata } from "next";

import { TextLink } from "@/components/primitives/Button";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { CapabilityChain } from "@/components/sections/CapabilityChain";
import { Founder } from "@/components/sections/Founder";
import { NarrativeDesigners } from "@/components/sections/NarrativeDesigners";
import { PageHero } from "@/components/sections/PageHero";
import { Pillars } from "@/components/sections/Pillars";
import { about } from "@/content/about";
import { photo } from "@/content/media";
import { partnerSectors } from "@/content/site";
import { visionStatement } from "@/content/vision";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "SageView Production Ltd specialises in documentary filmmaking, high-impact brand storytelling and visual communication, translating complex institutional, development, corporate and social ideas into human-centered narratives.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={
          <>
            Strategic creativity.
            <span className="block text-brass italic">
              Human-centered storytelling.
            </span>
          </>
        }
        lead={about.hero.body}
        image={photo.crewFilming}
        meta={[
          { label: "Discipline", value: "Documentary" },
          { label: "Practice", value: "Visual Communication" },
          { label: "Approach", value: "Narrative Design" },
          { label: "Standard", value: "Cinema-grade" },
        ]}
      />

      {/* Introduction */}
      <Section labelledBy="about-intro-heading" container="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionIntro
              eyebrow={about.introduction.eyebrow}
              headingId="about-intro-heading"
              heading={
                <>
                  Stories carry meaning.
                  <span className="block text-brass italic">
                    We bring that meaning to the screen.
                  </span>
                </>
              }
            />

            <div className="mt-8 max-w-xl space-y-5">
              {about.introduction.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-body-lg leading-relaxed text-fog"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <div className="border-t border-bone/15 pt-8">
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
          </div>
        </div>
      </Section>

      <NarrativeDesigners />

      {/* End-to-end capability */}
      <Section labelledBy="capability-heading" container="wide">
        <SectionIntro
          eyebrow="End-to-End Capability"
          headingId="capability-heading"
          heading={
            <>
              One team,
              <span className="text-brass italic"> concept to final cut.</span>
            </>
          }
          lead="SageView manages the creative process from concept and pre-production strategy through production and final execution, so the intent set on day one survives to the last frame."
        />

        <div className="mt-16">
          <CapabilityChain />
        </div>
      </Section>

      <Pillars />

      <Founder />

      {/* Vision pointer */}
      <Section labelledBy="about-vision-heading" container="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionIntro
              eyebrow="Where We're Going"
              headingId="about-vision-heading"
              heading={
                <>
                  Built in Africa.
                  <span className="block text-brass italic">
                    Made for the world&rsquo;s most important rooms.
                  </span>
                </>
              }
              lead={visionStatement.short}
            />

            <div className="mt-9">
              <TextLink href="/vision">Read the full vision</TextLink>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-8">
            <blockquote className="border-l border-brass/40 pl-6">
              <p className="font-display text-h3 leading-tight text-paper">
                &ldquo;{visionStatement.pullQuote}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
