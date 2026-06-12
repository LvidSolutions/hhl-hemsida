import Link from "next/link";
import HHLImage from "@/components/HHLImage";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { metaLine } from "@/lib/utils";
import type { Project } from "@/data/projects";

function TextBlock({ p }: { p: Project }) {
  return (
    <div>
      <h3 className="u-link inline-block font-serif text-[26px] font-normal leading-snug text-graphite">
        {p.title}
      </h3>
      <p className="t-label mt-1 text-greytext">{metaLine(p.typology, p.place, p.year)}</p>
      <p className="mt-3 font-serif text-base leading-relaxed text-charcoal/70">{p.ideaLine}</p>
    </div>
  );
}

/**
 * Selected work in an A–B–C editorial rhythm:
 * A — large image left, text right · B — medium image right, text left ·
 * C — portrait pair, second image offset (the "informal placement").
 */
export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [a, b, c1, c2] = projects;
  return (
    <section className="site" aria-labelledby="featured-heading">
      <span id="featured-heading" className="sr-only">Selected work</span>
      <SectionHeader index="02" label="Selected work" link={{ label: "All projects", href: "/projects" }} />

      <div className="space-y-24 lg:space-y-32">
        {a && (
          <Reveal>
            <Link href={`/projects/${a.slug}`} className="group grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="frame lg:col-span-8">
                <HHLImage src={a.heroImage} alt={a.heroAlt} label={a.heroLabel} ratio="3:2" breathe sizes="(max-width: 1024px) 100vw, 66vw" />
              </div>
              <div className="lg:col-span-3 lg:col-start-10">
                <TextBlock p={a} />
              </div>
            </Link>
          </Reveal>
        )}

        {b && (
          <Reveal>
            <Link href={`/projects/${b.slug}`} className="group grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="order-2 self-end lg:order-1 lg:col-span-4">
                <TextBlock p={b} />
              </div>
              <div className="frame order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
                <HHLImage src={b.heroImage} alt={b.heroAlt} label={b.heroLabel} ratio="4:3" breathe sizes="(max-width: 1024px) 100vw, 58vw" />
              </div>
            </Link>
          </Reveal>
        )}

        {c1 && c2 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5 lg:col-start-2">
              <Link href={`/projects/${c1.slug}`} className="group block">
                <div className="frame">
                  <HHLImage src={c1.thumbnailImage ?? c1.heroImage} alt={c1.heroAlt} label={c1.heroLabel} ratio="4:5" breathe sizes="(max-width: 1024px) 100vw, 42vw" />
                </div>
                <div className="mt-4">
                  <TextBlock p={c1} />
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:mt-24">
              <Link href={`/projects/${c2.slug}`} className="group block">
                <div className="frame">
                  <HHLImage src={c2.thumbnailImage ?? c2.heroImage} alt={c2.heroAlt} label={c2.heroLabel} ratio="4:5" breathe sizes="(max-width: 1024px) 100vw, 42vw" />
                </div>
                <div className="mt-4">
                  <TextBlock p={c2} />
                </div>
              </Link>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
