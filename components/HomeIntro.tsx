"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  INTRO_EXIT_EVENT,
  INTRO_HOLD_MS,
  INTRO_SESSION_KEY,
  PANEL_DURATION,
  PANEL_EASE,
} from "@/lib/intro";

/**
 * Feature 2A — Septiembre Arquitectura-inspired intro.
 *
 * The company name arrives line by line through a masked rise (each line
 * lifts out of an overflow-hidden slot), followed by the first studio
 * statement with a quiet opacity/vertical entrance. The whole sequence is
 * an introduction of identity and text together — no separate splash.
 *
 * - Plays once per browser session (sessionStorage), homepage only.
 * - Click / any key skips it instantly.
 * - prefers-reduced-motion: the overlay never appears (CSS-hidden even
 *   before hydration), so those users see the page immediately.
 * - aria-hidden: the page's own <h1> and statement remain the canonical
 *   text for screen readers — nothing is read twice. The intro text is
 *   still real, selectable text.
 *
 * The exit is the Feature 2B roll-down: see EXIT_TRANSITION below and
 * components/HeroReveal.tsx for the hero's synchronized counter-settle.
 */

const NAME_LINES = ["Hermansson", "Hiller", "Lundberg"];
const CAPTION = "Arkitekter — Stockholm";
const STATEMENT =
  "We work toward an architecture of presence, character and complexity.";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const HOLD_MS = INTRO_HOLD_MS;
const SESSION_KEY = INTRO_SESSION_KEY;

/**
 * Feature 2B — the Sergison Bates-style roll-down: the intro is a solid
 * panel that lifts vertically off the viewport (transform-only), exposing
 * the real hero underneath from the top edge downward. The inner text lags
 * 120px behind the panel, which gives the surface depth — a page being
 * turned rather than a div being translated.
 */
const EXIT_TRANSITION = { duration: PANEL_DURATION, ease: PANEL_EASE };

export default function HomeIntro() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(true);
  const [mounted, setMounted] = useState(false);
  const timer = useRef<number | null>(null);

  // Decide before first client paint whether the intro should run at all.
  useLayoutEffect(() => {
    setMounted(true);
    try {
      if (reduce || sessionStorage.getItem(SESSION_KEY) === "1") {
        setActive(false);
        return;
      }
    } catch {
      /* storage unavailable — play the intro */
    }
  }, [reduce]);

  const finish = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(INTRO_EXIT_EVENT));
    setActive(false);
  };

  // Scroll lock + auto-finish + skip on input.
  useEffect(() => {
    if (!active || !mounted) return;
    document.documentElement.style.overflow = "hidden";
    timer.current = window.setTimeout(finish, HOLD_MS);
    const skip = () => finish();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      document.documentElement.style.overflow = "";
      if (timer.current) window.clearTimeout(timer.current);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [active, mounted]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden="true"
          exit={{ y: "-100%", transition: EXIT_TRANSITION }}
          className="fixed inset-0 z-[60] flex flex-col justify-end bg-warmwhite motion-reduce:hidden"
        >
          <motion.div
            exit={{ y: 120, transition: EXIT_TRANSITION }}
            className="site pb-16 lg:pb-20"
          >
            {/* Company name — masked line-by-line rise */}
            <div className="mb-8 lg:mb-10">
              {NAME_LINES.map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.p
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.25 + i * 0.14,
                      ease: EASE,
                    }}
                    className="font-serif text-[13vw] font-light leading-[1.04] text-graphite sm:text-6xl lg:text-7xl"
                  >
                    {line}
                  </motion.p>
                </div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
                className="t-overline mt-4"
              >
                {CAPTION}
              </motion.p>
            </div>

            {/* First statement — quiet opacity + vertical arrival */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
                className="max-w-xl font-serif text-lg font-light leading-relaxed text-charcoal sm:text-xl lg:text-2xl"
              >
                {STATEMENT}
              </motion.p>
            </div>
          </motion.div>

          {/* Hairline that draws across the bottom — the page waiting underneath */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
            className="h-px origin-left bg-mist/50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
