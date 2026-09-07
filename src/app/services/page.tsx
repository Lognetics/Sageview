import type { Metadata } from "next";

import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { StartCTA } from "@/components/sections/StartCTA";
import {
  contentEcosystem,
  processIntro,
  processSteps,
  services,
  servicesIntro,
} from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Film, photography, visual communication and live production from SageView Production Ltd, and the four-stage process behind every project.",
  path: "/services",
});

/**
 * Services.
 *
 * Four disciplines on one page, then the process. Process lives here rather
 * than in the header: it is a reason to hire the studio, not something a
 * visitor shops for on its own.
 *
 * Bands alternate ground so the four disciplines read as separate chapters
 * without needing four separate pages.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow={servicesIntro.eyebrow}
        heading={servicesIntro.heading}
        accent={servicesIntro.headingAccent}
        lead={servicesIntro.lead}
      />

      {services.map((service, index) => (
        <Section
          key={service.slug}
          id={service.slug}
          labelledBy={`${service.slug}-heading`}
          container="wide"
          tone={index % 2 === 1 ? "dark" : "paper"}
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-[var(--accent)]"
                  />
                  {service.index}
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h2
                  id={`${service.slug}-heading`}
                  className="display mt-6 text-h1"
                >
                  {service.name}
                </h2>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-8 max-w-md text-body-lg leading-relaxed text-[var(--text-body-color)]">
                  {service.body}
                </p>
              </Reveal>
            </div>

            <ul className="lg:col-span-7">
              {service.items.map((item, itemIndex) => (
                <Reveal as="li" key={item.name} delay={itemIndex * 50}>
                  <div className="border-t py-7">
                    <h3 className="display-soft text-h4">{item.name}</h3>
                    <p className="mt-3 max-w-xl text-body text-[var(--text-body-color)]">
                      {item.body}
                    </p>

                    {item.points ? (
                      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="font-mono text-[0.65rem] tracking-[0.14em] text-[var(--text-faint)] uppercase"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              ))}

              {/*
                The ecosystem cascade belongs to Visual Communication: it is
                the clearest demonstration of what the strategic layer is
                actually worth, so it sits inside that discipline rather than
                as a band of its own.
              */}
              {service.slug === "visual-communication" ? (
                <Reveal as="li" delay={120}>
                  <div className="mt-10 border p-8 md:p-10">
                    <p className="eyebrow">{contentEcosystem.eyebrow}</p>
                    <h3 className="display mt-6 text-h3">
                      {contentEcosystem.heading}
                      <span className="block text-[var(--text-faint)]">
                        {contentEcosystem.headingAccent}
                      </span>
                    </h3>
                    <p className="mt-5 max-w-lg text-body text-[var(--text-body-color)]">
                      {contentEcosystem.lead}
                    </p>

                    <ol className="mt-8 flex flex-col">
                      {contentEcosystem.chain.map((link) => (
                        <li
                          key={link.label}
                          className="flex items-baseline gap-5 border-b py-3 last:border-b-0"
                        >
                          <span className="index-numeral w-8 shrink-0 text-body-sm text-[var(--accent)]">
                            {link.count}
                          </span>
                          <span className="text-body text-[var(--text-strong)]">
                            {link.label}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>
              ) : null}
            </ul>
          </div>
        </Section>
      ))}

      <Section
        id="process"
        labelledBy="process-heading"
        container="wide"
        tone="sunken"
      >
        <SectionIntro
          eyebrow={processIntro.eyebrow}
          headingId="process-heading"
          heading={processIntro.heading}
          accent={processIntro.headingAccent}
          lead={processIntro.lead}
        />

        <ol className="mt-16 grid gap-px border bg-[var(--line)] md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.index} delay={index * 70}>
              <div className="flex h-full flex-col bg-[var(--surface)] p-8 md:p-10">
                <span className="index-numeral text-body-sm text-[var(--accent)]">
                  {step.index}
                </span>
                <h3 className="display mt-8 text-h3">{step.name}</h3>
                <p className="mt-4 text-body text-[var(--text-body-color)]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <StartCTA />
    </>
  );
}
