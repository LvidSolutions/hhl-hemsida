import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "The HHL project archive.",
};

/**
 * Placeholder for now. The full project archive lives on the homepage as the
 * three-column portfolio (components/ProjectGallery.tsx, data/portfolio.ts);
 * the dedicated Projects experience is not yet decided, so this page stays
 * intentionally minimal.
 */
export default function ProjectsPage() {
  return (
    <div className="site flex min-h-[60svh] flex-col justify-center pb-32 pt-40 lg:pt-48">
      <h1 className="font-serif text-4xl font-light text-graphite lg:text-6xl">Projects</h1>
      <p className="t-label mt-5 max-w-measure text-greytext">
        Project archive coming soon. In the meantime, selected work is on the{" "}
        <a href="/" className="u-link text-charcoal">
          homepage
        </a>
        .
      </p>
    </div>
  );
}
