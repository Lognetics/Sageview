import type { Metadata } from "next";

import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { WorkflowTimeline } from "@/components/sections/WorkflowTimeline";
import { photo } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Process",
  description:
    "Five stages from discovery to delivery: discovery and alignment, narrative design, strategic pre-production, purposeful production, and post-production and editorial delivery.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title={
          <>
            Five stages,
            <span className="block text-brass italic">nothing improvised.</span>
          </>
        }
        lead="Every project moves through the same disciplined sequence, because the difference between a film that moves people and one that merely documents them is decided long before the camera is switched on."
        image={photo.quarryWide}
        meta={[
          { label: "Stage 01", value: "Discovery" },
          { label: "Stage 02", value: "Narrative" },
          { label: "Stage 03", value: "Pre-Production" },
          { label: "Stage 05", value: "Delivery" },
        ]}
      />

      <Section id="stages" labelledBy="timeline-heading" container="wide">
        <SectionIntro
          eyebrow="The Making"
          headingId="timeline-heading"
          heading={
            <>
              From the first briefing
              <span className="text-brass italic"> to the final master.</span>
            </>
          }
        />

        <div className="mt-16">
          <ProcessTimeline />
        </div>
      </Section>

      <Section
        id="engagement"
        labelledBy="process-workflow-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="Client Workflow"
          headingId="process-workflow-heading"
          heading={
            <>
              And before all that:
              <span className="text-brass italic"> the engagement.</span>
            </>
          }
          lead="The creative process above describes how the work is made. This is how working together actually begins."
        />

        <div className="mt-16">
          <WorkflowTimeline />
        </div>
      </Section>

      <CTASection />
    </>
  );
}

