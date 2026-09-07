import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { FounderPortrait } from "@/components/sections/FounderPortrait";
import { PageHeader } from "@/components/sections/PageHeader";
import { StartCTA } from "@/components/sections/StartCTA";
import {
  aboutHero,
  approach,
  network,
  philosophy,
  team,
  whoWeAre,
} from "@/content/about";
import { photo } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "SageView Production Ltd: who we are, the founder, our philosophy, our approach, and the team and network behind the work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={aboutHero.eyebrow}
        heading={aboutHero.heading}
        accent={aboutHero.headingAccent}
        lead={aboutHero.lead}
      />

      {/* Large visual, before any of the argument. */}
      <Section container="wide" className="pt-14 md:pt-20">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden bg-[var(--surface-sunken)]">
            <Image
              src={photo.fieldCrew.src}
              alt={photo.fieldCrew.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Section>

      <Section
        id="who-we-are"
        labelledBy="who-we-are-heading"
        container="wide"
        tone="light"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow={whoWeAre.eyebrow}
              headingId="who-we-are-heading"
              heading={whoWeAre.heading}
              accent={whoWeAre.headingAccent}
            />
          </div>

          <div className="space-y-6 lg:col-span-7">
            {whoWeAre.body.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 60}>
                <p className="text-body-lg leading-relaxed text-[var(--text-body-color)]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <FounderPortrait />

      <Section
        id="philosophy"
        labelledBy="philosophy-heading"
        container="wide"
      >
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow justify-center flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
              {philosophy.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 id="philosophy-heading" className="display mt-8 text-display">
              {philosophy.heading}
              <span className="block text-[var(--text-faint)]">
                {philosophy.headingAccent}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <blockquote className="mt-10">
              <p className="display-soft text-h3 text-[var(--text-strong)]">
                &ldquo;{philosophy.quote}&rdquo;
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-8 text-body-lg leading-relaxed text-[var(--text-body-color)]">
              {philosophy.body}
            </p>
          </Reveal>
        </div>

        <ul className="mt-24 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {philosophy.principles.map((principle, index) => (
            <Reveal as="li" key={principle.index} delay={index * 60}>
              <div className="flex h-full flex-col border-t pt-6">
                <span className="index-numeral text-[0.62rem] tracking-[0.18em] text-[var(--accent)]">
                  {principle.index}
                </span>
                <h3 className="display-soft mt-6 text-h4">{principle.name}</h3>
                <p className="mt-3 text-body text-[var(--text-body-color)]">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="approach" labelledBy="approach-heading" container="wide">
        <SectionIntro
          eyebrow={approach.eyebrow}
          headingId="approach-heading"
          heading={approach.heading}
          accent={approach.headingAccent}
          lead={approach.lead}
        />

        <ol className="mt-16 border-t">
          {approach.points.map((point, index) => (
            <Reveal as="li" key={point.index} delay={index * 60}>
              <div className="flex flex-col gap-4 border-b py-8 md:flex-row md:gap-12">
                <span className="index-numeral shrink-0 text-body-sm text-[var(--accent)] md:w-16">
                  {point.index}
                </span>
                <h3 className="display-soft w-full text-h4 md:w-[34%]">
                  {point.name}
                </h3>
                <p className="max-w-xl text-body text-[var(--text-body-color)]">
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section
        id="team"
        labelledBy="team-heading"
        container="wide"
        tone="light"
      >
        <SectionIntro
          eyebrow={team.eyebrow}
          headingId="team-heading"
          heading={team.heading}
          accent={team.headingAccent}
          lead={team.lead}
        />

        <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.roles.map((role, index) => (
            <Reveal as="li" key={role.name} delay={index * 50}>
              <div className="border-t pt-5">
                <h3 className="display-soft text-h4">{role.name}</h3>
                <p className="mt-2 text-body text-[var(--text-body-color)]">
                  {role.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="network" labelledBy="network-heading" container="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow={network.eyebrow}
              headingId="network-heading"
              heading={network.heading}
              accent={network.headingAccent}
              lead={network.lead}
            />
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {network.specialists.map((specialist, index) => (
                <Reveal as="li" key={specialist} delay={index * 40}>
                  <div className="flex items-baseline gap-4 border-b py-4">
                    <span className="index-numeral text-[0.6rem] text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body text-[var(--text-strong)]">
                      {specialist}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <p className="mt-10 max-w-xl text-body-lg leading-relaxed text-[var(--text-body-color)]">
                {network.note}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <StartCTA />
    </>
  );
}
