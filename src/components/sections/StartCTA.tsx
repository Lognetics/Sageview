import Link from "next/link";

import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";
import { contact, primaryAction } from "@/content/site";

/** Closing call to action. Appears at the foot of every page. */
export function StartCTA() {
  return (
    <Section labelledBy="start-cta-heading" container="wide" tone="dark">
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <h2 id="start-cta-heading" className="display max-w-3xl text-display">
            Have a story
            <span className="block text-[var(--text-faint)]">to tell?</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="shrink-0">
          <Link
            href={primaryAction.href}
            className="inline-flex items-center bg-[var(--text-strong)] px-8 py-5 font-mono text-[0.7rem] tracking-[0.18em] text-[var(--color-ink)] uppercase transition-colors duration-[var(--dur-fast)] hover:bg-[var(--accent)]"
          >
            {primaryAction.label}
          </Link>

          <p className="mt-6 text-body-sm text-[var(--text-muted)]">
            Or write to{" "}
            <a
              href={`mailto:${contact.projectEmail}`}
              className="text-[var(--text-strong)] underline underline-offset-4"
            >
              {contact.projectEmail}
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
