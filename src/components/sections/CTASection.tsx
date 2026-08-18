import { ButtonLink } from "@/components/primitives/Button";
import { Reveal } from "@/components/primitives/Reveal";
import { contact } from "@/content/site";

/**
 * The closing invitation, used at the foot of every page.
 *
 * Deliberately written as the next step in the story rather than a sales
 * push — the visitor has just read an argument; this is where it lands.
 */
export function CTASection({
  eyebrow = "Start a Project",
  heading = "Let's build something powerful",
  body = "Tell us what the story has to achieve. We'll come back with a point of view — not a price list.",
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
}) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden border-t border-bone/10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_120%_at_50%_120%,rgba(194,160,90,0.14)_0%,transparent_65%)]"
      />

      <div className="container-editorial section-y">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brass/60" />
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2
              id="cta-heading"
              className="font-display mt-7 max-w-4xl text-h1 text-paper"
            >
              {heading}
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-fog">
              {body}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <ButtonLink href="/contact" size="lg" withArrow>
                Start the Conversation
              </ButtonLink>
              <ButtonLink
                href={`mailto:${contact.email}`}
                size="lg"
                variant="outline"
                external
              >
                Email us directly
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-12 flex flex-col items-center gap-2 text-micro text-ash sm:flex-row sm:gap-6">
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-brass"
              >
                {contact.email}
              </a>
              <span aria-hidden="true" className="hidden h-3 w-px bg-ash/40 sm:block" />
              <a
                href={`tel:${contact.phoneHref}`}
                className="transition-colors hover:text-brass"
              >
                {contact.phone}
              </a>
              <span aria-hidden="true" className="hidden h-3 w-px bg-ash/40 sm:block" />
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brass"
              >
                {contact.instagram}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
