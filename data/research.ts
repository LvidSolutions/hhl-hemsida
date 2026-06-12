/** Sample research studies — replace with real studio research. */

export interface Study {
  slug: string;
  category: "Material study" | "Housing research" | "Typological research" | "Urban study";
  title: string;
  abstract: string;
  year: number;
  readingMin: number;
  imageLabel: string;
  imageKind: "material" | "drawing";
}

export const research: Study[] = [
  {
    slug: "the-load-bearing-facade",
    category: "Material study",
    title: "The Load-Bearing Facade",
    abstract:
      "Bonds, lintels and mortar: what fifteen years of masonry projects taught us about walls that carry their own weight.",
    year: 2025,
    readingMin: 12,
    imageLabel: "[Material close-up of brick — flat-on, raking light]",
    imageKind: "material",
  },
  {
    slug: "rooms-of-different-heights",
    category: "Typological research",
    title: "Rooms of Different Heights",
    abstract:
      "The Raumplan as a living tool: sectional studies of how interlocking rooms make small houses feel large.",
    year: 2024,
    readingMin: 9,
    imageLabel: "[Axonometric drawing — interlocking room volumes]",
    imageKind: "drawing",
  },
  {
    slug: "the-found-frame",
    category: "Urban study",
    title: "The Found Frame",
    abstract:
      "An inventory of mid-century industrial structures around Stockholm, and what each could hold next.",
    year: 2023,
    readingMin: 15,
    imageLabel: "[Survey drawing — industrial frame inventory]",
    imageKind: "drawing",
  },
];
