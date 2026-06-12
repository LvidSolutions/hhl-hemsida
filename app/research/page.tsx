import type { Metadata } from "next";
import ResearchCard from "@/components/ResearchCard";
import { research } from "@/data/research";

export const metadata: Metadata = {
  title: "Research",
  description: "Ongoing investigations: material studies, typological research, urban studies.",
};

export default function ResearchPage() {
  return (
    <div className="site pb-32 pt-32 lg:pt-44">
      <header className="mb-16 max-w-3xl">
        <h1 className="font-serif text-4xl font-light text-graphite lg:text-6xl">Research</h1>
        <p className="mt-6 max-w-measure font-serif text-lg leading-[1.65] text-charcoal">
          The studio's investigations run alongside its buildings: question, method, findings, and the
          projects where the research landed. Studies are dated, credited and citable.
        </p>
      </header>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {research.map((s) => (
          <li key={s.slug}>
            <ResearchCard study={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}
