"use client";

import Link from "next/link";
import { useState } from "react";
import HHLImage from "@/components/HHLImage";
import { cx } from "@/lib/utils";
import { typologies, type Project } from "@/data/projects";

/**
 * Portfolio presentation in the manner of Sergison Bates' project pages:
 * a quiet, image-led masonry with no cards, borders or shadows. Tiles of
 * mixed aspect ratio pack into two columns (one on mobile) with a generous
 * column gutter and tight page margins, so the photographs carry the page.
 *
 * A restrained text row stands in for their category navigation
 * (Selected / Dwelling / Culture …): "Selected" shows everything, each
 * typology narrows the set. Project name and place are held back until
 * hover — the grid reads as pictures first, captions second — while the
 * link's aria-label keeps every tile named for assistive tech and on
 * touch devices, where the tap simply navigates.
 */

const ALL = "Selected";

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const categories = [ALL, ...typologies];
  const filtered = category === ALL ? projects : projects.filter((p) => p.typology === category);

  return (
    <div className="mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10">
      {/* Category row — Sergison Bates' "Selected / Dwelling / Culture …" */}
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

      {/* Masonry — mixed ratios, two columns, large gutter */}
      <div className="columns-1 gap-x-8 sm:columns-2 lg:gap-x-14">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            aria-label={`${p.title}, ${p.place}`}
            className="group mb-8 block break-inside-avoid lg:mb-12"
          >
            <div className="frame relative">
              <HHLImage
                src={p.portfolioImage ?? p.thumbnailImage ?? p.heroImage}
                alt={p.heroAlt}
                label={p.heroLabel}
                ratio={p.portfolioRatio ?? "3:2"}
                breathe
                sizes="(max-width: 640px) 100vw, 48vw"
              />
              {/* Hover scrim + caption — held back until hover/focus */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-graphite/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 font-sans text-sm tracking-label text-warmwhite opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 lg:p-6"
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
