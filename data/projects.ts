/**
 * Sample project data.
 *
 * House Norrnäs and House Juniskär are real HHL projects; their texts are
 * written from published descriptions and must be verified by the studio
 * before launch. Kalmar Stations and Myttinge Pavilion are real HHL projects
 * represented here with the studio's own images but with SHORT SAMPLE TEXTS
 * ONLY — all facts marked (sample) must be confirmed. Kvarteret Tegel and
 * Timber School Uppsala remain invented placeholder projects; the HHL images
 * attached to them are indicative pairings, noted in captions.
 *
 * Images live in /public/hhl-images (see that folder's README).
 */

export type Register =
  | "photo"
  | "plan"
  | "section"
  | "elevation"
  | "diagram"
  | "model"
  | "sketch"
  | "construction"
  | "material";

export type Status = "Built" | "Under construction" | "Competition" | "Unbuilt";

export interface GalleryItem {
  register: Register;
  label: string; // bracketed placeholder label, e.g. "[Ground floor plan drawing]"
  caption: string;
  ratio?: "3:2" | "4:3" | "4:5" | "16:9" | "1:1";
  src?: string; // real image path under /public — placeholder renders when absent
  alt?: string; // required whenever src is set
}

export interface DrawingLayer {
  id: "annotations" | "structure" | "circulation" | "program";
  label: string;
}

export interface Drawing {
  id: string;
  title: string;
  type: "Plan" | "Section" | "Elevation" | "Detail";
  scale: string;
  label: string;
  layers: DrawingLayer[];
}

export interface Material {
  id: string;
  name: string;
  note: string;
}

export interface ProcessEntry {
  date: string;
  label: string;
  note: string;
  src?: string;
  alt?: string;
}

export interface Project {
  slug: string;
  title: string;
  typology: string;
  place: string;
  location: string;
  year: number;
  status: Status;
  size: string;
  client?: string;
  team?: string;
  collaborators?: string;
  photography?: string;
  awards?: string[];
  publications?: string[];
  ideaLine: string;
  summary: string;
  heroLabel: string;
  heroImage?: string; // real hero image path — placeholder renders when absent
  heroAlt?: string;
  thumbnailImage?: string; // card image; falls back to heroImage, then placeholder
  featured: boolean;
  sample?: boolean; // true = project facts are placeholders
  materialsTags: string[];
  narrative: {
    context: string;
    challenge: string;
    response: string[];
  };
  environment?: { text: string; facts: Array<[string, string]> };
  materials: Material[];
  gallery: GalleryItem[];
  drawings: Drawing[];
  process: ProcessEntry[];
  related: string[];
}

const standardLayers: DrawingLayer[] = [
  { id: "annotations", label: "Annotations" },
  { id: "structure", label: "Structure" },
  { id: "circulation", label: "Circulation" },
  { id: "program", label: "Program" },
];

export const projects: Project[] = [
  {
    slug: "house-norrnas",
    title: "House Norrnäs",
    typology: "Private house",
    place: "Stockholm archipelago",
    location: "Stockholm archipelago, Sweden",
    year: 2014,
    status: "Built",
    size: "~200 m²",
    photography: "Mikael Olsson",
    publications: ["Divisare", "Architizer"],
    ideaLine: "Three volumes establish a topography of tension with a dramatic site.",
    summary:
      "The program of a single dwelling is divided across three building volumes set on varied terrain. Where Swedish tradition subordinates the house to the landscape, Norrnäs seeks a relationship of tension: the main building, in a sense, dominates its surroundings. A stereotomic platform anchors each volume to the ground; light tectonic frames catch the space above — a primordial hut, in the manner of Semper. The restraint of the interiors lets the landscape's variation become the architecture's richness.",
    heroLabel: "[Full-bleed exterior photograph — the house among pines, morning fog]",
    heroImage: "/hhl-images/hhl-01.jpg",
    heroAlt: "House Norrnäs seen through tall pines in morning fog, its flat roof hovering over fully glazed walls on a granite outcrop",
    thumbnailImage: "/hhl-images/hhl-02.jpg",
    featured: true,
    materialsTags: ["Concrete", "Timber"],
    narrative: {
      context:
        "The site falls steeply through pine and bare granite toward the water, with great variation across a short distance. The buildings respond to this variation in differentiated ways — meeting rock, meadow and shore on their own terms — so that the terrain, rather than ornament, gives each room its character.",
      challenge:
        "How does a private house take command of a dramatic landscape — without violence toward it?",
      response: [
        "The buildings are developed as a kind of primordial hut, with a clear distinction between stereotomic platforms and space-catching tectonic frames. Each volume holds a different part of the dwelling; together they constitute the house.",
        "The distribution sets up a topographical relationship to the place — moving between volumes is moving through the site, and the landscape becomes a room of the plan.",
      ],
    },
    environment: {
      text: "The house is built for long life and low intervention: a heavy base that will not move, a frame that can be repaired member by member, and rooms that do not depend on mechanical comfort to be habitable in three seasons.",
      facts: [
        ["Structure", "Concrete platform, timber frame"],
        ["Designed lifespan", "Generations, not cycles"],
      ],
    },
    materials: [
      {
        id: "concrete",
        name: "In-situ concrete",
        note: "Cast platforms anchor each volume and take the colour of the rock they stand on.",
      },
      {
        id: "timber",
        name: "Timber frame",
        note: "The space-catching structure, left legible inside and out.",
      },
    ],
    gallery: [
      {
        register: "photo",
        label: "[Exterior photograph — frontal elevation in fog]",
        caption: "The main volume from the meadow: platform, frame, roof.",
        ratio: "3:2",
        src: "/hhl-images/hhl-02.jpg",
        alt: "Frontal view of House Norrnäs in fog: a glazed pavilion with slender dark mullions under a thin flat roof, on a low concrete platform in a meadow",
      },
      {
        register: "photo",
        label: "[Exterior photograph — terrace and second volume]",
        caption: "The platform runs out under the terrace; a second volume beyond.",
        ratio: "3:2",
        src: "/hhl-images/hhl-03.jpg",
        alt: "Corner of House Norrnäs with sliding glass walls open to a timber terrace, an autumn maple overhead and a second pavilion in the fog beyond",
      },
      { register: "plan", label: "[Site plan drawing, 1:1000]", caption: "Site plan, 1:1000. The volumes follow the fall of the rock." },
      { register: "section", label: "[Longitudinal section]", caption: "Section through the main volume, 1:100." },
      {
        register: "photo",
        label: "[Context photograph — the house among pines]",
        caption: "The landscape kept at arm's length.",
        ratio: "3:2",
        src: "/hhl-images/hhl-01.jpg",
        alt: "House Norrnäs partially hidden behind pine trunks on a foggy slope of moss and granite",
      },
      { register: "model", label: "[Model photograph on neutral ground]", caption: "Working model, 1:200." },
      { register: "sketch", label: "[Concept sketch — platform and frame]", caption: "Early sketch: platform and frame." },
      { register: "construction", label: "[Construction process photograph]", caption: "The platforms cast, before frame erection." },
    ],
    drawings: [
      { id: "plan-00", title: "Plan — Entrance level", type: "Plan", scale: "1:100", label: "[Ground floor plan drawing]", layers: standardLayers },
      { id: "section-aa", title: "Section A–A", type: "Section", scale: "1:100", label: "[Longitudinal section]", layers: standardLayers.slice(0, 3) },
      { id: "elev-s", title: "Elevation, south", type: "Elevation", scale: "1:100", label: "[South elevation drawing]", layers: [standardLayers[0]] },
    ],
    process: [
      { date: "Autumn 2012", label: "[Construction photograph — cast platforms in snow]", note: "The platforms are cast first; for a winter, the site is three stone tables in the snow." },
      { date: "Spring 2013", label: "[Construction photograph — timber frames rising]", note: "The frames rise in a week. The house's silhouette appears before its rooms do." },
      {
        date: "Summer 2014",
        label: "[Photograph — completed house in the landscape]",
        note: "Completed. The landscape begins its slow return to the walls.",
        src: "/hhl-images/hhl-03.jpg",
        alt: "The completed house with terrace doors open, autumn leaves above",
      },
    ],
    related: ["house-juniskar", "myttinge-pavilion", "kvarteret-tegel"],
  },
  {
    slug: "house-juniskar",
    title: "House Juniskär",
    typology: "Private house",
    place: "Sundsvall",
    location: "Juniskär, Sundsvall, Sweden",
    year: 2016,
    status: "Built",
    size: "~180 m²",
    photography: "Mikael Olsson",
    publications: ["Archello"],
    ideaLine: "A Raumplan dwelling with a Janus-character: formal to the garden, plastic to the entrance.",
    summary:
      "House Juniskär is conceived as a reflection on the theme of the domestic. Two clear volumes of different proportion and height adapt the house to its sloping site and allow an interior variety of interlocking spaces — a Raumplan. The house has a kind of doubleness, a Janus-character: formal and symmetrical toward the garden, informal and plastic toward the entrance. Inside, the spatial sequence turns horizontally and vertically around the large stair that connects all levels.",
    heroLabel: "[Full-bleed exterior photograph — two volumes on a sloping site]",
    featured: true,
    materialsTags: ["Timber", "Panel"],
    narrative: {
      context:
        "The site slopes toward the water south of Sundsvall. The two volumes take the fall of the ground into the section of the house, so that the slope is not a problem solved but a quality kept.",
      challenge:
        "Can one house be two things at once — composed toward the garden, informal toward arrival — without losing its unity?",
      response: [
        "The interior spaces have many different proportions, are painted in slightly different hues, and are lined with white panelling — all of which plays with the idea of the domestic while the stair binds the sequence together.",
        "The doubleness is not a contradiction but the house's character: each face answers its own condition, and the section reconciles them.",
      ],
    },
    materials: [
      { id: "timber", name: "Timber structure", note: "A light frame over a concrete ground floor slab." },
      { id: "panel", name: "White interior panelling", note: "Rooms lined in painted panel, each a slightly different hue." },
    ],
    gallery: [
      { register: "photo", label: "[Exterior photograph — formal garden facade]", caption: "The formal face toward the garden.", ratio: "3:2" },
      { register: "photo", label: "[Exterior photograph — informal entrance side]", caption: "The plastic face toward arrival.", ratio: "4:3" },
      { register: "plan", label: "[Ground floor plan drawing]", caption: "Entrance level plan, 1:100." },
      { register: "section", label: "[Section through the stair]", caption: "Section through the stair, 1:100. The sequence turns around it." },
      { register: "photo", label: "[Interior photograph — stair hall]", caption: "The stair connects all levels.", ratio: "4:5" },
      { register: "diagram", label: "[Raumplan diagram — interlocking volumes]", caption: "Interlocking rooms of differing height." },
    ],
    drawings: [
      { id: "plan-00", title: "Plan — Entrance level", type: "Plan", scale: "1:100", label: "[Ground floor plan drawing]", layers: standardLayers },
      { id: "plan-01", title: "Plan — Upper level", type: "Plan", scale: "1:100", label: "[Upper floor plan drawing]", layers: standardLayers },
      { id: "section-aa", title: "Section A–A", type: "Section", scale: "1:100", label: "[Section through the stair]", layers: standardLayers.slice(0, 3) },
    ],
    process: [
      { date: "2015", label: "[Construction photograph — frame on slab]", note: "The frame rises over the slab; the two heights are already legible." },
      { date: "2016", label: "[Photograph — completed house]", note: "Completed. Ten years on, it will be photographed again." },
    ],
    related: ["house-norrnas", "myttinge-pavilion", "timber-school-uppsala"],
  },
  {
    slug: "kvarteret-tegel",
    title: "Kvarteret Tegel Housing",
    typology: "Housing",
    place: "Stockholm",
    location: "Stockholm, Sweden",
    year: 2023,
    status: "Built",
    size: "4 600 m²",
    client: "Sample client AB",
    photography: "TBC",
    awards: ["Shortlisted, regional masonry award (sample)"],
    ideaLine: "A load-bearing brick facade orders forty-two apartments around a planted court.",
    summary:
      "Forty-two apartments are organised around a planted courtyard behind a load-bearing brick facade. The wall does the work: deep reveals shade the rooms, the bond carries the rhythm of the street, and the masonry will outlive every interior it protects. The plan privileges corner light and a generous shared ground floor toward the street.",
    heroLabel: "[Full-bleed exterior photograph — brick housing block]",
    heroImage: "/hhl-images/hhl-04.jpg",
    heroAlt: "A long brick housing block with regular window bays and dark rooftop volumes, trees in front and an archipelago waterscape behind",
    featured: true,
    sample: true,
    materialsTags: ["Brick"],
    narrative: {
      context:
        "An urban infill block completing a perimeter in a growing district, with a noisy street on one side and a quiet interior on the other.",
      challenge: "How does new housing earn its place on an old street — for a century, not a cycle?",
      response: [
        "A load-bearing facade in brick: structure, weather skin and street face in one wall. The apartments borrow the wall's depth for window seats and shaded openings.",
        "The court is planted as a shared room; circulation is daylit and generous enough to meet a neighbour in.",
      ],
    },
    environment: {
      text: "Load-bearing masonry trades embodied carbon today for a service life measured in centuries; the energy strategy is conventional and robust rather than experimental.",
      facts: [
        ["Facade", "Load-bearing brick, lime mortar"],
        ["Heating", "District heating"],
      ],
    },
    materials: [
      { id: "brick", name: "Brick", note: "Load-bearing, in a bond that carries the street's rhythm." },
      { id: "concrete", name: "Concrete", note: "Floor slabs spanning between masonry walls." },
    ],
    gallery: [
      {
        register: "photo",
        label: "[Exterior photograph — the block from above]",
        caption: "The block toward the water. (Indicative HHL image — sample project pairing.)",
        ratio: "3:2",
        src: "/hhl-images/hhl-04.jpg",
        alt: "Brick housing block with dark recessed roof storeys, seen over treetops with islands and water beyond",
      },
      {
        register: "diagram",
        label: "[Competition-stage visualisation]",
        caption: "Competition-stage visualisation. (Indicative HHL image — sample project pairing.)",
        ratio: "3:2",
        src: "/hhl-images/hhl-14.jpg",
        alt: "Rendered street scene of new housing blocks in pale red and green tones with café seating under trees and a slender residential tower beyond",
      },
      { register: "plan", label: "[Typical floor plan drawing]", caption: "Typical plan, 1:200." },
      { register: "elevation", label: "[Street elevation drawing]", caption: "Street elevation, 1:200." },
      { register: "material", label: "[Material close-up of brick]", caption: "The bond, raking light." },
      {
        register: "construction",
        label: "[Construction process photograph]",
        caption: "On site. (Indicative HHL image — sample project pairing.)",
        ratio: "3:2",
        src: "/hhl-images/hhl-05.jpg",
        alt: "New housing blocks with bold pastel triangle-patterned facades behind construction fencing at dusk",
      },
    ],
    drawings: [
      { id: "plan-typ", title: "Plan — Typical level", type: "Plan", scale: "1:200", label: "[Typical floor plan drawing]", layers: standardLayers },
      { id: "section-aa", title: "Section A–A", type: "Section", scale: "1:200", label: "[Cross section through court]", layers: standardLayers.slice(0, 3) },
      { id: "detail-w", title: "Window reveal", type: "Detail", scale: "1:10", label: "[Window reveal detail drawing]", layers: [standardLayers[0]] },
    ],
    process: [
      { date: "2021", label: "[Construction photograph — foundations]", note: "Groundworks in the old block." },
      {
        date: "2022",
        label: "[Construction photograph — facades rising]",
        note: "Facades rise behind the hoarding.",
        src: "/hhl-images/hhl-05.jpg",
        alt: "Housing under construction behind site fencing, facade pattern already visible",
      },
      { date: "2023", label: "[Photograph — completed street facade]", note: "Completed; first residents in autumn." },
    ],
    related: ["house-norrnas", "kalmar-stations", "timber-school-uppsala"],
  },
  {
    slug: "timber-school-uppsala",
    title: "Timber School Uppsala",
    typology: "Education",
    place: "Uppsala",
    location: "Uppsala, Sweden",
    year: 2027,
    status: "Under construction",
    size: "6 800 m²",
    client: "Municipality of Uppsala (sample)",
    ideaLine: "Twelve classrooms around a top-lit central hall, in exposed timber.",
    summary:
      "An invited-competition win, now on site: twelve classrooms are organised around a top-lit central hall that serves as assembly room, lunch hall and winter playground at once. The structure is glue-laminated timber, exposed throughout, so the building teaches its own construction. Completion is expected in 2027.",
    heroLabel: "[Exterior photograph — timber school building]",
    heroImage: "/hhl-images/hhl-06.jpg",
    heroAlt: "A green-painted timber school building with a low pyramidal sheet-metal roof and a colonnaded veranda, young trees and benches in the yard",
    featured: true,
    sample: true,
    materialsTags: ["Timber"],
    narrative: {
      context:
        "A growing district at the city's edge, where the school must serve as the neighbourhood's first public building.",
      challenge: "Can a school's structure be its best teaching aid?",
      response: [
        "The timber frame is left exposed everywhere a hand or an eye can reach it; junctions are legible, and the hall's roof structure is the building's lesson in span and light.",
        "Classrooms pair around shared project rooms, so the plan can be re-divided as pedagogy changes.",
      ],
    },
    materials: [
      { id: "timber", name: "Glulam timber", note: "Frame and roof structure, exposed throughout." },
    ],
    gallery: [
      {
        register: "photo",
        label: "[Exterior photograph — entrance facade]",
        caption: "The veranda gathers the yard. (Indicative HHL image — sample project pairing.)",
        ratio: "3:2",
        src: "/hhl-images/hhl-06.jpg",
        alt: "Green timber school pavilion with a continuous veranda on slender posts under a hipped metal roof",
      },
      {
        register: "photo",
        label: "[Photograph — veranda structure]",
        caption: "The structure, legible at hand height. (Indicative HHL image — sample project pairing.)",
        ratio: "4:5",
        src: "/hhl-images/hhl-07.jpg",
        alt: "Under the green veranda: exposed painted timber beams and posts on concrete footings, benches along a glazed facade",
      },
      {
        register: "photo",
        label: "[Photograph — neighbouring building]",
        caption: "Sibling building on the site. (Indicative HHL image — sample project pairing.)",
        ratio: "3:2",
        src: "/hhl-images/hhl-08.jpg",
        alt: "A falu-red gabled timber building with cream vertical panels and two diamond-shaped windows, green and yellow siblings beyond",
      },
      { register: "plan", label: "[Ground floor plan drawing]", caption: "Ground floor plan, 1:400." },
      { register: "section", label: "[Section through central hall]", caption: "Section through the hall, 1:200." },
      { register: "model", label: "[Model photograph — hall interior]", caption: "Hall study model, 1:50." },
    ],
    drawings: [
      { id: "plan-00", title: "Plan — Ground level", type: "Plan", scale: "1:400", label: "[Ground floor plan drawing]", layers: standardLayers },
      { id: "section-hall", title: "Section — Hall", type: "Section", scale: "1:200", label: "[Section through central hall]", layers: standardLayers.slice(0, 3) },
    ],
    process: [
      { date: "2024", label: "[Competition board image]", note: "Invited competition won in spring 2024." },
      { date: "2026", label: "[Construction photograph — frame]", note: "The frame stands; the lanterns follow." },
    ],
    related: ["kalmar-stations", "house-juniskar", "kvarteret-tegel"],
  },
  {
    slug: "myttinge-pavilion",
    title: "Myttinge Pavilion",
    typology: "Pavilion",
    place: "Värmdö",
    location: "Myttinge, Värmdö, Sweden",
    year: 2015,
    status: "Built",
    size: "Project facts to be confirmed (sample)",
    ideaLine: "A black timber pavilion with a meadow roof, set down lightly in oak woodland.",
    summary:
      "A single rectangular pavilion stands in a clearing of oak and pine. Black-stained vertical timber alternates with full-height glazing in a steady rhythm; a meadow grows on the roof, returning the footprint to the forest. The building's facts are deliberately few — a clear plan, one material gesture, and a roofline held just below the canopy. (Sample text written to the studio's image; to be replaced by HHL's own project description.)",
    heroLabel: "[Exterior photograph — black pavilion in oak woodland]",
    heroImage: "/hhl-images/hhl-12.jpg",
    heroAlt: "A low rectangular pavilion of black vertical timber and full-height glazing with a green meadow roof, seen from above in a forest clearing",
    featured: false,
    sample: true,
    materialsTags: ["Timber"],
    narrative: {
      context: "A clearing in oak woodland on Värmdö, reached on a gravel track.",
      challenge: "How little can a building add to a forest — and still be unmistakably a building?",
      response: [
        "One volume, one rhythm, one roof. The black facade recedes into the trunks around it; the meadow roof gives back the ground the pavilion took.",
      ],
    },
    materials: [
      { id: "timber", name: "Black-stained timber", note: "Vertical boarding in a steady alternation with glazing." },
    ],
    gallery: [
      {
        register: "photo",
        label: "[Exterior photograph — pavilion from above]",
        caption: "The pavilion in its clearing.",
        ratio: "3:2",
        src: "/hhl-images/hhl-12.jpg",
        alt: "Black timber pavilion with green roof in a gravel clearing surrounded by oaks and pines",
      },
      { register: "plan", label: "[Plan drawing]", caption: "Plan, 1:100." },
      { register: "section", label: "[Cross section]", caption: "Section, 1:50." },
      { register: "material", label: "[Material close-up — black-stained boarding]", caption: "The boarding, close." },
    ],
    drawings: [
      { id: "plan-00", title: "Plan", type: "Plan", scale: "1:100", label: "[Plan drawing]", layers: standardLayers },
      { id: "section-aa", title: "Section A–A", type: "Section", scale: "1:50", label: "[Cross section]", layers: standardLayers.slice(0, 3) },
    ],
    process: [
      { date: "2015", label: "[Construction photograph]", note: "Frame, skin, meadow — in that order. (Sample note.)" },
    ],
    related: ["house-norrnas", "house-juniskar", "timber-school-uppsala"],
  },
  {
    slug: "kalmar-stations",
    title: "Kalmar Stations",
    typology: "Public",
    place: "Kalmar",
    location: "Kalmar, Sweden",
    year: 2026,
    status: "Competition",
    size: "Project facts to be confirmed (sample)",
    ideaLine: "Two station buildings as civic rooms: arches, lamellas, and names held high.",
    summary:
      "A proposal for Kalmar's stations — Central and Södra — as a pair of civic buildings sharing one constructive language: load-bearing arches, deep lamella screens against the southern light, and the station's name carried on the parapet in open letters. Inside, a single top-lit hall does what station halls have always done: gathers, shades, and lets people watch for their train. (Sample text written to the studio's images; project facts and status to be confirmed by HHL.)",
    heroLabel: "[Visualisation — Kalmar Central station building]",
    heroImage: "/hhl-images/hhl-09.jpg",
    heroAlt: "Rendered view of a long pale station building with a deep horizontal lamella facade, a round window in its end gable, and KALMAR CENTRAL in open letters on the parapet",
    thumbnailImage: "/hhl-images/hhl-11.jpg",
    featured: true,
    sample: true,
    materialsTags: ["Concrete"],
    narrative: {
      context:
        "Two sites along the same line: the central station in the city's grid, the southern stop at its edge — one architecture, two scales.",
      challenge: "Can a pair of stations share one language and still answer two different places?",
      response: [
        "The same elements — arch, lamella, parapet, hall — are recomposed at each site. Central is long and urban; Södra is compact and gateway-like. The family resemblance does the wayfinding before any sign does.",
      ],
    },
    materials: [
      { id: "concrete", name: "Concrete", note: "Arches and lamella screens in pale, board-marked concrete." },
    ],
    gallery: [
      {
        register: "photo",
        label: "[Visualisation — Kalmar Central exterior]",
        caption: "Kalmar Central: the long civic front.",
        ratio: "3:2",
        src: "/hhl-images/hhl-09.jpg",
        alt: "Long station building with horizontal lamella facade, round gable window and rooftop lettering reading Kalmar Central",
      },
      {
        register: "photo",
        label: "[Visualisation — station hall interior]",
        caption: "The hall: arches, skylights, and the southern light filtered.",
        ratio: "4:5",
        src: "/hhl-images/hhl-11.jpg",
        alt: "Interior visualisation of a tall arched concrete hall with skylights and angled lamella screens casting striped daylight, people walking and sitting on benches",
      },
      {
        register: "photo",
        label: "[Visualisation — Kalmar Södra exterior]",
        caption: "Kalmar Södra: the same language at the city's edge.",
        ratio: "3:2",
        src: "/hhl-images/hhl-10.jpg",
        alt: "Rendered corner view of a stepped pale building with arched openings, lamella bands and KALMAR SÖDRA in open letters, café chairs under the arcade",
      },
      { register: "plan", label: "[Ground floor plan drawing]", caption: "Plan, Kalmar Central, 1:400." },
      { register: "section", label: "[Section through the hall]", caption: "Section through the hall, 1:200." },
    ],
    drawings: [
      { id: "plan-00", title: "Plan — Central, ground level", type: "Plan", scale: "1:400", label: "[Ground floor plan drawing]", layers: standardLayers },
      { id: "section-hall", title: "Section — Hall", type: "Section", scale: "1:200", label: "[Section through the hall]", layers: standardLayers.slice(0, 3) },
    ],
    process: [
      { date: "2025", label: "[Competition board image]", note: "Competition phase. (Sample note — status to be confirmed.)" },
    ],
    related: ["timber-school-uppsala", "kvarteret-tegel", "myttinge-pavilion"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const typologies = Array.from(new Set(projects.map((p) => p.typology)));
export const statuses: Status[] = ["Built", "Under construction", "Competition", "Unbuilt"];
export const materialTags = Array.from(new Set(projects.flatMap((p) => p.materialsTags)));
