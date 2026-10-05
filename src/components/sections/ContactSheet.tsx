"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import type { WorkProject } from "@/content/work";

/**
 * The contact sheet.
 *
 * Work is presented the way a photographer actually reviews it: frames in a
 * dense sequence on a sheet, numbered, with a grease-pencil ring around the
 * one under consideration. It replaces a grid of equal cards with something
 * drawn from the craft, and it puts far more of the work on screen at once.
 *
 * Hovering a frame scrubs through that project's stills, so the sheet is
 * animated by the photography itself rather than by decoration. Scrubbing is
 * per-frame state held here rather than in each cell, so only one timer runs
 * for the sheet no matter how many frames are on it.
 */
export function ContactSheet({
  projects,
  className,
}: {
  projects: readonly WorkProject[];
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
      setStep(0);
      return;
    }

    // Slow enough to read as frames being examined, not as a slideshow.
    timer.current = setInterval(() => setStep((s) => s + 1), 620);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [active]);

  return (
    <div className={cn("sheet", className)}>
      {/* Film perforations run the length of the sheet, top and bottom. */}
      <div aria-hidden="true" className="sheet-perf" />

      <ol className="grid grid-cols-2 gap-x-3 gap-y-8 py-8 sm:gap-x-5 lg:grid-cols-3">
        {projects.map((project, index) => {
          const frames = [project.image, ...(project.gallery ?? [])];
          const isActive = active === project.slug;
          const frame = isActive ? frames[step % frames.length] : frames[0];

          return (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => setActive(project.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(project.slug)}
                onBlur={() => setActive(null)}
                className="group block"
              >
                <div className="relative">
                  <div className="relative aspect-[3/2] overflow-hidden bg-[var(--surface-sunken)]">
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      fill
                      priority={index < 3}
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  {/*
                    The grease-pencil ring: how a frame gets marked for
                    selection on a real sheet. Drawn slightly off-square and
                    rotated so it reads as hand-made rather than as a border.
                  */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -inset-[6px] rounded-[42%_58%_46%_54%/52%_44%_56%_48%]",
                      "border-2 border-[var(--accent)] opacity-0",
                      "transition-opacity duration-[var(--dur-base)]",
                      "group-hover:opacity-90 group-focus-visible:opacity-90",
                    )}
                    style={{ transform: "rotate(-1.2deg)" }}
                  />
                </div>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="index-numeral shrink-0 text-[0.62rem] text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate font-mono text-[0.62rem] tracking-[0.14em] text-[var(--text-muted)] uppercase transition-colors group-hover:text-[var(--text-strong)]">
                    {project.title}
                  </span>
                  {frames.length > 1 ? (
                    <span className="ml-auto shrink-0 font-mono text-[0.58rem] text-[var(--text-faint)]">
                      {frames.length}f
                    </span>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      <div aria-hidden="true" className="sheet-perf" />
    </div>
  );
}
