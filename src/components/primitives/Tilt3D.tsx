"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Pointer-driven 3D tilt.
 *
 * The card leans toward the cursor and lifts slightly off the page, and the
 * media inside it moves further than the frame does, which is what sells the
 * depth: parallax between layers reads as three-dimensional where a plain
 * rotation just reads as a skew.
 *
 * Written to custom properties rather than to `style.transform` so the
 * transform itself stays in CSS and the browser can keep it on the compositor.
 * Updates are coalesced into one animation frame, so a fast pointer cannot
 * queue more work than the display can show.
 *
 * Ignores fine-pointer effects entirely on touch, where there is no hover to
 * respond to, and the reduced-motion guard lives in CSS so it cannot be
 * bypassed by a stray inline style.
 */
export function Tilt3D({
  children,
  className,
  /** Maximum lean, in degrees. Small is the point: this should be felt, not seen. */
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node || frame.current) return;

    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = node.getBoundingClientRect();
      // -0.5 .. 0.5 from the centre of the card.
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--tilt-x", `${(-py * max).toFixed(2)}deg`);
      node.style.setProperty("--tilt-y", `${(px * max).toFixed(2)}deg`);
      node.style.setProperty("--tilt-px", `${(px * 12).toFixed(2)}px`);
      node.style.setProperty("--tilt-py", `${(py * 12).toFixed(2)}px`);
    });
  };

  const reset = () => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    const node = ref.current;
    if (!node) return;
    for (const prop of ["--tilt-x", "--tilt-y", "--tilt-px", "--tilt-py"]) {
      node.style.removeProperty(prop);
    }
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn("tilt-3d", className)}
    >
      {children}
    </div>
  );
}
