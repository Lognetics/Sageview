import type { Metadata } from "next";

import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { VideoFrame } from "@/components/primitives/VideoFrame";
import { testimonialProject } from "@/content/testimonials";
import { film, photo } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Testimonials",
  description:
    "What clients say about working with SageView Production Ltd, including the team behind the Period Poverty Documentary at Flow with Pride Impact Hub.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Testimonials"
        title={
          <>
            In their
            <span className="block text-brass italic">own words.</span>
          </>
        }
        lead="The most useful thing we can show you is what the people we have worked with chose to say afterwards, unedited."
      image={photo.twoChildrenCrowd}
      />

      <Section labelledBy="quotes-heading" container="wide">
        <SectionIntro
          eyebrow="Voices"
          headingId="quotes-heading"
          heading={
            <>
              Flow with Pride
              <span className="text-brass italic"> Impact Hub.</span>
            </>
          }
        />

        <div className="mt-14 max-w-4xl">
          <TestimonialSlider />
        </div>
      </Section>

      {/* The engagement behind the quotes */}
      <Section
        labelledBy="project-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="The Project"
          headingId="project-heading"
          heading={
            <>
              {testimonialProject.name}
              <span className="block text-brass italic">
                {testimonialProject.client}
              </span>
            </>
          }
        />

        <Reveal variant="clip" className="mt-12 block">
          <VideoFrame
            src={film.periodPoverty.src}
            poster={film.periodPoverty.poster}
            alt={film.periodPoverty.alt}
            caption="The Period Poverty Documentary, press play to watch"
            aspect="wide"
          />
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 md:grid-cols-3">
          {[
            { index: "01", label: "Challenge", body: testimonialProject.challenge },
            { index: "02", label: "Solution", body: testimonialProject.solution },
            { index: "03", label: "Outcome", body: testimonialProject.outcome },
          ].map((item, index) => (
            <Reveal as="li" key={item.index} delay={index * 120}>
              <div className="flex h-full flex-col bg-ink p-8 sm:p-10">
                <span className="index-numeral text-[0.6875rem] text-brass">
                  {item.index}
                </span>
                <h3 className="font-display mt-6 text-h4 text-paper">
                  {item.label}
                </h3>
                <p className="mt-4 text-body leading-relaxed text-fog">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CTASection />
    </>
  );
}

