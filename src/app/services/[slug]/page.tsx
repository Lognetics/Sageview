import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/primitives/Button";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Reveal } from "@/components/primitives/Reveal";
import { VideoFrame } from "@/components/primitives/VideoFrame";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { getService, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

/** Every service page is prerendered at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);

  if (!service) return {};

  return pageMetadata({
    title: service.shortTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getService(slug);

  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={`Service ${service.index}`}
        title={
          <>
            {service.displayTitle[0]}
            <span className="block text-brass italic">
              {service.displayTitle[1]}
            </span>
          </>
        }
        lead={service.intro}
        image={service.image}
        meta={service.capabilities.slice(0, 4).map((capability, index) => ({
          label: `0${index + 1}`,
          value: capability.title,
        }))}
      />

      {/* Capabilities */}
      <Section labelledBy="capabilities-heading" container="wide">
        <SectionIntro
          eyebrow="Capabilities"
          headingId="capabilities-heading"
          heading={
            <>
              What this
              <span className="text-brass italic"> covers.</span>
            </>
          }
          lead={service.summary}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal variant="clip">
              <MediaFrame
                src={service.secondaryImage.src}
                alt={service.secondaryImage.alt}
                aspect="portrait"
                label={service.index}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </Reveal>
          </div>

          <ol className="lg:col-span-7">
            {service.capabilities.map((capability, index) => (
              <Reveal as="li" key={capability.title} delay={index * 100}>
                <article className="border-b border-bone/12 py-8 first:pt-0 last:border-b-0">
                  <div className="flex items-baseline gap-5">
                    <span className="index-numeral text-[0.6875rem] text-brass">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-h3 text-paper">
                      {capability.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-body leading-relaxed text-fog">
                    {capability.summary}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {capability.points.map((point) => (
                      <li
                        key={point}
                        className="border border-bone/15 px-3 py-1.5 text-micro text-mist"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* A film from this discipline, where one applies. */}
      {service.showreel ? (
        <Section
          labelledBy="service-film-heading"
          container="wide"
          className="border-t border-bone/10 bg-ink"
        >
          <SectionIntro
            eyebrow="From this practice"
            headingId="service-film-heading"
            heading={
              <>
                A film made
                <span className="text-brass italic"> this way.</span>
              </>
            }
          />

          <Reveal variant="clip" className="mt-12 block">
            <VideoFrame
              src={service.showreel.src}
              poster={service.showreel.poster}
              alt={service.showreel.alt}
              caption={service.showreel.caption}
              aspect="wide"
            />
          </Reveal>
        </Section>
      ) : null}

      {/* Other services */}
      <Section
        labelledBy="other-services-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="Also from SageView"
          headingId="other-services-heading"
          heading={
            <>
              The rest of
              <span className="text-brass italic"> the practice.</span>
            </>
          }
        />

        <ul className="mt-12 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2">
          {others.map((other, index) => (
            <Reveal as="li" key={other.slug} delay={index * 120}>
              <Link
                href={`/services/${other.slug}`}
                className="group flex h-full flex-col bg-ink p-8 transition-colors duration-[var(--dur-base)] hover:bg-charcoal sm:p-10"
              >
                <span className="index-numeral text-[0.6875rem] text-brass">
                  {other.index}
                </span>
                <h3 className="font-display mt-6 text-h3 text-paper transition-colors duration-[var(--dur-base)] group-hover:text-brass">
                  {other.shortTitle}
                </h3>
                <p className="mt-4 text-body-sm leading-relaxed text-mist">
                  {other.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12">
          <ButtonLink href="/services" variant="outline" size="lg" withArrow>
            All services
          </ButtonLink>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
