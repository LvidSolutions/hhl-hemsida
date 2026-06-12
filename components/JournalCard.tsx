import Link from "next/link";
import type { JournalEntry } from "@/data/journal";

/** Text-variant journal teaser: category/date → headline → standfirst → reading time. */
export default function JournalCard({ entry }: { entry: JournalEntry }) {
  return (
    <Link href="/journal" className="group block border-t border-[var(--hairline)] py-8">
      <p className="t-overline">
        {entry.category} — {entry.date}
      </p>
      <h3 className="u-link mt-3 inline-block font-serif text-[26px] font-normal leading-snug text-graphite">
        {entry.headline}
      </h3>
      <p className="mt-3 max-w-measure font-serif text-lg leading-relaxed text-charcoal/70">
        {entry.standfirst}
      </p>
      <p className="t-caption mt-3">{entry.readingMin} min</p>
    </Link>
  );
}
