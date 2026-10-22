# CCS v3 kit

One stylesheet and one script. Every v3 page is built from them. See every component live in `gallery.html`.

## Set-up

From a page in `v3/`:

```html
<link rel="stylesheet" href="kit/ccs.css">
...
<script src="palette.js"></script>
<script src="kit/ccs.js"></script>
```

Put both scripts at the end of `<body>`. `palette.js` must come first. `ccs.css` imports the four fonts itself. The script finds the marks at `marks/` relative to itself, so any page depth works. If a marks file is missing, it draws the refined master in that colourway from `palette.js`.

## Tokens

| Token | Use |
| --- | --- |
| `--stone` `#F3F1EC`, `--ink` `#0D1730`, `--ink-2` | Fixed colours. Everything else comes from `palette.js`. |
| `--f-d` `--f-t` `--f-w` `--f-m` | Schibsted Grotesk 800 display, Source Serif 4 text, Familjen Grotesk: Bold for the wordmark, Medium for lab names in lockups, nowhere else, IBM Plex Mono (data only). |
| `--s-hero` `--s-name` `--s-head` `--s-sub` `--s-lead` `--s-text` `--s-small` `--s-label` | Type scale. The first three are clamp display sizes. |
| `--sp-1` to `--sp-6` | 8, 16, 24, 40, 64, 96px. |
| `--m` `--pad` | Page margin and section padding. |
| `--g` `--S` `--cut` | Mark gap (24 to 48px), the 45 degree run (8vw, 64 to 160px), the 45 degree corner of slabs and buttons. |
| `--ease` | The one easing curve. |

Type classes: `.display` with `.hero-size`, `.name`, `.head` or `.sub`; `.lead`; `.mono` (figures and hex only); `.muted` (secondary text colour); `.tag` (14px label in the surface tint).

## Surfaces

- `data-colourway="<key>"` makes a dark surface: ground, a straight fade from the top-left, text colours and the lit fade, all from `palette.js`. Keys: `platform`, `ember`, `crimson-obsidian`, `royal-sapphire`, `seafoam-teal`, `neon-cyberpunk`, `cyber-emerald`, `saffron`. Platform is the static fallback.
- `data-surface="stone"` makes the light surface: Stone, Ink, and a vivid lit fade: the colourway's light-ground middle from `marks/manifest.json` (`lightOverrides`). Platform is #82AEFF to #A5CCFF.
- One colourway per surface. A surface nested in another is ignored, with a console warning. For a colour specimen inside a surface, use `data-swatch="<key>"`: it paints a tile without becoming a surface.
- Variables each surface sets: `--ground`, `--ground-hi`, `--fg`, `--fg-2`, `--tint`, `--lead`, `--accent`, `--lit-1`, `--lit-2`, `--lit-ink`, `--glow`.
- `.section` adds page margins and padding. Use it on every top-level band.

## The cut

Put `data-cut="left"` or `data-cut="right"` on a section. It cuts that section's top edge: a horizontal edge with one long 45 degree run rising to the right, at the left or right end. Alternate left and right down the page.

- The section is pulled up by `--S` and overlaps the one before. Nothing is drawn on the upper section. Do not give a cut section its own `::before`: the channel uses it.
- Between two dark surfaces, a Stone channel one mark gap wide runs along the 45 degree run only. The horizontal parts meet flush. `ccs.js` sets `data-chan` for this.
- Between Stone and a dark surface, the cut is clean: no channel.
- Two Stone surfaces are one section. Never cut them.
- `data-cut-side="auto"`, with or without `data-cut`, puts the run on the side opposite the section's first content block. Content on the left gets a right cut, and the reverse. `CCS.cutSides()` sets `data-cut`, and runs again on resize.
- `ccs.js` sets `data-cut-below` on the section above, which gives it room for the run. Override with your own `padding-bottom` if you need to.
- No corner flashes, triangles or extra shapes. The cut is the only boundary device.

## The step

`.step` on a heading, one child `<span>` per line. Each line steps right one line-height. Two or three lines. `<em>` inside takes the surface accent. On phones the step halves and lines may wrap. One stepped headline per screen.

## The light

`.lit` on one element per surface: the colourway's middle-panel fade, cut at 45 degrees on its leading edge, text in `--lit-ink`. `.lit-pad` gives it standard padding. Rule: one lit element per surface, holding the most important thing there. `ccs.js` warns in the console if a surface has two. Swatch tiles count as their own surface. On a dark surface the fade is the colourway's middle panel. On Stone it is the colourway's vivid light-ground middle (manifest `lightOverrides["1"]`) with Ink text, so the slab is the brightest thing there. Set `data-lead="<key>"` on the slab or its Stone surface for a lab. A `.lit` inside a swatch or a set-aside nested colourway follows that colourway. `CCS.lits()` applies this; without the manifest it falls back to the dark middle fade.

## The found C

`<div class="found-c" role="img" aria-label="..."></div>`. Size it by width or height. It renders the three panels in Ink from the masks, and the two Cs fill in the lead as it enters view. Add `data-lead="<key>"` for a lab lead. Filled and static under reduced motion. Once per page; `ccs.js` warns if there are more.

## Marks

`<span class="mark" data-mark="<key>" data-build="auto"></span>`, sized with `--mark-h` (default 120px) or a height.

- `data-build`: `auto` (default), `dark`, `light`, `flat`, `parts`, `small`, `mono`.
- `auto` picks `small` under 40px, `light` on Stone, `dark` otherwise. Whenever the build is `small` (under 40px or `data-build="small"`) and the nearest surface is Stone (or carries `data-ground="light"`), the kit loads the `smallLight` file, so the pale middle and crescents stay visible. This holds for the Frontier F too. `mono` picks white on dark grounds and Ink on Stone.
- Glow is added only on dark grounds at 64px and above, for the dark and parts builds, by CSS drop-shadow in the manifest glow colour. The glow scales with the mark: 3% of height up to 200px, then about 2% of width capped at 16px, with the colour fading to 60% (about .33 alpha) by 400px, so large marks keep crisp edges.
- Space at the cut: `ccs.js` (`CCS.fitCuts()`, re-run on resize) starts content on the open side at normal section padding. It then measures every text line and mark against the triangle and the channel, and pushes content down only by what truly overlaps, plus one gap. It checks the section above against the run the same way. Absolutely positioned content is not moved. Opt out with `data-cut-fit="off"`.
- `data-assemble` on a mark inlines the SVG and runs the assembly once. The parts build is the normal choice.
- Add `role="img"` and an `aria-label` when the mark carries meaning; otherwise leave it decorative.
- Wordmark lockup: `<a class="wordmark" href="index.html" aria-label="CCS home"><span class="mark" data-mark="platform"></span><span aria-hidden="true">CCS</span></a>`. `.wordmark-lg` is the 64px size.

## Motion

- `data-enter` slides an element in along the 45 degree axis once, as it enters view. On a `.section` it moves the children, never the section, so the cut stays put.
- `.nudge` slides an item 8px along the axis on hover and focus. Buttons do this already.
- All motion is off under `prefers-reduced-motion`.

## Header, footer, skip link

Copy the header from `index.html`: `.bar` holding a `.wordmark`, the `.menu` button (`aria-controls="site-nav"`, `aria-expanded`) and `<nav class="nav" id="site-nav">` with the eight links. `ccs.js` marks the current page with `aria-current` and runs the menu, which shows below 1180px; Escape closes it. Without JavaScript the links simply wrap. `.bar-flush` drops the bar's own margins inside a padded section. The skip link is `<a class="skip" href="#main">`. Footer: `<footer class="foot">` with a wordmark and links. Focus is a 3px outline in the current colour everywhere.

## Lists, buttons, forms, tables, chips

- `.btn`: the cut-corner button. Stone on dark, Ink on Stone; `.btn-ink` forces Ink, `.btn-sm` is smaller. Works on `<a>` and `<button>`.
- `.text-link`: a 44px display-weight link.
- `.link-list`: big display names (`.ln`) with a line of description (`.ld`). `.lit` on at most one item.
- `.list`: a plain bulleted list.
- `.field` with a `<label>`, an `.input` (input, select or textarea) and an optional `.hint`. Inputs are 48px tall, with a 3px Ink base.
- `.check`: a 44px checkbox row.
- `.table` inside `<div class="table-wrap" tabindex="0" role="region" aria-labelledby="...">`. No rules; the header is display type; put hex in `.mono` cells.
- `.chip`: code or hex in Plex Mono. Add `style="--c:#hex"` for a swatch. A `<button class="chip">` copies its text and announces it.

## Banned

Bordered cards, hairlines, radial glows, index numbering, mono kickers, em-dashes, emoji, invented statistics, corner flashes and decorative triangles.

## JavaScript API

`window.CCS` runs `init()` on load and then fires `ccs:ready` on `document`.

| Function | Does |
| --- | --- |
| `CCS.vars(key)` | The surface variables for a colourway, as an object. |
| `CCS.paint(root)` | Writes surface and swatch variables. |
| `CCS.cuts(root)` | Sets `data-chan` and `data-cut-below`. |
| `CCS.cutSides(root)` | Resolves `data-cut-side="auto"` into `data-cut`. |
| `CCS.lits(root)` | Sets each `.lit` fade for its surface and colourway. |
| `CCS.marks(root)`, `CCS.placeMark(el)` | Places marks. Call after adding marks to the page. |
| `CCS.foundC(root)` | Builds found Cs. |
| `CCS.enter(root)` | Observes new `data-enter` elements. |
| `CCS.assemble(el)` | Replays the assembly on a mark. |
| `CCS.manifest()` | Promise of `marks/manifest.json`. |

Content written by a page script before `ccs.js` loads is handled automatically. Content added later needs `CCS.paint`, `CCS.marks` and `CCS.enter` on its root.


## Dark-surface light and accent

- Platform's `.lit` on a dark surface uses its vivid middle (`#82AEFF` to `#A5CCFF`) with Ink text, not the silver fade. Other colourways keep their own saturated middle.
- The stepped headline's `<em>` accent on a dark surface is the colourway lead lightened toward white, hue kept, until it reaches 3:1 against both ends of the ground fade.
