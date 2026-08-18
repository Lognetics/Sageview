/**
 * Scroll-reveal engine, shared by every <Reveal /> on the page.
 *
 * Two mechanisms, because one is not enough:
 *
 *  1. An IntersectionObserver gives the nice, cheap, staggered reveal as
 *     content comes into view during ordinary scrolling.
 *
 *  2. A debounced sweep catches what the observer structurally cannot. An
 *     IntersectionObserver only fires when the intersection ratio *changes*.
 *     Jump straight to an anchor, press End, or flick-scroll on a phone, and
 *     an element can go from below the fold (ratio 0) to above the viewport
 *     (ratio 0) without a single callback. That content would then stay
 *     invisible for the rest of the session — the worst failure available to
 *     a site that hides content by default.
 *
 * The sweep runs after scrolling settles rather than on every frame, so it
 * costs nothing during the scroll itself, and it unregisters once every
 * element has been revealed.
 */

let observer: IntersectionObserver | null = null;
let pending: Set<Element> | null = null;
let sweepTimer = 0;
let listening = false;

function reveal(element: Element) {
  element.setAttribute("data-reveal-visible", "true");
  pending?.delete(element);
  observer?.unobserve(element);

  if (pending && pending.size === 0) stopListening();
}

/** Reveal anything already at or above the fold. */
function sweep() {
  if (!pending || pending.size === 0) return;

  const foldLine = window.innerHeight;
  for (const element of [...pending]) {
    if (element.getBoundingClientRect().top < foldLine) reveal(element);
  }
}

function onScroll() {
  window.clearTimeout(sweepTimer);
  sweepTimer = window.setTimeout(sweep, 120);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  window.clearTimeout(sweepTimer);
}

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  pending ??= new Set();

  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const foldLine = entry.rootBounds?.bottom ?? window.innerHeight;
        if (entry.isIntersecting || entry.boundingClientRect.top < foldLine) {
          reveal(entry.target);
        }
      }
    },
    {
      // Trigger a little before the element is comfortably in view, so the
      // transition is already underway by the time the reader gets to it.
      rootMargin: "0px 0px -12% 0px",
      threshold: [0, 0.08],
    },
  );

  return observer;
}

export function observeReveal(element: Element): () => void {
  const instance = getObserver();

  // No IntersectionObserver (very old browsers): show it immediately rather
  // than leaving it invisible forever.
  if (!instance) {
    element.setAttribute("data-reveal-visible", "true");
    return () => {};
  }

  pending?.add(element);
  instance.observe(element);
  startListening();

  return () => {
    pending?.delete(element);
    instance.unobserve(element);
  };
}
