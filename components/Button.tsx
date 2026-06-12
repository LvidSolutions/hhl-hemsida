import Link from "next/link";
import { cx } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "inverted";
  children: ReactNode;
  meta?: string; // e.g. file size on a download button
  className?: string;
  type?: "button" | "submit";
}

/** One shape: rectangle, no radius, 48px tall. */
export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  meta,
  className,
  type = "button",
}: Props) {
  const base =
    "inline-flex h-12 items-center justify-center gap-3 px-6 font-sans text-sm tracking-label transition-colors duration-200 ease-architectural";
  const styles =
    variant === "primary"
      ? "bg-graphite text-warmwhite hover:bg-black"
      : variant === "secondary"
        ? "border border-charcoal text-charcoal hover:bg-warmwhite hover:border-graphite"
        : "border border-warmwhite/60 text-warmwhite hover:border-warmwhite";

  const inner = (
    <>
      <span>{children}</span>
      {meta && <span className="text-xs tracking-caption opacity-60">{meta}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cx(base, styles, className)}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cx(base, styles, className)}>
      {inner}
    </button>
  );
}
