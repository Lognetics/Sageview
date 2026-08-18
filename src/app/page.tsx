import type { Metadata } from "next";

import { ButtonLink, TextLink } from "@/components/primitives/Button";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { AssetEcosystem } from "@/components/sections/Deliverables";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { KamaMuta } from "@/components/sections/KamaMuta";
import { NarrativeDesigners } from "@/components/sections/NarrativeDesigners";
import { NetworkDiagram } from "@/components/sections/NetworkDiagram";
import { Pillars } from "@/components/sections/Pillars";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { ServiceExplorer } from "@/components/sections/ServiceExplorer";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { VisionTeaser } from "@/components/sections/VisionManifesto";
import { WhySageView } from "@/components/sections/WhySageView";
import { networkIntro } from "@/content/network";
import { deliverablesIntro } from "@/content/deliverables";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  description: site.seoDescription,
  path: "/",
});

/**
 * The homepage tells the whole argument in order:
 * who we are → what we believe → where we're going → what we do → how we
 * think → how we work → proof → what you receive → why us → how we scale →
 * what clients say → let's talk.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <NarrativeDesigners />
      <Pillars />
      <VisionTeaser />

      {/* What we do */}
      <Section id="services" labelledBy="services-heading" container="wide">
        <SectionIntro
          eyebrow="What We Do"
          headingId="services-heading"
          heading={
            <>
              Three disciplines,
              <span className="text-brass italic"> one continuous craft.</span>
            </>
          }
          lead="Strategy, documentary and full-scale production are not separate departments here. They are the same team, working from the same brief."
        />

        <div className="mt-14">
          <ServiceExplorer />
        </div>

        <div className="mt-12">
          <ButtonLink href="/services" variant="outline" size="lg" withArrow>
            See all services
          </ButtonLink>
        </div>
      </Section>

      <KamaMuta />

      {/* Our process */}
      <Section id="process" labelledBy="process-heading" container="wide">
        <SectionIntro
          eyebrow="Our Process"
          headingId="process-heading"
          heading={
            <>
              Five stages,
              <span className="text-brass italic"> nothing improvised.</span>
            </>
          }
          lead="From the first briefing to the final master, every project moves through the same disciplined sequence."
        />

        <div className="mt-14">
          <ProcessPreview />
        </div>

        <div className="mt-10">
          <TextLink href="/process">Walk through the full process</TextLink>
        </div>
      </Section>

      <FeaturedCaseStudy />

      {/* Deliverables */}
      <Section
        id="deliverables"
        labelledBy="deliverables-heading"
        container="wide"
      >
        <SectionIntro
          eyebrow="Deliverables"
          headingId="deliverables-heading"
          heading={
            <>
              What you actually
              <span className="text-brass italic"> receive.</span>
            </>
          }
          lead={deliverablesIntro}
        />

        <div className="mt-16">
          <AssetEcosystem level={3} />
        </div>

        <div className="mt-12">
          <TextLink href="/deliverables">
            See both deliverable packages
          </TextLink>
        </div>
      </Section>

      {/* Why SageView */}
      <Section
        id="why-sageview"
        labelledBy="why-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="Why SageView"
          headingId="why-heading"
          heading={
            <>
              Five reasons organisations
              <span className="text-brass italic"> trust us with the story.</span>
            </>
          }
        />

        <div className="mt-14">
          <WhySageView />
        </div>
      </Section>

      {/* Agile network */}
      <Section id="network" labelledBy="network-heading" container="wide">
        <SectionIntro
          eyebrow={networkIntro.eyebrow}
          headingId="network-heading"
          heading={
            <>
              We don&rsquo;t believe in
              <span className="text-brass italic">
                {" "}
                one-size-fits-all production.
              </span>
            </>
          }
          lead={networkIntro.body[1]}
        />

        <div className="mt-16">
          <NetworkDiagram />
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        id="testimonials"
        labelledBy="testimonials-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="Client Testimonials"
          headingId="testimonials-heading"
          heading={
            <>
              In their
              <span className="text-brass italic"> own words.</span>
            </>
          }
        />

        <div className="mt-14 max-w-4xl">
          <TestimonialSlider />
        </div>
      </Section>

      <CTASection />
    </>
  );
}
