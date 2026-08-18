"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import { contact, primaryNav } from "@/content/site";
import { ButtonLink } from "@/components/primitives/Button";

/**
 * Full-screen mobile navigation.
 *
 * Treated as a destination rather than a dropdown: large editorial type, the
 * full hierarchy including sub-pages, the primary CTA and direct contact
 * details.
 *
 * Accessibility: rendered as a modal dialog, focus is moved in on open and
 * restored on close, Tab is trapped inside, Escape closes, and background
 * scrolling is locked without the page jumping.
 */
export function MobileMenu({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Lock background scroll while preserving scroll position and compensating
  // for the scrollbar so the page behind does not shift.
  useEffect(() => {
    if (!open) return;

    const { body, documentElement } = document;
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  // Focus management + keyboard handling.
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      // `inert` keeps the closed menu out of the accessibility tree and the tab
      // order, while still allowing the open/close transition to run.
      inert={!open}
      className={cn(
        // z-40 deliberately sits *below* the header's z-50 so the logo and the
        // close toggle stay visible and clickable over the open menu.
        "fixed inset-0 z-40 flex flex-col bg-void lg:hidden",
        "transition-[opacity,transform] duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0",
      )}
    >
      {/* Clears the fixed header, which floats above this panel. */}
      <div className="h-[5.5rem] shrink-0" aria-hidden="true" />

      <nav
        aria-label="Primary"
        className="flex-1 overflow-y-auto overscroll-contain px-[var(--spacing-gutter)] pb-10"
      >
        <ul className="flex flex-col">
          {primaryNav.map((item, index) => (
            <li
              key={item.href}
              className="border-t border-bone/10 py-5 first:border-t-0"
              style={{
                transitionDelay: open ? `${120 + index * 45}ms` : "0ms",
              }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "font-display flex items-baseline gap-4 text-[clamp(2.25rem,11vw,3.25rem)] leading-none transition-colors duration-200",
                  isActive(item.href)
                    ? "text-brass"
                    : "text-bone hover:text-brass",
                )}
              >
                <span className="index-numeral text-[0.625rem] text-ash">
                  0{index + 1}
                </span>
                {item.label}
              </Link>

              {item.children ? (
                <ul className="mt-4 ml-9 flex flex-col gap-2.5">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        aria-current={isActive(child.href) ? "page" : undefined}
                        className={cn(
                          "text-body-sm transition-colors duration-200",
                          isActive(child.href)
                            ? "text-brass"
                            : "text-mist hover:text-bone",
                        )}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          {/* Closing on click matters: without it the dialog stays mounted
              over the page the visitor just navigated to. */}
          <ButtonLink
            href="/contact"
            size="lg"
            withArrow
            className="w-full"
            onClick={onClose}
          >
            Start a Project
          </ButtonLink>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-bone/10 pt-8">
          <p className="eyebrow-muted">Direct</p>
          <a
            href={`mailto:${contact.email}`}
            className="text-body-sm break-all text-bone transition-colors hover:text-brass"
          >
            {contact.email}
          </a>
          <a
            href={`tel:${contact.phoneHref}`}
            className="text-body-sm text-bone transition-colors hover:text-brass"
          >
            {contact.phone}
          </a>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-sm text-bone transition-colors hover:text-brass"
          >
            Instagram {contact.instagram}
          </a>
        </div>
      </nav>
    </div>
  );
}
