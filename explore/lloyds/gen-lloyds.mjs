// Lloyds-sympathetic variants of the refined CCS mark.
// Geometry: read unchanged from ../../marks (the refined parts and small cuts written by marks/gen.mjs).
// This script only recolours the five parts with flat fills. It never edits a coordinate.
// Run from anywhere: node "explore/lloyds/gen-lloyds.mjs"
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, '..', '..', 'marks');
const out = join(here, 'marks');

const LG = '#006A4D', DEEP = '#024731', BRIGHT = '#11B67A', LIME = '#6CF479', BLACK = '#0B0B0C', WHITE = '#FFFFFF';

function parts(file) {
  const s = readFileSync(join(src, file), 'utf8');
  const vb = s.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const d = [...s.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map(m => m[1]);
  if (d.length !== 5) throw new Error(file + ': expected 5 parts, found ' + d.length);
  return { vb, d }; // order: panel-upper, panel-middle, panel-lower, crescent-left, crescent-right
}
const geo = {
  s: { full: parts('refined-platform-parts.svg'), small: parts('refined-small-platform.svg') },
  f: { full: parts('refined-frontier-f-parts.svg'), small: parts('refined-small-frontier-f.svg') },
};
const IDS = ['panel-upper', 'panel-middle', 'panel-lower', 'crescent-left', 'crescent-right'];
const r2 = n => Math.round(n * 100) / 100;

// fills: [upper, middle, lower, left C, right C]; tile: optional square ground drawn in the file.
function svg({ g, fills, tile, label, h }) {
  let [x, y, w, hh] = g.vb, body = '';
  if (tile) {
    const cx = x + w / 2, cy = y + hh / 2, side = Math.max(w, hh) / tile.fill;
    x = cx - side / 2; y = cy - side / 2; w = hh = side;
    body += `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(side)}" height="${r2(side)}" rx="${r2(side * 0.22)}" fill="${tile.colour}"/>`;
  }
  body += g.d.map((d, i) => `<path id="${IDS[i]}" d="${d}" fill="${fills[i]}"/>`).join('');
  const width = r2(h * w / hh);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r2(x)} ${r2(y)} ${r2(w)} ${r2(hh)}" width="${width}" height="${h}" role="img" aria-label="${label}">${body}</svg>\n`;
}
const P = (p, c) => [p, p, p, c, c];
const M = (p, m, c) => [p, m, p, c, c];

// LBG theme colours, verbatim from uploads/ccs-sharepoint-canvas/project/AssetSpec.dc.html ("LBG theme colours and tonal alternatives").
const CR = { 100: '#F6D5DC', 200: '#ECA6B5', 300: '#E2728B', 500: '#CE143D', 600: '#A11030', 700: '#770C23' };
const NV = { 100: '#D8DCE4', 200: '#ACB5C7', 300: '#7C89A6', 500: '#243B6B', 600: '#1C2E53', 700: '#15223E' };
const GD = { 100: '#F5EAD1', 200: '#EAD29E', 300: '#DFB866', 500: '#C98900', 600: '#9D6B00', 700: '#754F00' };

// Variant tones per ground. light = white ground, dark = black ground, green = Lloyds green ground, deep = deep green ground.
const V = {
  a: {
    name: 'Black, green Cs',
    // Panels black on white and light grounds; white on dark and coloured grounds, including Lloyds green.
    // On Lloyds green the Cs are lime: CIEDE2000 29.5 from the white panels and 42.9 from #006A4D (#11B67A: 34.5 and 27.0).
    full: { light: P(BLACK, LG), dark: P(WHITE, BRIGHT), green: P(WHITE, LIME), deep: P(WHITE, BRIGHT) },
    small: { light: P(BLACK, LG), dark: P(WHITE, BRIGHT), green: P(WHITE, LIME), deep: P(WHITE, BRIGHT) },
  },
  b: {
    name: 'Green light',
    full: { light: [BLACK, LG, BLACK, BLACK, BLACK], dark: [WHITE, BRIGHT, WHITE, WHITE, WHITE], green: [WHITE, LIME, WHITE, WHITE, WHITE] },
    // 16px rule: the lit middle lifts to bright green on white so it parts from the black at a glance.
    small: { light: [BLACK, BRIGHT, BLACK, BLACK, BLACK], dark: [WHITE, BRIGHT, WHITE, WHITE, WHITE], green: [WHITE, LIME, WHITE, WHITE, WHITE] },
  },
  c: { name: 'On green', tile: BRIGHT, full: { tile: P(BLACK, DEEP) }, small: { tile: P(BLACK, BLACK) } },
  d: { name: 'Campaign', tile: LIME, full: { tile: P(BLACK, BLACK) }, small: { tile: P(BLACK, BLACK) } },
  // LBG variants. light = white ground, navy = LBG navy #15223E ground.
  e: {
    name: 'Navy, gold Cs', fam: 'LBG',
    full: { light: M(NV[500], NV[300], GD[500]), navy: M(NV[200], GD[100], GD[300]) },
    small: { light: M(NV[500], NV[300], GD[500]), navy: M(NV[200], GD[100], GD[300]) },
  },
  f: {
    name: 'Crimson primary', fam: 'LBG',
    full: { light: M(CR[500], CR[300], CR[700]), navy: M(CR[200], CR[100], CR[300]) },
    small: { light: M(CR[500], CR[300], CR[700]), navy: M(CR[200], CR[100], CR[300]) },
  },
  // G, navy panels with crimson Cs and a gold middle, was tried and dropped: three hues compete in one small mark. See NOTES.md.
  'mono-black': { name: 'Mono black', full: { flat: P(BLACK, BLACK) }, small: { flat: P(BLACK, BLACK) } },
  'mono-white': { name: 'Mono white', full: { flat: P(WHITE, WHITE) }, small: { flat: P(WHITE, WHITE) } },
};

const written = [];
function emit(name, opts) { writeFileSync(join(out, name), svg(opts)); written.push(name); }
for (const [mark, sets] of [['s', V], ['f', { a: V.a }]]) {
  for (const [key, v] of Object.entries(sets)) {
    for (const cut of ['full', 'small']) {
      for (const [ground, fills] of Object.entries(v[cut])) {
        const tile = v.tile ? { colour: v.tile, fill: cut === 'full' ? 0.64 : 0.74 } : null;
        const g = geo[mark][cut];
        const base = `${mark === 'f' ? 'f-' : ''}${cut === 'small' ? 'small-' : ''}${key}`;
        const name = `${base}${ground === 'tile' || ground === 'flat' ? '' : '-' + ground}.svg`;
        const who = mark === 'f' ? 'Frontier mark' : 'CCS mark';
        emit(name, { g, fills, tile, h: cut === 'full' ? 512 : 32, label: `${who}, ${v.fam || 'Lloyds'} variant ${v.name}${cut === 'small' ? ', small-size cut' : ''}` });
      }
    }
  }
}
console.log(written.length + ' files:', written.join(' '));
