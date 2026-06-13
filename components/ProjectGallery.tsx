"use client";

import Link from "next/link";
import { useState } from "react";
import HHLImage from "@/components/HHLImage";
import { cx } from "@/lib/utils";
import { portfolioCategories, type PortfolioItem } from "@/data/portfolio";

/**
 * Portfolio presentation in the manner of Sergison Bates' project pages:
 * a quiet, image-led archive with no cards, borders or shadows. Tiles of
 * mixed orientation pack into columns (three on desktop, fewer on smaller
 * screens) with consistent gutters and tight page margins, so the
 * photographs carry the page.
 *
 * An optional restrained text row stands in for their category navigation
 * (Selected / typologies): "Selected" shows everything, each category
 * narrows the set. Title and place are held back until hover — the grid
 * reads as pictures first, captions second — while each link's aria-label
 * keeps every tile named for assistive tech and on touch devices, where
 * the tap simply navigates.
 *
 * The same component (and the same data/portfolio.ts set) drives both the
 * homepage section and the Projects page, so there is one portfolio system.
 */

const ALL = "Selected";

interface Props {
  items: PortfolioItem[];
  /** Column count at the widest breakpoint (homepage and Projects both use 3). */
  columns?: 2 | 3;
  /** Show the Selected / categories row (Projects page) or not (homepage). */
  showCategories?: boolean;
}

export default function ProjectGallery({ items, columns = 3, showCategories = true }: Props) {
  const [category, setCategory] = useState<string>(ALL);
  const categories = [ALL, ...portfolioCategories];
  const filtered =
    showCategories && category !== ALL ? items.filter((p) => p.type === category) : items;

  const columnClass =
    columns === 3 ? "columns-1 sm:columns-2 lg:columns-3" : "columns-1 sm:columns-2";
  const gutterClass = columns === 3 ? "gap-x-6 lg:gap-x-8" : "gap-x-8 lg:gap-x-14";
  const tileGap = columns === 3 ? "mb-6 lg:mb-8" : "mb-8 lg:mb-12";
  const sizes =
    columns === 3
      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
      : "(max-width: 640px) 100vw, 48vw";

  return (
    <div className="bleed">
      {showCategories && (
        /* Category row — Sergison Bates' "Selected / …" */
        <nav aria-label="Project categories" className="flex flex-wrap items-baseline gap-x-6 gap-y-2 pb-10 lg:pb-14">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cx(
                "font-sans text-[15px] tracking-label transition-colors duration-150 lg:text-base",
                category === c ? "text-graphite" : "text-mist hover:text-charcoal"
              )}
            >
              {c}
            </button>
          ))}
        </nav>
      )}

      {/* Masonry — mixed orientation, packed into columns */}
      <div className={cx(columnClass, gutterClass)}>
        {filtered.map((p, i) => {
          const caption = p.location ? `${p.title}, ${p.location}` : p.title;
          return (
            <Link
              key={`${p.image}-${i}`}
              href={p.href ?? "/projects"}
              aria-label={caption}
              className={cx("group block break-inside-avoid", tileGap)}
            >
              <div className="frame relative">
                <HHLImage
                  src={p.image}
                  alt={p.alt}
                  label={p.title}
                  ratio={p.ratio}
                  breathe
                  sizes={sizes}
                />
                {/* Hover scrim + caption — held back until hover/focus */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-graphite/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 font-sans text-sm tracking-label text-warmwhite opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 lg:p-5"
                >
                  <span>{caption}</span>
                  <span aria-hidden className="shrink-0 text-base leading-none opacity-80">
                    +
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
