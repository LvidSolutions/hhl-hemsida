# HHL — Hermansson Hiller Lundberg Arkitekter

A static, deployable MVP of the HHL website: Next.js App Router + TypeScript +
Tailwind CSS, with the full HHL design system, six sample projects, and a
placeholder image system in place of real photography and drawings.

> Sample data notice: House Norrnäs and House Juniskär are real HHL projects
> (texts written from published descriptions — verify before launch). All
> other projects, people, awards, and contact details are **invented sample
> content**, marked `(sample)` in the data and UI.

## 1. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production check:

```bash
npm run build && npm start
```

Requires Node 18.17+.

## 2. Push to GitHub

```bash
git init
git add -A
git commit -m "HHL website MVP"
# create an empty repo on github.com first, then:
git remote add origin git@github.com:<your-username>/hhl-website.git
git branch -M main
git push -u origin main
```

## 3. Deploy to Vercel

Option A — dashboard (recommended):
1. Go to vercel.com → Add New → Project.
2. Import the GitHub repo. Vercel auto-detects Next.js; accept the defaults.
3. Deploy. Every push to `main` redeploys automatically.

Option B — CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

No environment variables, API keys, or databases are required.

## 4. Where to replace placeholder images

Every image area renders `components/PlaceholderImage.tsx` — a flat field in
the HHL palette with a bracketed label such as
`[Full-bleed exterior project photograph]` at the exact required aspect
ratio. See `public/placeholders/README.md` for the swap procedure and the
photography/drawing requirements. Because ratios and crop rules live in the
placeholder props, layouts will not move when real assets arrive.

## 5. Where to edit content

| Content | File |
|---|---|
| Projects (facts, narratives, galleries, drawings, materials, process) | `data/projects.ts` |
| Journal entries | `data/journal.ts` |
| Research studies | `data/research.ts` |
| Studio page texts, partners, timeline | `app/studio/page.tsx` |
| Careers texts and positions | `app/careers/page.tsx` |
| Contact details | `app/contact/page.tsx` and `components/Footer.tsx` |
| Design tokens (color, type, spacing) | `tailwind.config.ts` + `app/globals.css` |

Adding a project = adding one object to `data/projects.ts`; its page,
archive row, cards and metadata generate automatically.

## 6. Recommended next improvements

1. **Licensed fonts** — Suisse Int'l + Canela/Tiempos via `@font-face` in
   `globals.css` (family names are already first in the font stacks).
2. **Real imagery** — swap placeholders per §4; add `next/image` with focal
   points.
3. **Deep-zoom drawings** — replace the DrawingExplorer canvas with
   OpenSeadragon tiles; the rails, layers and zoom UI are already built.
4. **URL-addressable filters** — sync archive filter state to query params.
5. **Search** — `/` overlay with Algolia or a local index.
6. **CMS** — port `data/*.ts` to Sanity schemas (the types map one-to-one).
7. **Map & Timeline archive views**, per the design specification.
8. **Swedish locale** — `/sv` routes; the IA is multilingual-ready.

## Project structure

```
app/            pages (App Router) + global styles
components/     reusable UI (15 components)
data/           sample content (projects, journal, research)
lib/            helpers (aspect ratios, class joins, meta lines)
public/         placeholder system docs
```
