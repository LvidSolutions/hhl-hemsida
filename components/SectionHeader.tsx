import Link from "next/link";

interface Props {
  index: string; // sheet number, e.g. "02"
  label: string;
  link?: { label: string; href: string };
}

/**
 * The section "sheet number" device: sections are numbered like sheets in a
 * drawing set — index at the margin, label, optional link at the far edge.
 */
export default function SectionHeader({ index, label, link }: Props) {
  return (
    <div className="mb-10 grid grid-cols-12 items-baseline gap-4 sm:mb-12">
      <span aria-hidden className="t-caption col-span-2 sm:col-span-1">
        {index} —
      </span>
      <h2 className="t-label col-span-10 font-medium sm:col-span-8">{label}</h2>
      {link && (
        <div className="col-span-12 mt-2 sm:col-span-3 sm:mt-0 sm:text-right">
          <Link href={link.href} className="u-link t-label text-greytext hover:text-charcoal">
            {link.label} <span aria-hidden>→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
