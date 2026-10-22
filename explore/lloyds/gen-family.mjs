// Lloyds family colourways for CCS: Platform (variant A) plus seven roles.
// Geometry: read unchanged from ../../marks, exactly as gen-lloyds.mjs does. Only flat fills change.
// Every colour is a named source swatch (Lloyds site CSS or the LBG theme in AssetSpec), or an
// OKLCH tonal step of one: same hue, lightness set to a stated value, chroma kept unless it leaves sRGB.
// Writes marks/family/*.svg and family-data.js. Run: node gen-family.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, '..', '..', 'marks'), out = join(here, 'marks', 'family');
mkdirSync(out, { recursive: true });

// ---------- colour maths ----------
const hex2 = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
const toHex = a => '#' + a.map(v => Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const lin = v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4, gam = v => v <= .0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - .055;
const lum = h => { const [r, g, b] = hex2(h).map(lin); return .2126 * r + .7152 * g + .0722 * b; };
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
function oklch(h) {
  const [r, g, b] = hex2(h).map(lin);
  const l = Math.cbrt(.4122214708 * r + .5363325363 * g + .0514459929 * b), m = Math.cbrt(.2119034982 * r + .6806995451 * g + .1073969566 * b), s = Math.cbrt(.0883024619 * r + .2817188376 * g + .6299787005 * b);
  const L = .2104542553 * l + .793617785 * m - .0040720468 * s, A = 1.9779984951 * l - 2.428592205 * m + .4505937099 * s, B = .0259040371 * l + .7827717662 * m - .808675766 * s;
  return [L, Math.hypot(A, B), Math.atan2(B, A)];
}
function fromOklch(L, C, H) {
  const A = C * Math.cos(H), B = C * Math.sin(H);
  const l = (L + .3963377774 * A + .2158037573 * B) ** 3, m = (L - .1055613458 * A - .0638541728 * B) ** 3, s = (L - .0894841775 * A - 1.291485548 * B) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + .2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - .3413193965 * s, -.0041960863 * l - .7034186147 * m + 1.707614701 * s];
}
// Tonal step: keep the source hue, set OKLCH lightness to L, keep chroma (times k) and reduce it only to stay in sRGB.
function step(h, L, k = 1) {
  const [, C0, H] = oklch(h); let C = C0 * k;
  for (let i = 0; i < 200; i++) { const rgb = fromOklch(L, C, H); if (rgb.every(v => v >= -1e-4 && v <= 1 + 1e-4)) return toHex(rgb.map(gam)); C *= .97; }
  return toHex(fromOklch(L, 0, H).map(gam));
}
function lab(h) {
  const [r, g, b] = hex2(h).map(lin), f = t => t > .008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  const X = (r * .4124 + g * .3576 + b * .1805) / .95047, Y = r * .2126 + g * .7152 + b * .0722, Z = (r * .0193 + g * .1192 + b * .9505) / 1.08883;
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
}
function de00(x, y) { // CIEDE2000
  const [L1, a1, b1] = lab(x), [L2, a2, b2] = lab(y), rad = Math.PI / 180;
  const Cb = (Math.hypot(a1, b1) + Math.hypot(a2, b2)) / 2, G = .5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)));
  const a1p = a1 * (1 + G), a2p = a2 * (1 + G), C1 = Math.hypot(a1p, b1), C2 = Math.hypot(a2p, b2);
  const hh = (a, b) => { if (!a && !b) return 0; const v = Math.atan2(b, a) / rad; return v < 0 ? v + 360 : v; };
  const h1 = hh(a1p, b1), h2 = hh(a2p, b2); let dh = 0;
  if (C1 * C2) { dh = h2 - h1; if (dh > 180) dh -= 360; else if (dh < -180) dh += 360; }
  const dL = L2 - L1, dC = C2 - C1, dH = 2 * Math.sqrt(C1 * C2) * Math.sin(dh * rad / 2), Lb = (L1 + L2) / 2, Cp = (C1 + C2) / 2;
  let hb = h1 + h2; if (C1 * C2) hb = Math.abs(h1 - h2) > 180 ? (h1 + h2 + 360) / 2 : (h1 + h2) / 2;
  const T = 1 - .17 * Math.cos((hb - 30) * rad) + .24 * Math.cos(2 * hb * rad) + .32 * Math.cos((3 * hb + 6) * rad) - .2 * Math.cos((4 * hb - 63) * rad);
  const Rc = 2 * Math.sqrt(Cp ** 7 / (Cp ** 7 + 25 ** 7)), Rt = -Math.sin(2 * 30 * Math.exp(-(((hb - 275) / 25) ** 2)) * rad) * Rc;
  const Sl = 1 + .015 * (Lb - 50) ** 2 / Math.sqrt(20 + (Lb - 50) ** 2), Sc = 1 + .045 * Cp, Sh = 1 + .015 * Cp * T;
  return Math.sqrt((dL / Sl) ** 2 + (dC / Sc) ** 2 + (dH / Sh) ** 2 + Rt * (dC / Sc) * (dH / Sh));
}

// ---------- sources ----------
// site: lloydsbank.com stylesheet (selector context in NOTES.md). lbg: AssetSpec.dc.html LBG theme and its image grounds.
const S = {
  heritage: ['#006A4D', 'site', 'heritage green'], racing: ['#024731', 'site', 'racing green'], everyday: ['#11B67A', 'site', 'everyday green'],
  calm: ['#C7FFC6', 'site', 'calm green'], valid: ['#649C00', 'site', 'form valid green'], successTint: ['#F6F9F5', 'site', 'success tint'],
  warnOrange: ['#DC5309', 'site', 'warning orange'], autumn: ['#FFB16A', 'site', 'autumn orange'], warnTint: ['#FFF7E8', 'site', 'warning tint'],
  red: ['#DB0F30', 'site', 'error red'], redTint: ['#FFF6F5', 'site', 'critical tint'],
  infoBlue: ['#0D5595', 'site', 'information blue'], infoTint: ['#F8F8FF', 'site', 'information tint'],
  mist: ['#9DE7DE', 'site', 'mist blue'], lavender: ['#A19FFF', 'site', 'lavender'], meadow: ['#F5B2F2', 'site', 'meadow pink'],
  cr100: ['#F6D5DC', 'lbg', 'crimson 100'], cr300: ['#E2728B', 'lbg', 'crimson 300'], cr500: ['#CE143D', 'lbg', 'crimson 500'], labGround: ['#470C1E', 'lbg', 'Lab title ground'],
  nv100: ['#D8DCE4', 'lbg', 'navy 100'], nv300: ['#7C89A6', 'lbg', 'navy 300'], nv500: ['#243B6B', 'lbg', 'navy 500'], nv700: ['#15223E', 'lbg', 'navy 700'],
  toolGround: ['#0E2F5B', 'lbg', 'tools image ground'], insGround: ['#004C53', 'lbg', 'insights image ground'],
  gd100: ['#F5EAD1', 'lbg', 'gold 100'], gd300: ['#DFB866', 'lbg', 'gold 300'], gd500: ['#C98900', 'lbg', 'gold 500'],
};
Object.assign(S, { vibrant: ['#6CF479', 'site', 'vibrant green'], grey: ['#767676', 'site', 'grey'], greyLt: ['#ADADAD', 'site', 'light rule grey'], charcoal: ['#323233', 'site', 'charcoal'], black: ['#000000', 'site', 'black'], lightGrey: ['#F1F1F1', 'site', 'light grey'] });
const LAB4L = +(process.env.LAB4L || .64), FRL = +(process.env.FRL || .6);
const sw = k => ({ hex: S[k][0], src: S[k][1], note: S[k][2] });
const st = (k, L, c) => ({ hex: step(S[k][0], L, c), src: S[k][1], note: `${S[k][2]} ${S[k][0]}, OKLCH step to L ${L}${c ? `, chroma x${c}` : ''}` });

// ---------- roles ----------
// light: Cs on light grounds (black panels). dark: Cs on dark grounds (white panels). ground: deepest tone. tint: light background.
const ROLES = [
  { id: 'platform', role: 'Platform', was: 'Midnight Navy', opts: [
    { name: 'Variant A, decided', light: sw('heritage'), dark: sw('everyday'), ground: sw('racing'), tint: sw('calm'), why: 'Decided. Lloyds heritage green on light grounds, everyday green on dark.' }] },
  { id: 'lab1', role: 'Lab 1 · 24x7 Services', was: 'Ember', opts: [
    { name: 'Warning and autumn orange', light: sw('warnOrange'), dark: sw('autumn'), ground: st('warnOrange', .27), tint: sw('warnTint'), why: 'Keeps Ember. Two Lloyds oranges pair deep and bright, as heritage and everyday green do for A.' },
    { name: 'Warning orange throughout', light: sw('warnOrange'), dark: sw('warnOrange'), ground: st('warnOrange', .27), tint: sw('warnTint'), why: 'One hex everywhere. Hotter on dark grounds, closer to the old Ember glow.' }] },
  { id: 'lab2', role: 'Lab 2 · Automated Operations', was: 'Crimson', opts: [
    { name: 'LBG crimson', light: sw('cr500'), dark: sw('cr300'), ground: sw('labGround'), tint: sw('cr100'), why: 'The LBG spec names crimson as the Automated Operations colourway. Every tone is from its ramp.' },
    { name: 'Lloyds error red', light: sw('red'), dark: st('red', .7), ground: st('red', .24), tint: sw('redTint'), why: 'The red on the Lloyds site. Warmer and brighter, but it is the site’s error colour.' }] },
  { id: 'lab3', role: 'Lab 3 · Colleague Services', was: 'Sapphire', opts: [
    { name: 'Information blue', light: sw('infoBlue'), dark: st('infoBlue', .78, 1.2), ground: sw('toolGround'), tint: sw('infoTint'), why: 'Keeps Sapphire. The Lloyds information blue, on the LBG spec’s blue image ground.' },
    { name: 'LBG navy', light: sw('nv500'), dark: sw('nv300'), ground: sw('nv700'), tint: sw('nv100'), why: 'The group navy. Calmer, but it sits close to the black panels at 16px.' }] },
  { id: 'lab4', role: 'Lab 4 · Data & Insights', was: 'Seafoam', opts: [
    { name: 'Mist blue', light: st('mist', .64, 1.4), dark: sw('mist'), ground: sw('insGround'), tint: st('mist', .97), why: 'Keeps Seafoam. Lloyds mist blue, stepped down with chroma x1.4 to hold 3:1 on white and part from heritage green.' },
    { name: 'Mist blue, quieter', light: st('mist', .64), dark: st('mist', .86, 1.4), ground: sw('insGround'), tint: st('mist', .97), why: 'The source chroma, unboosted. Softer, but closer to heritage green. Neither source has a second teal.' }] },
  { id: 'frontier', role: 'Frontier', was: 'Violet', frontier: true, opts: [
    { name: 'Meadow pink', light: st('meadow', .58, 1.8), dark: sw('meadow'), ground: st('meadow', .22, .6), tint: st('meadow', .97), why: 'The pink end of the old violet. A Lloyds campaign swatch, the most playful tone on the site, and the furthest from the core greens.' },
    { name: 'Lavender', light: st('lavender', .6), dark: sw('lavender'), ground: st('lavender', .22, .6), tint: st('lavender', .96), why: 'Keeps the violet literally. Also a campaign swatch, but at small sizes it drifts towards Lab 3 blue.' }] },
  { id: 'spare1', role: 'Spare 1', was: 'Emerald', opts: [
    { name: 'Valid green', light: sw('valid'), dark: st('valid', .9), ground: st('valid', .25), tint: sw('successTint'), why: 'Nearest to Emerald without touching Platform: a yellow-green from the site’s form states.' },
    { name: 'Lloyds greys', light: sw('grey'), dark: sw('grey'), ground: sw('black'), tint: sw('lightGrey'), why: 'The quietest option, all site neutrals. It can read as disabled, so keep it for internal use.' }] },
  { id: 'spare2', role: 'Spare 2', was: 'Saffron', opts: [
    { name: 'LBG slate', light: sw('nv300'), dark: st('nv300', .55), ground: sw('nv700'), tint: sw('nv100'), why: 'Gold is reserved for status and orange is Lab 1, so Saffron moves to the quiet LBG navy 300.' },
    { name: 'LBG gold, flagged', light: sw('gd500'), dark: sw('gd300'), ground: st('gd500', .25), tint: sw('gd100'), flag: true, why: 'Closest to Saffron, but LBG reserves gold for “Next” and “being built”. Use only with sign-off.' }] },
];

// ---------- checks ----------
const WHITE = '#FFFFFF', BLACK = '#0B0B0C';
for (const r of ROLES) for (const o of r.opts) {
  o.check = {
    lightVsWhite: +contrast(o.light.hex, WHITE).toFixed(2), lightVsBlack: +contrast(o.light.hex, BLACK).toFixed(2),
    darkVsWhiteDE: +de00(o.dark.hex, WHITE).toFixed(1), darkVsGround: +contrast(o.dark.hex, o.ground.hex).toFixed(2),
    whiteOnGround: +contrast(WHITE, o.ground.hex).toFixed(2), vsPlatform: r.id === 'platform' ? null : +de00(o.light.hex, '#006A4D').toFixed(1),
  };
  o.check.pass = o.check.lightVsWhite >= 3 && o.check.darkVsWhiteDE >= 20 && o.check.darkVsGround >= 3 && o.check.whiteOnGround >= 4.5;
}
const chosen = ROLES.map(r => r.opts[0]);
const matrix = { light: chosen.map(a => chosen.map(b => +de00(a.light.hex, b.light.hex).toFixed(1))), dark: chosen.map(a => chosen.map(b => +de00(a.dark.hex, b.dark.hex).toFixed(1))) };

// ---------- Cs on Lloyds green (white panels) ----------
// Rule: panels black on white and light grounds; white on dark and coloured grounds, including Lloyds green.
// On #006A4D the Cs must part from both the white panels and the green ground. Score = the smaller of the two
// CIEDE2000 distances. The role's dark-ground Cs is kept when it scores 20 or more; otherwise the best tonal step wins.
const LG = '#006A4D';
const sc = h => Math.min(de00(h, WHITE), de00(h, LG));
for (const r of ROLES) for (const o of r.opts) {
  let best;
  if (r.id === 'platform') {
    const c = [sw('everyday'), sw('vibrant')];
    best = [...c].sort((a, b) => sc(b.hex) - sc(a.hex))[0];
    o.greenAlt = c.map(x => ({ hex: x.hex, vsWhite: +de00(x.hex, WHITE).toFixed(1), vsGreen: +de00(x.hex, LG).toFixed(1) }));
  } else if (sc(o.dark.hex) >= 20) best = o.dark;
  else {
    const c = [o.light, ...[.5, .55, .6, .65, .7, .75, .8, .85, .9].map(L => ({ hex: step(o.dark.hex, L), src: o.dark.src, note: `Cs on dark ${o.dark.hex}, OKLCH step to L ${L}` }))];
    best = c.sort((a, b) => sc(b.hex) - sc(a.hex))[0];
  }
  o.green = { hex: best.hex, src: best.src, note: best.note, vsWhite: +de00(best.hex, WHITE).toFixed(1), vsGreen: +de00(best.hex, LG).toFixed(1), contrastGreen: +contrast(best.hex, LG).toFixed(2) };
}

// ---------- full colour ----------
// No black. Outer panels take the role colour, the middle a lighter tint (the lit focal point), the Cs a deeper tone.
// Every value is a source swatch or an OKLCH step of the role colour. Targets on white: middle and Cs each 15 or more
// from the panels (the search asks for 18), and the panels 30 or more from the ground.
const near = (base, from, dir, min) => { // first OKLCH step of base from L `from`, moving `dir`, that is `min` or more from base
  for (let L = from; L > .12 && L < .985; L += dir * .01) { const h = step(base, +L.toFixed(2)); if (de00(h, base) >= min) return { hex: h, L: +L.toFixed(2) }; }
  const L = dir > 0 ? .97 : .15; return { hex: step(base, L), L };
};
const tone = (hex, L, base, note) => ({ hex, src: base.src, note: `${note}, OKLCH step to L ${L}` });
function fcBuild(r, o) {
  const fc = {};
  if (r.id === 'platform') { // brief: Cs racing green #024731; stepped deeper only if it sits under 15 from the panels
    let cs = sw('racing'); for (let L = +oklch(cs.hex)[0].toFixed(2); de00(cs.hex, '#006A4D') < 15 && L > .15; L = +(L - .01).toFixed(2)) cs = tone(step('#024731', L), L, sw('racing'), 'racing green #024731');
    fc.light = { ground: WHITE, panel: sw('heritage'), mid: sw('everyday'), cs };
  }
  else {
    let panel = o.light;
    if (de00(panel.hex, WHITE) < 30) for (let L = oklch(panel.hex)[0]; L > .3; L -= .01) { const h = step(o.light.hex, +L.toFixed(2)); if (de00(h, WHITE) >= 30) { panel = tone(h, +L.toFixed(2), o.light, `Cs on light ${o.light.hex}`); break; } }
    const L0 = oklch(panel.hex)[0];
    const mid = de00(o.dark.hex, panel.hex) >= 18 && oklch(o.dark.hex)[0] > L0 ? o.dark : (n => tone(n.hex, n.L, o.light, `role colour ${panel.hex}`))(near(panel.hex, L0 + .08, 1, 18));
    const cs = (n => tone(n.hex, n.L, o.light, `role colour ${panel.hex}`))(near(panel.hex, L0 - .08, -1, 18));
    fc.light = { ground: WHITE, panel, mid, cs };
  }
  // On the role's own dark ground, and on Lloyds green: panels and middle lifted so they hold, Cs a deeper tone.
  // Search: panels from the role's light tones, middle lighter still, Cs deeper than the panels. Score is the
  // smallest of panels-ground, middle-panels, Cs-panels and Cs-ground; a source swatch earns a 2-point preference.
  const lift = ground => {
    const base = r.id === 'platform' ? sw('heritage') : o.light, hue = base.hex;
    const st2 = (L, note) => tone(step(hue, L), L, base, note || `role colour ${hue}`);
    const Ps = r.id === 'platform' ? [sw('everyday'), sw('vibrant'), ...[.7, .75, .8, .85].map(L => st2(L))] : [o.dark, ...[.66, .7, .74, .78, .82, .86].map(L => st2(L))];
    const Ms = r.id === 'platform' ? [sw('calm'), ...[.9, .94, .97].map(L => st2(L))] : [o.tint, ...[.9, .94, .97].map(L => st2(L))];
    const Cs = r.id === 'platform' ? [sw('heritage'), sw('everyday'), sw('racing'), ...[.4, .45, .5, .55, .6].map(L => st2(L))] : [o.light, ...[.35, .4, .45, .5, .55, .6, .65].map(L => st2(L))];
    const isSw = x => !/OKLCH/.test(x.note);
    let best = null;
    for (const p of Ps) for (const m of Ms) for (const c of Cs) {
      const Lp = oklch(p.hex)[0]; if (oklch(m.hex)[0] <= Lp || oklch(c.hex)[0] >= Lp) continue;
      const s = Math.min(de00(p.hex, ground), de00(m.hex, p.hex), de00(c.hex, p.hex), de00(c.hex, ground));
      const sc2 = s + 2 * [p, m, c].filter(isSw).length;
      if (!best || sc2 > best.sc2) best = { sc2, v: { ground, panel: p, mid: m, cs: c } };
    }
    return best.v;
  };
  fc.dark = lift(o.ground.hex); fc.green = lift(LG);
  for (const v of Object.values(fc)) v.check = { midVsPanel: +de00(v.mid.hex, v.panel.hex).toFixed(1), csVsPanel: +de00(v.cs.hex, v.panel.hex).toFixed(1), panelVsGround: +de00(v.panel.hex, v.ground).toFixed(1), csVsGround: +de00(v.cs.hex, v.ground).toFixed(1), midVsGround: +de00(v.mid.hex, v.ground).toFixed(1) };
  return fc;
}
for (const r of ROLES) r.opts[0].fc = fcBuild(r, r.opts[0]);

// ---------- marks ----------
function parts(file) {
  const s = readFileSync(join(src, file), 'utf8');
  const vb = s.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number), d = [...s.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map(m => m[1]);
  if (d.length !== 5) throw new Error(file + ': expected 5 parts');
  return { vb, d };
}
const geo = { s: { full: parts('refined-platform-parts.svg'), small: parts('refined-small-platform.svg') }, f: { full: parts('refined-frontier-f-parts.svg'), small: parts('refined-small-frontier-f.svg') } };
const IDS = ['panel-upper', 'panel-middle', 'panel-lower', 'crescent-left', 'crescent-right'];
// fills: [upper, middle, lower, left C, right C]. The viewBox is the parts' own, so width/height keep the true ratio.
const svg = (g, f, label, h) => { const [, , w, hh] = g.vb; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${g.vb.join(' ')}" width="${Math.round(h * w / hh * 100) / 100}" height="${h}" role="img" aria-label="${label.replace(/&/g, '&amp;')}">${g.d.map((d, i) => `<path id="${IDS[i]}" d="${d}" fill="${f[i]}"/>`).join('')}</svg>\n`; };
let n = 0;
ROLES.forEach(r => r.opts.forEach((o, i) => {
  const key = `${r.id}-${i ? 'alt' : 'pick'}`; o.key = key;
  const P = (p, c) => [p, p, p, c, c], Fc = v => [v.panel.hex, v.mid.hex, v.panel.hex, v.cs.hex, v.cs.hex];
  const grounds = { light: P(BLACK, o.light.hex), dark: P(WHITE, o.dark.hex), green: P(WHITE, o.green.hex) };
  if (o.fc) for (const g of ['light', 'dark', 'green']) grounds['fc-' + g] = Fc(o.fc[g]);
  for (const m of r.frontier ? ['s', 'f'] : ['s']) for (const cut of ['full', 'small']) for (const [gk, f] of Object.entries(grounds)) {
    const who = m === 'f' ? 'Frontier F mark' : 'CCS mark';
    writeFileSync(join(out, `${m === 'f' ? 'f-' : ''}${cut === 'small' ? 'small-' : ''}${key}-${gk}.svg`), svg(geo[m][cut], f, `${who}, ${r.role}, ${gk.startsWith('fc') ? 'full colour' : o.name}${cut === 'small' ? ', small cut' : ''}`, cut === 'full' ? 512 : 32)); n++;
  }
}));
writeFileSync(join(here, 'family-data.js'), '/* Generated by gen-family.mjs. Do not edit. */\nwindow.LLOYDS_FAMILY = ' + JSON.stringify({ roles: ROLES, matrix }) + ';\n');
console.log(n + ' SVGs');
for (const r of ROLES) for (const o of r.opts) console.log(r.id.padEnd(9), o.key.padEnd(14), o.light.hex, o.dark.hex, o.ground.hex, o.tint.hex, JSON.stringify(o.check));
const ids = ROLES.map(r => r.id); let minL = 99, minD = 99;
matrix.light.forEach((row, i) => row.forEach((v, j) => { if (j > i) { minL = Math.min(minL, v); if (v < 20) console.log('LIGHT FAIL', ids[i], ids[j], v); } }));
matrix.dark.forEach((row, i) => row.forEach((v, j) => { if (j > i) { minD = Math.min(minD, v); if (v < 20) console.log('DARK FAIL', ids[i], ids[j], v); } }));
console.log('min light', minL, 'min dark', minD);
for (const r of ROLES) { const o = r.opts[0]; console.log('GREEN', r.id.padEnd(9), o.green.hex, 'vsWhite', o.green.vsWhite, 'vsGreen', o.green.vsGreen, o.greenAlt ? JSON.stringify(o.greenAlt) : '');
  for (const g of ['light', 'dark', 'green']) { const v = o.fc[g]; console.log('FC', r.id.padEnd(9), g.padEnd(5), v.ground, 'P', v.panel.hex, 'M', v.mid.hex, 'C', v.cs.hex, JSON.stringify(v.check)); } }
