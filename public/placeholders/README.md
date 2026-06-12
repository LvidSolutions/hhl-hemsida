# Placeholder image system

This MVP ships with **no image assets by design**. Every image area on the
site renders a `<PlaceholderImage>` block: a flat field in the HHL palette
carrying a bracketed label such as `[Full-bleed exterior project photograph]`,
at the exact aspect ratio the final photograph or drawing must have.

## Replacing placeholders with real assets

1. Drop real images into this folder (or `/public/projects/<slug>/`).
2. In the data files (`/data/projects.ts` etc.), each gallery / hero /
   material entry has a `label` describing the required image. Add an
   `src` field alongside it.
3. Swap `<PlaceholderImage />` for `next/image` in the relevant component —
   the aspect-ratio and crop rules are already encoded in the placeholder
   props, so the layout will not move when real images arrive.

## Image requirements (from the design spec)

- Photography: AVIF/WebP, source >= 3200px wide for heroes, focal point per
  crop; never filtered or overlaid.
- Drawings: vector (SVG/PDF-derived) preferred; always shown contained on a
  white "paper" plate, never cover-cropped.
- Every image needs: caption, credit, and real alt text
  (photo = spatial description; drawing = organisational description).
