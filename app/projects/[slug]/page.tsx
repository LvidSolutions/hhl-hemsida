import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import HHLImage from "@/components/HHLImage";
import ProjectMeta from "@/components/ProjectMeta";
import ProjectCard from "@/components/ProjectCard";
import Gallery from "@/components/Gallery";
import DrawingExplorer from "@/components/DrawingExplorer";
import MaterialExplorer from "@/components/MaterialExplorer";
import PressKitBlock from "@/components/PressKitBlock";
import Reveal from "@/components/Reveal";
import { getProject, nextProject, projects } from "@/data/projects";
import { metaLine } from "@/lib/utils";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary.slice(0, 155),
    openGraph: { title: `${project.title} — HHL Arkitekter`, description: project.ideaLine },
  };
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <p className="t-overline mb-6">
      {index} — {label}
    </p>
  );
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const next = nextProject(project.slug);

  return (
    <article>
      {/* 2.1 Project hero */}
      <header className="relative">
        <div className="relative h-[60svh] w-full lg:h-[78svh]">
          <HHLImage fill src={project.heroImage} alt={project.heroAlt} label={project.heroLabel} priority sizes="100vw" />
        </div>
        <div className="site">
          <div className="-mt-12 bg-warmwhite p-6 sm:p-8 lg:-mt-24 lg:max-w-[58%] lg:p-10">
            <h1 className="font-serif text-4xl font-light leading-tight text-graphite lg:text-[clamp(2.25rem,4vw,3.5rem)]">
              {project.title}
            </h1>
            <p className="t-label mt-3 text-greytext">
              {metaLine(project.typology, project.place, project.year)}
              {project.sample && " · sample project"}
            </p>
          </div>
        </div>
      </header>

      {/* 2.2 + 2.3 Facts beside summary */}
      <div className="site mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12">
        <aside className="lg:col-span-3" aria-label="Project facts">
          <div className="lg:sticky lg:top-28">
            <ProjectMeta project={project} />
          </div>
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          <section aria-labelledby="summary-h">
            <SectionLabel index="01" label="Summary" />
            <h2 id="summary-h" className="sr-only">Architectural summary</h2>
            <p className="font-serif text-xl font-light leading-[1.5] text-graphite lg:text-2xl">
              {project.summary}
            </p>
          </section>

          {/* 2.4 Context */}
          <section className="mt-24" aria-labelledby="context-h">
            <SectionLabel index="02" label="Context" />
            <h2 id="context-h" className="sr-only">Context</h2>
            <p className="max-w-measure font-serif text-lg leading-[1.65] text-charcoal">
              {project.narrative.context}
            </p>
            <figure className="mt-10">
              <PlaceholderImage label="[Context image showing building in landscape]" ratio="16:9" />
              <figcaption className="t-caption mt-3">The building in its setting.</figcaption>
            </figure>
          </section>

          {/* 2.5 Challenge */}
          <section className="mt-24" aria-labelledby="challenge-h">
            <SectionLabel index="03" label="The challenge" />
            <h2 id="challenge-h" className="sr-only">Design challenge</h2>
            <p className="max-w-2xl font-serif text-2xl font-light italic leading-snug text-graphite">
              {project.narrative.challenge}
            </p>
          </section>

          {/* 2.6 Response */}
          <section className="mt-24" aria-labelledby="response-h">
            <SectionLabel index="04" label="The response" />
            <h2 id="response-h" className="sr-only">Design response</h2>
            <div className="space-y-8">
              {project.narrative.response.map((para, i) => (
                <p key={i} className="max-w-measure font-serif text-lg leading-[1.65] text-charcoal">
                  {para}
                </p>
              ))}
            </div>
            <figure className="mt-10">
              <PlaceholderImage
                label="[Axonometric diagram — the architectural idea]"
                ratio="16:9"
                variant="drawing"
              />
              <figcaption className="t-caption mt-3">The idea, drawn once.</figcaption>
            </figure>
          </section>

          {/* 2.8 Material strategy */}
          <section className="mt-24" aria-labelledby="material-h">
            <SectionLabel index="05" label="Material" />
            <h2 id="material-h" className="sr-only">Material strategy</h2>
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {project.materials.map((m) => (
                <li key={m.id}>
                  <PlaceholderImage label={`[Material close-up — ${m.name.toLowerCase()}]`} ratio="1:1" variant="material" />
                  <p className="t-label mt-3 font-medium text-graphite">{m.name}</p>
                  <p className="t-caption mt-1">{m.note}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 2.9 Environment (optional) */}
          {project.environment && (
            <section className="mt-24" aria-labelledby="env-h">
              <SectionLabel index="06" label="Environment" />
              <h2 id="env-h" className="sr-only">Environmental strategy</h2>
              <p className="max-w-measure font-serif text-lg leading-[1.65] text-charcoal">
                {project.environment.text}
              </p>
              <dl className="mt-8 max-w-md">
                {project.environment.facts.map(([label, value]) => (
                  <div key={label} className="hairline-b grid grid-cols-2 gap-4 py-3">
                    <dt className="t-overline">{label}</dt>
                    <dd className="t-label text-charcoal">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </div>

      {/* 2.10 Gallery — full width */}
      <section className="site mt-32" aria-labelledby="gallery-h">
        <SectionLabel index="07" label="Gallery" />
        <h2 id="gallery-h" className="sr-only">Visual gallery</h2>
        <Gallery items={project.gallery} />
      </section>

      {/* 2.11 Drawing explorer */}
      <section className="site mt-32" aria-labelledby="drawings-h">
        <SectionLabel index="08" label="Drawings" />
        <h2 id="drawings-h" className="sr-only">Drawing explorer</h2>
        <Reveal>
          <DrawingExplorer drawings={project.drawings} />
        </Reveal>
      </section>

      {/* 2.12 Material explorer */}
      <section className="site mt-32" aria-labelledby="materials-h">
        <SectionLabel index="09" label="Materials" />
        <h2 id="materials-h" className="sr-only">Material explorer</h2>
        <MaterialExplorer materials={project.materials} />
      </section>

      {/* 2.13 Process */}
      <section className="site mt-32" aria-labelledby="process-h">
        <SectionLabel index="10" label="Process" />
        <h2 id="process-h" className="sr-only">Process</h2>
        <ul className="strip">
          {project.process.map((entry) => (
            <li key={entry.date} className="w-[80vw] shrink-0 snap-start sm:w-[420px]">
              <HHLImage src={entry.src} alt={entry.alt} label={entry.label} ratio="4:3" sizes="(max-width: 600px) 80vw, 420px" />
              <p className="t-overline mt-4">{entry.date}</p>
              <p className="mt-2 font-serif text-base leading-relaxed text-charcoal">{entry.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 2.14 Related */}
      <section className="site mt-32" aria-labelledby="related-h">
        <SectionLabel index="11" label="Related" />
        <h2 id="related-h" className="sr-only">Related projects</h2>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
          {project.related
            .map((slug) => getProject(slug))
            .filter(Boolean)
            .slice(0, 3)
            .map((p) => (
              <li key={p!.slug}>
                <ProjectCard project={p!} />
              </li>
            ))}
        </ul>
      </section>

      {/* 2.15 Press kit */}
      <div className="site mt-32">
        <PressKitBlock projectTitle={project.title} />
      </div>

      {/* 2.16 Next project */}
      <Link
        href={`/projects/${next.slug}`}
        className="group relative mt-32 block h-[40vh] w-full overflow-hidden lg:h-[56vh]"
        aria-label={`Next project: ${next.title}`}
      >
        <HHLImage fill src={next.heroImage} alt="" label={next.heroLabel} sizes="100vw" />
        <div className="absolute inset-0 bg-graphite/30 transition-colors duration-300 group-hover:bg-graphite/[0.18]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-warmwhite">
          <p className="t-overline text-warmwhite/70">Next project</p>
          <p className="u-link mt-3 font-serif text-3xl font-light lg:text-5xl">{next.title}</p>
          <p className="t-label mt-3 text-warmwhite/80">
            {metaLine(next.typology, next.place, next.year)}
          </p>
        </div>
      </Link>

      <nav className="site hairline-t flex items-center justify-between py-6" aria-label="Project navigation">
        <Link href="/projects" className="u-link t-label">All projects</Link>
        <a href="#top" className="u-link t-label">↑ Top</a>
      </nav>
    </article>
  );
}
