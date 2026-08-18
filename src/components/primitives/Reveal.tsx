"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { observeReveal } from "./reveal-observer";

type RevealVariant = "rise" | "clip" | "wipe";

type RevealProps = {
  children: ReactNode;
  /** Element to render. Use a semantic tag where one applies. */
  as?: "div" | "section" | "article" | "li" | "span" | "figure" | "header";
  variant?: RevealVariant;
  /** Stagger, in milliseconds. */
  delay?: number;
  /** Travel distance for the "rise" variant. */
  distance?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Scroll-triggered reveal.
 *
 * All visual behaviour lives in CSS (see globals.css) and is fully disabled
 * under `prefers-reduced-motion: reduce`. This component only decides *when*
 * an element becomes visible.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  distance,
  className,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return observeReveal(element);
  }, []);

  /**
   * The clip and wipe variants must not be applied to the observed element
   * itself. A `clip-path` that hides an element also empties its intersection
   * rectangle, so IntersectionObserver would never report it as visible and it
   * would stay hidden forever. The observed element therefore stays unclipped
   * and the clip is applied to an inner wrapper.
   */
  const clipsContent = variant === "clip" || variant === "wipe";

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- one ref type across a union of intrinsic tags
      ref={ref as any}
      data-reveal={variant}
      className={cn(className)}
      style={
        {
          ...(delay ? { "--reveal-delay": `${delay}ms` } : null),
          ...(distance ? { "--reveal-y": distance } : null),
          ...style,
        } as CSSProperties
      }
    >
      {clipsContent ? (
        <span data-reveal-inner="" className="block">
          {children}
        </span>
      ) : (
        children
      )}
    </Tag>
  );
}
