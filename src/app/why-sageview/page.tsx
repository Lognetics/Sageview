import type { Metadata } from "next";

import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { WhySageView } from "@/components/sections/WhySageView";
import { WorkflowTimeline } from "@/components/sections/WorkflowTimeline";
import { whySageView } from "@/content/about";
import { photo } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Why SageView",
  description:
    "Purpose-driven documentaries, uncompromised cinematic excellence, strategic communication alignment, human-centered ethical filmmaking and dynamic, agile deployment.",
  path: "/why-sageview",
});

export default function WhySageViewPage() {
  return (
    <>
      <PageHero
        eyebrow="Why SageView"
        title={
          <>
            Five reasons organisations
            <span className="block text-brass italic">
              trust us with the story.
            </span>
          </>
        }
        lead="Credibility in this field is not claimed: it is demonstrated, in how a subject is treated, how a budget is respected and whether the finished film survives the room it is shown in."
        image={photo.portersCarrying}
        meta={whySageView.slice(0, 4).map((reason) => ({
          label: reason.index,
          value: reason.title.split(",")[0],
        }))}
      />

      <Section labelledBy="differentiators-heading" container="wide">
        <SectionIntro
          eyebrow="The Difference"
          headingId="differentiators-heading"
          heading={
            <>
              What you get
              <span className="text-brass italic"> that you would not elsewhere.</span>
            </>
          }
        />

        <div className="mt-14">
          <WhySageView />
        </div>
      </Section>

      <Section
        labelledBy="why-workflow-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="Client Workflow"
          headingId="why-workflow-heading"
          heading={
            <>
              Three steps
              <span className="text-brass italic"> from enquiry to deployment.</span>
            </>
          }
        />

        <div className="mt-16">
          <WorkflowTimeline />
        </div>
      </Section>

      <CTASection />
    </>
  );
}

