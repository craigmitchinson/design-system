# Design System: CCS v3

## 1. Overview

CCS is one mark and four moves. Three panels form an S. Two crescents turn it. The Cs are Colleague and Customer, and the S between them is Service. The panels slide along their own 45 degree axis, and the Cs are the space the panels leave. The light middle panel is the focal point and is always the brightest part of the mark. That is where work passes from one of us to the next.

The whole graphic language is four moves: the cut, the step, the light and the found C. One colourway per surface. Two working typefaces. One motion. Nothing else decorates.

Hero line: "Hand it on." Lead: "The CCS brand toolkit. Everything you need to carry the mark well, for every colleague who passes work on."

## 2. Colors

### Fixed colours

| Name | Hex | Use |
| --- | --- | --- |
| Stone | `#F3F1EC` | The light surface. The channel between two dark surfaces. Buttons on dark. |
| Ink | `#0D1730` | Text on Stone. Buttons on Stone. Also the Platform ground. |
| Ink 2 | `#3B4763` | Secondary text and tags on Stone (`--ink-2`). |
| White | `#FFFFFF` | Input fields on Stone only. |

Everything else comes from `palette.js` (dark grounds) and `marks/manifest.json` (light grounds).

### Roles

One role owns one colourway. Never mix colourways inside a mark. Use Platform when several labs appear together. A lab's colourway is for its own materials only. Emerald and Saffron are spares, held for future labs and not for use today.

| Colourway | Key | Full name | Role |
| --- | --- | --- | --- |
| Platform | `platform` | Midnight Navy & Silver | Platform, all labs together |
| Ember | `ember` | Ember | Lab 1 · 24x7 Services |
| Crimson | `crimson-obsidian` | Imperial Crimson & Obsidian | Lab 2 · Automated Operations |
| Sapphire | `royal-sapphire` | Royal Sapphire & Ice Cobalt | Lab 3 · Colleague Services |
| Seafoam | `seafoam-teal` | Seafoam & Teal (toned) | Lab 4 · Data & Insights |
| Frontier | `neon-cyberpunk` | Neon Cyberpunk Violet | Frontier, the innovation forum |
| Emerald | `cyber-emerald` | Cyber Emerald & Mint | Spare |
| Saffron | `saffron` | Saffron | Spare |

### Dark-ground values (palette.js)

Fades run top left to bottom right. The lower panel takes the upper panel's fade turned 180 degrees. The right crescent mirrors the left. Crescents fade to the deepest shade of the role colour, never to black. The surface ground is a straight fade from `ground` to `groundHi`.

| Colourway | Lead | Panel fade | Middle | Crescent | Ground | Ground hi | Print ink |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Platform | `#5B82D1` | `#5B82D1` to `#8AA9E3` | `#D4DCEA` to `#F4F7FB` | `#E6ECF5` to `#2B4A86` | `#0D1730` | `#233A6E` | `#203258` |
| Ember | `#E4571E` | `#E4571E` to `#F47A3C` | `#FF9F5A` to `#FFC394` | `#FF8A4C` to `#8F3A0E` | `#260C03` | `#662209` | `#5C2008` |
| Crimson | `#D7263D` | `#D7263D` to `#FF4D6D` | `#FF4D6D` to `#FF85A1` | `#FF2A4B` to `#A11030` | `#30050C` | `#680E1B` | `#500D16` |
| Sapphire | `#2563EB` | `#2563EB` to `#3B82F6` | `#60A5FA` to `#93C5FD` | `#3B82F6` to `#1D3F9E` | `#0A0F1B` | `#142A67` | `#0F276C` |
| Seafoam | `#14C8B4` | `#14C8B4` to `#1AA6D6` | `#5FD0DA` to `#9FE3EA` | `#2FD8C2` to `#0A6E8C` | `#04213E` | `#074E79` | `#054054` |
| Frontier | `#7C3AED` | `#7C3AED` to `#A78BFA` | `#F0ABFC` to `#F472B6` | `#F0ABFC` to `#4F2391` | `#140431` | `#330F70` | `#2E115B` |
| Emerald | `#10B981` | `#10B981` to `#34D399` | `#6EE7B7` to `#A7F3D0` | `#34D399` to `#047857` | `#011D16` | `#034735` | `#023C2C` |
| Saffron | `#D98E04` | `#D98E04` to `#F2A900` | `#FFC23D` to `#FFD978` | `#FFC23D` to `#8A5A00` | `#261700` | `#613C00` | `#543500` |

Glow colours (dark grounds only): Platform `rgba(170, 196, 240, 0.55)`, Ember `rgba(255, 122, 61, 0.6)`, Crimson `rgba(255, 42, 75, 0.65)`, Sapphire `rgba(59, 130, 246, 0.6)`, Seafoam `rgba(47, 216, 194, 0.5)`, Frontier `rgba(240, 171, 252, 0.65)`, Emerald `rgba(52, 211, 153, 0.6)`, Saffron `rgba(242, 169, 0, 0.6)`.

### Light-ground values (v3, manifest lightOverrides)

On Stone the panels keep the dark panel fade. The middle and crescent take these values. For Platform, Ember and Frontier they supersede the `palette.js` light override (`supersedesPalette: true`). The middle is also the `.lit` fade on a Stone surface.

| Colourway | Middle (lit on Stone) | Crescent |
| --- | --- | --- |
| Platform | `#82AEFF` to `#A5CCFF` | `#5D90DD` to `#2B4A86` |
| Ember | `#FF8717` to `#FFAE6B` | `#D15B03` to `#8F3A0E` |
| Crimson | `#FF4D6D` to `#FF85A1` | `#C0002F` to `#A11030` |
| Sapphire | `#58A3FF` to `#8EC3FF` | `#0054CA` to `#1D3F9E` |
| Seafoam | `#07D5E3` to `#3CEFFF` | `#069F8E` to `#0A6E8C` |
| Frontier | `#F2A9FF` to `#FF65B9` | `#CB43E2` to `#4F2391` |
| Emerald | `#08EFAF` to `#6DFFC5` | `#01AA77` to `#047857` |
| Saffron | `#FFBE1F` to `#FFD567` | `#C08C01` to `#8A5A00` |

Light-rule targets (CIEDE2000 on `#F3F1EC`): middle vs ground 25, middle vs panels 12, crescents vs panels 15, middle chroma at least the dark middle chroma. Hue is held. Status in the manifest: these values are used by the light builds and are not yet in `palette.js`.

### Small-cut tones

The small cut uses flat fills, no gradients: panels in the lead, middle in the lit tone, crescents in the deep tone. Targets: 20 between adjacent pieces, 30 mark vs ground. The flat build uses the dark-ground small tones on the full geometry.

| Colourway | Dark: panels / middle / crescents | Light (on Stone): panels / middle / crescents |
| --- | --- | --- |
| Platform | `#5B82D1` / `#F4F7FB` / `#E6ECF5` | `#5B82D1` / `#AACFFF` / `#21458E` |
| Ember | `#E4571E` / `#FFC394` / `#FF9864` | `#E4571E` / `#FFB171` / `#873200` |
| Crimson | `#D7263D` / `#FF85A1` / `#FF676E` | `#D7263D` / `#FF86A1` / `#6E001B` |
| Sapphire | `#2563EB` / `#93C5FD` / `#4F91FF` | `#2563EB` / `#8DC2FE` / `#0518A6` |
| Seafoam | `#14C8B4` / `#D6FBFF` / `#A9FFEF` | `#14C8B4` / `#B1F7FF` / `#0A6E8C` |
| Frontier | `#7C3AED` / `#F0ABFC` / `#EDA8F9` | `#7C3AED` / `#F2A8FF` / `#3A0075` |
| Emerald | `#10B981` / `#C1FFE2` / `#66F9BD` | `#10B981` / `#BBFFDF` / `#037656` |
| Saffron | `#D98E04` / `#FFE197` / `#FFCB63` | `#D98E04` / `#FFDC85` / `#8A5A00` |

### Surface rule

- One colourway per surface. A surface nested inside another is ignored, with a console warning.
- `data-colourway="<key>"` makes a dark surface. `data-surface="stone"` makes the light one.
- On Stone the accent is `#3F64B0` and the lit text is Ink.
- On dark, the stepped headline's `<em>` accent is the lead lightened toward white, hue kept, until it reaches 3:1 against both ends of the ground fade.

## 3. Typography

| Role | Family | Weight | Token |
| --- | --- | --- | --- |
| Display | Schibsted Grotesk | 800 (700 for labels and nav) | `--f-d` |
| Text | Source Serif 4 | 400, 600, italic 400 | `--f-t` |
| Wordmark and lab names | Familjen Grotesk: Bold for the wordmark, Medium for lab names in lockups, nowhere else | Bold 700 tracked +10; Medium 500 | `--f-w` |
| Data only | IBM Plex Mono | 400, 500, tabular figures | `--f-m` |

### Scale

| Token | Value | Line height | Tracking |
| --- | --- | --- | --- |
| `--s-hero` | `clamp(72px, 11vw, 200px)` | 0.95 | -0.035em |
| `--s-name` | `clamp(40px, 6.4vw, 120px)` | 0.95 | -0.035em |
| `--s-head` | `clamp(30px, 5.2vw, 96px)` | 0.95 | -0.035em |
| `--s-sub` | `clamp(26px, 2.6vw, 40px)` | 1.02 | -0.025em |
| `--s-lead` | `clamp(19px, 1rem + .6vw, 25px)` | 1.45 | normal |
| `--s-text` | `clamp(17px, .85rem + .4vw, 20px)` | 1.55 | normal |
| `--s-small` | 15px | inherited | normal |
| `--s-label` | 14px (`.tag`, Schibsted 700) | inherited | 0.01em |

Other set sizes: link-list names `clamp(34px, 4.8vw, 84px)`; wordmark 28px (`.wordmark-lg` 64px); nav 16px, 20px in the open menu.

## 4. Layout

- Spacing: `--sp-1` to `--sp-6` are 8, 16, 24, 40, 64, 96px.
- Page margin `--m`: `clamp(20px, 6vw, 112px)`. Section padding `--pad`: `clamp(64px, 10vh, 140px)`. Use `.section` on every top-level band.
- Mark gap `--g`: `clamp(24px, 2.6vw, 48px)`. Cut run `--S`: `clamp(64px, 8vw, 160px)`. Slab and button corner `--cut`: `clamp(22px, 2.6vw, 48px)`.
- Measure: running text and lists 34em; form fields 28em; link-list descriptions 24em.
- Breakpoints: 1180px (menu button appears), 860px (link list goes to one column), 560px (step halves, lines may wrap).
- Tap targets: 44px minimum on links, buttons, menu, chips and checkboxes. Inputs 48px tall. Open-menu links 48px.
- Focus: a 3px outline in the current colour everywhere.

## 5. The four moves

### The cut

- `data-cut="left"` or `"right"` on a section cuts its top edge: a horizontal edge with one long 45 degree run rising to the right, at the left or right end.
- The run is `--S`: about 8vw, clamped 64 to 160px. The section is pulled up by `--S` and overlaps the one before.
- Alternate left and right down the page. `data-cut-side="auto"` puts the run opposite the first content block.
- Between two dark surfaces, a Stone channel one mark gap wide runs along the 45 degree run only. The horizontal parts meet flush.
- Between Stone and a dark surface, the cut is clean: no channel.
- Two Stone surfaces are one section. Never cut them.
- Do not give a cut section its own `::before`. The channel uses it.
- No corner flashes, triangles or extra shapes. The cut is the only boundary device.

### The step

- `.step` on a heading, one child `<span>` per line. Each line steps right one line-height. Two or three lines.
- `<em>` inside takes the surface accent.
- On phones the step halves and lines may wrap.
- One stepped headline per screen.

### The light

- `.lit` on one element per surface, holding the most important thing there. `ccs.js` warns if a surface has two. Swatch tiles count as their own surface.
- It is the colourway's middle-panel fade, cut at 45 degrees on its leading edge, text in `--lit-ink`. `.lit-pad` gives standard padding.
- On a dark surface the fade is the colourway's dark middle.
- Platform exception: on dark, Platform's `.lit` uses its vivid middle `#82AEFF` to `#A5CCFF` with Ink text, not the silver fade. Other colourways keep their own saturated middle.
- On Stone it is the vivid light-ground middle (`lightOverrides["1"]`) with Ink text, so the slab is the brightest thing there. `data-lead="<key>"` sets a lab.
- No radial glows. Never light a second thing.

### The found C

- `<div class="found-c" role="img" aria-label="...">`. The three panels render in Ink. The two Cs fill in the lead as it enters view.
- `data-lead="<key>"` for a lab lead. Filled and static under reduced motion.
- At most once per page. `ccs.js` warns if there are more.
- Never show a crescent on its own, or repeat it as a pattern, a bullet or a frame.

## 6. The mark

### Construction (refined)

| Measure | Rule | Master units |
| --- | --- | --- |
| Panel width | W, the unit for everything | 1315.59 |
| Gap | g = 0.18W, one value everywhere | 236.81 |
| Crescent, widest | 0.54W | 710.4 |
| One radius | R = W + g/2, panel ends and crescent outsides | 1434 |
| Crescent inside | R + g, on the panel-end centre Q | 1670.8 |
| Panel-end offset | g/2 along the channel | 118.4 |
| Caps | Quarter circle of radius W | 1315.59 |
| Angle | 45 degrees, all three panels parallel | 45 |
| The turn | 180 degrees about O: the lower half is the upper half turned | 2458.66, 3003.59 |
| Crescent tips | End on the true circle intersection, no flat | 0 |
| Proportion | Width to height 0.83 | 5137.8 x 6158.4 |

- Full viewBox `-110.24 -75.58 5137.8 6158.35`. Small viewBox `-438.77 -373.27 5794.85 6753.72`.
- Crescent share of the ink: 26.8%.
- Changed from v2: gap 0.163W to 0.18W; crescent 0.483W to 0.54W; tips from a 38.8-unit flat to no flat; height 6007.2 to 6158.4.
- Small cut: gap 0.34W (447.3), crescent 0.62W, proportion 0.86. Gap at 16px 1.06px (full build 0.57px); at 32px 2.12px (full 1.15px). Crescent at 16px 1.93px (full 1.69px).

### Builds

Files live in `directions/synthesis/marks/`.

| Build | File pattern | Use |
| --- | --- | --- |
| Dark | `refined-<key>-dark.svg` | Primary. Dark screens: slides, app splash, hero. |
| Light | `refined-<key>-light.svg` | Documents, email, web on Stone or white. |
| Flat | `refined-<key>-flat.svg` | Dark-ground small tones on the full geometry. |
| Parts | `refined-<key>-parts.svg` | Separable pieces, for assembly and motion. |
| Small | `refined-small-<key>.svg` | Under 40px on dark: favicons, Teams, tabs. |
| Small light | `refined-small-<key>-light.svg` | Under 40px on Stone or a light ground. |
| Mono white | `refined-mono-white.svg` | Photography, foil, single-colour print, on dark. |
| Mono ink | `refined-mono-ink.svg` | The same, on light. |

Print on light: one ink, the colourway's print ink. There is no outline build. Never outline the crescents or any other part.

### Which build

- `data-build="auto"` picks `small` under 40px, `light` on Stone, `dark` otherwise.
- Whenever the build is small and the nearest surface is Stone (or `data-ground="light"`), use the small-light file. This holds for the Frontier F too.
- `mono` picks white on dark and Ink on Stone.

### Glow

- Dark grounds only, from 64px tall, for the dark and parts builds. CSS drop-shadow in the manifest glow colour.
- Radius 3% of height up to 200px, then about 2%, never more than 16px.
- Above 200px the strength eases down to 60% (about .33 alpha) by 400px, so large marks keep crisp edges.
- No glow on light grounds, in print, on merchandise or on the small cut.

### Lockups, clear space, sizes

- Wordmark: CCS in Familjen Grotesk Bold, tracked +10. The mark sits to the left of the word or above it.
- Horizontal is the primary lockup. Stacked is for square spaces, the word centred under the mark. Lab lockup: the mark in the lab's colourway, the lab name under the word.
- Clear space: half the mark's width on every side.
- Minimum sizes: 40px is the smallest full build. 16px is the smallest small cut.

### The Frontier F

Frontier, the innovation forum, uses its own F. Same family: same panel width, gap, crescent and fades. The four labs always use the S.

| Measure | Full build | Small cut |
| --- | --- | --- |
| Gap | 0.18W, 236.81 | 0.34W, 447.3 |
| Crescent, widest | 0.54W, 710.42 | 0.62W, 815.67 |
| Panel-end radius | W, 1315.59 | W |
| Crescent inside | 1552.39 | Flat fills |
| Crescent tip | 123.12 flat | 89.51 flat |
| Proportion | 0.64, 0.93 of the S height | 0.64 |

The same rules hold: clear space of half its width, glow on dark from 64px, the small cut under 40px, never rotated or recoloured. Files: `refined-frontier-f-<build>.svg`, plus `refined-frontier-f-mono-white.svg` and `-mono-ink.svg`.

## 7. Components

| Class or attribute | Does |
| --- | --- |
| `data-colourway="<key>"` / `data-surface="stone"` | Dark or light surface. Platform is the static fallback. |
| `data-swatch="<key>"` | A colour tile that is not a surface. |
| `.section` | Page margins and padding. Every top-level band. |
| `data-cut`, `data-cut-side="auto"`, `data-cut-fit="off"` | The cut, its side, and opting out of content fitting. |
| `.display` + `.hero-size` `.name` `.head` `.sub` | Display type. |
| `.lead` `.mono` `.muted` `.tag` | Lead text, data, secondary colour, 14px label. |
| `.step` | Stepped headline. |
| `.lit` `.lit-pad` | The light. |
| `.found-c` | The found C. |
| `.mark` `data-mark` `data-build` `--mark-h` `data-assemble` | The mark (default 120px). |
| `.wordmark` `.wordmark-lg` | Lockup at 28px or 64px. |
| `.bar` `.menu` `.nav` `.bar-flush` `.foot` `.skip` | Header, menu below 1180px, footer, skip link. |
| `.btn` `.btn-ink` `.btn-sm` | Cut-corner button. Stone on dark, Ink on Stone. |
| `.text-link` `.nudge` | 44px display link. 8px hover slide. |
| `.link-list` (`.ln`, `.ld`) | Big names with a line of description. `.lit` on at most one item. |
| `.list` | Plain bulleted list. |
| `.field` `.input` `.hint` `.check` | Fields: 48px, 3px Ink base, cut corner. 44px checkbox row. |
| `.table-wrap` `.table` | No rules. Display header. Hex in `.mono` cells. |
| `.chip`, `style="--c:#hex"` | Plex Mono code or hex, optional swatch. A button chip copies. |

Banned: bordered cards, hairlines, radial glows, index numbering, mono kickers, em-dashes, emoji, invented statistics, corner flashes and decorative triangles.

## 8. Motion

- One motion: a slide along the mark's 45 degree axis. Easing `cubic-bezier(.2,.7,.1,1)`.
- Hero assemble: the mark assembles once on load. The outer panels slide in along their axis and the crescents fade up in the space they leave, in about 1.2 seconds. The Motion page's Assemble scene is a separate, longer piece at 2.9 seconds.
- `data-enter`: sections slide in by 24px along the axis as they enter view. On a `.section` the children move, never the section.
- `.nudge` and buttons: 8px up and to the right on hover and focus.
- Pages never spin or bounce. Turning scenes are for video, launches and loading states.
- Reduced motion: everything is static and assembled. Motion scenes play only on press.

Scenes in `v3/motion.html`:

| Group | Scenes |
| --- | --- |
| Openers | Construct 3.6 s, Blueprint 4.9 s, Assemble 2.9 s, Sketch 3.4 s, Drop 2.4 s, Outro 2.6 s |
| Loops | Turn 1.6 s, Orbit 3.5 s, Heartbeat 1.6 s, Thinking 2.4 s, Sheen 2 s (per cycle) |
| Interface | Confirm 1.5 s, Hover 2.4 s a cycle |
| Showcase | Family 5.5 s, Colourways 1.4 s each, Reel about 1 min |

## 9. Voice

We write about people passing work between them, to colleagues, as you and we.

- Say one thing. Short declaratives. One idea per sentence, with the point first.
- Write to colleagues. You and we. Never users, stakeholders or resources.
- Name the hand-off. Say who passes it and who picks it up.

Set lines: "Hand it on." "Pass it on." "Four labs. One platform." "The panels slide. The Cs are the space they leave." "Everything you need to carry the mark well."

| Before | After |
| --- | --- |
| Our best-in-class platform empowers stakeholders to unlock value. | Everything you need to carry the mark well. |
| Please be advised that the toolkit has been updated. | The toolkit has changed. Here is what is new. |
| Click here to access the resources. | Open the toolkit. |

Lab purpose lines (drafts):

- 24x7 Services: Round the clock, so nobody waits for the morning.
- Automated Operations: The routine done by machines, so people can do the rest.
- Colleague Services: Looking after the people who look after customers.
- Data & Insights: What the numbers say, in words everyone can use.
- Frontier: Where we try the next idea first.

## 10. Do's and Don'ts

### Do

- Use one colourway per surface. Use Platform when several labs appear together.
- Meet every boundary on one long 45 degree run.
- Light one element per surface, the most important one.
- Keep half the mark's width clear on every side.
- Use the light build on Stone and white. Switch to the small cut below 40px.
- Step two or three lines right by one line-height each.

### Don't

- Stretch, squash, redraw or rotate the mark. The panels always rise at 45 degrees to the right.
- Mix colourways or recolour single parts.
- Outline the crescents or any other part.
- Add glow on a light ground, in print or on the small cut.
- Fade any part to black, or use a spare colourway without approval.
- Run the channel along the flat, or divide sections with a hairline.
- Step more than one headline on a screen. Show the found C more than once, or a crescent on its own.
- Use bordered cards, radial glows, index numbering, mono kickers, corner flashes, decorative triangles, em-dashes, emoji or invented statistics.

## 11. Agent prompt guide

Quick reference:

- Light surface: Stone `#F3F1EC`, text Ink `#0D1730`.
- Platform dark: ground `#0D1730` to `#233A6E`, lead `#5B82D1`, lit `#82AEFF` to `#A5CCFF` with Ink text.
- Display Schibsted Grotesk 800, -0.035em, line height 0.95. Text Source Serif 4, 1.55.

Example prompts:

- "Build a hero on a Platform surface. Stepped h1 'Hand it' / 'on.' at `clamp(72px, 11vw, 200px)`. Lead in Source Serif 4. One `.lit` slab holding the main action. The mark at 120px, dark build, with glow."
- "Add a Stone section below with a left cut. Clean edge, no channel. Ink text, light mark build, one Ink cut-corner button."
- "Make a Lab 2 page in Crimson only. Ground `#30050C` to `#680E1B`, lead `#D7263D`. Lab lockup with 'Lab 2 · Automated Operations'."

## 12. Open gaps

- Status colours (success, warning, error, info) are not defined.
- Form states (error, disabled, invalid, read-only) are not defined beyond focus.
- No data-vis palette or chart rules.
- No elevation, shadow or image treatment rules beyond the mark glow.
- The v3 light-ground values are in the manifest but not yet in `palette.js`.
- The lab purpose lines are drafts awaiting confirmation.
