import Link from "next/link";

import { ContactSheet } from "@/components/sections/ContactSheet";
import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { workProjects } from "@/content/work";

/**
 * Selected work, as a contact sheet.
 *
 * The homepage is a trailer for the work index rather than a second copy of
 * it, so this shows the sheet and sends people on. Hovering a frame scrubs
 * that project's stills, which is what makes the sheet move.
 */
export function SelectedWork() {
  const projects = [...workProjects].sort((a, b) => a.order - b.order).slice(0, 6);

  return (
    <Section
      id="selected-work"
      labelledBy="selected-work-heading"
      container="wide"
      tone="light"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionIntro
          eyebrow="Selected Work"
          headingId="selected-work-heading"
          heading="Recent"
          accent="frames."
        />
        <Reveal delay={120}>
          <Link
            href="/work"
            className="font-mono text-[0.68rem] tracking-[0.18em] text-[var(--text-strong)] uppercase underline underline-offset-8 hover:text-[var(--accent)]"
          >
            View All Work
          </Link>
        </Reveal>
      </div>

      <ContactSheet projects={projects} className="mt-12" />
    </Section>
  );
}
