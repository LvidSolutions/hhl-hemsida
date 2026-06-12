import type { Metadata } from "next";
import ProjectArchive from "@/components/ProjectArchive";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "The HHL archive: housing, public buildings, hotels, care homes and private houses.",
};

export default function ProjectsPage() {
  return (
    <div className="site pb-32 pt-32 lg:pt-44">
      <header className="mb-14">
        <h1 className="font-serif text-4xl font-light text-graphite lg:text-6xl">Projects</h1>
        <p className="t-label mt-4 max-w-measure text-greytext">
          One archive, several readings. Filters combine; the index view lists everything.
        </p>
      </header>
      <ProjectArchive projects={projects} />
    </div>
  );
}
