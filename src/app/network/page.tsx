import type { Metadata } from "next";

import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { Founder, founderPortrait } from "@/components/sections/Founder";
import { NetworkDiagram } from "@/components/sections/NetworkDiagram";
import { PageHero } from "@/components/sections/PageHero";
import { networkClusters, networkIntro } from "@/content/network";
import { photo } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Network",
  description:
    "SageView operates through an agile network of creative, technical and communication professionals, assembled per project under the Principal Creative Director.",
  path: "/network",
});

export default function NetworkPage() {
  return (
    <>
      <PageHero
        eyebrow={networkIntro.eyebrow}
        title={
          <>
            The team is
            <span className="block text-brass italic">built for the brief.</span>
          </>
        }
        lead={networkIntro.body[0]}
        image={photo.rulersAssembly}
        meta={networkClusters.slice(0, 4).map((cluster) => ({
          label: cluster.index,
          value: cluster.title,
        }))}
      />

      <Section id="model" labelledBy="network-diagram-heading" container="wide">
        <SectionIntro
          eyebrow="The Structure"
          headingId="network-diagram-heading"
          heading={
            <>
              A principal at the centre.
              <span className="text-brass italic">
                {" "}
                Five disciplines around it.
              </span>
            </>
          }
          lead={networkIntro.body[1]}
        />

        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl border-l border-brass/40 pl-6 text-body leading-relaxed text-mist">
            {networkIntro.note}
          </p>
        </Reveal>

        <div className="mt-16">
          <NetworkDiagram portrait={founderPortrait()} />
        </div>
      </Section>

      <Founder />

      {/* Full roster of disciplines, always readable without interaction. */}
      <Section
        id="clusters"
        labelledBy="clusters-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="Every Discipline"
          headingId="clusters-heading"
          heading={
            <>
              The full
              <span className="text-brass italic"> roster of roles.</span>
            </>
          }
        />

        <ul className="mt-14 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
          {networkClusters.map((cluster, index) => (
            <Reveal as="li" key={cluster.id} delay={index * 90}>
              <div className="flex h-full flex-col bg-ink p-8">
                <span className="index-numeral text-[0.6875rem] text-brass">
                  {cluster.index}
                </span>

                <h3 className="font-display mt-6 text-h3 text-paper">
                  {cluster.title}
                </h3>

                <p className="mt-3 text-body-sm leading-relaxed text-mist">
                  {cluster.summary}
                </p>

                <ul className="mt-7 flex flex-col border-t border-bone/12">
                  {cluster.roles.map((role) => (
                    <li
                      key={role}
                      className="border-b border-bone/10 py-3 text-body-sm text-fog last:border-b-0"
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CTASection />
    </>
  );
}

