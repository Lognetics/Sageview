import { Section } from "@/components/primitives/Section";
import { clients } from "@/content/work";

/**
 * Clients and collaborators.
 *
 * A continuous scrolling strip. The list is duplicated so the track can loop
 * seamlessly, and the copy is hidden from assistive technology so the names
 * are announced once rather than twice.
 *
 * These are set in the site's own type rather than as logo files: no artwork
 * has been supplied, and a name set in Archivo is honest where a fabricated
 * logo would not be. Drop real logos in and this becomes an image strip.
 */
export function ClientMarquee() {
  return (
    <Section
      id="clients"
      labelledBy="clients-heading"
      container="none"
      tone="sunken"
      className="overflow-hidden"
    >
      <div className="container-wide">
        <h2
          id="clients-heading"
          className="eyebrow-muted flex items-center gap-3"
        >
          <span aria-hidden="true" className="h-px w-8 bg-[var(--text-faint)]" />
          Selected Clients &amp; Collaborators
        </h2>
      </div>

      <div className="mt-12">
        <div className="marquee">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
              className="flex shrink-0 items-center"
            >
              {clients.map((client) => (
                <li
                  key={`${copy}-${client}`}
                  className="display px-10 text-h2 whitespace-nowrap text-[var(--text-faint)] md:px-16"
                >
                  {client}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Section>
  );
}
