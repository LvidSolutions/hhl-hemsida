"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/utils";
import {
  FLASH_LOOP_MS,
  INTRO_SESSION_KEY,
  PANEL_DURATION,
  PANEL_EASE,
  REVEAL_DELAY_MS,
  REVEAL_DURATION_MS,
} from "@/lib/intro";

/**
 * Septiembre Arquitectura-inspired intro.
 *
 * Cream field, large burgundy serif wordmark, and a central vertical image
 * plate. Sequence: the name rises in uniform burgundy; then the plate loads
 * in 0→100% (a clip rising from its bottom edge); from then on it crossfades
 * to a new project photo at a constant calm rhythm until the user scrolls.
 *
 * The wordmark is drawn in perfectly aligned layers: a burgundy copy under
 * the plate, and above the plate two copies clipped to its exact rectangle
 * that act as a clipping mask — white glyphs with mix-blend-mode:difference
 * fill the letters with the photo inverted, and an aligned copy with
 * mix-blend-mode:saturation strips the colour, leaving an inverted
 * grey/black/white photo inside the letterforms while the outer letters
 * stay burgundy. Plate and clips share the same inset geometry
 * (PLATE_RECT / PLATE_CLIP), so registration is exact at every breakpoint
 * with no JS measuring.
 *
 * - Holds indefinitely, flashing a new project photo every second, until
 *   the user scrolls (wheel / touch / key / click) — then the panel lifts.
 * - Plays once per browser session (sessionStorage), homepage only.
 * - prefers-reduced-motion: the overlay never appears (CSS-hidden even
 *   before hydration) — those users see the page immediately.
 * - aria-hidden: the page's own <h1> remains the canonical text for screen
 *   readers; the intro text is still real, selectable text.
 */

const FLASH_IMAGES = [
  "/hhl-images/hero/kc-05.webp",
  "/hhl-images/hero/barkarby-02.webp",
  "/hhl-images/hero/skuru-10.webp",
  "/hhl-images/hero/barkarby-01.webp",
  "/hhl-images/hero/sp-05.webp",
  "/hhl-images/hero/sp-03.webp",
  "/hhl-images/hero/barkarby-12.webp",
  "/hhl-images/hero/stairhall.webp",
  "/hhl-images/hero/skuru-02.webp",
];

/** Three steps down, left → center → right. */
const NAME_LINES = [
  { text: "Hermansson", align: "text-left" },
  { text: "Hiller", align: "text-center" },
  { text: "Lundberg", align: "text-right" },
];
const CAPTION = "Arkitekter — Stockholm";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const EXIT_TRANSITION = { duration: PANEL_DURATION, ease: PANEL_EASE };

/**
 * The plate rectangle and the clip-path of the upper text layers MUST stay
 * in sync — both express "central band, 19% in from top/bottom, X% from the
 * sides" at each breakpoint. Kept deliberately narrow so the burgundy
 * letterforms read clearly on both sides of the plate.
 */
const PLATE_RECT = "inset-y-[19%] inset-x-[30%] sm:inset-x-[37%] lg:inset-x-[40%]";
const PLATE_CLIP =
  "[clip-path:inset(19%_30%)] sm:[clip-path:inset(19%_37%)] lg:[clip-path:inset(19%_40%)]";

/**
 * Loading reveal: a clip on the plate+masked-text group rises from the
 * plate's bottom edge (81% from the top) to its top edge (19%) — the picture
 * "loads" 0→100% and the letter fill arrives with it. Vertical insets here
 * must match PLATE_RECT's inset-y.
 */
const REVEAL_FROM = "inset(81% 0% 0% 0%)";
const REVEAL_TO = "inset(19% 0% 0% 0%)";

/**
 * The wordmark is rendered in multiple aligned layers (burgundy below the
 * plate, the photo-fill blend copies above it). Identical markup + identical
 * tween timings keep all copies frame-aligned. Lines appear with a plain
 * staggered fade — no movement.
 */
function Wordmark({ className }: { className?: string }) {
  return (
    <div
      className={cx("absolute inset-0 flex flex-col justify-center px-[8vw]", className)}
    >
      {NAME_LINES.map((line, i) => (
        <motion.p
          key={line.text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: EASE }}
          className={cx(
            "font-serif text-[clamp(3rem,13.5vw,10.5rem)] font-light leading-[0.98]",
            line.align
          )}
        >
          {line.text}
        </motion.p>
      ))}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
        className="t-overline mt-6 text-center !text-current opacity-80"
      >
        {CAPTION}
      </motion.p>
    </div>
  );
}

export default function HomeIntro() {
  const [active, setActive] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [frame, setFrame] = useState(0);

  // Decide before first client paint whether the intro should run at all.
  useLayoutEffect(() => {
    setMounted(true);
    try {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || sessionStorage.getItem(INTRO_SESSION_KEY) === "1") {
        setActive(false);
      }
    } catch {
      /* storage unavailable — play the intro */
    }
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setActive(false);
  };

  // Slideshow rhythm: the first photo rides the loading reveal; the show
  // starts rolling right after the plate is full (first change almost
  // immediately), then a new project photo every FLASH_LOOP_MS — holding
  // this constant, calm shifting until the user scrolls.
  useEffect(() => {
    if (!active || !mounted) return;
    let i = 0;
    let loop: number | undefined;
    const start = window.setTimeout(() => {
      i = 1;
      setFrame(1);
      loop = window.setInterval(() => {
        i += 1;
        setFrame(i % FLASH_IMAGES.length);
      }, FLASH_LOOP_MS);
    }, REVEAL_DELAY_MS + REVEAL_DURATION_MS + 150);
    return () => {
      window.clearTimeout(start);
      if (loop) window.clearInterval(loop);
    };
  }, [active, mounted]);

  // Scroll lock; the intro stays until a scroll intent (wheel, touch swipe,
  // key, click) releases it — no timed exit.
  useEffect(() => {
    if (!active || !mounted) return;
    document.documentElement.style.overflow = "hidden";
    const release = () => finish();
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("pointerdown", release);
    window.addEventListener("keydown", release);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("pointerdown", release);
      window.removeEventListener("keydown", release);
    };
  }, [active, mounted]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden="true"
          exit={{ y: "-100%", transition: EXIT_TRANSITION }}
          className="fixed inset-0 z-[60] overflow-hidden bg-warmwhite motion-reduce:hidden"
        >
          {/* Interior lags the panel slightly on exit — a page being turned. */}
          <motion.div
            exit={{ y: 96, transition: EXIT_TRANSITION }}
            className="absolute inset-0"
          >
            {/* 1 — burgundy wordmark, under the plate. Reads uniform burgundy
                until the loading reveal brings the plate + inversion up. */}
            <Wordmark className="z-10 text-burgundy" />

            {/* 2+3 — plate and masked wordmark share one loading reveal:
                a clip rising from the plate's bottom edge to its top edge,
                so the picture arrives 0→100% and the letter fill arrives
                with it. The letters crossing the plate are filled with the
                photo itself, inverted and desaturated, via two aligned
                blend layers (difference inverts, saturation removes colour)
                — registered with the photo behind by construction. */}
            <motion.div
              initial={{ clipPath: REVEAL_FROM }}
              animate={{ clipPath: REVEAL_TO }}
              transition={{
                duration: REVEAL_DURATION_MS / 1000,
                delay: REVEAL_DELAY_MS / 1000,
                ease: EASE,
              }}
              className="pointer-events-none absolute inset-0 z-20"
            >
              {/* the vertical image plate — slow slideshow of project photos,
                  crossfading gently between slides (no hard cuts) */}
              <div className={cx("absolute overflow-hidden bg-stone", PLATE_RECT)}>
                {FLASH_IMAGES.map((src, i) => (
                  // Plain <img>, all mounted eagerly so every slide is
                  // already decoded — no blank frames, no layout shift.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="eager"
                    decoding="async"
                    className={cx(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out",
                      i === frame ? "opacity-100" : "opacity-0"
                    )}
                  />
                ))}
              </div>

              {/* wordmark over the plate, filled with the photo behind it:
                  white glyphs + difference = the photo inverted inside the
                  letters; a second aligned copy + saturation = desaturated
                  to grey/black/white. Both clipped to the plate rectangle,
                  so the fill follows every crossfade automatically. */}
              <Wordmark
                className={cx("z-10 text-white [mix-blend-mode:difference]", PLATE_CLIP)}
              />
              <Wordmark
                className={cx("z-20 text-white [mix-blend-mode:saturation]", PLATE_CLIP)}
              />
              {/* translucent warm grey copy: compresses contrast so bright
                  fields inside the fill sit closer to the rest — a uniform,
                  calm letter texture */}
              <Wordmark className={cx("z-30 text-mist/45", PLATE_CLIP)} />
            </motion.div>

            {/* 4 — scroll cue */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
              className="t-overline absolute inset-x-0 bottom-8 z-40 text-center !text-burgundy"
            >
              Scroll
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
