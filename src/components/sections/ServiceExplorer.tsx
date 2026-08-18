"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/cn";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { TextLink } from "@/components/primitives/Button";
import { services } from "@/content/services";

/**
 * The service system.
 *
 * One structure that works at every breakpoint: a stack of large editorial
 * rows that open in place. Opening a service expands its title block, brings
 * in its imagery, animates its capabilities into view and exposes a link to
 * the full service page — which is exactly the desktop interaction described
 * in the brief, without maintaining a second set of markup for mobile.
 *
 * Height animates via the `grid-template-rows: 0fr → 1fr` technique, so there
 * is no JavaScript measuring and no jump when content reflows.
 */
export function ServiceExplorer({
  /** Which row starts open. */
  initialOpen = 0,
  /** Hides the "full service page" links when the explorer *is* that page. */
  showLinks = true,
}: {
  initialOpen?: number;
  showLinks?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(initialOpen);
  const baseId = useId();

  return (
    <ul className="border-t border-bone/15">
      {services.map((service, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <li key={service.slug} className="border-b border-bone/15">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full cursor-pointer items-start gap-5 py-8 text-left sm:gap-8 sm:py-10"
              >
                <span
                  className={cn(
                    "index-numeral mt-2 shrink-0 text-[0.6875rem] transition-colors duration-[var(--dur-base)] sm:mt-4",
                    isOpen ? "text-brass" : "text-ash group-hover:text-brass",
                  )}
                >
                  {service.index}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "font-display block text-h2 transition-colors duration-[var(--dur-base)]",
                      isOpen
                        ? "text-brass"
                        : "text-paper group-hover:text-brass",
                    )}
                  >
                    {service.displayTitle[0]}{" "}
                    <span className="italic">{service.displayTitle[1]}</span>
                  </span>

                  <span className="mt-3 block max-w-2xl text-body-sm leading-relaxed text-mist">
                    {service.summary}
                  </span>
                </span>

                <PlusMark open={isOpen} />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              // Keeps links inside a collapsed panel out of the tab order.
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="grid gap-10 pt-2 pb-12 sm:pl-[calc(0.6875rem+2rem)] lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-5">
                    <MediaFrame
                      src={service.image.src}
                      alt={service.image.alt}
                      aspect="classic"
                      label={`Service ${service.index}`}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                    <p className="mt-6 text-body leading-relaxed text-fog">
                      {service.intro}
                    </p>
                    {showLinks ? (
                      <div className="mt-7">
                        <TextLink href={`/services/${service.slug}`}>
                          Explore {service.shortTitle}
                        </TextLink>
                      </div>
                    ) : null}
                  </div>

                  <div className="lg:col-span-7">
                    <p className="eyebrow-muted">Capabilities</p>
                    <ul className="mt-6 flex flex-col">
                      {service.capabilities.map((capability, capIndex) => (
                        <li
                          key={capability.title}
                          className="border-t border-bone/10 py-6 first:border-t-0 first:pt-0"
                          style={{
                            transitionDelay: `${capIndex * 70}ms`,
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen
                              ? "translateY(0)"
                              : "translateY(0.75rem)",
                            transitionProperty: "opacity, transform",
                            transitionDuration: "var(--dur-base)",
                            transitionTimingFunction:
                              "cubic-bezier(0.22,1,0.36,1)",
                          }}
                        >
                          <h4 className="font-display text-h4 text-paper">
                            {capability.title}
                          </h4>
                          <p className="mt-2 text-body-sm leading-relaxed text-mist">
                            {capability.summary}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                            {capability.points.map((point) => (
                              <li
                                key={point}
                                className="border border-bone/15 px-3 py-1.5 text-micro text-fog"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** A plus that rotates into a minus. */
function PlusMark({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative mt-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-[var(--dur-base)] sm:mt-5",
        open
          ? "border-brass text-brass"
          : "border-bone/25 text-bone group-hover:border-brass group-hover:text-brass",
      )}
    >
      <span className="absolute h-px w-3 bg-current" />
      <span
        className={cn(
          "absolute h-3 w-px bg-current transition-transform duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "scale-y-0" : "scale-y-100",
        )}
      />
    </span>
  );
}
