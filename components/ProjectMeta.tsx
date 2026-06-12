import Link from "next/link";
import type { Project } from "@/data/projects";

/**
 * The fact table: structured project data, hairline rows, entity values link
 * into the filtered archive. Sticky beside the narrative on desktop.
 */
export default function ProjectMeta({ project }: { project: Project }) {
  const rows: Array<{ label: string; value: string; href?: string }> = [
    { label: "Location", value: project.location },
    { label: "Year", value: String(project.year) },
    { label: "Typology", value: project.typology, href: "/projects" },
    { label: "Status", value: project.status },
    { label: "Size", value: project.size },
    ...(project.client ? [{ label: "Client", value: project.client }] : []),
    ...(project.photography ? [{ label: "Photography", value: project.photography }] : []),
    ...(project.awards?.length ? [{ label: "Awards", value: project.awards.join("; ") }] : []),
    ...(project.publications?.length
      ? [{ label: "Publications", value: project.publications.join(", ") }]
      : []),
  ];

  return (
    <dl>
      {rows.map((row) => (
        <div key={row.label} className="hairline-b py-3">
          <dt className="t-overline">{row.label}</dt>
          <dd className="t-label mt-1 text-charcoal">
            {row.href ? (
              <Link href={row.href} className="e-link">
                {row.value}
              </Link>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
