"use client";

import Link from "next/link";
import { useState } from "react";
import HHLImage from "@/components/HHLImage";
import { cx } from "@/lib/utils";
import { typologies, type Project } from "@/data/projects";

/**
 * Portfolio presentation in the manner of Sergison Bates' project pages:
 * a quiet, image-led masonry with no cards, borders or shadows. Tiles of
 * mixed aspect ratio pack into columns (one on mobile) with consistent
 * gutters and tight page margins, so the photographs carry the page.
 *
 * An optional restrained text row stands in for their category navigation
 * (Selected / Dwelling / Culture …): "Selected" shows everything, each
 * typology narrows the set. Project name and place are held back until
 * hover — the grid reads as pictures first, captions second — while the
 * link's aria-label keeps every tile named for assistive tech and on
 * touch devices, where the tap simply navigates.
 */

const ALL = "Selected";

interface Props {
  projects: Project[];
  /** Column count at the widest breakpoint (2 = "Selected" page, 3 = denser grid). */
  columns?: 2 | 3;
  /** Show the Selected / typologies category row. */
  showCategories?: boolean;
}

export default function ProjectGallery({ projects, columns = 2, showCategories = true }: Props) {
  const [category, setCategory] = useState<string>(ALL);
  const categories = [ALL, ...typologies];
  const filtered =
    showCategories && category !== ALL ? projects.filter((p) => p.typology === category) : projects;

  const columnClass =
    columns === 3 ? "columns-1 sm:columns-2 lg:columns-3" : "columns-1 sm:columns-2";
  const gutterClass = columns === 3 ? "gap-x-5 lg:gap-x-6" : "gap-x-8 lg:gap-x-14";
  const tileGap = columns === 3 ? "mb-5 lg:mb-6" : "mb-8 lg:mb-12";

  return (
    <div className="mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10">
      {showCategories && (
        /* Category row — Sergison Bates' "Selected / Dwelling / Culture …" */
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

      {/* Masonry — mixed ratios, packed into columns */}
      <div className={cx(columnClass, gutterClass)}>
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            aria-label={`${p.title}, ${p.place}`}
            className={cx("group block break-inside-avoid", tileGap)}
          >
            <div className="frame relative">
              <HHLImage
                src={p.portfolioImage ?? p.thumbnailImage ?? p.heroImage}
                alt={p.heroAlt}
                label={p.heroLabel}
                ratio={p.portfolioRatio ?? "3:2"}
                breathe
                sizes={
                  columns === 3
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                    : "(max-width: 640px) 100vw, 48vw"
                }
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
                <span>
                  {p.title}, {p.place}
                </span>
                <span aria-hidden className="shrink-0 text-base leading-none opacity-80">
                  +
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
