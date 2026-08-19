"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";
import { ApertureMark } from "@/components/layout/Logo";
import { Reveal } from "@/components/primitives/Reveal";
import { networkClusters } from "@/content/network";
import { principal } from "@/content/site";

/**
 * The agile network.
 *
 * The point being made is structural: a principal at the centre, with
 * discipline clusters that are engaged as a brief requires. So the diagram is
 * literally that, a hub with five satellites, each one selectable.
 *
 * One set of markup serves both layouts. Above `lg` the cluster buttons are
 * absolutely positioned around the hub with drawn connectors; below `lg` the
 * same buttons fall back into a plain stacked list and the connector layer is
 * hidden. Nothing is duplicated, and the roles are always readable in the
 * panel beneath.
 */

/**
 * Satellite positions, as percentages of the square diagram box.
 *
 * Derived from a circle at −90°, −18°, 54°, 126°, 198°, then tuned so that a
 * 28%-wide node clears both the container edge and the 32%-wide hub with a
 * visible gap on either side. Changing either width means re-checking these.
 */
const NODE_POSITIONS = [
  { x: 50, y: 9 },
  { x: 83, y: 37 },
  { x: 71, y: 83 },
  { x: 29, y: 83 },
  { x: 17, y: 37 },
] as const;

export function NetworkDiagram({
  /** Portrait of the principal, when one has been supplied. */
  portrait,
}: {
  portrait?: { src: string; alt: string };
} = {}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const activeCluster = networkClusters[active];

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Diagram */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="relative mx-auto w-full max-w-[44rem] lg:aspect-square">
              {/* Connectors, decorative, desktop only. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 hidden h-full w-full lg:block"
              >
                {NODE_POSITIONS.map((position, index) => (
                  <line
                    key={index}
                    x1="50"
                    y1="50"
                    x2={position.x}
                    y2={position.y}
                    stroke="currentColor"
                    strokeWidth="0.22"
                    className={cn(
                      "transition-colors duration-[var(--dur-base)]",
                      index === active ? "text-brass" : "text-bone/20",
                    )}
                  />
                ))}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.15"
                  strokeDasharray="1 2"
                  className="text-bone/15"
                />
              </svg>

              {/* Hub */}
              <div className="relative z-10 flex flex-col items-center border border-brass/40 bg-charcoal px-5 py-7 text-center lg:absolute lg:top-1/2 lg:left-1/2 lg:w-[32%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-4 lg:py-6">
                {portrait ? (
                  <span className="relative block h-16 w-16 overflow-hidden rounded-full border border-brass/50">
                    <Image
                      src={portrait.src}
                      alt={portrait.alt}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </span>
                ) : (
                  <ApertureMark className="h-8 w-8 text-brass" />
                )}
                <p className="eyebrow-muted mt-4">Principal</p>
                <p className="font-display mt-2.5 text-h4 leading-tight text-paper lg:text-[1.25rem]">
                  {principal.name}
                </p>
                <p className="mt-2 text-micro leading-snug text-mist lg:text-[0.6875rem]">
                  {principal.role}
                </p>
              </div>

              {/* Cluster nodes */}
              <ul className="mt-6 flex flex-col gap-3 lg:mt-0 lg:contents">
                {networkClusters.map((cluster, index) => {
                  const position = NODE_POSITIONS[index];
                  const isActive = index === active;

                  return (
                    <li
                      key={cluster.id}
                      className="lg:absolute lg:z-20 lg:w-[28%] lg:-translate-x-1/2 lg:-translate-y-1/2"
                      style={{
                        ["--node-x" as string]: `${position.x}%`,
                        ["--node-y" as string]: `${position.y}%`,
                        left: "var(--node-x)",
                        top: "var(--node-y)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActive(index)}
                        aria-pressed={isActive}
                        aria-controls={`${baseId}-roles`}
                        className={cn(
                          "flex w-full cursor-pointer items-center gap-3 border px-4 py-3.5 text-left transition-all duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)] lg:gap-2.5 lg:px-3 lg:py-3",
                          isActive
                            ? "border-brass bg-brass text-void"
                            : "border-bone/20 bg-void text-bone hover:border-brass/60 hover:bg-charcoal",
                        )}
                      >
                        <span
                          className={cn(
                            "index-numeral text-[0.625rem]",
                            isActive ? "text-void/70" : "text-brass",
                          )}
                        >
                          {cluster.index}
                        </span>
                        <span className="min-w-0 flex-1 text-body-sm leading-tight font-medium lg:text-[0.8125rem]">
                          {cluster.title}
                        </span>
                        <span
                          className={cn(
                            "index-numeral text-[0.625rem]",
                            isActive ? "text-void/70" : "text-ash",
                          )}
                        >
                          {cluster.roles.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Roles panel */}
        <div className="lg:col-span-5">
          <Reveal delay={140}>
            <div
              id={`${baseId}-roles`}
              aria-live="polite"
              className="border-t border-bone/15 pt-8 lg:sticky lg:top-32"
            >
              <p className="eyebrow">{activeCluster.title}</p>

              <p className="mt-5 text-body leading-relaxed text-fog">
                {activeCluster.summary}
              </p>

              <ul className="mt-8 flex flex-col">
                {activeCluster.roles.map((role, index) => (
                  <li
                    key={role}
                    className="flex items-baseline gap-4 border-b border-bone/10 py-3.5 last:border-b-0"
                    style={{
                      animation: `network-role-in var(--dur-base) cubic-bezier(0.22,1,0.36,1) ${index * 55}ms both`,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-4 shrink-0 bg-brass/60"
                    />
                    <span className="text-body-sm text-bone">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
