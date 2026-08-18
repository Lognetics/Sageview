import type { Metadata } from "next";

import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceExplorer } from "@/components/sections/ServiceExplorer";
import { WorkflowTimeline } from "@/components/sections/WorkflowTimeline";
import { photo } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Documentary filmmaking and human-centered storytelling, visual communication strategy and conception, and full-scale production management — including live technical broadcast.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Three disciplines,
            <span className="block text-brass italic">
              one continuous craft.
            </span>
          </>
        }
        lead="Strategy, documentary and full-scale production are not separate departments here. They are the same team, working from the same brief — which is why the intent set in the first meeting is still intact in the final grade."
        image={photo.collierSmiling}
        meta={[
          { label: "01", value: "Documentary" },
          { label: "02", value: "Visual Strategy" },
          { label: "03", value: "Full Production" },
          { label: "Includes", value: "Live Broadcast" },
        ]}
      />

      <Section labelledBy="service-list-heading" container="wide">
        <SectionIntro
          eyebrow="Capabilities"
          headingId="service-list-heading"
          heading={
            <>
              Select a discipline
              <span className="text-brass italic"> to open it.</span>
            </>
          }
        />

        <div className="mt-14">
          <ServiceExplorer />
        </div>
      </Section>

      <Section
        labelledBy="workflow-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="Client Workflow"
          headingId="workflow-heading"
          heading={
            <>
              What happens
              <span className="text-brass italic"> after you reach us.</span>
            </>
          }
          lead="Three steps from first contact to a crew in the field. No mystery, no drawn-out procurement theatre."
        />

        <div className="mt-16">
          <WorkflowTimeline />
        </div>
      </Section>

      <CTASection />
    </>
  );
}

