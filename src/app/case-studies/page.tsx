import type { Metadata } from "next";
import Link from "next/link";

import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/Button";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { caseStudies, futureProjects } from "@/content/case-studies";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Selected work from SageView Production Ltd, including The Makoko Education Crisis, a character-driven documentary on educational exclusion, aligned to SDG 4.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={
          <>
            The work,
            <span className="block text-brass italic">
              and what it was built to change.
            </span>
          </>
        }
        lead="Every project here is presented the same way: the challenge, our role, the solution, and the impact it was made to have."
        image={caseStudies[0].heroImage}
      />

      <Section id="selected-work" labelledBy="case-list-heading" container="wide">
        <SectionIntro
          eyebrow="Selected Work"
          headingId="case-list-heading"
          heading={
            <>
              Projects
              <span className="text-brass italic"> in the archive.</span>
            </>
          }
        />

        <ul className="mt-14 flex flex-col gap-16">
          {caseStudies.map((study) => (
            <Reveal as="li" key={study.slug}>
              <article className="group">
                <Link href={`/case-studies/${study.slug}`} className="block">
                  <MediaFrame
                    src={study.heroImage.src}
                    alt={study.heroImage.alt}
                    aspect="cinema"
                    label={study.strategicFocus}
                    sizes="(min-width: 1280px) 80vw, 100vw"
                  />

                  <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7">
                      <h3 className="font-display text-h1 text-paper transition-colors duration-[var(--dur-base)] group-hover:text-brass">
                        {study.displayTitle[0]}{" "}
                        <span className="italic">{study.displayTitle[1]}</span>
                      </h3>

                      <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-fog">
                        {study.summary}
                      </p>
                    </div>

                    <dl className="lg:col-span-5 lg:pt-3">
                      <div className="border-t border-bone/15 py-4">
                        <dt className="eyebrow-muted">Strategic Focus</dt>
                        <dd className="mt-2 text-body-sm text-bone">
                          {study.strategicFocus}
                        </dd>
                      </div>
                      <div className="border-t border-bone/10 py-4">
                        <dt className="eyebrow-muted">Location</dt>
                        <dd className="mt-2 text-body-sm text-bone">
                          {study.location}
                        </dd>
                      </div>
                      <div className="border-t border-bone/10 py-4">
                        <dt className="eyebrow-muted">Role</dt>
                        <dd className="mt-2 text-body-sm text-bone">
                          {study.roles.join(" · ")}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Link>

                <div className="mt-6">
                  <TextLink href={`/case-studies/${study.slug}`}>
                    Read the case study
                  </TextLink>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* An honest placeholder rather than invented projects. */}
      <Section
        id="whats-next"
        labelledBy="future-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow={futureProjects.eyebrow}
              headingId="future-heading"
              heading={futureProjects.heading}
            />
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <Reveal delay={120}>
              <p className="max-w-xl text-body-lg leading-relaxed text-fog">
                {futureProjects.body}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8">
                <TextLink href="/contact">Start a project with us</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
