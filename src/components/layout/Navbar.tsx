"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { primaryAction, primaryNav } from "@/content/site";
import { Logo, type Wordmark } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Site header.
 *
 * Transparent over the homepage hero, then a solid paper bar once the visitor
 * scrolls past it. Over that dark hero the header adopts light type, which is
 * why it tracks scroll rather than simply always being solid.
 *
 * Each destination carries a dropdown of in-page sections. It opens on hover
 * and on keyboard focus through `focus-within`, so it needs no open/closed
 * state and no JavaScript to be reachable by tab.
 */
export function Navbar({ wordmark = null }: { wordmark?: Wordmark | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  /**
   * The menu is open only while the route it was opened on is still current,
   * so a browser back/forward dismisses the overlay with no extra effect.
   */
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname;
  const setMenuOpen = useCallback(
    (open: boolean) => setMenu({ open, path: pathname }),
    [pathname],
  );

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const isActive = useCallback(
    (href: string) => {
      const path = href.split(/[#?]/)[0];
      if (path === "/") return pathname === "/";
      return pathname === path || pathname.startsWith(`${path}/`);
    },
    [pathname],
  );

  /*
    Only the homepage opens on a full-bleed dark hero; every other page starts
    on paper. So the header inverts to light type there and there only, and
    only until the visitor scrolls off the hero, after which the solid paper
    bar takes over. Deriving it from the route keeps every page from having to
    remember to declare it.
  */
  const inverted = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-base)]",
        scrolled
          ? "border-b bg-[var(--surface)]/92 backdrop-blur-md"
          : "border-b border-transparent",
        inverted && "band-dark bg-transparent",
      )}
    >
      <div className="container-wide flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <Logo wordmark={wordmark} showSubline={false} compact />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block px-3 py-2 font-mono text-[0.68rem] tracking-[0.18em] uppercase transition-colors duration-[var(--dur-fast)]",
                    isActive(item.href)
                      ? "text-[var(--text-strong)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-strong)]",
                  )}
                >
                  {item.label}
                </Link>

                {item.children ? (
                  /*
                    Hidden by opacity rather than display so it can animate,
                    and made unreachable by pointer-events plus invisible so a
                    closed menu never traps a click or a screen reader.
                  */
                  <div
                    className={cn(
                      "invisible absolute top-full left-0 min-w-56 -translate-y-1 opacity-0",
                      "border bg-[var(--surface-raised)] p-2 shadow-lg shadow-black/5",
                      "transition-[opacity,transform] duration-[var(--dur-fast)]",
                      "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
                      "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                    )}
                  >
                    <ul className="flex flex-col">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-3 py-2 text-body-sm text-[var(--text-body-color)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--wash)] hover:text-[var(--text-strong)]"
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
          <Link
            href={primaryAction.href}
            className={cn(
              "hidden font-mono text-[0.68rem] tracking-[0.18em] uppercase sm:inline-flex",
              "border border-[var(--text-strong)] px-5 py-3 text-[var(--text-strong)]",
              "transition-colors duration-[var(--dur-fast)]",
              "hover:bg-[var(--text-strong)] hover:text-[var(--surface)]",
            )}
          >
            {primaryAction.label}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="sr-only">Open menu</span>
            <span aria-hidden className="flex w-5 flex-col gap-[5px]">
              <span className="h-px w-full bg-[var(--text-strong)]" />
              <span className="h-px w-full bg-[var(--text-strong)]" />
              <span className="h-px w-full bg-[var(--text-strong)]" />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isActive={isActive}
      />
    </header>
  );
}
