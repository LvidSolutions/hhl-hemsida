"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cx } from "@/lib/utils";

/**
 * The homepage hero sequence: a scroll journey of five project images that
 * drift upward through the viewport, closed by a full-bleed identity panel
 * that rolls up in sync with the last stretch of scroll.
 *
 * Mechanics: the section is a tall scroll track (TRACK_VH); a sticky
 * full-viewport scene pins to the top while scrollYProgress (0→1 across the
 * track) drives every transform. Each plate translates from below the
 * viewport to above it inside its own progress window; consecutive windows
 * overlap slightly so one image hands over to the next. The final panel maps
 * the last ~20% of progress to translateY(100%→0%), so its roll-up is the
 * scroll input — stop scrolling and it stops, scroll back and it retreats.
 *
 * - Transform-only (GPU), zero layout shift; server HTML carries the
 *   progress-0 transforms so there is no hydration jump.
 * - prefers-reduced-motion: no sticky scene, no transforms — a static
 *   full-bleed hero followed by the five images in normal document flow.
 */

export interface JourneyItem {
  src: string;
  alt: string;
  title: string;
  meta: string;
  href?: string;
}

export interface JourneyFinal {
  src: string;
  alt: string;
  caption: string;
}

/** Total scroll distance of the journey, in viewport-heights. */
const TRACK_VH = 520;

/** Progress window of plate i — consecutive windows overlap by ~0.12. */
function plateWindow(i: number): [number, number] {
  if (i === 0) return [0, 0.2]; // starts centered: the intro lifts onto it
  const start = i * 0.16 - 0.12;
  return [start, start + 0.28];
}

/** Final panel rolls up across the last stretch of the track. */
const FINAL_WINDOW: [number, number] = [0.78, 0.97];

/** Per-plate width + side, alternating for an editorial rhythm. */
const PLATE_LAYOUT = [
  { width: "w-[82vw] sm:w-[60vw] lg:w-[46vw]", side: "justify-start" },
  { width: "w-[82vw] sm:w-[50vw] lg:w-[38vw]", side: "justify-end" },
  { width: "w-[82vw] sm:w-[64vw] lg:w-[50vw]", side: "justify-start" },
  { width: "w-[82vw] sm:w-[48vw] lg:w-[36vw]", side: "justify-end" },
  { width: "w-[82vw] sm:w-[58vw] lg:w-[44vw]", side: "justify-start" },
];

function JourneyPlate({
  item,
  index,
  progress,
}: {
  item: JourneyItem;
  index: number;
  progress: MotionValue<number>;
}) {
  const [start, end] = plateWindow(index);
  const y = useTransform(
    progress,
    [start, end],
    [index === 0 ? "0vh" : "112vh", "-128vh"]
  );
  // Subtle counter-drift inside the frame for depth.
  const innerY = useTransform(progress, [start, end], ["4%", "-4%"]);
  const layout = PLATE_LAYOUT[index % PLATE_LAYOUT.length];

  const figure = (
    <figure className={cx("group", layout.width)}>
      <div className="relative aspect-[5/4] overflow-hidden bg-concrete">
        {/* scale lives in the motion style — an inline `transform` from the
            y motion value would override a class-based scale utility */}
        <motion.div style={{ y: innerY, scale: 1.12 }} className="absolute inset-0">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 60vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
      <figcaption className="mt-3 flex items-baseline gap-3">
        <span className="t-caption tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span className="u-link t-label font-medium text-graphite">{item.title}</span>
          <span className="t-caption ml-3 hidden sm:inline">{item.meta}</span>
        </span>
      </figcaption>
    </figure>
  );

  return (
    <motion.div
      style={{ y, zIndex: index }}
      className={cx(
        "absolute inset-0 flex items-center px-[6vw] lg:px-[8vw]",
        layout.side
      )}
    >
      {item.href ? (
        <Link href={item.href} aria-label={`${item.title} — open project`}>
          {figure}
        </Link>
      ) : (
        figure
      )}
    </motion.div>
  );
}

function FinalPanel({
  final,
  progress,
}: {
  final: JourneyFinal;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, FINAL_WINDOW, ["100%", "0%"]);
  return (
    <motion.div style={{ y }} className="absolute inset-0 z-30">
      <FinalPanelContent final={final} />
    </motion.div>
  );
}

/** Shared between the scroll-synced panel and the reduced-motion fallback. */
function FinalPanelContent({ final }: { final: JourneyFinal }) {
  return (
    <div className="relative h-full w-full bg-concrete">
      <Image
        src={final.src}
        alt={final.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Scrim over the bottom third only — contrast without dimming the image */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-[rgba(20,18,16,0.55)] to-transparent"
      />
      <div className="site absolute inset-x-0 bottom-0 mx-auto flex flex-col gap-6 pb-10 text-warmwhite sm:flex-row sm:items-end sm:justify-between lg:pb-14">
        <div>
          <p className="t-overline !text-warmwhite/80">Arkitekter — Stockholm</p>
          <p className="mt-3 font-serif text-3xl font-light leading-tight sm:text-4xl lg:text-[clamp(2.5rem,4vw,3.75rem)]">
            Hermansson Hiller Lundberg
          </p>
        </div>
        <p className="t-caption !text-warmwhite/70">{final.caption}</p>
      </div>
    </div>
  );
}

export default function HeroJourney({
  items,
  final,
}: {
  items: JourneyItem[];
  final: JourneyFinal;
}) {
  const trackRef = useRef<HTMLElement | null>(null);
  const osReduce = useReducedMotion();
  // Server HTML is always the motion version; switching to the static
  // reduced-motion branch only after hydration avoids a hydration mismatch.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const reduce = hydrated && osReduce;
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    // No scroll choreography: identity panel first, then the images in flow.
    return (
      <section aria-label="Selected work">
        <div className="relative h-[100svh] w-full">
          <FinalPanelContent final={final} />
        </div>
        <div className="site space-y-16 py-24">
          {items.map((item, i) => (
            <figure key={item.src} className="mx-auto max-w-3xl">
              <div className="relative aspect-[5/4] overflow-hidden bg-concrete">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 768px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline gap-3">
                <span className="t-caption tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {item.href ? (
                  <Link href={item.href} className="u-link t-label font-medium text-graphite">
                    {item.title}
                  </Link>
                ) : (
                  <span className="t-label font-medium text-graphite">{item.title}</span>
                )}
                <span className="t-caption hidden sm:inline">{item.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={trackRef}
      aria-label="Selected work"
      className="relative"
      style={{ height: `${TRACK_VH}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-warmwhite">
        {items.map((item, i) => (
          <JourneyPlate key={item.src} item={item} index={i} progress={scrollYProgress} />
        ))}
        <FinalPanel final={final} progress={scrollYProgress} />
      </div>
    </section>
  );
}
