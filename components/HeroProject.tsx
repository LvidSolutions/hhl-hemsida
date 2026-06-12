"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HHLImage from "@/components/HHLImage";
import { metaLine } from "@/lib/utils";
import { INTRO_EXIT_EVENT, PANEL_DURATION, introAlreadyPlayed } from "@/lib/intro";
import type { Project } from "@/data/projects";

/**
 * Feature 2C — JAJA-style slideshow hero.
 *
 * The homepage hero IS the slideshow: full-viewport project images advance
 * sequentially in an infinite loop, with a gentle 0.9s crossfade, prev/next
 * controls, a 01/04 counter, and the project's title · typology · place ·
 * year. This is the surface the Feature 2B roll-down unveils.
 *
 * Behaviour rules:
 * - Auto-advances every 5.5s, looping infinitely.
 * - Autoplay does not start until the intro panel has fully lifted
 *   (listens for INTRO_EXIT_EVENT + panel duration) — no double motion.
 * - Manual prev/next (buttons, ← → keys while the hero is on screen,
 *   touch swipe) resets the timer; autoplay continues afterwards.
 * - A visible Pause/Play control stops the auto-advance (WCAG 2.2.2).
 * - Hidden tabs do not advance; resumes when the tab returns.
 * - prefers-reduced-motion: no autoplay at all, manual controls switch
 *   slides instantly (no crossfade).
 */

const AUTO_MS = 5500;
const FADE_S = 0.9;
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function HeroProject({ items }: { items: Project[] }) {
  const reduce = useReducedMotion();
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false); // becomes true once the intro panel has lifted
  const [tick, setTick] = useState(0); // reschedules autoplay after a hidden-tab skip
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useRef(true);
  const touchX = useRef<number | null>(null);
  const current = items[index];

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Coexistence with the Feature 2B reveal: hold autoplay until the curtain is gone.
  useEffect(() => {
    if (reduce || introAlreadyPlayed()) {
      setReady(true);
      return;
    }
    let delay: number | undefined;
    const onExit = () => {
      delay = window.setTimeout(() => setReady(true), PANEL_DURATION * 1000);
    };
    window.addEventListener(INTRO_EXIT_EVENT, onExit, { once: true });
    const fallback = window.setTimeout(() => setReady(true), 7000);
    return () => {
      window.removeEventListener(INTRO_EXIT_EVENT, onExit);
      window.clearTimeout(fallback);
      if (delay) window.clearTimeout(delay);
    };
  }, [reduce]);

  // Autoplay loop. Resets whenever index changes (manual navigation included).
  useEffect(() => {
    if (reduce || !playing || !ready || count < 2) return;
    const t = window.setTimeout(() => {
      if (document.hidden) {
        setTick((n) => n + 1); // skip this beat, try again
      } else {
        go(1);
      }
    }, AUTO_MS);
    return () => window.clearTimeout(t);
  }, [index, tick, playing, ready, reduce, count, go]);

  // Arrow keys — only while the hero is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (el && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        ([entry]) => {
          inView.current = entry.isIntersecting;
        },
        { threshold: 0.3 }
      );
      io.observe(el);
      const onKey = (e: KeyboardEvent) => {
        if (!inView.current) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        io.disconnect();
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [go]);

  // Touch swipe (mobile).
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Featured projects slideshow"
      aria-roledescription="carousel"
      className="relative h-[100svh] w-full overflow-hidden bg-concrete"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={current.slug}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : FADE_S, ease: EASE }}
          className="absolute inset-0"
        >
          <Link
            href={`/projects/${current.slug}`}
            aria-label={`${current.title} — open project`}
            className="block h-full w-full"
            draggable={false}
          >
            <HHLImage
              fill
              src={current.heroImage}
              alt={current.heroAlt}
              label={current.heroLabel}
              priority={index === 0}
              sizes="100vw"
            />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Scrim over the bottom 28% only — text contrast without touching the image above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[rgba(20,18,16,0.55)] to-transparent"
      />

      <div className="site absolute inset-x-0 bottom-0 z-10 mx-auto flex flex-col gap-6 pb-10 sm:flex-row sm:items-end sm:justify-between lg:pb-16">
        {/* Project identity — the text block is also the link */}
        <Link
          href={`/projects/${current.slug}`}
          className="group max-w-xl text-warmwhite"
          aria-live="polite"
        >
          <h2 className="u-link font-serif text-3xl font-light leading-tight sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.75rem)]">
            {current.title}
          </h2>
          <p className="t-label mt-3 text-warmwhite/80">
            {metaLine(current.typology, current.place, current.year)}
          </p>
        </Link>

        {/* Controls: prev · counter · next · pause */}
        <div className="flex items-center gap-1 text-warmwhite sm:gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="p-3 transition-transform duration-200 hover:-translate-x-1"
          >
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" aria-hidden>
              <path d="M32 8H2M8 1L1 8l7 7" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>

          <span className="t-caption min-w-[3.5rem] text-center tabular-nums text-warmwhite/80">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="p-3 transition-transform duration-200 hover:translate-x-1"
          >
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" aria-hidden>
              <path d="M0 8h30M24 1l7 7-7 7" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>

          {!reduce && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="u-link t-caption ml-2 p-3 uppercase text-warmwhite/80 hover:text-warmwhite"
            >
              {playing ? "Pause" : "Play"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
