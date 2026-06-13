import Link from "next/link";
import HeroJourney, { type JourneyItem, type JourneyFinal } from "@/components/HeroJourney";
import HomeIntro from "@/components/HomeIntro";
import ProjectGallery from "@/components/ProjectGallery";
import SectionHeader from "@/components/SectionHeader";
import ResearchCard from "@/components/ResearchCard";
import JournalCard from "@/components/JournalCard";
import HHLImage from "@/components/HHLImage";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";
import { portfolio } from "@/data/portfolio";
import { research } from "@/data/research";
import { journal } from "@/data/journal";

const RECOGNITION: Array<{ year: string; text: string; type: string }> = [
  { year: "2025", text: "Kasper Salin Prize, nomination (sample entry)", type: "Nomination" },
  { year: "2024", text: "Exhibited, Nordic Pavilion, Venice Architecture Biennale (sample)", type: "Exhibition" },
  { year: "2024", text: "House Juniskär published in a Nordic monograph series (sample)", type: "Publication" },
  { year: "2023", text: "Regional masonry award shortlist, Kvarteret Tegel (sample)", type: "Award" },
];

/**
 * The scroll journey after the intro: five images drifting upward with
 * scroll, closed by the full-bleed identity panel. Norrnäs and Juniskär use
 * the studio's own photographs of those projects; the remaining three are
 * indicative HHL image pairings for the sample projects (see
 * /public/hhl-images/hero/README.md and the note atop data/projects.ts).
 */
const JOURNEY: JourneyItem[] = [
  {
    src: "/hhl-images/hero/norrnas-03.webp",
    alt: "House Norrnäs: a glazed pavilion on a low concrete platform in a foggy meadow",
    title: "House Norrnäs",
    meta: "Private house · Stockholm archipelago · 2014",
    href: "/projects/house-norrnas",
  },
  {
    src: "/hhl-images/hero/juniskar-01.webp",
    alt: "House Juniskär: two timber volumes of different heights on a sloping wooded site",
    title: "House Juniskär",
    meta: "Private house · Sundsvall · 2016",
    href: "/projects/house-juniskar",
  },
  {
    src: "/hhl-images/hero/civic-street.webp",
    alt: "A pale arched building spanning a street between brick industrial facades",
    title: "Kvarteret Tegel Housing",
    meta: "Housing · Stockholm · 2023",
    href: "/projects/kvarteret-tegel",
  },
  {
    src: "/hhl-images/hero/school-birches.webp",
    alt: "A green timber school building with a sheet-metal roof seen through birch trunks",
    title: "Timber School Uppsala",
    meta: "Education · Uppsala · 2027",
    href: "/projects/timber-school-uppsala",
  },
  {
    src: "/hhl-images/hero/civic-glass.webp",
    alt: "A gabled civic building with a fully glazed ground floor on a tree-lined street",
    title: "Kalmar Stations",
    meta: "Public · Kalmar · 2026",
    href: "/projects/kalmar-stations",
  },
];

const JOURNEY_FINAL: JourneyFinal = {
  src: "/hhl-images/hero/norrnas-02.webp",
  alt: "House Norrnäs among tall pines in morning fog, its flat roof hovering over glazed walls",
  caption: "House Norrnäs — Stockholm archipelago",
};

export default function HomePage() {
  const current = [
    { status: "Under construction", title: "Kvarteret Tegel Housing", note: "Facade brickwork reaches level four.", href: "/projects/kvarteret-tegel" },
    { status: "Competition", title: "Kalmar Stations", note: "Two stations, one constructive language. (Sample status.)", href: "/projects/kalmar-stations" },
    { status: "Recently completed", title: "House Juniskär", note: "Photographed this spring, ten years on.", href: "/projects/house-juniskar" },
  ];

  return (
    <>
      <h1 className="sr-only">Hermansson Hiller Lundberg Arkitekter — architecture studio, Stockholm</h1>

      <HomeIntro />

      <HeroJourney items={JOURNEY} final={JOURNEY_FINAL} />

      {/* 01 — Selected work (Sergison Bates-style image grid) — first after the hero */}
      <section className="pt-24 lg:pt-32" aria-labelledby="featured-heading">
        <span id="featured-heading" className="sr-only">Selected work</span>
        <div className="mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10">
          <SectionHeader index="01" label="Selected work" link={{ label: "All projects", href: "/projects" }} />
        </div>
        <ProjectGallery items={portfolio} columns={3} showCategories={false} />
      </section>

      {/* 02 — Studio statement */}
      <section className="site pb-32 pt-32 lg:pb-40 lg:pt-48" aria-labelledby="statement">
        <div className="grid-12">
          <span aria-hidden className="t-caption col-span-1 hidden lg:block">02 —</span>
          <Reveal className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-3">
            <p id="statement" className="font-serif text-[22px] font-light leading-[1.45] text-graphite sm:text-[26px] lg:text-[34px] lg:leading-[1.35]">
              Hermansson Hiller Lundberg is an architecture practice in Stockholm. We work toward an
              architecture of presence, character and complexity — buildings that take their place with
              confidence, age with dignity, and reward attention. Our work spans housing, public
              buildings, hotels, care homes and private houses.
            </p>
            <Link href="/studio" className="u-link t-label mt-10 inline-block">
              About the studio <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 03 — The archive (mini-index on the stone band) */}
      <section className="mt-32 bg-stone py-24 lg:mt-40 lg:py-32" aria-labelledby="archive-h">
        <div className="site">
          <SectionHeader index="03" label="The archive" link={{ label: "Open the archive", href: "/projects" }} />
          <span id="archive-h" className="sr-only">The archive</span>
          <p className="t-caption mb-6">{projects.length} projects · 2014–2027</p>
          <table className="w-full">
            <caption className="sr-only">Recent projects</caption>
            <tbody>
              {projects.slice(0, 6).map((p) => (
                <tr key={p.slug} className="hairline-b transition-colors duration-150 hover:bg-warmwhite">
                  <td className="py-4 pr-4">
                    <Link href={`/projects/${p.slug}`} className="u-link t-label font-medium text-graphite">
                      {p.title}
                    </Link>
                  </td>
                  <td className="t-label hidden py-4 pr-4 text-greytext sm:table-cell">{p.typology}</td>
                  <td className="t-label hidden py-4 pr-4 text-greytext lg:table-cell">{p.place}</td>
                  <td className="t-label py-4 pr-4 text-right tabular-nums text-greytext sm:text-left">{p.year}</td>
                  <td className="t-label hidden py-4 text-greytext sm:table-cell">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="strip mt-8 lg:[mask-image:none]">
            {[
              ["Housing", "/projects"],
              ["Private houses", "/projects"],
              ["Brick", "/projects"],
              ["Timber", "/projects"],
              ["Competitions", "/projects"],
              ["Under construction", "/projects"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="t-caption inline-flex h-7 shrink-0 items-center border border-mist/60 px-3 uppercase text-greytext transition-colors duration-150 hover:border-charcoal hover:text-charcoal"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Current work */}
      <section className="site py-32 lg:py-40" aria-labelledby="current-h">
        <SectionHeader index="04" label="On the boards / on site" />
        <span id="current-h" className="sr-only">Current work</span>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <figure className="lg:col-span-7">
            <HHLImage
              src="/hhl-images/hhl-05.jpg"
              alt="New housing blocks with pastel triangle-patterned facades behind construction fencing at dusk"
              label="[Construction process photograph]"
              ratio="3:2"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <figcaption className="t-caption mt-3">On site, spring 2026 (sample caption — HHL site photograph).</figcaption>
          </figure>
          <ul className="lg:col-span-4 lg:col-start-9">
            {current.map((c) => (
              <li key={c.title} className="hairline-b py-5 first:pt-0">
                <p className="t-caption flex items-center gap-2 uppercase">
                  <span
                    aria-hidden
                    className={
                      c.status === "Under construction"
                        ? "inline-block h-1.5 w-1.5 rounded-full bg-accent"
                        : c.status === "Competition"
                          ? "inline-block h-1.5 w-1.5 rounded-full border border-charcoal"
                          : "inline-block h-1.5 w-1.5 rounded-full bg-charcoal"
                    }
                  />
                  {c.status}
                </p>
                <Link href={c.href} className="u-link t-label mt-2 inline-block font-medium text-graphite">
                  {c.title}
                </Link>
                <p className="mt-1 font-serif text-base leading-relaxed text-charcoal/70">{c.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — Research */}
      <section className="site pb-32 lg:pb-40" aria-labelledby="research-h">
        <SectionHeader index="05" label="Research" link={{ label: "All research", href: "/research" }} />
        <span id="research-h" className="sr-only">Research</span>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-6">
          {research.slice(0, 2).map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.12}>
              <ResearchCard study={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 — Journal */}
      <section className="site pb-32 lg:pb-40" aria-labelledby="journal-h">
        <SectionHeader index="06" label="Journal" link={{ label: "All entries", href: "/journal" }} />
        <span id="journal-h" className="sr-only">Journal</span>
        <div className="lg:mx-[16.666%]">
          {journal.slice(0, 2).map((e) => (
            <JournalCard key={e.slug} entry={e} />
          ))}
        </div>
      </section>

      {/* 07 — Recognition */}
      <section className="site pb-32 lg:pb-40" aria-labelledby="recognition-h">
        <SectionHeader index="07" label="Recognition" link={{ label: "Full record", href: "/studio" }} />
        <span id="recognition-h" className="sr-only">Recognition</span>
        <ul className="lg:mx-[8.333%]">
          {RECOGNITION.map((r) => (
            <li key={r.text} className="hairline-b grid grid-cols-12 items-baseline gap-4 py-5">
              <span className="t-caption col-span-2 tabular-nums lg:col-span-1">{r.year}</span>
              <span className="col-span-10 font-serif text-lg leading-relaxed text-charcoal lg:col-span-8">
                {r.text}
              </span>
              <span className="t-overline col-span-12 lg:col-span-3 lg:text-right">{r.type}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 08 — Careers */}
      <section className="site pb-32 lg:pb-40" aria-labelledby="careers-h">
        <SectionHeader index="08" label="Working at HHL" link={{ label: "Careers", href: "/careers" }} />
        <span id="careers-h" className="sr-only">Careers</span>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Link href="/careers" className="group lg:col-span-6">
            <div className="frame">
              <HHLImage
                src="/hhl-images/hhl-13.jpg"
                alt="The three HHL partners seated side by side at a yellow table, bookshelf and a red wall object behind them"
                label="[Studio working image — people at a model, natural light]"
                ratio="4:3"
                breathe
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Link>
          <div className="lg:col-span-4 lg:col-start-8">
            <p className="max-w-measure font-serif text-lg leading-relaxed text-charcoal">
              We are a studio that draws, builds models, and visits site. Architects here follow projects
              from competition to completion — detail is not a department.
            </p>
            <Link href="/careers" className="u-link t-label mt-6 inline-block">
              2 open positions <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
