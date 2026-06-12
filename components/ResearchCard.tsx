import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import type { Study } from "@/data/research";

/** Study teaser presented like a journal cover. */
export default function ResearchCard({ study }: { study: Study }) {
  return (
    <Link href="/research" className="group block">
      <div className="frame">
        <PlaceholderImage
          label={study.imageLabel}
          ratio="16:10"
          variant={study.imageKind === "material" ? "material" : "drawing"}
          breathe={study.imageKind === "material"}
        />
      </div>
      <p className="t-overline mt-5">{study.category}</p>
      <h3 className="u-link mt-2 inline-block font-serif text-[26px] font-normal leading-snug text-graphite">
        {study.title}
      </h3>
      <p className="mt-2 font-serif text-base leading-relaxed text-charcoal/70">{study.abstract}</p>
      <p className="t-caption mt-3">
        {study.category} · {study.year} · {study.readingMin} min
      </p>
    </Link>
  );
}
