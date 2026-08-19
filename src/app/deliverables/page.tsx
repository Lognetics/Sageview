import type { Metadata } from "next";

import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import {
  AssetEcosystem,
  DeliverablePackages,
} from "@/components/sections/Deliverables";
import { PageHero } from "@/components/sections/PageHero";
import { deliverablesIntro } from "@/content/deliverables";
import { photo } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Deliverables",
  description:
    "Customised asset packages for institutional reports, global campaigns and digital platforms: the Documentary Package and the Brand Strategy Package.",
  path: "/deliverables",
});

export default function DeliverablesPage() {
  return (
    <>
      <PageHero
        eyebrow="Deliverables"
        title={
          <>
            One production.
            <span className="block text-brass italic">
              An entire communication set.
            </span>
          </>
        }
        lead={deliverablesIntro}
        image={photo.forestrySummit}
        meta={[
          { label: "Package 01", value: "Documentary" },
          { label: "Package 02", value: "Brand Strategy" },
          { label: "Master film", value: "3–10 minutes" },
          { label: "Highlight edit", value: "60–90 seconds" },
        ]}
      />

      <Section labelledBy="ecosystem-heading" container="wide">
        <AssetEcosystem headingId="ecosystem-heading" />
      </Section>

      <Section
        labelledBy="packages-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="The Packages"
          headingId="packages-heading"
          heading={
            <>
              Two ways
              <span className="text-brass italic"> to work with us.</span>
            </>
          }
          lead="Each package is customised to the campaign it serves. These are the assets they are built from."
        />

        <div className="mt-16">
          <DeliverablePackages />
        </div>
      </Section>

      <CTASection
        eyebrow="Scope your package"
        heading="Not sure which package fits?"
        body="Tell us what the campaign has to achieve and who has to be convinced. We'll propose the asset set that gets you there."
      />
    </>
  );
}

