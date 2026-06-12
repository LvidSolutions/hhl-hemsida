"use client";

import { useState } from "react";
import { cx } from "@/lib/utils";
import type { Drawing, DrawingLayer } from "@/data/projects";

/**
 * The site's signature feature, in MVP form: drawing list, a zoomable
 * canvas (placeholder sheet), and tracing-paper annotation layers that fade
 * over the drawing. Deep-zoom tiles (OpenSeadragon) are Phase 2 — the
 * interaction model and UI are real now.
 */
export default function DrawingExplorer({ drawings }: { drawings: Drawing[] }) {
  const [activeId, setActiveId] = useState(drawings[0]?.id);
  const [layers, setLayers] = useState<Set<DrawingLayer["id"]>>(new Set());
  const [zoom, setZoom] = useState(1);

  const active = drawings.find((d) => d.id === activeId) ?? drawings[0];
  if (!active) return null;

  const toggleLayer = (id: DrawingLayer["id"]) => {
    setLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const grouped = ["Plan", "Section", "Elevation", "Detail"]
    .map((type) => ({ type, items: drawings.filter((d) => d.type === type) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="border border-[var(--hairline)] bg-paper">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px]">
        {/* Drawing list */}
        <nav aria-label="Drawings" className="hairline-b p-5 lg:border-b-0 lg:border-r lg:border-[var(--hairline)]">
          {grouped.map((g) => (
            <div key={g.type} className="mb-5">
              <p className="t-overline mb-2">{g.type}s</p>
              <ul className="space-y-1">
                {g.items.map((d) => (
                  <li key={d.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(d.id)}
                      aria-current={d.id === active.id}
                      className={cx(
                        "u-link t-label text-left",
                        d.id === active.id ? "border-l-2 border-accent pl-2 text-graphite" : "text-greytext"
                      )}
                    >
                      {d.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Canvas */}
        <div className="relative overflow-auto bg-paper" style={{ minHeight: "420px" }}>
          <div
            className="relative mx-auto my-8 w-[85%] origin-top transition-transform duration-300 ease-architectural"
            style={{ transform: `scale(${zoom})` }}
          >
            <div className="relative flex aspect-[4/3] items-center justify-center border border-[var(--hairline)] bg-paper">
              <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-mist" />
              <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-mist" />
              <span className="t-caption max-w-[70%] text-center">{active.label}</span>

              {/* Tracing-paper annotation layers (schematic placeholders) */}
              <svg
                aria-hidden
                viewBox="0 0 400 300"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <g
                  className="transition-opacity duration-300"
                  style={{ opacity: layers.has("structure") ? 1 : 0 }}
                  stroke="#9A4A2E"
                  strokeWidth="1.5"
                >
                  {[80, 160, 240, 320].map((x) => (
                    <line key={x} x1={x} y1={60} x2={x} y2={240} strokeDasharray="2 4" />
                  ))}
                </g>
                <g
                  className="transition-opacity duration-300"
                  style={{ opacity: layers.has("circulation") ? 1 : 0 }}
                >
                  <path
                    d="M 50 250 L 140 250 L 140 150 L 260 150 L 260 80 L 350 80"
                    fill="none"
                    stroke="#9A4A2E"
                    strokeWidth="1.5"
                  />
                  <circle cx="50" cy="250" r="4" fill="#9A4A2E" />
                </g>
                <g
                  className="transition-opacity duration-300"
                  style={{ opacity: layers.has("program") ? 1 : 0 }}
                >
                  <rect x="60" y="70" width="120" height="90" fill="rgba(154,74,46,0.12)" />
                  <rect x="220" y="160" width="120" height="80" fill="rgba(154,74,46,0.12)" />
                </g>
                <g
                  className="transition-opacity duration-300"
                  style={{ opacity: layers.has("annotations") ? 1 : 0 }}
                  fill="#9A4A2E"
                  fontSize="9"
                  fontFamily="sans-serif"
                >
                  <text x="66" y="64">hall</text>
                  <text x="226" y="154">living</text>
                  <text x="300" y="250">terrace</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Layer toggles + zoom */}
        <div className="hairline-t p-5 lg:border-l lg:border-t-0 lg:border-[var(--hairline)]">
          <p className="t-overline mb-3">Layers</p>
          <ul className="space-y-2">
            {active.layers.map((layer) => (
              <li key={layer.id}>
                <label className="t-label flex cursor-pointer items-center gap-3 text-charcoal">
                  <input
                    type="checkbox"
                    checked={layers.has(layer.id)}
                    onChange={() => toggleLayer(layer.id)}
                    className="h-4 w-4 cursor-pointer appearance-none border border-mist bg-paper checked:border-accent checked:bg-accent"
                  />
                  {layer.label}
                </label>
              </li>
            ))}
          </ul>

          <p className="t-overline mb-3 mt-8">Zoom</p>
          <div className="flex gap-2" role="group" aria-label="Zoom level">
            {[1, 1.5, 2].map((z) => (
              <button
                key={z}
                type="button"
                aria-pressed={zoom === z}
                onClick={() => setZoom(z)}
                className={cx(
                  "t-label h-9 w-12 border transition-colors duration-150",
                  zoom === z
                    ? "border-graphite bg-graphite text-warmwhite"
                    : "border-[var(--hairline)] text-greytext hover:border-charcoal hover:text-charcoal"
                )}
              >
                {z}×
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hairline-t flex flex-wrap items-center justify-between gap-2 px-5 py-3">
        <p className="t-caption">
          {active.title} · {active.scale}
        </p>
        <p className="t-caption">Deep-zoom tiles arrive with real drawings — see README</p>
      </div>
    </div>
  );
}
