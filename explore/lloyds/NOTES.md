# Lloyds family exploration

An exploration page, not part of the toolkit and not linked from the main nav.

## Rule

The geometry is the refined CCS master, read unchanged from `../../marks` by `gen-lloyds.mjs`. The script only recolours the five parts with flat fills. The Lloyds horse is never traced, redrawn or modified. Lloyds files sit in `lloyds-official/` exactly as supplied, for comparison only. GT Ultra is not loaded.

Regenerate with `node gen-lloyds.mjs` from this folder.

## Variants

Parts in order: upper, middle and lower panel, left and right C.

- A. Black, green Cs (recommended). White ground: panels #0B0B0C, Cs #006A4D. Black and deep green grounds: panels #FFFFFF, Cs #11B67A. Lloyds green ground: panels #FFFFFF, Cs #6CF479. Small cut: same two tones.
- B. Green light. All #0B0B0C, middle #006A4D on white; middle #11B67A on black and #6CF479 on Lloyds green, both with white panels. Small cut on white: middle lifts to #11B67A.
- C. On green. #11B67A tile, panels #0B0B0C, Cs #024731. Small cut: one tone, black on the tile.
- D. Campaign. #6CF479 tile, mark #0B0B0C. One tone at every size.
- Mono black #0B0B0C, mono white #FFFFFF.
- Frontier F: variant A only.

Rule: panels black on white and light grounds; white on dark and coloured grounds, including Lloyds green. With white panels on #006A4D, A's Cs are lime #6CF479: CIEDE2000 29.5 from the white panels and 42.9 from the ground. #11B67A scores 34.5 and 27.0, so it sits closer to the ground. Earlier, with black panels, lime was dropped as too campaign; the white panels change that. C (#11B67A tile) and D (#6CF479 tile) keep black: each carries its own light tile.

## Type

Fraunces 900, SOFT 100, WONK 0, opsz 144 is the headline face. Young Serif and Roboto Serif 900 were the other candidates. Body stays Source Serif 4.

## Clear space

x is one panel width, about a fifth of the mark's height. 1x all round. Beside the Lloyds logo: 1.5x either side of a 1px #323233 rule as tall as the mark.

## LBG colours

Tones are verbatim from `uploads/ccs-sharepoint-canvas/project/AssetSpec.dc.html` ("LBG theme colours and tonal alternatives"). Flat fills, same geometry, small cut at 32px and below. Grounds: white and LBG navy #15223E.

- E. Navy, gold Cs (lead LBG candidate). White: panels #243B6B, middle #7C89A6, Cs #C98900. Navy ground: panels #ACB5C7, middle #F5EAD1, Cs #DFB866. Small cut: same tones.
- F. Crimson primary. White: panels #CE143D, middle #E2728B, Cs #770C23. Navy ground: panels #ECA6B5, middle #F6D5DC, Cs #E2728B. Small cut: same tones.
- G. Navy with crimson Cs and a gold middle was tried and dropped. Three hues in one small mark, crimson and gold competing, and it breaks the spec's single-highlight rule for gold.

The spec reserves gold for "Next" and "being built" states and lists navy for "the Cs of the mark". E uses gold as the mark's one highlight, which stretches that note; F or a navy-Cs reading is the strict alternative.

A or E: A sits better beside the horse and on anything branded Lloyds Bank. E suits group-level LBG material built on the LBG theme, where the horse is absent.

## LBG palette against v3

The LBG palette closely matches v3 (`../../palette.js`).

- LBG navy #243B6B and #1C2E53 sit near v3 Platform (Midnight Navy and Silver) deep #14244A and inkDeep #203258. LBG #15223E is near Platform ground #0D1730; Platform groundHi is #233A6E, almost LBG #243B6B.
- LBG crimson #CE143D sits near the v3 Crimson colourway (Imperial Crimson and Obsidian), whose panel tones run #D7263D, #FF4D6D, #A01A2C and light #C0002F. LBG #A11030 is exactly v3 Crimson's crescent dark #A11030.

## Family palette

Proposal page: `family.html`. Regenerate with `node gen-family.mjs` (writes `marks/family/` and `family-data.js`). Same rule as A: panels black on white and light grounds; white on dark and coloured grounds, including Lloyds green. The role colour lives only in the two Cs, flat fills, geometry unchanged.

### Source shortlist

From the Lloyds site stylesheet (usage count, typical context):

- Neutrals: #000000 (953, icon fills), #FFFFFF (867), #F1F1F1 (85, body and light-grey grounds), #C9C9C9 (76, accordion rules), #767676 (38, table text, progress rules), #323233 (20, `.bg-charcoal`), #ADADAD (7, nav rules).
- Greens: #006A4D (42, heritage green, buttons and focus), #11B67A (40, `.bg-everyday-green`), #024731 (36, racing green, tooltips and grids), #0BE248 (35, social hover), #C7FFC6 (17, `.bg-calm-green`), #6CF479 (15, `.bg-vibrant-green`), #F6F9F5 (1, success tint).
- Limes: #649C00 (10, form valid state).
- Reds: #DB0F30 (27, required and invalid form states), #FFF6F5 (1, critical tint).
- Oranges: #DC5309 (2, warning border and icon), #FFB16A (2, `.bg-autumn-orange` promo boxes), #FFF7E8 (2, warning tint).
- Purples and lilacs: #A19FFF (2, `.bg-lavender` promo boxes).
- Pinks: #F5B2F2 (2, `.bg-meadow-pink` promo boxes).
- Teals: #9DE7DE (2, `.bg-mist-blue` promo boxes).
- Blues: #0D5595 (2, information border and icon), #F8F8FF (2, information tint).
- Yellows and golds: none on the site.

From the LBG theme in AssetSpec: crimson #F6D5DC to #770C23 (primary; Automated Operations colourway; #470C1E Lab title ground), navy #D8DCE4 to #15223E (structure), gold #F5EAD1 to #754F00 ("Next" and "being built" only), status pairs. Image grounds: #0E2F5B (tools), #004C53 (insights), #133A17 (24x7), #2A0712 (Lab).

### Picks

A tonal step keeps the source hue and sets OKLCH lightness (L); chroma is kept, or scaled by a stated factor. Delta E is CIEDE2000.

| Role | Pick | Cs light | Cs dark | Ground | Tint | Alternative |
| --- | --- | --- | --- | --- | --- | --- |
| Platform | A, decided | #006A4D | #11B67A | #024731 | #C7FFC6 | none |
| Lab 1 | Warning and autumn orange, site | #DC5309 | #FFB16A | #451401 (step L .27) | #FFF7E8 | #DC5309 on both grounds |
| Lab 2 | LBG crimson | #CE143D | #E2728B | #470C1E | #F6D5DC | Site error red #DB0F30, #FD6566 dark |
| Lab 3 | Information blue, site | #0D5595 | #80BCFD (step L .78, x1.2) | #0E2F5B (LBG) | #F8F8FF | LBG navy #243B6B, #7C89A6 dark |
| Lab 4 | Mist blue, site | #24A096 (step L .64, x1.4) | #9DE7DE | #004C53 (LBG) | #D7FFF9 (step L .97) | Mist at source chroma, #529B93 |
| Frontier | Meadow pink, site | #B640B6 (step L .58, x1.8) | #F5B2F2 | #2A0C2A (step L .22, x.6) | #FFF0FE | Lavender #7773CE, #A19FFF dark |
| Spare 1 | Valid green, site | #649C00 | #B7F475 (step L .9) | #162801 (step L .25) | #F6F9F5 | Site greys #767676 on #000000 |
| Spare 2 | LBG slate | #7C89A6 | #65718D (step L .55) | #15223E | #D8DCE4 | LBG gold #C98900, flagged |

Results. Every light-ground Cs is 3:1 or more on white. Every dark-ground Cs is delta E 20 or more from the white panels and 3:1 or more on its ground. The 8x8 matrix passes: closest light pair 21.6, closest dark pair 21.4.

Forced choices:

- Spare 2: gold would match Saffron best, but LBG reserves it for status, and orange belongs to Lab 1. It moves to the LBG slate. The gold alternative is flagged, and #C98900 is 2.97:1 on white.
- Frontier: lavender sits within 16 of Lab 3 blue, so the pick moves to the pink end of the old violet. Lavender stays as the alternative, and only works if Lab 3 changes.
- Lab 4: the site's only teal is a pastel. At source chroma it sits within 22 of heritage green, so the pick carries chroma x1.4.
- Lab 3 alternative: LBG navy #243B6B is 1.8:1 on the black panels, so the Cs blur into them at 16px.

### Cs on Lloyds green

White panels on #006A4D. Each role keeps its dark-ground Cs when it is 20 or more from both white and the green (CIEDE2000); every pick passes, so no step was needed. Figures in brackets: from white, from green. All hold at 16px in the family test.

### Full colour

No black. Outer panels the role colour, middle a lighter tint, Cs a deeper tone, all flat. Values are source swatches or OKLCH steps of the role colour; `gen-family.mjs` searches and prints every check. Targets on white, all met: middle and Cs 15 or more from the panels, panels 30 or more from white. On dark grounds and Lloyds green the panels and middle lift. Platform on white uses #006A4D, #11B67A and a step of racing green: #024731 itself is only 11.2 from #006A4D, so it is stepped to L .31 (#013A28) to clear 15. Files: `marks/family/*-fc-light|dark|green.svg`, with small cuts.

| Role | Cs on Lloyds green | Full colour on white (panels / middle / Cs) | On its dark ground | On Lloyds green |
| --- | --- | --- | --- | --- |
| Platform | #6CF479 (29.5, 42.9) | #006A4D / #11B67A / #013A28 | #6CF479 / #DCFFEF / #3D9273 on #024731 | #6CF479 / #DCFFEF / #11B67A |
| Lab 1 | #FFB16A (27.8, 53.1) | #DC5309 / #FFB16A / #903301 | #FFB16A / #FFF7E8 / #DC5309 on #451401 | #F96E32 / #FFF7E8 / #662100 |
| Lab 2 | #E2728B (36, 62.6) | #CE143D / #E2728B / #71031C | #E2728B / #F6D5DC / #B90634 on #470C1E | #E2728B / #FFF1F1 / #71031C |
| Lab 3 | #80BCFD (26.3, 46.1) | #0D5595 / #80BCFD / #00203F | #80BCFD / #F8F8FF / #3374B7 on #0E2F5B | #5596DB / #F8F8FF / #003B6E |
| Lab 4 | #9DE7DE (21.6, 41) | #24A096 / #9DE7DE / #006D65 | #4EC0B5 / #D7FFF9 / #08837A on #004C53 | #5DCDC2 / #D7FFF9 / #07948A |
| Frontier | #F5B2F2 (26.3, 54.6) | #B640B6 / #F5B2F2 / #720673 | #EC74EB / #FFF0FE / #9B229C on #2A0C2A | #DE67DD / #FFF0FE / #620263 |
| Spare 1 | #B7F475 (27.6, 45.7) | #649C00 / #B7F475 / #436B01 | #AAE767 / #F6F9F5 / #538107 on #162801 | #B7F475 / #F6F9F5 / #649C00 |
| Spare 2 | #65718D (40.7, 29.3) | #7C89A6 / #B9C7E6 / #4F5A75 | #919EBC / #F1F5FF / #57637E on #15223E | #8592AF / #F1F5FF / #2F3A53 |

### Skew

Large marks had a fixed CSS height with `max-width:100%`. In narrow cells (index variants at 900 to 1280px wide) the width clamped and the box squashed, by up to 26% for the C and D tiles. Large marks now size with `height:auto` and `max-height`, so the browser keeps the ratio. The SVG viewBoxes match the refined parts exactly.
