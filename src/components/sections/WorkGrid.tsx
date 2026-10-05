"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { ContactSheet } from "@/components/sections/ContactSheet";
import { cn } from "@/lib/cn";
import {
  projectsFor,
  workFilters,
  type WorkFilterId,
  type WorkProject,
} from "@/content/work";

/**
 * The work index.
 *
 * Filtering happens in place: choosing a category re-renders the grid rather
 * than navigating to a category page, which is the whole point of the filter
 * row. The active filter is mirrored into `?category=` so a filtered view can
 * be linked, shared and reached from the header submenu, and so the back
 * button steps through filters the way a visitor expects.
 *
 * `scroll: false` on the replace keeps the page from jumping to the top each
 * time a filter is pressed.
 */
export function WorkGrid() {
  const router = useRouter();
  const params = useSearchParams();

  const raw = params.get("category");
  const active: WorkFilterId = useMemo(() => {
    const match = workFilters.find((filter) => filter.id === raw);
    return (match?.id ?? "all") as WorkFilterId;
  }, [raw]);

  const projects = useMemo(() => projectsFor(active), [active]);

  const select = useCallback(
    (id: WorkFilterId) => {
      const query = id === "all" ? "/work" : `/work?category=${id}`;
      router.replace(query, { scroll: false });
    },
    [router],
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter work by category"
        className="flex flex-wrap items-center gap-x-2 gap-y-3 border-b pb-6"
      >
        {workFilters.map((filter) => {
          const selected = filter.id === active;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => select(filter.id as WorkFilterId)}
              className={cn(
                "px-4 py-2 font-mono text-[0.68rem] tracking-[0.18em] uppercase",
                "transition-colors duration-[var(--dur-fast)]",
                selected
                  ? "bg-[var(--text-strong)] text-[var(--surface)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-strong)]",
              )}
            >
              {filter.label}
            </button>
          );
        })}

        <p
          aria-live="polite"
          className="ml-auto font-mono text-[0.68rem] tracking-[0.18em] text-[var(--text-faint)] uppercase"
        >
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="py-24 text-center text-body-lg text-[var(--text-muted)]">
          Nothing in this category yet.
        </p>
      ) : (
        <ContactSheet projects={projects} className="mt-6" />
      )}
    </>
  );
}
