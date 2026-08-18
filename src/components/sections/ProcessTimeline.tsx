"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Reveal } from "@/components/primitives/Reveal";
import { processStages } from "@/content/process";

/**
 * The five-stage creative process.
 *
 * On large screens a sticky index tracks which stage the visitor is reading —
 * the sensation of moving through a production rather than reading a list. The
 * index is decorative reinforcement: every stage's full content is always in
 * the document, so nothing depends on the tracking working.
 *
 * On small screens it becomes a vertical timeline with a continuous rule.
 */
export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const elements = stageRefs.current.filter(Boolean) as HTMLLIElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The stage occupying the middle band of the viewport wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = elements.indexOf(visible.target as HTMLLIElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Sticky index — large screens only. */}
      <div className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-32">
          <p className="eyebrow-muted">Stage</p>
          <p
            aria-hidden="true"
            className="font-display index-numeral mt-4 text-numeral text-brass tabular-nums"
          >
            {processStages[active]?.index}
          </p>

          <ol className="mt-10 flex flex-col gap-4">
            {processStages.map((stage, index) => (
              <li key={stage.id}>
                <a
                  href={`#${stage.id}`}
                  aria-current={index === active ? "step" : undefined}
                  className={cn(
                    "group flex items-baseline gap-4 text-body-sm transition-colors duration-[var(--dur-base)]",
                    index === active
                      ? "text-brass"
                      : "text-ash hover:text-bone",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px origin-left transition-all duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
                      index === active
                        ? "w-10 bg-brass"
                        : "w-4 bg-ash group-hover:w-8 group-hover:bg-bone",
                    )}
                  />
                  {stage.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* The stages. */}
      <ol className="relative lg:col-span-8">
        {/* Continuous timeline rule. */}
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-px bg-bone/10 lg:hidden"
        />

        {processStages.map((stage, index) => (
          <li
            key={stage.id}
            id={stage.id}
            ref={(node) => {
              stageRefs.current[index] = node;
            }}
            className="relative pb-16 pl-8 last:pb-0 lg:pl-0"
          >
            {/* Timeline node (small screens). */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-2 left-0 h-2.5 w-2.5 -translate-x-[calc(50%-0.5px)] rounded-full border transition-colors duration-[var(--dur-base)] lg:hidden",
                index === active
                  ? "border-brass bg-brass"
                  : "border-ash bg-void",
              )}
            />

            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="index-numeral text-[0.6875rem] text-brass">
                  {stage.index}
                </span>
                <span className="eyebrow-muted">{stage.caption}</span>
              </div>

              <h3 className="font-display mt-5 text-h2 text-paper">
                {stage.title}
              </h3>

              <p className="mt-5 max-w-xl text-body-lg leading-relaxed text-fog">
                {stage.description}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 border-t border-bone/10 pt-6">
                <p className="eyebrow-muted">Key focus</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {stage.keyFocus.map((focus) => (
                    <li
                      key={focus}
                      className="border border-bone/15 px-3 py-1.5 text-micro text-fog"
                    >
                      {focus}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal variant="clip" delay={180} className="mt-10 block">
              <MediaFrame
                src={stage.image.src}
                alt={stage.image.alt}
                aspect="cinema"
                label={`Stage ${stage.index}`}
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
