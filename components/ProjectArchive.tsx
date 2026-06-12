"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { cx, metaLine } from "@/lib/utils";
import { materialTags, statuses, typologies, type Project, type Status } from "@/data/projects";

type View = "grid" | "index";

function FilterTag({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "t-caption inline-flex h-7 items-center gap-2 whitespace-nowrap border px-3 uppercase transition-colors duration-150",
        active
          ? "border-graphite bg-graphite text-warmwhite"
          : "border-[var(--hairline)] text-greytext hover:border-charcoal hover:text-charcoal"
      )}
    >
      {label}
      {typeof count === "number" && <span className="opacity-60">{count}</span>}
      {active && <span aria-hidden>×</span>}
    </button>
  );
}

/**
 * The archive: one corpus, two readings in this MVP (Grid and Index), with
 * combinable typology / material / status filters. Map and Timeline views
 * are Phase 2 (see README).
 */
export default function ProjectArchive({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<View>("grid");
  const [typology, setTypology] = useState<string | null>(null);
  const [material, setMaterial] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!typology || p.typology === typology) &&
          (!material || p.materialsTags.includes(material)) &&
          (!status || p.status === status)
      ),
    [projects, typology, material, status]
  );

  const anyFilter = typology || material || status;

  return (
    <div>
      {/* Filter bar */}
      <div className="hairline-b hairline-t flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="strip lg:flex-wrap lg:overflow-visible lg:[mask-image:none]" role="group" aria-label="Filters">
          <span className="t-caption self-center uppercase">Typology</span>
          {typologies.map((t) => (
            <FilterTag
              key={t}
              label={t}
              count={projects.filter((p) => p.typology === t).length}
              active={typology === t}
              onClick={() => setTypology(typology === t ? null : t)}
            />
          ))}
          <span className="t-caption ml-2 self-center uppercase">Material</span>
          {materialTags.map((m) => (
            <FilterTag
              key={m}
              label={m}
              active={material === m}
              onClick={() => setMaterial(material === m ? null : m)}
            />
          ))}
          <span className="t-caption ml-2 self-center uppercase">Status</span>
          {statuses
            .filter((s) => projects.some((p) => p.status === s))
            .map((s) => (
              <FilterTag key={s} label={s} active={status === s} onClick={() => setStatus(status === s ? null : s)} />
            ))}
          {anyFilter && (
            <button
              type="button"
              className="u-link t-label self-center text-greytext"
              onClick={() => {
                setTypology(null);
                setMaterial(null);
                setStatus(null);
              }}
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex items-center gap-6">
          <p className="t-label tabular-nums text-greytext" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </p>
          <div role="group" aria-label="View" className="t-label flex gap-4">
            {(["grid", "index"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={cx("u-link capitalize", view === v ? "border-b border-accent pb-1 text-graphite" : "text-greytext")}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {view === "grid" ? (
        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      ) : (
        <table className="mt-8 w-full">
          <caption className="sr-only">Project index</caption>
          <thead>
            <tr className="hairline-b text-left">
              {["Project", "Typology", "Place", "Year", "Status"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className={cx(
                    "t-overline py-3 font-normal",
                    (h === "Typology" || h === "Place") && "hidden sm:table-cell",
                    h === "Year" && "text-right sm:text-left"
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.slug} className="hairline-b group transition-colors duration-150 hover:bg-stone/40">
                <td className="py-4 pr-4">
                  <Link href={`/projects/${p.slug}`} className="u-link t-label font-medium text-graphite">
                    {p.title}
                  </Link>
                  <span className="t-caption mt-1 block sm:hidden">{metaLine(p.typology, p.place)}</span>
                </td>
                <td className="t-label hidden py-4 pr-4 text-greytext sm:table-cell">{p.typology}</td>
                <td className="t-label hidden py-4 pr-4 text-greytext sm:table-cell">{p.place}</td>
                <td className="t-label py-4 pr-4 text-right tabular-nums text-greytext sm:text-left">{p.year}</td>
                <td className="t-label hidden py-4 text-greytext sm:table-cell">
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className={cx(
                        "inline-block h-1.5 w-1.5 rounded-full",
                        p.status === "Under construction"
                          ? "bg-accent"
                          : p.status === "Competition"
                            ? "border border-charcoal"
                            : "bg-charcoal"
                      )}
                    />
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {filtered.length === 0 && (
        <p className="mt-12 max-w-measure font-serif text-lg text-charcoal/70">
          No projects match this combination. Remove a filter to widen the selection.
        </p>
      )}
    </div>
  );
}
