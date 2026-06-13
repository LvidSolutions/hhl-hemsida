/** Shared helpers. */

export type Ratio = "3:2" | "4:3" | "5:4" | "4:5" | "16:9" | "16:10" | "1:1" | "21:9" | "2:3";

/** CSS aspect-ratio value from a ratio token. */
export function aspect(ratio: Ratio): string {
  const [w, h] = ratio.split(":").map(Number);
  return `${w} / ${h}`;
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** "Housing · Stockholm · 2023" meta line. */
export function metaLine(...parts: Array<string | number | undefined>): string {
  return parts.filter(Boolean).join(" · ");
}
