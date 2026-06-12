"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  INTRO_EXIT_EVENT,
  INTRO_HOLD_MS,
  PANEL_DURATION,
  PANEL_EASE,
  introAlreadyPlayed,
} from "@/lib/intro";

/**
 * Feature 2B — the receiving half of the roll-down reveal.
 *
 * While the intro panel covers the page, the real hero waits underneath at
 * a slight scale (1.06). When HomeIntro lifts its panel (translateY -100%),
 * this wrapper settles the hero to scale 1 over the same duration and
 * easing — the curtain rises and the space behind it comes to rest.
 * Transform-only (GPU), zero layout shift; the wrapper clips overflow so
 * the scaled hero never spills.
 *
 * If the intro does not play (repeat session, reduced motion, JS storage
 * blocked decision), the hero renders settled immediately. A fallback timer
 * guarantees the settle even if the exit event were ever missed.
 */
export default function HeroReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  // SSR default: settled (no transform in server HTML — the intro panel covers it anyway).
  const [state, setState] = useState<"settled" | "waiting" | "settling">("settled");
  const fallback = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (reduce || introAlreadyPlayed()) return; // stay settled

    setState("waiting");
    const settle = () => setState("settling");

    window.addEventListener(INTRO_EXIT_EVENT, settle, { once: true });
    // Safety: never leave the hero scaled if the event is missed.
    fallback.current = window.setTimeout(settle, INTRO_HOLD_MS + 1500);

    return () => {
      window.removeEventListener(INTRO_EXIT_EVENT, settle);
      if (fallback.current) window.clearTimeout(fallback.current);
    };
  }, [reduce]);

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={false}
        animate={{ scale: state === "waiting" ? 1.06 : 1 }}
        transition={
          state === "settling"
            ? { duration: PANEL_DURATION + 0.2, ease: PANEL_EASE }
            : { duration: 0 }
        }
        style={{ transformOrigin: "50% 30%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
