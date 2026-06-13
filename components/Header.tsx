"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cx } from "@/lib/utils";

const NAV = [
  { label: "Projects", href: "/projects" },
  { label: "Studio", href: "/studio" },
  { label: "Research", href: "/research" },
  { label: "Journal", href: "/journal" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

const SECONDARY = ["Archive", "Map", "Timeline", "Collections"] as const;

/**
 * Fixed header. Transparent over heroes (home + project pages), settling onto
 * warm white after the hero. Hides on downward scroll past 600px, returns on
 * any upward scroll. Mobile menu is a full-screen typographic overlay.
 */
export default function Header() {
  const pathname = usePathname();
  // Only project detail pages carry a full-bleed hero that the header floats
  // over transparently; everywhere else (home included) the header is a solid,
  // readable strip from the start.
  const overlay = /^\/projects\/[^/]+$/.test(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > (overlay ? window.innerHeight * 0.7 : 8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const onDark = overlay && !scrolled && !open;

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-graphite focus:px-4 focus:py-2 focus:text-warmwhite"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cx(
            "transition-colors duration-300",
            (!overlay || scrolled) && !open
              ? "border-b border-[var(--hairline)] bg-warmwhite/[0.97] backdrop-blur-md"
              : "bg-transparent"
          )}
        >
          <div
            className={cx(
              "bleed flex h-[60px] items-center justify-between lg:h-[72px]",
              onDark ? "text-warmwhite" : "text-graphite"
            )}
          >
            <Link
              href="/"
              className="font-sans text-[15px] font-medium tracking-wordmark"
              aria-label="Hermansson Hiller Lundberg — home"
            >
              <span className="hidden xl:inline">HERMANSSON HILLER LUNDBERG</span>
              <span className="xl:hidden">HHL ARKITEKTER</span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              {NAV.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "u-link font-sans text-[15px]",
                      active && "border-b border-accent pb-1"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              className="u-link font-sans text-[15px] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-warmwhite pb-10 pt-24"
          >
            <nav aria-label="Primary, mobile" className="site">
              <ul>
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                    className="flex items-baseline gap-4 py-2"
                  >
                    <span aria-hidden className="t-caption w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link href={item.href} className="u-link font-serif text-[32px] font-light text-graphite">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="site t-label flex flex-wrap gap-x-4 gap-y-2 text-greytext">
              {SECONDARY.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < SECONDARY.length - 1 && <span aria-hidden className="ml-4">·</span>}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
