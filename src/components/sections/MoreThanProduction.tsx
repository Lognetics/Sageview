import { Section, SectionIntro } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * The studio's argument, in three moves.
 *
 * This is the section that separates SageView from a crew for hire, so it
 * states the sequence plainly: the thinking precedes the shoot.
 */
const moves = [
  {
    index: "01",
    name: "Strategy",
    body: "What has to change, who has to change it, and what they need to see before they will. Settled before a camera is specified.",
  },
  {
    index: "02",
    name: "Story",
    body: "The structure that carries the objective. A statistic becomes a person, and an argument becomes something worth sitting through.",
  },
  {
    index: "03",
    name: "Production",
    body: "The craft that makes it hold up on a summit screen, in a boardroom and on a phone. Shot by the team that designed it.",
  },
];

export function MoreThanProduction() {
  return (
    <Section
      id="more-than-production"
      labelledBy="more-than-heading"
      container="wide"
    >
      <SectionIntro
        eyebrow="More Than Production"
        headingId="more-than-heading"
        heading="Most work fails"
        accent="before it is shot."
        lead="Not because it was badly made, but because nobody decided what it was for. We start at the other end."
      />

      <ol className="mt-16 grid gap-px border bg-[var(--line)] md:grid-cols-3">
        {moves.map((move, index) => (
          <Reveal as="li" key={move.name} delay={index * 80}>
            <div className="flex h-full flex-col bg-[var(--surface)] p-8 md:p-10">
              <span className="index-numeral text-body-sm text-[var(--accent)]">
                {move.index}
              </span>
              <h3 className="display mt-8 text-h2">{move.name}</h3>
              <p className="mt-4 text-body text-[var(--text-body-color)]">
                {move.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
