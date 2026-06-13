/**
 * Portfolio archive — the image-led set shown by the Sergison Bates-style
 * three-column presentation (components/ProjectGallery.tsx) on both the
 * homepage and the Projects page.
 *
 * Each entry is one photograph or visualisation. Several entries can belong
 * to the same project; `href` links a tile to its project page when one
 * exists, otherwise the tile opens the Projects archive. Images live in
 * /public/hhl-images/portfolio (converted from the studio's own files;
 * originals untouched). All tiles are either 5:4 (landscape) or 4:5
 * (portrait) so they pack into the columns with no cropping.
 */

export interface PortfolioItem {
  /** Project / image title shown in the hover caption. */
  title: string;
  /** Repo-relative image path under /public. */
  image: string;
  /** Real, descriptive alt text. */
  alt: string;
  /** Typology / category — also drives the Projects page category row. */
  type: string;
  /** Optional place, shown after the title when known. */
  location?: string;
  /** Optional project-page link; tiles without one open the archive. */
  href?: string;
  /** Display ratio — matches the file so nothing is cropped. */
  ratio: "5:4" | "4:5";
}

export const portfolio: PortfolioItem[] = [
  {
    title: "House Norrnäs",
    image: "/hhl-images/portfolio/norrnas-03.webp",
    alt: "House Norrnäs: a low glazed pavilion with slender dark mullions under a thin flat roof, in a clearing among pines",
    type: "Private house",
    location: "Stockholm archipelago",
    href: "/projects/house-norrnas",
    ratio: "5:4",
  },
  {
    title: "House Juniskär",
    image: "/hhl-images/portfolio/juniskar-01.webp",
    alt: "House Juniskär: two pitched brick volumes of different height on a garden slope",
    type: "Private house",
    location: "Sundsvall",
    href: "/projects/house-juniskar",
    ratio: "5:4",
  },
  {
    title: "Myttinge Pavilion",
    image: "/hhl-images/portfolio/myttinge-05.webp",
    alt: "Myttinge Pavilion: a black-stained timber pavilion set in oak woodland",
    type: "Pavilion",
    location: "Värmdö",
    href: "/projects/myttinge-pavilion",
    ratio: "4:5",
  },
  {
    title: "Skuru",
    image: "/hhl-images/portfolio/skuru-08.webp",
    alt: "Skuru: a pale concrete colonnade running along a public building",
    type: "Public",
    ratio: "5:4",
  },
  {
    title: "Sunnersta",
    image: "/hhl-images/portfolio/sunnersta-02.webp",
    alt: "Sunnersta: yellow brick housing set among pines and granite",
    type: "Housing",
    ratio: "5:4",
  },
  {
    title: "Kvarteret No. 4",
    image: "/hhl-images/portfolio/no4-04.webp",
    alt: "Kvarteret No. 4: a brick housing block with balconies overlooking the water",
    type: "Housing",
    ratio: "4:5",
  },
  {
    title: "Barkarby",
    image: "/hhl-images/portfolio/barkarby-12.webp",
    alt: "Barkarby: a street view of new housing blocks with a slender residential tower beyond",
    type: "Housing",
    ratio: "4:5",
  },
  {
    title: "Kalmar Stations",
    image: "/hhl-images/portfolio/kalmar-03.webp",
    alt: "Kalmar Stations: a civic building with a deep arcade along the platform",
    type: "Public",
    location: "Kalmar",
    href: "/projects/kalmar-stations",
    ratio: "5:4",
  },
  {
    title: "House Norrnäs",
    image: "/hhl-images/portfolio/norrnas-06.webp",
    alt: "House Norrnäs: a glazed corner of the pavilion reflecting the surrounding forest",
    type: "Private house",
    location: "Stockholm archipelago",
    href: "/projects/house-norrnas",
    ratio: "5:4",
  },
  {
    title: "House Juniskär",
    image: "/hhl-images/portfolio/juniskar-04.webp",
    alt: "House Juniskär: a white-panelled interior corridor lit from the end",
    type: "Private house",
    location: "Sundsvall",
    href: "/projects/house-juniskar",
    ratio: "5:4",
  },
  {
    title: "Myttinge Pavilion",
    image: "/hhl-images/portfolio/myttinge-12.webp",
    alt: "Myttinge Pavilion seen from above, its meadow roof returning the footprint to the forest",
    type: "Pavilion",
    location: "Värmdö",
    href: "/projects/myttinge-pavilion",
    ratio: "4:5",
  },
  {
    title: "Sunnersta",
    image: "/hhl-images/portfolio/sunnersta-12.webp",
    alt: "Sunnersta: a corner of the yellow brick housing under an autumn tree",
    type: "Housing",
    ratio: "4:5",
  },
  {
    title: "Kvarteret No. 4",
    image: "/hhl-images/portfolio/no4-11.webp",
    alt: "Kvarteret No. 4: a patterned facade screen in pale brick",
    type: "Housing",
    ratio: "5:4",
  },
  {
    title: "Barkarby",
    image: "/hhl-images/portfolio/barkarby-01.webp",
    alt: "Barkarby: a pale arcaded street facade",
    type: "Housing",
    ratio: "4:5",
  },
  {
    title: "Kalmar Stations",
    image: "/hhl-images/portfolio/kalmar-05.webp",
    alt: "Kalmar Stations: a facade of tall windows in pale board-marked concrete",
    type: "Public",
    location: "Kalmar",
    href: "/projects/kalmar-stations",
    ratio: "4:5",
  },
  {
    title: "House Norrnäs",
    image: "/hhl-images/portfolio/norrnas-12.webp",
    alt: "House Norrnäs seen across a meadow in morning fog, its flat roof hovering over glass walls",
    type: "Private house",
    location: "Stockholm archipelago",
    href: "/projects/house-norrnas",
    ratio: "5:4",
  },
  {
    title: "House Juniskär",
    image: "/hhl-images/portfolio/juniskar-05.webp",
    alt: "House Juniskär: the brick garden facade with deep window openings",
    type: "Private house",
    location: "Sundsvall",
    href: "/projects/house-juniskar",
    ratio: "5:4",
  },
  {
    title: "Skuru",
    image: "/hhl-images/portfolio/skuru-06.webp",
    alt: "Skuru: a white interior with a framed opening to the landscape",
    type: "Public",
    ratio: "5:4",
  },
];

/** Distinct categories for the Projects page filter row, in first-seen order. */
export const portfolioCategories = Array.from(new Set(portfolio.map((p) => p.type)));
