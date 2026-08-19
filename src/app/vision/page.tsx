import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { VisionManifesto } from "@/components/sections/VisionManifesto";
import { photo } from "@/content/media";
import { visionStatement } from "@/content/vision";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vision & Mission",
  description:
    "SageView's vision: to become the first name in impact storytelling, an African studio built to the world's standard, and the partner organisations think of first when a story has to move people to act.",
  path: "/vision",
});

export default function VisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Vision & Mission"
        title={
          <>
            The first name in
            <span className="block text-brass italic">impact storytelling.</span>
          </>
        }
        lead={visionStatement.short}
        size="tall"
        image={photo.schoolchildren}
        meta={[
          { label: "Origin", value: "Africa" },
          { label: "Standard", value: "Global" },
          { label: "Metric", value: "Depth" },
          { label: "Outcome", value: "Resonance" },
        ]}
      />

      <VisionManifesto />

      <CTASection
        eyebrow="Be part of it"
        heading="Bring us the story that has to change something."
        body="The vision above is only worth the work behind it. If you are carrying a story that matters, let's talk about how it should be told."
      />
    </>
  );
}
