import type { Metadata } from "next";
import PlaceholderImage from "@/components/PlaceholderImage";
import HHLImage from "@/components/HHLImage";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Studio",
  description: "An architecture practice in Stockholm — philosophy, people, process and record.",
};

const PARTNERS = [
  { name: "Anders Hermansson", note: "Partner. Sample biography — education, teaching, juries to be confirmed by the studio." },
  { name: "Erik Hiller", note: "Partner. Sample biography — education, teaching, juries to be confirmed by the studio." },
  { name: "Johan Lundberg", note: "Partner. Sample biography — education, teaching, juries to be confirmed by the studio." },
];

const TIMELINE = [
  ["2014", "House Norrnäs completed in the Stockholm archipelago."],
  ["2016", "House Juniskär completed south of Sundsvall."],
  ["2021", "Hotel Aska opens in a converted printing house (sample)."],
  ["2023", "Kvarteret Tegel housing completed (sample)."],
  ["2024", "Invited competition for a timber school in Uppsala won (sample)."],
  ["2026", "The studio's research platform is published."],
] as const;

const RECORD = [
  ["2025", "Kasper Salin Prize, nomination (sample)", "Nomination"],
  ["2024", "Nordic Pavilion, Venice Architecture Biennale (sample)", "Exhibition"],
  ["2024", "Lecture series, KTH School of Architecture (sample)", "Lecture"],
  ["2023", "Regional masonry award shortlist (sample)", "Award"],
] as const;

export default function StudioPage() {
  return (
    <div className="pb-32 pt-32 lg:pt-44">
      <header className="site mb-20">
        <h1 className="font-serif text-4xl font-light text-graphite lg:text-6xl">Studio</h1>
      </header>

      {/* Philosophy */}
      <section className="site mb-28" aria-labelledby="philosophy-h">
        <SectionHeader index="01" label="Philosophy" />
        <h2 id="philosophy-h" className="sr-only">Philosophy</h2>
        <div className="grid-12">
          <div className="col-span-4 space-y-6 sm:col-span-8 lg:col-span-7 lg:col-start-3">
            <p className="font-serif text-xl font-light leading-[1.5] text-graphite lg:text-2xl">
              We work toward an architecture of presence, character and complexity.
            </p>
            <p className="max-w-measure font-serif text-lg leading-[1.65] text-charcoal">
              Presence: buildings that take their place with confidence and weight, anchored to their
              ground. Character: work that can be two things at once — formal and informal, restrained
              and rich — without losing its unity. Complexity: a richness that rewards attention, built
              from the fundamental values of architecture and a close engagement with context, programme
              and construction.
            </p>
            <p className="max-w-measure font-serif text-lg leading-[1.65] text-charcoal">
              The studio draws, builds models, and visits site. We believe a building is an argument made
              over decades, and that the drawing — plan, section, detail — remains the most honest way to
              make it.
            </p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="site mb-28" aria-labelledby="partners-h">
        <SectionHeader index="02" label="Partners" />
        <h2 id="partners-h" className="sr-only">Partners</h2>
        <figure className="mb-12 lg:mx-[16.666%]">
          <HHLImage
            src="/hhl-images/hhl-13.jpg"
            alt="The three HHL partners seated side by side at a yellow table in the studio"
            label="[Group portrait — the partners]"
            ratio="3:2"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <figcaption className="t-caption mt-3">The partners, in the studio.</figcaption>
        </figure>
        <ul className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-6">
          {PARTNERS.map((p) => (
            <li key={p.name}>
              <PlaceholderImage label="[Portrait photograph — natural light]" ratio="4:5" />
              <h3 className="t-label mt-4 font-medium text-graphite">{p.name}</h3>
              <p className="t-caption mt-2">{p.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="site mb-28" aria-labelledby="process-h">
        <SectionHeader index="03" label="How we work" />
        <h2 id="process-h" className="sr-only">Process</h2>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <figure className="lg:col-span-7">
            <PlaceholderImage label="[Studio working image — models and drawings on a long table]" ratio="3:2" />
            <figcaption className="t-caption mt-3">The studio, Stockholm.</figcaption>
          </figure>
          <p className="max-w-measure font-serif text-lg leading-[1.65] text-charcoal lg:col-span-4 lg:col-start-9">
            Every project is developed through physical models, 1:1 material studies and a continuous
            drawing culture. Architects follow their projects from first sketch to final site visit —
            responsibility is whole, not divided.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-stone py-24" aria-labelledby="timeline-h">
        <div className="site">
          <SectionHeader index="04" label="The studio in time" />
          <h2 id="timeline-h" className="sr-only">Studio timeline</h2>
          <ul className="strip">
            {TIMELINE.map(([year, text]) => (
              <li key={year} className="w-[70vw] shrink-0 snap-start border-l border-[var(--hairline)] pl-5 sm:w-[300px]">
                <p className="font-serif text-3xl font-light text-graphite">{year}</p>
                <p className="mt-3 font-serif text-base leading-relaxed text-charcoal">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recognition record */}
      <section className="site mt-28" aria-labelledby="record-h">
        <SectionHeader index="05" label="Recognition" />
        <h2 id="record-h" className="sr-only">Recognition record</h2>
        <ul>
          {RECORD.map(([year, text, type]) => (
            <li key={text} className="hairline-b grid grid-cols-12 items-baseline gap-4 py-5">
              <span className="t-caption col-span-2 tabular-nums lg:col-span-1">{year}</span>
              <span className="col-span-10 font-serif text-lg leading-relaxed text-charcoal lg:col-span-8">{text}</span>
              <span className="t-overline col-span-12 lg:col-span-3 lg:text-right">{type}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
