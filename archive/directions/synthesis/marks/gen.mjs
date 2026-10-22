// Refined CCS mark: every colourway and build, plus CSS mask shapes.
// Geometry is the mark study's parametric generator (directions/mark-study/build.mjs), copied unchanged:
// parallel bands, circles, tangents and 180 degree turns. No traced or freehand coordinates.
// Run: node gen.mjs   (writes the SVGs, masks/ and manifest.json beside this file)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { oklchOf, oklchHex, oklab, de2000 } from './colour.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
fs.mkdirSync(path.join(HERE, 'masks'), { recursive: true });

const S2 = Math.SQRT2, PI = Math.PI;
const f = (n) => +(+n).toFixed(2);

// ---------- palette ----------
const palSrc = fs.readFileSync(path.join(ROOT, 'palette.js'), 'utf8');
const PAL = JSON.parse(palSrc.slice(palSrc.indexOf('{'), palSrc.lastIndexOf('}') + 1));
const KEYS = Object.keys(PAL).sort((a, b) => PAL[a].order - PAL[b].order);
const LIGHT_GROUND = '#F3F1EC';
const INK = '#0D1730';

// ---------- measure the master (same as the study) ----------
const master = fs.readFileSync(path.join(ROOT, 'assets/ccs-mark/suite/ccs-mark-platform.svg'), 'utf8');
const ds = [...master.matchAll(/<path[^>]* d="([^"]+)"/g)].map((m) => m[1].match(/-?\d+(?:\.\d+)?/g).map(Number));
const [U, M, L] = ds;
const pt = (a, i) => ({ x: a[i], y: a[i + 1] });
const O = { x: (U[0] + L[0]) / 2, y: (U[1] + L[1]) / 2 };
const uv = (p) => ({ x: (p.x - p.y - (O.x - O.y)) / S2, y: (p.x + p.y - (O.x + O.y)) / S2 });
const W = uv(pt(U, 12)).y - uv(pt(U, 0)).y;

class Path {
  constructor(map) { this.map = map; this.d = ''; this.pts = []; }
  _p(p) { const q = this.map(p); this.pts.push(q); return q; }
  M(p) { const q = this._p(p); this.d += `M${f(q.x)} ${f(q.y)}`; return this; }
  L(p) { const q = this._p(p); this.d += `L${f(q.x)} ${f(q.y)}`; return this; }
  A(c, r, a0, a1) {
    const sw = a1 - a0, n = Math.max(8, Math.ceil(Math.abs(sw) / 0.05));
    for (let i = 1; i < n; i++) { const a = a0 + (sw * i) / n; this.pts.push(this.map({ x: c.x + r * Math.cos(a), y: c.y + r * Math.sin(a) })); }
    const q = this._p({ x: c.x + r * Math.cos(a1), y: c.y + r * Math.sin(a1) });
    this.d += `A${f(r)} ${f(r)} 0 ${Math.abs(sw) > PI ? 1 : 0} ${sw > 0 ? 1 : 0} ${f(q.x)} ${f(q.y)}`; return this;
  }
  Z() { this.d += 'Z'; return this; }
}
const ang = (c, p) => Math.atan2(p.y - c.y, p.x - c.x);
const neg = (p) => ({ x: -p.x, y: -p.y });
const bounds = (paths) => {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const p of paths) for (const q of p.pts) { x0 = Math.min(x0, q.x); y0 = Math.min(y0, q.y); x1 = Math.max(x1, q.x); y1 = Math.max(y1, q.y); }
  return [f(x0), f(y0), f(x1 - x0), f(y1 - y0)];
};

function facetS(p, origin = O) {
  const { W, g, uQ, uT, uP } = p;
  const toXY = (q) => ({ x: origin.x + (q.x + q.y) / S2, y: origin.y + (q.y - q.x) / S2 });
  const rot = (q) => toXY(neg(q));
  const vo = -1.5 * W - g, vi = -W / 2 - g, vc = -(W + g) / 2, R = W + g / 2, Rin = R + g;
  const Q = { x: uQ, y: vc }, Q2 = { x: -uQ, y: -vc };
  const uA = uQ - Math.sqrt(R * R - (g * g) / 4);
  const upper = (map) => {
    const P = new Path(map); const tc = { x: uT, y: vo };
    P.M({ x: uT + W, y: vo }).A(tc, W, 0, PI / 2).L({ x: uA, y: vi });
    P.A(Q, R, ang(Q, { x: uA, y: vi }), -PI / 2).L({ x: uT + W, y: vo }).Z(); return P;
  };
  const middle = new Path(toXY);
  middle.M({ x: uA, y: -W / 2 }).L({ x: -uQ, y: -W / 2 }).A(Q2, R, -PI / 2, ang(Q2, { x: -uA, y: W / 2 }))
    .L({ x: uQ, y: W / 2 }).A(Q, R, PI / 2, ang(Q, { x: uA, y: -W / 2 })).Z();
  const Pc = { x: uP, y: vc }, d = uQ - uP;
  const a = (d * d + R * R - Rin * Rin) / (2 * d), h = Math.sqrt(R * R - a * a);
  const t1 = { x: uP + a, y: vc - h }, t2 = { x: uP + a, y: vc + h };
  const crescent = (map) => {
    const P = new Path(map); const a0 = ang(Pc, t1);
    P.M(t1).A(Pc, R, a0, ang(Pc, t2) - 2 * PI);
    const b0 = ang(Q, t2); let b1 = ang(Q, t1); if (b1 < b0) b1 += 2 * PI;
    P.A(Q, Rin, b0, b1).Z(); return P;
  };
  return { upper: upper(toXY), middle, lower: upper(rot), cl: crescent(toXY), cr: crescent(rot) };
}
function refinedParams(r) {
  const uQ = r.g * r.uQgap, d = r.t + r.g, uP = uQ - d;
  return { W: r.W, g: r.g, uQ, uT: -uP, uP };
}
const REF = { W, g: 0.18 * W, uQgap: 0.5, t: 0.54 * W };
const SMALL = { W, g: 0.34 * W, uQgap: 0.5, t: 0.62 * W };
const full = facetS(refinedParams(REF)), small = facetS(refinedParams(SMALL));
const vbFull = bounds(Object.values(full)), vbSmall = bounds(Object.values(small));
const ORDER = ['upper', 'middle', 'lower', 'cl', 'cr'];
const PIECE_ID = { upper: 'panel-upper', middle: 'panel-middle', lower: 'panel-lower', cl: 'crescent-left', cr: 'crescent-right' };
// colour roles into palette.js g[]: upper g0, middle g1, lower g0 reversed, crescent-left g3, crescent-right g4
const ROLE = { upper: [0, false], middle: [1, false], lower: [0, true], cl: [3, false], cr: [4, false] };

// ---------- colour ----------
const mix = (a, b) => '#' + [1, 3, 5].map((i) => Math.round((parseInt(a.slice(i, i + 2), 16) + parseInt(b.slice(i, i + 2), 16)) / 2).toString(16).padStart(2, '0')).join('').toUpperCase();
function stopsOf(pal, key, light) {
  const [i, rev] = ROLE[key];
  const s = (light && pal.light && pal.light[String(i)]) || pal.g[i];
  return rev ? [s[1], s[0]] : s;
}
const lead = (pal) => pal.g[0][0];

// ---------- light-ground rule (v3: vivid) ----------
// One rule for every colourway, including those with a palette.js light override (it supersedes them).
// OKLCH, hue held per stop. Panels keep the lead fade (g0). Contrast is CIEDE2000 on LIGHT_GROUND.
// Chroma rule: a reworked stop takes C = max(its own C, the dark build's middle chroma, the lead chroma),
// clipped into sRGB at fixed L and hue. Chroma never drops below the stop's own.
// Middle (g1): both stops drop by one amount dL, the smallest dL (step 0.005) that meets every target:
//   lighter stop vs ground >= T.midGround, middle mid-colour vs panel mid-colour >= T.midPanels.
// Crescent pale stop (g3, mirrored in g4): the highest L at or under its own that puts each crescent
//   mid-colour >= T.cresPanels from both panel mid-colours; the deep stop is kept (the deepest shade).
const T = { midGround: 25, midPanels: 12, cresPanels: 15, margin: 0.5 };
const Lof = (h) => oklchOf(h)[0], Cof = (h) => oklchOf(h)[1];
const mixOk = (a, b) => { const A = oklab(a), B = oklab(b), m = A.map((v, i) => (v + B[i]) / 2); return oklchHex(m[0], Math.hypot(m[1], m[2]), ((Math.atan2(m[2], m[1]) * 180) / PI + 360) % 360); };
const midC = (pair) => { const A = oklab(pair[0]), B = oklab(pair[1]); return Math.hypot((A[1] + B[1]) / 2, (A[2] + B[2]) / 2); };
const reL = (h, L, floor) => { const [, C, H] = oklchOf(h); return oklchHex(L, Math.max(C, floor), H); };
function deriveLight(p) {
  const floor = Math.max(midC(p.g[1]), Cof(p.g[0][0]));
  const pan = [mixOk(...p.g[0])], [a, b] = p.g[1];
  // the middle stays the lit piece: its mid-colour never goes darker than the panels' mid-colour.
  // first dL that meets both targets; if none on the lit side, the dL with the best min(score / target)
  // chroma: the floor rule first; if the targets are not met on the lit side, the most chroma sRGB allows
  let mid = p.g[1], dL = 0, best = { s: -1 };
  for (const cf of [floor, 0.4]) { if (best.s >= 1) break; best = { s: -1 };
  for (let d = 0; d < 0.6; d += 0.005) {
    const m = [reL(a, Lof(a) - d, cf), reL(b, Lof(b) - d, cf)];
    if (Lof(mixOk(...m)) <= Lof(pan[0])) break;
    const lighter = Lof(m[0]) > Lof(m[1]) ? m[0] : m[1];
    const sc = Math.min(de2000(lighter, LIGHT_GROUND) / (T.midGround + T.margin), de2000(mixOk(...m), pan[0]) / (T.midPanels + T.margin));
    if (sc > best.s) best = { s: sc, m, d, cf };
    if (sc >= 1) break;
  } }
  mid = best.m; dL = best.d;
  const c = p.g[3], i = Lof(c[0]) > Lof(c[1]) ? 0 : 1;
  let cres = c;
  for (let L = Lof(c[i]); L > Lof(c[1 - i]); L -= 0.005) {
    const n = c.slice(); n[i] = reL(c[i], L, floor); cres = n;
    if (de2000(mixOk(...n), pan[0]) >= T.cresPanels + T.margin) break;
  }
  return { '1': mid, '3': cres, '4': [cres[1], cres[0]], _dL: +dL.toFixed(3), _gamutMax: best.cf > 1 / 3 };
}
const DERIVED = {};
for (const key of KEYS) DERIVED[key] = deriveLight(PAL[key]);
const strip = (o) => { const { _dL, _gamutMax, ...r } = o; return r; };
const withLight = (key) => ({ ...PAL[key], light: strip(DERIVED[key]) });
// contrast on the light ground, CIEDE2000
function contrast(p) {
  const g = (i) => (p.light && p.light[String(i)]) || p.g[i];
  const mid = (i) => mixOk(...g(i)), r1 = (x) => +x.toFixed(1), r3 = (x) => +x.toFixed(3);
  return {
    middleVsGround: r1(Math.min(...g(1).map((h) => de2000(h, LIGHT_GROUND)))),
    middleVsPanels: r1(de2000(mid(1), mid(0))),
    crescentsVsGround: r1(Math.min(...[...g(3), ...g(4)].map((h) => de2000(h, LIGHT_GROUND)))),
    crescentsVsPanels: r1(Math.min(...[3, 4].map((c) => de2000(mid(c), mid(0))))),
    crescentsVsMiddle: r1(Math.min(...[3, 4].map((c) => de2000(mid(c), mid(1))))),
    middleChroma: r3(midC(g(1))), darkMiddleChroma: r3(midC(p.g[1])),
    method: 'CIEDE2000. Middle vs ground: lighter of its two stops. Pairs between pieces: gradient mid-colour (OKLab mean) of each piece. Chroma: OKLCH C of the middle mid-colour.',
  };
}

// ---------- small-size tones (flat, three per colourway) ----------
// Panels: the lead (g0 first stop). Lit (middle): the middle fade's lit stop. Deep (crescents): the crescent
// fade's deep stop. Each tone keeps its hue and the chroma rule above; only L moves, in 0.005 steps, the least
// distance that meets the targets, between the colourway's own deepest shade (p.deep) and white.
//   Dark ground (p.ground): lit moves lighter until >= 22 from lead; deep takes the most chroma sRGB allows and
//   the L that maximises min(dE to lead, dE to p.ground, dE to navy INK), searched from p.deep up to the lead.
//   Light ground (LIGHT_GROUND): lit is the light build's lighter middle stop, moved darker until >= 22 from
//   the ground, then lighter if needed to stay >= 22 from lead; deep moves darker until >= 22 from lead and lit.
const SMALL_T = 22;
function smallTones(p, ground, light) {
  const lead = p.g[0][0], floor = Math.max(midC(p.g[1]), Cof(lead)), L0 = Lof(p.deep);
  const cr = p.g[3], deepStop = Lof(cr[0]) < Lof(cr[1]) ? cr[0] : cr[1];
  let lit, deep;
  if (!light) {
    const g1 = p.g[1], l = Lof(g1[0]) > Lof(g1[1]) ? g1[0] : g1[1];
    lit = l; for (let L = Lof(l); L <= 1 && de2000(lit, lead) < SMALL_T; L += 0.005) lit = reL(l, L, 0);
    // v3 dark rule: middle = lightest middle stop (brightest piece); crescents = pale stop, L moved the least
    // to reach >= 15 from panels and >= 30 from navy INK and the platform groundHi, and below the middle in L.
    const D = { gnd: 30, pan: 15, m: 0.5 }, grounds = [INK, '#233A6E'];
    const ok = (h, minPan) => de2000(h, lead) >= minPan + D.m && grounds.every((g) => de2000(h, g) >= D.gnd + D.m);
    for (let L = Lof(l); L <= 0.99 && !ok(lit, D.pan); L += 0.005) lit = reL(l, L, 0);
    const pale = Lof(cr[0]) > Lof(cr[1]) ? cr[0] : cr[1], P = Lof(pale);
    // start at the pale stop and move the least distance, lighter first (capped under the middle), to separate
    const cap = Math.min(0.99, Lof(lit) - 0.01); deep = reL(pale, Math.min(P, cap), 0);
    let found = false;
    for (let d = 0; d < 0.7 && !found; d += 0.005) for (const L of [P + d, P - d]) {
      if (found || L > cap || L < 0.2) continue;
      const h = reL(pale, L, 0); if (ok(h, D.pan)) { deep = h; found = true; }
    }
  } else {
    const m = DERIVED_P(p)['1'], l = Lof(m[0]) > Lof(m[1]) ? m[0] : m[1];
    // lighter than the lead; nearest L to the light build's stop that is >= SMALL_T from lead and ground;
    // if no L does, the L with the best min(dE lead, dE ground), at the most chroma sRGB allows
    let near = null, bestS = -1, bestH = l;
    for (let L = Lof(lead) + 0.005; L <= 0.995; L += 0.005) {
      const h = reL(l, L, floor), s2 = Math.min(de2000(h, lead), de2000(h, ground));
      if (s2 >= SMALL_T && (!near || Math.abs(L - Lof(l)) < Math.abs(Lof(near) - Lof(l)))) near = h;
      const hx = reL(l, L, 0.4), sx = Math.min(de2000(hx, lead), de2000(hx, ground));
      if (sx > bestS) { bestS = sx; bestH = hx; }
    }
    lit = near || bestH;
    deep = deepStop; for (let L = Lof(deepStop); L >= L0 && (de2000(deep, lead) < SMALL_T || de2000(deep, lit) < SMALL_T); L -= 0.005) deep = reL(deepStop, L, floor);
  }
  return { panels: lead, middle: lit, crescents: deep };
}
const DERIVED_P = (p) => deriveLight(p);
const AREA = {};
function smallStats(t, ground, shapes) {
  // area-weighted OKLab mean of the five pieces stands for the whole mark at 16px
  const area = (k) => { const q = shapes[k].pts; let s = 0; for (let i = 0; i < q.length; i++) { const a = q[i], b = q[(i + 1) % q.length]; s += a.x * b.y - b.x * a.y; } return Math.abs(s / 2); };
  const fill = { upper: t.panels, lower: t.panels, middle: t.middle, cl: t.crescents, cr: t.crescents };
  let w = 0, acc = [0, 0, 0];
  for (const k of ORDER) { const A = area(k), o = oklab(fill[k]); w += A; acc = acc.map((v, i) => v + A * o[i]); }
  const m = acc.map((v) => v / w), mean = oklchHex(m[0], Math.hypot(m[1], m[2]), ((Math.atan2(m[2], m[1]) * 180) / PI + 360) % 360), r1 = (x) => +x.toFixed(1);
  return {
    panelsVsMiddle: r1(de2000(t.panels, t.middle)), panelsVsCrescents: r1(de2000(t.panels, t.crescents)), middleVsCrescents: r1(de2000(t.middle, t.crescents)),
    markVsGround: r1(de2000(mean, ground)), minPieceVsGround: r1(Math.min(...[t.panels, t.middle, t.crescents].map((h) => de2000(h, ground)))),
  };
}

// ---------- svg writers ----------
const dims = (vb, px) => { const k = Math.max(vb[2], vb[3]); return `width="${f((px * vb[2]) / k)}" height="${f((px * vb[3]) / k)}"`; };
function svg(vb, px, label, inner, defs = '', extra = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" ${dims(vb, px)} role="img" aria-label="${label}"${extra}>${defs ? `<defs>${defs}</defs>` : ''}${inner}</svg>\n`;
}
function gradientBuild(shapes, vb, pal, key, light, label, withIds, slide = true) {
  let defs = '', body = '';
  for (const k of ORDER) {
    const [a, b] = stopsOf(pal, k, light), gid = `ccs-${key}-${PIECE_ID[k]}`;
    defs += `<linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
    body += `<path${withIds ? ` id="${PIECE_ID[k]}"${slide ? slideAttr(k) : ''}` : ''} d="${shapes[k].d}" fill="url(#${gid})"/>`;
  }
  return svg(vb, 512, label, withIds ? `<g id="ccs-mark">${body}</g>` : body, defs);
}
const SLIDE_SIGN = { upper: 1, middle: 0, lower: -1, cl: 0, cr: 0 };
const slideAttr = (k) => (['upper', 'middle', 'lower'].includes(k) ? ` data-slide="${SLIDE_SIGN[k]}"` : '');
function solid(shapes, vb, px, fill, label) {
  return svg(vb, px, label, `<g fill="${fill}">${ORDER.map((k) => `<path d="${shapes[k].d}"/>`).join('')}</g>`);
}
const write = (rel, text) => fs.writeFileSync(path.join(HERE, rel), text);

const files = {}, SMALLTONES = {};
// flat, three tones: panels, middle, crescents
function tones(shapes, vb, px, t, label) {
  const fill = { upper: t.panels, lower: t.panels, middle: t.middle, cl: t.crescents, cr: t.crescents };
  return svg(vb, px, label, ORDER.map((k) => `<path d="${shapes[k].d}" fill="${fill[k]}"/>`).join(''));
}
function smallSet(p, shapes, vbS) {
  const dark = smallTones(p, p.ground, false), light = smallTones(p, LIGHT_GROUND, true);
  return { dark: { ground: p.ground, ...dark, stats: smallStats(dark, p.ground, shapes), statsOnNavy: smallStats(dark, INK, shapes) }, light: { ground: LIGHT_GROUND, ...light, stats: smallStats(light, LIGHT_GROUND, shapes) } };
}
for (const key of KEYS) {
  const pal = PAL[key], nm = pal.short;
  const set = (kind, rel, text) => { write(rel, text); (files[key] ||= {})[kind] = rel; };
  set('dark', `refined-${key}-dark.svg`, gradientBuild(full, vbFull, pal, key, false, `CCS mark, ${nm}, for dark grounds`, false));
  set('light', `refined-${key}-light.svg`, gradientBuild(full, vbFull, withLight(key), key, true, `CCS mark, ${nm}, for light grounds`, false));
  const st = (SMALLTONES[key] = smallSet(pal, small, vbSmall));
  set('flat', `refined-${key}-flat.svg`, tones(full, vbFull, 512, st.dark, `CCS mark, ${nm}, flat three-tone`));
  set('parts', `refined-${key}-parts.svg`, gradientBuild(full, vbFull, pal, key, false, `CCS mark, ${nm}, in parts`, true));
  // small cut: flat fills, three tones (smallTones), one for dark grounds and one for light
  set('small', `refined-small-${key}.svg`, tones(small, vbSmall, 32, st.dark, `CCS mark, ${nm}, small-size cut, for dark grounds`));
  set('smallLight', `refined-small-${key}-light.svg`, tones(small, vbSmall, 32, st.light, `CCS mark, ${nm}, small-size cut, for light grounds`));
}
write('refined-mono-white.svg', solid(full, vbFull, 512, '#FFFFFF', 'CCS mark, white'));
write('refined-mono-ink.svg', solid(full, vbFull, 512, INK, 'CCS mark, ink'));

// ---------- refined Frontier F ----------
// Measured from assets/ccs-mark/suite/frontier-mark.svg. Its origin is (0, 0) and it uses the S's frame:
// u along the panels (up-right at 45 degrees), v across them. Three bands of width W separated by g;
// panel ends are quarter circles of radius W; each crescent is the panel-end circle moved s along u
// (outer edge) cut by a circle of radius W + g on the panel-end centre (inner edge), clipped to its band.
const frSrc = fs.readFileSync(path.join(ROOT, 'assets/ccs-mark/suite/frontier-mark.svg'), 'utf8');
const frD = [...frSrc.matchAll(/<path fill="url\(#g\d\)" d="([^"]+)"/g)].map((m) => {
  const n = m[1].match(/-?\d+(?:\.\d+)?/g).map(Number), pts = [];
  for (let i = 0; i < n.length; i += 2) pts.push({ u: (n[i] - n[i + 1]) / S2, v: (n[i] + n[i + 1]) / S2 });
  return pts;
});
const FM = (() => {
  const [p1, p2, p3, c1] = frD;
  const Wf = p1[0].v, g = p2[p2.length - 1].v - Wf; // band 1 is v 0..W; band 2 starts at W + g
  const u1 = p1[4].u - Wf, u2 = p2[1].u - Wf; // panel-end circle centres on panels 1 and 2
  const s = c1[1].u - Wf - u1; // crescent outer circle offset along u
  const ys = frD.flat().map((q) => (q.v - q.u) / S2), xs = frD.flat().map((q) => (q.u + q.v) / S2);
  return { W: Wf, g, u1, u2, s, t: s - g, p3W: p3[1].u, height: Math.max(...ys) - Math.min(...ys), width: Math.max(...xs) - Math.min(...xs) };
})();
function frontierF({ W, g, t }) {
  const s = t + g, { u1, u2 } = FM, map = (q) => ({ x: (q.x + q.y) / S2, y: (q.y - q.x) / S2 });
  const P = () => new Path(map), b2 = W + g, b3 = 2 * W + 2 * g, k = Math.sqrt((W + g) ** 2 - W * W), e = Math.asin(W / (W + g));
  const upper = P().M({ x: 0, y: W }).A({ x: W, y: W }, W, PI, 1.5 * PI).L({ x: u1 + W, y: 0 }).A({ x: u1, y: 0 }, W, 0, PI / 2).Z();
  const middle = P().M({ x: 0, y: b2 + W }).L({ x: u2 + W, y: b2 + W }).A({ x: u2, y: b2 + W }, W, 0, -PI / 2).L({ x: 0, y: b2 }).Z();
  const lower = P().M({ x: 0, y: b3 }).L({ x: W, y: b3 }).A({ x: 0, y: b3 }, W, 0, PI / 2).Z();
  const cl = P().M({ x: u1 + W + g, y: 0 }).L({ x: u1 + s + W, y: 0 }).A({ x: u1 + s, y: 0 }, W, 0, PI / 2)
    .L({ x: u1 + k, y: W }).A({ x: u1, y: 0 }, W + g, e, 0).Z();
  const cr = P().M({ x: u2 + W + g, y: b2 + W }).L({ x: u2 + s + W, y: b2 + W }).A({ x: u2 + s, y: b2 + W }, W, 0, -PI / 2)
    .L({ x: u2 + k, y: b2 }).A({ x: u2, y: b2 + W }, W + g, -e, 0).Z();
  // the crescent keeps a flat tip on the band edge only if the inner circle leaves the band before the outer one
  if (!(k < s)) throw new Error(`F crescent breaks at g ${g}, t ${t}`);
  return { upper, middle, lower, cl, cr, tipFlat: f(s - k) };
}
const FREF = { W: FM.W, g: REF.g, t: REF.t }, FSMALL = { W: FM.W, g: SMALL.g, t: SMALL.t };
const fFull = frontierF(FREF), fSmall = frontierF(FSMALL);
const fVb = bounds(ORDER.map((k) => fFull[k])), fVbSmall = bounds(ORDER.map((k) => fSmall[k]));
const FKEY = 'neon-cyberpunk', FPAL = PAL[FKEY], FID = 'f-neon-cyberpunk', fFiles = {};
const fset = (kind, rel, text) => { write(rel, text); fFiles[kind] = rel; };
fset('dark', 'refined-frontier-f-dark.svg', gradientBuild(fFull, fVb, FPAL, FID, false, 'Frontier mark, for dark grounds', false));
fset('light', 'refined-frontier-f-light.svg', gradientBuild(fFull, fVb, withLight(FKEY), FID, true, 'Frontier mark, for light grounds', false));
const FST = smallSet(FPAL, fSmall, fVbSmall);
fset('flat', 'refined-frontier-f-flat.svg', tones(fFull, fVb, 512, FST.dark, 'Frontier mark, flat three-tone'));
fset('parts', 'refined-frontier-f-parts.svg', gradientBuild(fFull, fVb, FPAL, FID, false, 'Frontier mark, in parts', true, false));
fset('small', 'refined-small-frontier-f.svg', tones(fSmall, fVbSmall, 32, FST.dark, 'Frontier mark, small-size cut, for dark grounds'));
fset('smallLight', 'refined-small-frontier-f-light.svg', tones(fSmall, fVbSmall, 32, FST.light, 'Frontier mark, small-size cut, for light grounds'));
fset('monoWhite', 'refined-frontier-f-mono-white.svg', solid(fFull, fVb, 512, '#FFFFFF', 'Frontier mark, white'));
fset('monoInk', 'refined-frontier-f-mono-ink.svg', solid(fFull, fVb, 512, INK, 'Frontier mark, ink'));


// masks: solid black on transparent, same viewBox as the full mark so they overlay the parts exactly
const maskFiles = {};
for (const k of ORDER) {
  const rel = `masks/${PIECE_ID[k]}.svg`;
  write(rel, svg(vbFull, 512, PIECE_ID[k], `<path d="${full[k].d}" fill="#000"/>`)); maskFiles[PIECE_ID[k]] = rel;
}
write('masks/s-silhouette.svg', svg(vbFull, 512, 'S silhouette', `<path d="${ORDER.map((k) => full[k].d).join('')}" fill="#000"/>`));
maskFiles['s-silhouette'] = 'masks/s-silhouette.svg';

// ---------- manifest ----------
const SQ = Math.SQRT1_2;
const manifest = {
  generator: 'gen.mjs, geometry from directions/mark-study/build.mjs (refined master)',
  viewBox: vbFull.join(' '),
  viewBoxSmall: vbSmall.join(' '),
  aspectRatio: { full: f(vbFull[2] / vbFull[3]), small: f(vbSmall[2] / vbSmall[3]), note: 'width divided by height' },
  units: 'master drawing units; panel width W is the unit scale',
  panelWidth: f(W),
  gap: { units: f(REF.g), fractionOfPanelWidth: 0.18, small: { units: f(SMALL.g), fractionOfPanelWidth: 0.34 } },
  crescentWidest: { fractionOfPanelWidth: 0.54, small: 0.62 },
  turnCentre: [f(O.x), f(O.y)],
  axis: {
    vector: [+SQ.toFixed(4), +(-SQ).toFixed(4)],
    description: 'unit vector along the three panels in SVG coordinates (x right, y down): up and to the right at 45 degrees. Same as uhat in motion/ccs-motion.js.',
    perPiece: {
      'panel-upper': { slideSign: 1, direction: [+SQ.toFixed(4), +(-SQ).toFixed(4)] },
      'panel-lower': { slideSign: -1, direction: [+(-SQ).toFixed(4), +SQ.toFixed(4)] },
      'panel-middle': { slideSign: 0, direction: [0, 0] },
      'crescent-left': { slideSign: 0, direction: [0, 0] },
      'crescent-right': { slideSign: 0, direction: [0, 0] },
    },
    note: 'translate(direction * distance). In motion/ccs-motion.js setK the upper panel (and the upper half of the middle) is clipped by a clip shape moved +uhat * k, the lower panel (and lower half of the middle) by one moved -uhat * k. The panels are not translated whole: their arc ends retract by k while the caps stay put, and the crescents grow into the space. Moving the whole panel by the same vector is the simple version and uses the same axis and distance.',
  },
  slide: {
    unit: 'master drawing units, in the viewBox of these files (the refined mark has the same W and turn centre as the master)',
    distance: { versionA: 850, versionB: 1000 },
    fractionOfPanelWidth: { versionA: f(850 / W), versionB: f(1000 / W) },
    source: 'motion/ccs-motion.js: C.versions {a: 850, b: 1000}, slider range 0 to 1000',
    closedAt: 0,
  },
  grounds: { light: LIGHT_GROUND, inkHex: INK },
  files: {
    pattern: {
      dark: 'refined-<key>-dark.svg', light: 'refined-<key>-light.svg', flat: 'refined-<key>-flat.svg',
      parts: 'refined-<key>-parts.svg', small: 'refined-small-<key>.svg', smallLight: 'refined-small-<key>-light.svg',
    },
    monoWhite: 'refined-mono-white.svg', monoInk: 'refined-mono-ink.svg', masks: maskFiles,
  },
  partIds: Object.values(PIECE_ID),
  maskUse: 'Same viewBox as the full mark. Layer a mask over the parts file (or size both to the same box) and they align exactly.',
  colourways: KEYS.map((key) => {
    const p = PAL[key];
    return {
      key, order: p.order, name: p.name, short: p.short, labRole: p.role,
      lead: lead(p), ground: p.ground, groundHi: p.groundHi, inkDeep: p.inkDeep, glow: p.glow, stroke: p.stroke,
      hasLightOverride: !!p.light,
      lightOverrides: strip(DERIVED[key]),
      supersedesPalette: !!p.light,
      ...(p.light ? { paletteLight: p.light } : {}),
      smallTones: SMALLTONES[key],
      flatTones: { panels: SMALLTONES[key].dark.panels, middle: SMALLTONES[key].dark.middle, crescents: SMALLTONES[key].dark.crescents, note: 'same as the dark-ground small cut' },
      lightContrast: contrast(withLight(key)),
      files: files[key],
    };
  }),
};
const r3 = (x) => +x.toFixed(3);
manifest.lightRule = {
  version: 3,
  appliesTo: 'every colourway, including those with a palette.js light override (supersedesPalette: true on those)',
  space: 'OKLCH for edits, CIEDE2000 for contrast on ' + LIGHT_GROUND,
  panels: 'unchanged: the lead fade g0',
  chroma: 'a reworked stop takes C = max(own C, dark middle mid-colour C, lead C), reduced only to fit sRGB at fixed L and hue. Hue held. If the middle targets cannot be met on the lit side at that chroma, the middle takes the most chroma sRGB allows (listed in middleAtGamutMaxChroma).',
  middlePanel: 'both g1 stops drop by one amount dL (0.005 steps), the least that gives lighter stop vs ground >= ' + (T.midGround + T.margin) + ' and middle vs panels >= ' + (T.midPanels + T.margin) + ' (mid-colours).',
  crescent: 'deep g3 stop kept; the pale stop takes the highest L at or under its own (0.005 steps) that gives crescent vs panels >= ' + (T.cresPanels + T.margin) + ' (mid-colours). g4 mirrors g3.',
  targets: { middleVsGround: T.midGround, middleVsPanels: T.midPanels, crescentsVsPanels: T.cresPanels, middleChroma: '>= dark middle chroma' },
  litSide: 'the middle mid-colour stays lighter than the panel mid-colour; where both targets cannot be met there, the dL with the best min(achieved / target) is used',
  dL: Object.fromEntries(KEYS.map((k) => [k, DERIVED[k]._dL])),
  middleAtGamutMaxChroma: KEYS.filter((k) => DERIVED[k]._gamutMax),
  status: 'lightOverrides are derived here and used by the light builds; not yet in palette.js. Where supersedesPalette is true they replace the palette.js override.',
};
manifest.smallRule = {
  fills: 'flat, no gradients; panels lead, middle lit tone, crescents deep tone',
  tones: 'lit from the middle fade, deep from the crescent fade, hue and chroma rule as lightRule; L moved in 0.005 steps the least distance to reach ' + SMALL_T + ' between pieces (v3 dark ground: crescents take the pale crescent stop, L moved the least, lighter first and under the middle, to reach 15 from panels and 30 from navy and the platform groundHi; middle takes the lightest middle stop and is the brightest piece; panels the lead)',
  targets: { adjacentPieces: 20, markVsGround: 30 },
  markVsGround: 'CIEDE2000 of the area-weighted OKLab mean of the five pieces against the ground (how the mark reads at 16px)',
  grounds: { dark: 'the colourway ground', light: LIGHT_GROUND },
  flat: 'refined-<key>-flat.svg uses the dark-ground small tones on the full geometry',
};
manifest.frontier = {
  colourway: FKEY,
  source: 'assets/ccs-mark/suite/frontier-mark.svg, measured and rebuilt from parameters',
  viewBox: fVb.join(' '), viewBoxSmall: fVbSmall.join(' '),
  aspectRatio: { full: f(fVb[2] / fVb[3]), small: f(fVbSmall[2] / fVbSmall[3]), note: 'width divided by height' },
  heightVsS: f(fVb[3] / vbFull[3]),
  measured: { panelWidth: f(FM.W), gap: f(FM.g), gapFraction: r3(FM.g / FM.W), crescentWidest: f(FM.t), crescentFraction: r3(FM.t / FM.W), crescentOffset: f(FM.s), panelEndCentres: [f(FM.u1), f(FM.u2)], panelEndRadius: f(FM.W), width: f(FM.width), height: f(FM.height) },
  refined: { panelWidth: f(FREF.W), gap: f(FREF.g), gapFraction: 0.18, crescentWidest: f(FREF.t), crescentFraction: 0.54, crescentOffset: f(FREF.t + FREF.g), panelEndRadius: f(FREF.W), crescentInnerRadius: f(FREF.W + FREF.g), crescentTipFlat: fFull.tipFlat, width: fVb[2], height: fVb[3] },
  small: { gap: f(FSMALL.g), gapFraction: 0.34, crescentWidest: f(FSMALL.t), crescentFraction: 0.62, crescentTipFlat: fSmall.tipFlat },
  unchanged: 'W, 45 degree axis, panel-end radius W, panel-end centres along u, arm lengths',
  lightContrast: contrast(withLight(FKEY)),
  lightOverrides: strip(DERIVED[FKEY]), supersedesPalette: !!FPAL.light,
  smallTones: FST,
  partIds: Object.values(PIECE_ID),
  files: fFiles,
};
write('manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`wrote ${Object.keys(files).length * 5 + 2 + 6} svgs and manifest; viewBox ${manifest.viewBox}; W ${manifest.panelWidth}`);
