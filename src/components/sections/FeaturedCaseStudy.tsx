import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Reveal } from "@/components/primitives/Reveal";
import { ButtonLink } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Section";
import { featuredCaseStudy } from "@/content/case-studies";

/**
 * The featured case study, presented full-bleed.
 *
 * This is the site's proof section, so it is given the most cinematic
 * treatment on the homepage: an edge-to-edge frame with the project slate
 * overlaid, then the argument beneath it.
 */
export function FeaturedCaseStudy() {
  const study = featuredCaseStudy;

  return (
    <section
      aria-labelledby="featured-case-heading"
      className="relative border-y border-bone/10 bg-ink"
    >
      <div className="container-wide pt-[var(--spacing-section)]">
        <Reveal>
          <Eyebrow>Featured Case Study</Eyebrow>
        </Reveal>
      </div>

      {/* Full-bleed frame. */}
      <Reveal variant="clip" className="mt-10 block">
        <div className="relative">
          <MediaFrame
            src={study.heroImage.src}
            alt={study.heroImage.alt}
            aspect="cinema"
            sizes="100vw"
            className="[&_figure]:m-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
          />
        </div>
      </Reveal>

      <div className="container-wide pb-[var(--spacing-section)]">
        {/* `relative z-10` is required: the frame above is a positioned
            element, so without it the image paints over this content where
            the negative margin overlaps them. */}
        <div className="relative z-10 -mt-10 grid gap-10 sm:-mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2
                id="featured-case-heading"
                className="font-display text-h1 text-paper"
              >
                {study.displayTitle[0]}
                <span className="block text-brass italic">
                  {study.displayTitle[1]}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-8 max-w-xl text-body-lg leading-relaxed text-fog">
                {study.summary}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10">
                <ButtonLink
                  href={`/case-studies/${study.slug}`}
                  size="lg"
                  withArrow
                >
                  Read the case study
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Project slate. */}
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal delay={200}>
              <dl className="flex flex-col border-t border-bone/15">
                <div className="border-b border-bone/10 py-5">
                  <dt className="eyebrow-muted">Strategic Focus</dt>
                  <dd className="mt-2.5 text-body-sm text-bone">
                    {study.strategicFocus}
                  </dd>
                </div>
                <div className="border-b border-bone/10 py-5">
                  <dt className="eyebrow-muted">Location</dt>
                  <dd className="mt-2.5 text-body-sm text-bone">
                    {study.location}
                  </dd>
                </div>
                <div className="py-5">
                  <dt className="eyebrow-muted">SageView&rsquo;s Role</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {study.roles.map((role) => (
                      <span
                        key={role}
                        className="border border-bone/15 px-3 py-1.5 text-micro text-fog"
                      >
                        {role}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
