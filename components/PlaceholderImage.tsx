import { aspect, cx, type Ratio } from "@/lib/utils";

type Variant = "photo" | "drawing" | "material";

interface Props {
  /** Bracketed label describing the required asset, e.g. "[Ground floor plan drawing]" */
  label: string;
  ratio?: Ratio;
  variant?: Variant;
  className?: string;
  /** Fill the parent (absolute inset-0) instead of using an aspect ratio box. */
  fill?: boolean;
  /** Apply the breathe hover scale (use inside a .frame on a linked card). */
  breathe?: boolean;
}

/**
 * The placeholder image system. Renders a flat field in the HHL palette at
 * the exact aspect ratio of the final asset, carrying the bracketed label.
 * Photographs: concrete field. Drawings: paper plate with hairline border
 * and sheet corner marks. Materials: stone field.
 * Swap for next/image when real assets arrive — the layout will not move.
 */
export default function PlaceholderImage({
  label,
  ratio = "3:2",
  variant = "photo",
  className,
  fill = false,
  breathe = false,
}: Props) {
  const surface =
    variant === "drawing"
      ? "bg-paper border border-[var(--hairline)]"
      : variant === "material"
        ? "bg-stone"
        : "bg-concrete";

  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label.replace(/[\[\]]/g, "")}`}
      style={fill ? undefined : { aspectRatio: aspect(ratio) }}
      className={cx(
        "relative flex items-center justify-center",
        fill && "absolute inset-0 h-full w-full",
        surface,
        breathe && "breathe",
        className
      )}
    >
      {variant === "drawing" && (
        <>
          <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-mist" />
          <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-mist" />
        </>
      )}
      <span className="t-caption max-w-[80%] select-none text-center">{label}</span>
    </div>
  );
}
