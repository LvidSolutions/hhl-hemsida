/** Sample journal entries — replace with real studio texts. */

export interface JournalEntry {
  slug: string;
  category: "Essay" | "Studio note" | "Lecture" | "Construction update";
  date: string;
  headline: string;
  standfirst: string;
  readingMin: number;
}

export const journal: JournalEntry[] = [
  {
    slug: "on-doubleness",
    category: "Essay",
    date: "May 2026",
    headline: "On Doubleness",
    standfirst:
      "A house can be formal toward the garden and informal toward the street. Notes on the Janus-character of buildings, from Loos to Juniskär.",
    readingMin: 14,
  },
  {
    slug: "the-wall-that-carries",
    category: "Essay",
    date: "February 2026",
    headline: "The Wall That Carries",
    standfirst:
      "Load-bearing masonry asks for patience from everyone — client, mason, architect. What it gives back is a century.",
    readingMin: 11,
  },
  {
    slug: "site-note-uppsala",
    category: "Construction update",
    date: "January 2026",
    headline: "Site note: the frame at Uppsala",
    standfirst:
      "The glulam frame went up in nine days of clear cold. A school's silhouette appears before its rooms do.",
    readingMin: 4,
  },
];
