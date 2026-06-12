import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import { aspect, cx, type Ratio } from "@/lib/utils";

interface Props {
  /** Path under /public, e.g. "/hhl-images/hhl-01.jpg". Omit to render the placeholder. */
  src?: string;
  /** Real alt text. Required whenever src is set. */
  alt?: string;
  /** Bracketed asset description — used by the placeholder fallback. */
  label: string;
  ratio?: Ratio;
  variant?: "photo" | "drawing" | "material";
  /** Fill the parent (parent must be relative) instead of an aspect-ratio box. */
  fill?: boolean;
  /** Apply the breathe hover scale (use inside a .frame on a linked card). */
  breathe?: boolean;
  /** Priority-load (heroes only). */
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * The site's image element. Renders a real photograph when `src` is given,
 * and falls back to the PlaceholderImage system (same ratio, same label)
 * when it is not — so layouts never move as assets arrive or leave.
 */
export default function HHLImage({
  src,
  alt,
  label,
  ratio = "3:2",
  variant = "photo",
  fill = false,
  breathe = false,
  priority = false,
  sizes = "(max-width: 600px) 100vw, (max-width: 1024px) 90vw, 60vw",
  className,
}: Props) {
  if (!src) {
    return (
      <PlaceholderImage
        label={label}
        ratio={ratio}
        variant={variant}
        fill={fill}
        breathe={breathe}
        className={className}
      />
    );
  }

  const img = (
    <Image
      src={src}
      alt={alt ?? label.replace(/[\[\]]/g, "")}
      fill
      priority={priority}
      sizes={sizes}
      className={cx("object-cover", breathe && "breathe")}
    />
  );

  if (fill) {
    return <div className={cx("absolute inset-0 h-full w-full bg-concrete", className)}>{img}</div>;
  }

  return (
    <div
      style={{ aspectRatio: aspect(ratio) }}
      className={cx("relative w-full bg-concrete", className)}
    >
      {img}
    </div>
  );
}
