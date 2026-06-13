import type { Metadata } from "next";
import ProjectGallery from "@/components/ProjectGallery";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "The HHL archive: housing, public buildings, hotels, care homes and private houses.",
};

export default function ProjectsPage() {
  return (
    <div className="pb-32 pt-28 lg:pt-36">
      <h1 className="sr-only">Projects</h1>
      <ProjectGallery projects={projects} />
    </div>
  );
}
