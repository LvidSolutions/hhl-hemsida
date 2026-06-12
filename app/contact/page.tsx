import type { Metadata } from "next";
import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata: Metadata = {
  title: "Contact",
  description: "HHL Arkitekter, Stockholm — address, contact and press.",
};

const ROWS: Array<[string, string, string?]> = [
  ["Visit", "Ragvaldsgatan 19B · 118 46 Stockholm"],
  ["Email", "info@hhl.se", "mailto:info@hhl.se"],
  ["Phone", "+46 8 000 00 00", "tel:+46800000000"],
  ["Press", "press@hhl.se", "mailto:press@hhl.se"],
  ["Applications", "work@hhl.se", "mailto:work@hhl.se"],
];

export default function ContactPage() {
  return (
    <div className="site pb-32 pt-32 lg:pt-44">
      <h1 className="font-serif text-4xl font-light text-graphite lg:text-6xl">Contact</h1>
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <dl className="lg:col-span-4">
          {ROWS.map(([label, value, href]) => (
            <div key={label} className="hairline-b py-4">
              <dt className="t-overline">{label}</dt>
              <dd className="t-label mt-1 text-charcoal">
                {href ? (
                  <a href={href} className="p-link">
                    {value}
                  </a>
                ) : (
                  value
                )}
                {label !== "Visit" && <span className="t-caption block">(sample)</span>}
              </dd>
            </div>
          ))}
          <div className="py-4">
            <dt className="t-overline">Elsewhere</dt>
            <dd className="t-label mt-1 flex gap-4">
              <a href="#" className="p-link">Instagram ↗</a>
              <a href="#" className="p-link">LinkedIn ↗</a>
            </dd>
          </div>
        </dl>
        <figure className="lg:col-span-7 lg:col-start-6">
          <PlaceholderImage label="[Custom greyscale map — studio location, Södermalm]" ratio="4:3" variant="drawing" />
          <figcaption className="t-caption mt-3">
            The studio sits on Södermalm. Replace with a custom-styled map (MapLibre) in Phase 2.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
