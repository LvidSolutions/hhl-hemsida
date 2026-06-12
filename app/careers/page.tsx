import type { Metadata } from "next";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Careers",
  description: "Working at HHL: responsibility early, criticism that is honest, and time to think.",
};

const POSITIONS = [
  {
    title: "Architect, 3–6 years' experience",
    note: "Housing and public projects, competition to completion. Swedish or English working language.",
  },
  {
    title: "Internship, spring 2027",
    note: "Six months, paid, with a named mentor and a real project role.",
  },
];

const PROCESS_STEPS = [
  ["What to send", "A short letter, a CV, and a portfolio under 15 MB. Ten pages that show how you think beat forty that show everything."],
  ["What happens", "Every application is read by a partner. We reply to all of them — usually within three weeks."],
  ["The conversation", "One visit to the studio: a conversation around your work and ours, not a test."],
] as const;

export default function CareersPage() {
  return (
    <div className="pb-32 pt-32 lg:pt-44">
      <header className="site mb-20 max-w-3xl">
        <h1 className="font-serif text-4xl font-light text-graphite lg:text-6xl">Careers</h1>
        <p className="mt-6 max-w-measure font-serif text-lg leading-[1.65] text-charcoal">
          We are a studio that draws, builds models, and visits site. Architects at HHL work on projects
          from competition to completion — detail is not a department here. We expect curiosity and care;
          we offer responsibility early, criticism that is honest, and time to think. Stockholm is our
          home; our ambitions are not local.
        </p>
      </header>

      <section className="site mb-28" aria-labelledby="positions-h">
        <SectionHeader index="01" label="Open positions" />
        <h2 id="positions-h" className="sr-only">Open positions</h2>
        <ul className="max-w-3xl">
          {POSITIONS.map((p) => (
            <li key={p.title} className="hairline-b py-6">
              <h3 className="font-serif text-2xl font-normal text-graphite">{p.title}</h3>
              <p className="mt-2 max-w-measure font-serif text-base leading-relaxed text-charcoal/80">{p.note}</p>
              <Link href="/contact" className="u-link t-label mt-4 inline-block">
                Apply <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="t-label mt-8 text-greytext">
          No matching role? Speculative applications are read with the same care:{" "}
          <a className="p-link" href="mailto:work@hhl.se">work@hhl.se</a> (sample address).
        </p>
      </section>

      <section className="site mb-28" aria-labelledby="apply-h">
        <SectionHeader index="02" label="How applying works" />
        <h2 id="apply-h" className="sr-only">Application process</h2>
        <ol className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {PROCESS_STEPS.map(([title, text], i) => (
            <li key={title} className="border-t border-[var(--hairline)] pt-5">
              <p className="t-caption">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-label mt-2 font-medium text-graphite">{title}</h3>
              <p className="mt-3 font-serif text-base leading-relaxed text-charcoal">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-stone py-24" aria-labelledby="life-h">
        <div className="site">
          <SectionHeader index="03" label="Studio life" />
          <h2 id="life-h" className="sr-only">Studio life</h2>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <figure className="lg:col-span-7">
              <PlaceholderImage label="[Studio working image — model review at the long table]" ratio="3:2" />
              <figcaption className="t-caption mt-3">Friday review, sample image.</figcaption>
            </figure>
            <div className="lg:col-span-4 lg:col-start-9">
              <blockquote className="font-serif text-lg italic leading-relaxed text-charcoal">
                "I was given a facade to own in my first month — and a mentor who checked the drawing with
                me every Friday."
              </blockquote>
              <p className="t-caption mt-3">Architect, three years at the studio (sample quote).</p>
              <p className="mt-8 max-w-measure font-serif text-base leading-relaxed text-charcoal">
                Collective agreement, Swedish parental leave culture, stated working hours, paid research
                time. These facts are part of the offer and stated plainly.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="secondary">
                  Ask us anything
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
