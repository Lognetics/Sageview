import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Section";
import { founderPortraits, type Media } from "@/content/media";
import { networkIntro } from "@/content/network";
import { principal } from "@/content/site";
import { assetExists } from "@/lib/asset-exists";

/**
 * Which founder portraits are actually on disk, in preference order.
 *
 * Resolved while the page is prerendered, so a portrait that has not been
 * supplied yet simply does not appear: it can never ship as a broken image.
 */
export function availableFounderPortraits(): Media[] {
  return founderPortraits.filter((portrait) => assetExists(portrait.src));
}

export function founderPortrait(): Media | undefined {
  return availableFounderPortraits()[0];
}

/**
 * The principal.
 *
 * Deliberately short on words: the portfolio gives us a name and a role and
 * nothing else, and inventing a biography for a real person would be the one
 * unforgivable thing to get wrong on this site. The portrait carries it, and
 * the only claim made is the approved one about how teams are assembled.
 */
export function Founder() {
  const portraits = availableFounderPortraits();
  if (portraits.length === 0) return null;

  const [lead, ...supporting] = portraits;

  return (
    <section
      aria-labelledby="founder-heading"
      className="relative isolate overflow-hidden border-t border-bone/10 bg-ink"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_100%_at_80%_0%,rgba(194,160,90,0.10)_0%,transparent_60%)]"
      />

      <div className="container-wide section-y">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Lead portrait. Held to a modest column width: the best available
              file is 629px wide, and blowing it up would only make it soft. */}
          <div className="lg:col-span-4">
            <Reveal variant="clip">
              <MediaFrame
                src={lead.src}
                alt={lead.alt}
                aspect="photo"
                label="Principal"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 100vw"
              />
            </Reveal>

            {supporting.length > 0 ? (
              <Reveal delay={160}>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {supporting.slice(0, 2).map((portrait) => (
                    <MediaFrame
                      key={portrait.src}
                      src={portrait.src}
                      alt={portrait.alt}
                      aspect="photo"
                      sizes="(min-width: 1024px) 15vw, 45vw"
                    />
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>

          <div className="lg:col-span-8 lg:pt-6">
            <Reveal>
              <Eyebrow>The Principal</Eyebrow>
            </Reveal>

            <Reveal delay={100}>
              <h2
                id="founder-heading"
                className="font-display mt-7 text-h1 text-paper"
              >
                {principal.name}
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-4 text-body-lg text-brass italic">
                {principal.role}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-8 max-w-xl text-body-lg leading-relaxed text-fog">
                {networkIntro.body[1]}
              </p>
            </Reveal>

            <Reveal delay={340}>
              <p className="mt-6 max-w-xl text-body leading-relaxed text-mist">
                {networkIntro.note}
              </p>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-10">
                <TextLink href="/network">See the full network</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
