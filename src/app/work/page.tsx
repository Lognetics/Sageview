import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/primitives/Section";
import { StartCTA } from "@/components/sections/StartCTA";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { photoEssayProject } from "@/lib/photo-essay";
import { pageMetadata } from "@/lib/seo";
import { workProjects } from "@/content/work";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected work from SageView Production Ltd across documentary and commercial film, photography and live production.",
  path: "/work",
});

export default function WorkPage() {
  /*
    The essay is read off disk at build time and prepended, so dropping frames
    into public/media/photo-essay/ puts it in the index with no code change.
    Absent frames, it is simply not there.
  */
  const essay = photoEssayProject();
  const projects = essay ? [essay, ...workProjects] : workProjects;

  return (
    <>
      <PageHeader
        eyebrow="Work"
        heading="Selected"
        accent="work."
        lead="Documentary and commercial film, photography and live production. Filter by discipline."
      />

      <Section container="wide" tone="light">
        {/*
          WorkGrid reads the active filter from the query string, so it needs a
          Suspense boundary: useSearchParams opts a component out of static
          prerendering unless one is present.
        */}
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <WorkGrid projects={projects} />
        </Suspense>
      </Section>

      <StartCTA />
    </>
  );
}
