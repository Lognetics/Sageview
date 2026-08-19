"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { primaryNav } from "@/content/site";
import { ButtonLink } from "@/components/primitives/Button";
import { Logo, type Wordmark } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Site header.
 *
 * Sits transparent over the hero and condenses into a translucent bar once the
 * visitor scrolls, lighter chrome, more film. A hairline progress rule tracks
 * reading position on long editorial pages.
 */
export function Navbar({ wordmark = null }: { wordmark?: Wordmark | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  /**
   * The menu is open only while the route it was opened on is still current.
   * Deriving this instead of closing it from an effect means a browser
   * back/forward also dismisses the overlay, with no cascading render.
   */
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname;
  const setMenuOpen = useCallback(
    (open: boolean) => setMenu({ open, path: pathname }),
    [pathname],
  );

  // Scroll state, read inside rAF so we never force layout on the scroll thread.
  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname],
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled && !menuOpen
            ? "border-b border-bone/10 bg-void/80 backdrop-blur-xl supports-[backdrop-filter]:bg-void/65"
            : "border-b border-transparent bg-transparent",
        )}
        style={{ ["--header-h" as string]: scrolled ? "4.5rem" : "5.5rem" }}
      >
        <div
          className={cn(
            "container-wide flex items-center justify-between gap-6 transition-[height] duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled ? "h-[4.5rem]" : "h-[5.5rem]",
          )}
        >
          <Logo
            wordmark={wordmark}
            showSubline={!scrolled}
            compact={scrolled}
          />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-8">
              {primaryNav.map((item) => (
                <li key={item.href} className="group/item relative">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "group/nav relative block py-2 text-body-sm font-medium tracking-[0.01em] transition-colors duration-[var(--dur-fast)]",
                      isActive(item.href)
                        ? "text-brass"
                        : "text-fog hover:text-bone",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-0 left-0 h-px w-full origin-left bg-brass transition-transform duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive(item.href)
                          ? "scale-x-100"
                          : "scale-x-0 motion-safe:group-hover/nav:scale-x-100",
                      )}
                    />
                  </Link>

                  {/*
                    Section menu. Opens on hover and on keyboard focus
                    (focus-within), so tabbing through the header reaches every
                    link without a click handler or any open/closed state.
                    `pt-3` keeps the panel touching the trigger, so the pointer
                    never crosses a gap that would dismiss it.
                  */}
                  {item.children?.length ? (
                    <div
                      className={cn(
                        "invisible absolute left-1/2 top-full z-50 w-[17rem] -translate-x-1/2 pt-3 opacity-0",
                        "transition-[opacity,visibility] duration-[var(--dur-fast)]",
                        "group-hover/item:visible group-hover/item:opacity-100",
                        "group-focus-within/item:visible group-focus-within/item:opacity-100",
                      )}
                    >
                      <ul className="border border-bone/10 bg-void/95 p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-4 py-2.5 text-body-sm text-fog transition-colors duration-[var(--dur-fast)] hover:bg-charcoal hover:text-bone"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href="/contact"
              size="md"
              withArrow
              className="hidden lg:inline-flex"
            >
              Start a Project
            </ButtonLink>

            <MenuToggle
              open={menuOpen}
              onToggle={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isActive={isActive}
      />
    </>
  );
}

/** Two-line burger that morphs into a close mark. */
function MenuToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative z-50 -mr-2 flex h-12 w-12 items-center justify-center text-bone transition-colors duration-200 hover:text-brass lg:hidden"
    >
      <span aria-hidden="true" className="relative block h-3 w-7">
        <span
          className={cn(
            "absolute left-0 block h-px w-full bg-current transition-all duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "top-1.5 rotate-45" : "top-0",
          )}
        />
        <span
          className={cn(
            "absolute left-0 block h-px bg-current transition-all duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "top-1.5 w-full -rotate-45" : "top-3 w-2/3",
          )}
        />
      </span>
    </button>
  );
}
