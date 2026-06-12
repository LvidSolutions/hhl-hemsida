import type { Metadata } from "next";
import JournalCard from "@/components/JournalCard";
import { journal } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Essays, studio notes, lectures and construction updates from the practice.",
};

export default function JournalPage() {
  return (
    <div className="site pb-32 pt-32 lg:pt-44">
      <header className="mb-10 max-w-3xl">
        <h1 className="font-serif text-4xl font-light text-graphite lg:text-6xl">Journal</h1>
        <p className="mt-6 max-w-measure font-serif text-lg leading-[1.65] text-charcoal">
          Writing from the studio: essays, notes from site, lectures and reflections. One substantial
          piece a month; short notes as they occur.
        </p>
      </header>
      <div className="lg:mx-[16.666%]">
        {journal.map((e) => (
          <JournalCard key={e.slug} entry={e} />
        ))}
      </div>
    </div>
  );
}
