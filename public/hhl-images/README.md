# HHL images

Clean-named copies of the studio's supplied images. Mapping from original
filenames (kept for traceability):

| File | Original | Subject |
|---|---|---|
| hhl-01.jpg | 0043-HHL-NORRNAS-02 | House Norrnäs among pines, fog |
| hhl-02.jpg | 0085-HHL-NORRNAS-03 | House Norrnäs, frontal elevation |
| hhl-03.jpg | 0044-HHL-NORRNAS-12 | House Norrnäs, terrace in autumn |
| hhl-04.jpg | 0055-HHL-NO4-02 | Brick housing block, water view |
| hhl-05.jpg | 0017-tr-01 | Housing under construction |
| hhl-06.jpg | 0037-sp-01 | Green timber school building |
| hhl-07.jpg | 0071-sp-05 | Green veranda structure (portrait) |
| hhl-08.jpg | 0038-eld-01 | Red timber building |
| hhl-09.jpg | 0017-KC-03 | Kalmar Central visualisation |
| hhl-10.jpg | 0053-KC-02 | Kalmar Södra visualisation |
| hhl-11.jpg | 0001-KC-04 | Kalmar hall interior (portrait) |
| hhl-12.jpg | 0020-HHL-MYTTINGE-011 | Myttinge pavilion in woodland |
| hhl-13.jpg | 0048-Hermansson-Hiller-Lundberg | The three partners |
| hhl-14.jpg | 0044-AF-01 | Urban housing visualisation |

Note: 0053-KC-03 was a byte-identical duplicate of 0017-KC-03 and was skipped.
Supplied files are 720 px wide — fine for cards, soft for full-bleed heroes.
Replace with high-resolution versions (>= 3200 px for heroes) using the same
filenames; no code changes needed.

To swap an image on a project: edit `heroImage` / `thumbnailImage` / gallery
`src` in `data/projects.ts`. Remove the field to fall back to the labelled
placeholder block.
