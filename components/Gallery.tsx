"use client";

import { useMemo, useState } from "react";
import HHLImage from "@/components/HHLImage";
import { cx } from "@/lib/utils";
import type { GalleryItem, Register } from "@/data/projects";

const REGISTER_LABELS: Record<Register, string> = {
  photo: "Photography",
  plan: "Plans",
  section: "Sections",
  elevation: "Elevations",
  diagram: "Diagrams",
  model: "Model",
  sketch: "Sketches",
  construction: "Construction",
  material: "Material",
};

const DRAWING_REGISTERS: Register[] = ["plan", "section", "elevation", "diagram", "sketch"];

/**
 * Editorial gallery: a repeating row template (8+4 / 4+4+4 / centred plate),
 * filterable by register. Drawings sit contained on paper plates; photographs
 * run flush.
 */
export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Register | "all">("all");

  const registers = useMemo(
    () => Array.from(new Set(items.map((i) => i.register))),
    [items]
  );
  const filtered = filter === "all" ? items : items.filter((i) => i.register === filter);

  // Repeating editorial row template: [8,4] · [4,4,4] · [centered 8]
  const spans = ["lg:col-span-8", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-8 lg:col-start-3"];

  return (
    <div>
      <div className="strip mb-10 lg:flex-wrap lg:overflow-visible lg:[mask-image:none]" role="group" aria-label="Filter gallery by type">
        {(["all", ...registers] as const).map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={filter === r}
            onClick={() => setFilter(r as Register | "all")}
            className={cx(
              "t-caption inline-flex h-7 shrink-0 items-center border px-3 uppercase transition-colors duration-150",
              filter === r
                ? "border-graphite bg-graphite text-warmwhite"
                : "border-[var(--hairline)] text-greytext hover:border-charcoal hover:text-charcoal"
            )}
          >
            {r === "all" ? "All" : REGISTER_LABELS[r as Register]}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-12">
        {filtered.map((item, i) => {
          const isDrawing = DRAWING_REGISTERS.includes(item.register);
          return (
            <li key={`${item.label}-${i}`} className={spans[i % spans.length]}>
              <figure>
                <HHLImage
                  src={item.src}
                  alt={item.alt}
                  label={item.label}
                  ratio={item.ratio ?? (isDrawing ? "4:3" : "3:2")}
                  variant={isDrawing ? "drawing" : item.register === "material" ? "material" : "photo"}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <figcaption className="t-caption mt-3">{item.caption}</figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
