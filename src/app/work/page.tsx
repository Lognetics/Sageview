import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/primitives/Section";
import { StartCTA } from "@/components/sections/StartCTA";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected work from SageView Production Ltd across documentary and commercial film, photography and live production.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        heading="Selected"
        accent="work."
        lead="Documentary and commercial film, photography and live production. Filter by discipline."
      />

      <Section container="wide">
        {/*
          WorkGrid reads the active filter from the query string, so it needs a
          Suspense boundary: useSearchParams opts a component out of static
          prerendering unless one is present.
        */}
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <WorkGrid />
        </Suspense>
      </Section>

      <StartCTA />
    </>
  );
}
