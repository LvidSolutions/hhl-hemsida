"use client";

import { useState } from "react";
import PlaceholderImage from "@/components/PlaceholderImage";
import { cx } from "@/lib/utils";
import type { Material } from "@/data/projects";

/**
 * Material selector with three panes per material:
 * sample close-up · key detail drawing · the material in the building.
 */
export default function MaterialExplorer({ materials }: { materials: Material[] }) {
  const [activeId, setActiveId] = useState(materials[0]?.id);
  const active = materials.find((m) => m.id === activeId) ?? materials[0];
  if (!active) return null;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <ul className="strip lg:col-span-3 lg:block lg:space-y-3 lg:overflow-visible lg:[mask-image:none]">
        {materials.map((m) => (
          <li key={m.id} className="shrink-0">
            <button
              type="button"
              onClick={() => setActiveId(m.id)}
              aria-pressed={m.id === active.id}
              className={cx(
                "u-link t-label whitespace-nowrap text-left font-medium",
                m.id === active.id ? "border-l-2 border-accent pl-2 text-graphite lg:pl-3" : "text-greytext"
              )}
            >
              {m.name}
            </button>
          </li>
        ))}
      </ul>

      <div key={active.id} className="lg:col-span-9">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <PlaceholderImage label={`[Material close-up — ${active.name.toLowerCase()}]`} ratio="1:1" variant="material" />
          <PlaceholderImage label={`[Detail drawing — ${active.name.toLowerCase()} junction]`} ratio="1:1" variant="drawing" />
          <PlaceholderImage label={`[Photograph — ${active.name.toLowerCase()} in the building]`} ratio="1:1" />
        </div>
        <p className="mt-5 max-w-measure font-serif text-base leading-relaxed text-charcoal">
          <strong className="font-semibold">{active.name}.</strong> {active.note}
        </p>
      </div>
    </div>
  );
}
