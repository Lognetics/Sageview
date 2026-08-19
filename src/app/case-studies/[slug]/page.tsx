import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/primitives/Button";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Reveal } from "@/components/primitives/Reveal";
import { VideoFrame } from "@/components/primitives/VideoFrame";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/case-studies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);

  if (!study) return {};

  return pageMetadata({
    title: study.title,
    description: study.metaDescription,
    path: `/case-studies/${study.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage(
  props: PageProps<"/case-studies/[slug]">,
) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  return (
    <>
      <PageHero
        eyebrow="Case Study"
        title={
          <>
            {study.displayTitle[0]}
            <span className="block text-brass italic">
              {study.displayTitle[1]}
            </span>
          </>
        }
        lead={study.summary}
        size="tall"
        image={study.heroImage}
        meta={[
          { label: "Strategic Focus", value: study.strategicFocus },
          { label: "Location", value: study.location },
          { label: "Role", value: study.roles.join(" · ") },
          { label: "Format", value: "Documentary" },
        ]}
      />

      {/* Full-bleed opening frame */}
      <Reveal variant="clip" className="block">
        <MediaFrame
          src={study.gallery[3]?.src ?? study.heroImage.src}
          alt={study.gallery[3]?.alt ?? study.heroImage.alt}
          aspect="cinema"
          sizes="100vw"
          label="Opening frame"
        />
      </Reveal>

      {/* Challenge → Role → Solution → Impact, with a sticky project slate */}
      <Section labelledBy="story-heading" container="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Project</p>

              <h2
                id="story-heading"
                className="font-display mt-6 text-h3 text-paper"
              >
                {study.title}
              </h2>

              <dl className="mt-8 border-t border-bone/15">
                <div className="border-b border-bone/10 py-4">
                  <dt className="eyebrow-muted">Strategic Focus</dt>
                  <dd className="mt-2 text-body-sm text-bone">
                    {study.strategicFocus}
                  </dd>
                </div>
                <div className="border-b border-bone/10 py-4">
                  <dt className="eyebrow-muted">Location</dt>
                  <dd className="mt-2 text-body-sm text-bone">
                    {study.location}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="eyebrow-muted">SageView&rsquo;s Role</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {study.roles.map((role) => (
                      <span
                        key={role}
                        className="border border-bone/15 px-3 py-1.5 text-micro text-fog"
                      >
                        {role}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <ol>
              {study.sections.map((section, index) => (
                <li key={section.label}>
                  <article className="border-b border-bone/12 pb-12 last:border-b-0 [&:not(:first-child)]:pt-12">
                    <Reveal>
                      <div className="flex items-baseline gap-5">
                        <span className="index-numeral text-[0.6875rem] text-brass">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="eyebrow-muted">{section.label}</span>
                      </div>
                    </Reveal>

                    <Reveal delay={80}>
                      <h3 className="font-display mt-6 text-h2 text-paper">
                        {section.heading}
                      </h3>
                    </Reveal>

                    <Reveal delay={160}>
                      <p className="mt-6 max-w-2xl text-body-lg leading-relaxed text-fog">
                        {section.body}
                      </p>
                    </Reveal>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* The film */}
      <Section
        labelledBy="film-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="The Film"
          headingId="film-heading"
          heading={
            <>
              Five minutes
              <span className="text-brass italic"> that carry the argument.</span>
            </>
          }
        />

        <Reveal variant="clip" className="mt-12 block">
          <VideoFrame
            src={study.film?.src}
            poster={study.film?.poster}
            alt={study.film?.alt ?? `The ${study.title} documentary`}
            caption="Press play: nothing downloads until you do"
            aspect="wide"
          />
        </Reveal>
      </Section>

      {/* Visual story */}
      <Section labelledBy="visual-story-heading" container="wide">
        <SectionIntro
          eyebrow="Visual Story"
          headingId="visual-story-heading"
          heading={
            <>
              Frames from
              <span className="text-brass italic"> the field.</span>
            </>
          }
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {study.gallery.map((frame, index) => (
            <Reveal
              as="li"
              key={frame.caption}
              variant="clip"
              delay={index * 110}
            >
              <MediaFrame
                src={frame.src}
                alt={frame.alt}
                caption={frame.caption}
                aspect={index % 3 === 0 ? "classic" : "wide"}
                sizes="(min-width: 640px) 45vw, 100vw"
              />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <div className="mt-14">
            <ButtonLink href="/case-studies" variant="outline" size="lg" withArrow>
              All case studies
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="Your project"
        heading="Have a story like this one?"
        body="If you are documenting a crisis, a programme or a community's work and it deserves more than a report, let's talk about how it should be told."
      />
    </>
  );
}
