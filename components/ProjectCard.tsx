import Link from "next/link";
import HHLImage from "@/components/HHLImage";
import { metaLine } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  ratio?: "4:3" | "3:2" | "4:5";
  showIdeaLine?: boolean;
}

/** Standard archive/related card: image → title → meta. Whole card is one link. */
export default function ProjectCard({ project, ratio = "4:3", showIdeaLine = false }: Props) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="frame">
        <HHLImage
          src={project.thumbnailImage ?? project.heroImage}
          alt={project.heroAlt}
          label={project.heroLabel}
          ratio={ratio}
          breathe
          sizes="(max-width: 600px) 100vw, 33vw"
        />
      </div>
      <h3 className="u-link mt-4 inline-block font-serif text-[22px] font-normal leading-snug text-graphite sm:text-[26px]">
        {project.title}
      </h3>
      <p className="t-label mt-1 text-greytext">
        {metaLine(project.typology, project.place, project.year)}
      </p>
      {showIdeaLine && (
        <p className="mt-2 font-serif text-base leading-relaxed text-charcoal/70">{project.ideaLine}</p>
      )}
    </Link>
  );
}
