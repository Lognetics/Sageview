import Link from "next/link";

import { Section, SectionIntro } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { services } from "@/content/services";

/**
 * The four disciplines, as a numbered index.
 *
 * Each row links into its own section on the Services page rather than to a
 * separate page per discipline: one page that can be read straight through
 * beats four that each need a visit.
 */
export function WhatWeDo() {
  return (
    <Section id="what-we-do" labelledBy="what-we-do-heading" container="wide" tone="dark">
      <SectionIntro
        eyebrow="What We Do"
        headingId="what-we-do-heading"
        heading="Four"
        accent="disciplines."
      />

      <ul className="mt-16 border-t">
        {services.map((service, index) => (
          <Reveal as="li" key={service.slug} delay={index * 60}>
            <Link
              href={`/services#${service.slug}`}
              className="group flex flex-col gap-4 border-b py-8 transition-colors duration-[var(--dur-fast)] hover:bg-[var(--wash)] md:flex-row md:items-baseline md:gap-10 md:py-10"
            >
              <span className="index-numeral shrink-0 text-body-sm text-[var(--accent)]">
                {service.index}
              </span>
              <h3 className="display w-full text-h2 md:w-[38%]">
                {service.name}
              </h3>
              <p className="max-w-md text-body-lg text-[var(--text-body-color)]">
                {service.summary}
              </p>
              <span
                aria-hidden="true"
                className="ml-auto hidden shrink-0 text-[var(--text-faint)] transition-transform duration-[var(--dur-base)] group-hover:translate-x-1 group-hover:text-[var(--accent)] md:block"
              >
                &rarr;
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
