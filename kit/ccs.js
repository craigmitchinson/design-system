/* CCS v3 kit script. Load palette.js first, then this, at the end of <body>:
     <script src="palette.js"></script> <script src="kit/ccs.js"></script>
   It writes each surface's colours from window.CCS_PALETTE, wires the cut, places marks, builds the found C,
   runs the one motion and the mobile menu. Everything is on window.CCS. Reference: kit/README.md. */
(function () {
  "use strict";
  const KIT = new URL(".", (document.currentScript && document.currentScript.src) || location.href);
  const MARKS = new URL("../marks/", KIT).href;
  const RV = "-110.24 -75.58 5137.8 6158.35";
  /* The refined master, used only if a marks file cannot be fetched. */
  const RP = ["M2412.15 -75.58A1315.59 1315.59 0 0 1 2412.15 1784.95L899.28 3297.82A1434 1434 0 0 1 979.54 1357.03L2412.15 -75.58Z", "M1066.72 3465.27L1909.8 2622.19A1434 1434 0 0 1 3850.6 2541.92L3007.52 3385A1434 1434 0 0 1 1066.72 3465.27Z", "M2505.17 6082.77A1315.59 1315.59 0 0 1 2505.17 4222.24L4018.04 2709.37A1434 1434 0 0 1 3937.78 4650.16L2505.17 6082.77Z", "M372.02 1968.15A1434 1434 0 1 0 2396.39 3992.52A1670.8 1670.8 0 0 1 372.02 1968.15Z", "M4545.3 4039.04A1434 1434 0 1 0 2520.93 2014.67A1670.8 1670.8 0 0 1 4545.3 4039.04Z"];
  const PARTS = ["panel-upper", "panel-middle", "panel-lower", "crescent-left", "crescent-right"];
  const PN = ["p1", "p2", "p3", "c1", "c2"];
  const SMALL_UNDER = 40, GLOW_FROM = 64;
  /* Platform's dark-ground .lit uses its vivid light-ground middle (manifest lightOverrides["1"]); the silver fade read as grey. */
  const PLAT_LIT = ["#82AEFF", "#A5CCFF"];
  const pal = () => window.CCS_PALETTE || {};
  let uid = 0, manifestP = null;

  function lum(hex) {
    const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255].map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); });
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  }

  /* Contrast ratio of two hex colours, and the lead lightened toward white (hue kept) until it reaches 3:1 (large text)
     against both ends of the ground fade. */
  function ratio(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
  function accentOn(hex, g0, g1) {
    const n = parseInt(hex.slice(1), 16), rgb = [n >> 16, (n >> 8) & 255, n & 255];
    for (let t = 0; t <= 1.001; t += .02) {
      const h = "#" + rgb.map(v => Math.round(v + (255 - v) * t).toString(16).padStart(2, "0")).join("");
      if (ratio(h, g0) >= 3.02 && ratio(h, g1) >= 3.02) return h;
    }
    return "#FFFFFF";
  }

  /* The CSS variables for one colourway. Platform keeps its silver text; labs use white. */
  function vars(key) {
    const c = pal()[key]; if (!c) return null;
    const mid = c.g[1], tint = lum(mid[0]) > lum(mid[1]) ? mid[0] : mid[1];
    const platform = key === "platform";
    return {
      "--ground": c.ground, "--ground-hi": c.groundHi,
      "--fg": platform ? "#F4F7FB" : "#FFFFFF",
      "--fg-2": platform ? "#C9D3E6" : `color-mix(in srgb, #FFFFFF 78%, ${tint})`,
      "--tint": tint, "--lead": c.g[0][0], "--accent": accentOn(c.g[0][0], c.ground, c.groundHi),
      "--lit-1": platform ? PLAT_LIT[0] : mid[0], "--lit-2": platform ? PLAT_LIT[1] : mid[1], "--lit-ink": c.deep, "--glow": c.glow
    };
  }
  function setVars(el, v) { for (const k in v) el.style.setProperty(k, v[k]); }

  /* Surfaces, in document order, ignoring any colourway nested inside another surface. */
  function surfaces(root = document) {
    const all = [...root.querySelectorAll("[data-colourway],[data-surface]")];
    return all.filter(el => {
      const outer = el.parentElement && el.parentElement.closest("[data-colourway],[data-surface]");
      if (outer) { console.warn("CCS: one colourway per surface. Nested surface ignored; use data-swatch for a specimen.", el); el.setAttribute("data-colourway-ignored", el.dataset.colourway || el.dataset.surface); el.removeAttribute("data-colourway"); el.removeAttribute("data-surface"); return false; }
      return true;
    });
  }
  const isDark = el => el.hasAttribute("data-colourway");

  function paint(root = document) {
    const list = surfaces(root);
    list.forEach(el => { if (isDark(el)) { const v = vars(el.dataset.colourway); if (v) setVars(el, v); else console.warn("CCS: unknown colourway", el.dataset.colourway); } });
    root.querySelectorAll("[data-swatch]").forEach(el => { const v = vars(el.dataset.swatch); if (v) setVars(el, v); });
    root.querySelectorAll(".found-c[data-lead]").forEach(el => { const c = pal()[el.dataset.lead]; if (c) el.style.setProperty("--fc-lead", c.g[0][0]); });
    /* Rule note: one lit element per surface. */
    list.forEach(s => { const n = [...s.querySelectorAll(".lit")].filter(l => l.closest("[data-colourway],[data-surface],[data-swatch]") === s).length; if (n > 1) console.warn(`CCS: ${n} lit elements on one surface; the rule is one.`, s); });
    return list;
  }

  /* The cut. data-cut on a section cuts its top edge. The channel shows only between two dark fields. */
  function cuts(root = document) {
    const list = surfaces(root);
    list.forEach((el, i) => {
      if (!el.dataset.cut) return;
      const prev = list[i - 1]; if (!prev) return;
      prev.setAttribute("data-cut-below", el.dataset.cut);
      if (isDark(el) && isDark(prev)) el.setAttribute("data-chan", ""); else el.removeAttribute("data-chan");
      if (!isDark(el) && !isDark(prev)) console.warn("CCS: two Stone surfaces are one section, never cut.", el);
    });
  }

  /* data-cut-side="auto": the run goes on the side opposite the section's first content block.
     The first content block is the first visible child; a wrapper wider than 90% of the section is opened. */
  function cutSides(root = document) {
    root.querySelectorAll('[data-cut-side="auto"]').forEach(sec => {
      const r = sec.getBoundingClientRect(); let el = sec, b = null;
      for (let k = 0; k < 6; k++) {
        const kid = [...el.children].find(c => { const q = c.getBoundingClientRect(), cs = getComputedStyle(c); return q.width && q.height && cs.position !== "absolute" && cs.position !== "fixed" && !c.classList.contains("sr-only"); });
        if (!kid) break; el = kid; b = kid.getBoundingClientRect();
        if (b.width < r.width * .9 || !kid.children.length) break;
      }
      if (!b) return;
      sec.dataset.cut = (b.left - r.left) <= (r.right - b.right) + 1 ? "right" : "left";
    });
  }

  /* Space at the cut. The open side starts at normal section padding (--pad below the flat edge). Then every text line
     and mark is measured against the triangle, and the channel where there is one: content is pushed down only by the
     amount it truly overlaps, plus one gap (--g). The section above is checked the same way against the run that covers
     its foot. Absolutely positioned content is not moved by padding and is left to the page. Opt out with data-cut-fit="off". */
  function contentBoxes(sec) {
    const boxes = [];
    const pinned = e => { for (let p = e; p && p !== sec; p = p.parentElement) { const ps = getComputedStyle(p).position; if (ps === "absolute" || ps === "fixed") return true; } return false; };
    const tw = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
    for (let n; (n = tw.nextNode());) {
      const pe = n.parentElement;
      if (!n.textContent.trim() || !pe || pe.closest(".sr-only,.skip") || pinned(pe)) continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      boxes.push(...rg.getClientRects());
    }
    sec.querySelectorAll("[data-mark],img,svg,button,.lit,video,canvas,input,select,textarea").forEach(e => {
      if (pinned(e) || e.closest(".sr-only") || (e.parentElement && e.parentElement.closest("[data-mark]"))) return;
      boxes.push(e.getBoundingClientRect());
    });
    return boxes.filter(b => b.width > 0 && b.height > 0);
  }
  function fitCuts(root = document) {
    const probe = document.createElement("div");
    probe.style.cssText = "position:absolute;visibility:hidden;padding-top:var(--pad)";
    document.body.append(probe);
    const pad = parseFloat(getComputedStyle(probe).paddingTop) || 0;
    const gap = (probe.style.paddingTop = "var(--g)", parseFloat(getComputedStyle(probe).paddingTop)) || 24;
    probe.remove();
    const st = document.createElement("style"); st.textContent = "*{translate:none!important;transition:none!important}"; document.head.append(st);
    const list = surfaces(root);
    list.forEach((sec, i) => {
      if (!sec.dataset.cut) return;
      const prev = list[i - 1];
      sec.style.removeProperty("padding-top");
      if (prev && prev.dataset.cutFitPb) { prev.style.removeProperty("padding-bottom"); delete prev.dataset.cutFitPb; }
      if (sec.dataset.cutFit === "off") return;
      const probeS = document.createElement("div");
      probeS.style.cssText = "position:absolute;visibility:hidden;padding-top:var(--S)";
      sec.append(probeS); const S = parseFloat(getComputedStyle(probeS).paddingTop) || 0; probeS.remove();
      const left = sec.dataset.cut === "left", d = sec.hasAttribute("data-chan") ? gap * 1.4142 : 0;
      /* The section above: its foot is covered everywhere below this section's top edge. */
      if (prev && prev.dataset.cutFit !== "off") {
        const pb0 = left ? pad + S : pad;
        prev.style.paddingBottom = pb0 + "px";
        const r = sec.getBoundingClientRect(), W = r.width;
        let over = 0;
        contentBoxes(prev).forEach(b => {
          const x1 = b.right - r.left; if (x1 <= 0 || b.left - r.left >= W) return;
          const edge = left ? Math.max(0, S - x1) : (x1 <= W - S ? S : Math.max(0, S - (x1 - (W - S))));
          over = Math.max(over, b.bottom - r.top - (edge - gap));
        });
        prev.style.paddingBottom = pb0 + Math.max(0, Math.ceil(over)) + "px"; prev.dataset.cutFitPb = "1";
      }
      /* This section: content starts at normal padding on the open side, then clears the triangle and the channel. */
      const base = left ? pad : S + pad;
      sec.style.paddingTop = base + "px";
      const r = sec.getBoundingClientRect(), W = r.width;
      let need = 0;
      contentBoxes(sec).forEach(b => {
        const x0 = b.left - r.left; if (b.right - r.left <= 0 || x0 >= W) return;
        const edge = left ? Math.max(0, S + d - Math.max(0, x0)) : (x0 < W - S + d ? S : Math.max(0, S - (x0 - (W - S + d))));
        need = Math.max(need, edge + gap - (b.top - r.top));
      });
      sec.style.paddingTop = base + Math.max(0, Math.ceil(need)) + "px";
    });
    st.remove();
  }

  /* The light. On a dark surface or a swatch, .lit inherits that colourway's middle-panel fade from palette.js.
     On Stone it takes the colourway's vivid light-ground middle (manifest lightOverrides["1"]) with Ink text.
     The colourway is the nearest data-colourway or data-swatch, a nested colourway that paint() set aside,
     or a data-lead on the .lit or an ancestor; platform otherwise. Without the manifest, the dark middle fade is used. */
  async function lits(root = document) {
    const m = await manifest().catch(() => null);
    root.querySelectorAll(".lit").forEach(l => {
      const own = l.closest("[data-colourway],[data-swatch],[data-colourway-ignored],[data-surface]");
      if (!own) return;
      const surf = l.closest("[data-colourway],[data-surface]");
      const onStone = !!surf && !isDark(surf);
      const lead = l.closest("[data-lead]");
      const key = own.dataset.colourway || own.dataset.swatch || own.dataset.colourwayIgnored || (lead && lead.dataset.lead) || "platform";
      const c = pal()[key]; if (!c) return;
      if (own.hasAttribute("data-swatch")) return;
      if (!onStone) {
        if (own !== surf) { const v = vars(key); if (v) setVars(l, { "--lit-1": v["--lit-1"], "--lit-2": v["--lit-2"], "--lit-ink": v["--lit-ink"] }); }
        return;
      }
      const cw = m && m.colourways && m.colourways.find(x => x.key === key);
      const mid = (cw && cw.lightOverrides && cw.lightOverrides["1"]) || c.g[1];
      setVars(l, { "--lit-1": mid[0], "--lit-2": mid[1], "--lit-ink": "var(--ink)" });
    });
  }

  function manifest() {
    if (!manifestP) manifestP = fetch(MARKS + "manifest.json").then(r => r.ok ? r.json() : null).catch(() => null);
    return manifestP;
  }
  function fallbackSVG(key, build) {
    const c = pal()[key] || pal().platform; if (!c) return "";
    const g = c.g.map((s, i) => build === "light" && c.light && c.light[i] ? c.light[i] : s);
    const id = "ccsm" + (uid++), st = [g[0], g[1], [g[0][1], g[0][0]], g[3], g[4]];
    if (build === "mono") return `<svg viewBox="${RV}" aria-hidden="true" focusable="false"><g fill="currentColor">${RP.map(d => `<path d="${d}"/>`).join("")}</g></svg>`;
    return `<svg viewBox="${RV}" aria-hidden="true" focusable="false"><defs>${st.map((s, i) => `<linearGradient id="${id}${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s[0]}"/><stop offset="1" stop-color="${s[1]}"/></linearGradient>`).join("")}</defs>${RP.map((d, i) => `<path class="${PN[i]}" d="${d}" fill="url(#${id}${i})"/>`).join("")}</svg>`;
  }
  /* Inline an SVG file with its ids made unique and its parts classed p1 p2 p3 c1 c2 for the assembly. */
  function inlineSVG(text) {
    const doc = new DOMParser().parseFromString(text, "image/svg+xml"), svg = doc.documentElement;
    if (svg.nodeName !== "svg") throw new Error("not svg");
    PARTS.forEach((p, i) => { const e = doc.getElementById(p); if (e) e.classList.add(PN[i]); });
    if (!svg.querySelector(".p1")) { const ps = [...svg.querySelectorAll("path")]; if (ps.length === 5) ps.forEach((p, i) => p.classList.add(PN[i])); }
    const pre = "ccsi" + (uid++) + "-";
    svg.querySelectorAll("[id]").forEach(e => e.id = pre + e.id);
    svg.querySelectorAll("*").forEach(e => {
      for (const a of ["fill", "stroke", "clip-path", "mask", "href", "xlink:href"]) { const v = e.getAttribute(a); if (v && v.includes("#")) e.setAttribute(a, v.replace(/url\(#([^)]+)\)/g, `url(#${pre}$1)`).replace(/^#(.+)$/, `#${pre}$1`)); }
    });
    svg.removeAttribute("width"); svg.removeAttribute("height"); svg.removeAttribute("role"); svg.removeAttribute("aria-label");
    svg.setAttribute("aria-hidden", "true"); svg.setAttribute("focusable", "false");
    return document.importNode(svg, true);
  }

  /* The mark sits on a light ground: the nearest surface ancestor is Stone, or a swatch/surface that declares a light ground. */
  function lightGround(el) {
    const s = el.closest("[data-colourway],[data-surface],[data-swatch],[data-ground]");
    if (!s) return false;
    if (s.dataset.ground) return s.dataset.ground === "light";
    return s.dataset.surface === "stone";
  }
  /* Choose the build: small under 40px, mono on request, light on Stone, dark otherwise. */
  function chooseBuild(el) {
    const want = el.dataset.build || el.dataset.v || "auto", h = el.getBoundingClientRect().height || parseFloat(getComputedStyle(el).height) || 120;
    const stone = lightGround(el);
    let b = want;
    if (want === "auto") b = h < SMALL_UNDER ? "small" : stone ? "light" : "dark";
    if (b === "small" && lightGround(el)) b = "smallLight";
    if (want === "mono") b = stone ? "mono-ink" : "mono-white";
    return { b, h, stone };
  }
  /* Glow scales with the mark up to a cap: 3% of height to 200px (as before), then about 2% of width, never over 16px,
     and the colour fades from full to 60% (alpha .55 becomes about .33) by 400px. */
  function glowRadius(h) { return h <= 200 ? Math.round(Math.max(4, h * .03)) : Math.min(16, Math.max(6, Math.round(h * .02))); }
  function glowStrength(h) { return h <= 200 ? 100 : Math.round(Math.max(60, 100 - (h - 200) * .2)); }
  async function placeMark(el) {
    const key = el.dataset.mark || "platform", { b, h, stone } = chooseBuild(el), m = await manifest();
    const cw = m && m.colourways.find(c => c.key === key);
    el.dataset.built = b.startsWith("mono") ? "mono" : b === "smallLight" ? "small" : b;
    let file = null;
    if (m && b === "mono-ink") file = m.files.monoInk; else if (m && b === "mono-white") file = m.files.monoWhite; else if (cw) file = cw.files[b];
    const inline = b === "parts" || el.hasAttribute("data-assemble");
    if (inline && !file && cw) file = cw.files.parts;
    try {
      if (!file) throw new Error("no file");
      if (inline) { const t = await (await fetch(MARKS + file)).text(); el.replaceChildren(inlineSVG(t)); }
      else await new Promise((ok, no) => { const img = new Image(); img.alt = ""; img.decoding = "async"; img.onload = ok; img.onerror = no; img.src = MARKS + file; el.replaceChildren(img); });
    } catch (e) { el.innerHTML = fallbackSVG(key, b.startsWith("mono") ? "mono" : b === "smallLight" ? "light" : b); }
    const glowOk = !stone && h >= GLOW_FROM && (b === "dark" || b === "parts");
    el.classList.toggle("has-glow", glowOk);
    if (glowOk) { el.style.setProperty("--glow", (cw && cw.glow) || (pal()[key] || {}).glow); el.style.setProperty("--glow-r", glowRadius(h) + "px"); el.style.setProperty("--glow-k", glowStrength(h) + "%"); }
  }
  function marks(root = document) { return Promise.all([...root.querySelectorAll("[data-mark]")].map(placeMark)); }

  /* The found C from the masks: panels in Ink, crescents in the lead, filled as it enters view. */
  async function foundC(root = document) {
    const els = root.querySelectorAll(".found-c"); if (!els.length) return;
    if (document.querySelectorAll(".found-c").length > 1) console.warn("CCS: the found C appears once per page.");
    const ds = await Promise.all(PARTS.map(async (p, i) => { try { const t = await (await fetch(MARKS + "masks/" + p + ".svg")).text(); const m = t.match(/ d="([^"]+)"/); if (m) return m[1]; } catch (e) {} return RP[i]; }));
    const svg = `<svg viewBox="${RV}" aria-hidden="true" focusable="false">${ds.map((d, i) => `<path class="${i < 3 ? "pn" : "cr"}" d="${d}"/>`).join("")}</svg>`;
    els.forEach(el => el.innerHTML = svg);
  }

  let io = null;
  function enter(root = document) {
    const els = root.querySelectorAll("[data-enter],.found-c");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
  }

  /* Replay the assembly on a parts mark. */
  function assemble(el) { el.classList.remove("asm"); void el.offsetWidth; el.classList.add("asm"); }

  /* Header: the mobile menu button and the current page. */
  function nav() {
    const here = (location.pathname.split("/").pop() || "index.html");
    document.querySelectorAll(".nav a").forEach(a => { const f = new URL(a.href, location.href); if (f.pathname.split("/").pop() === here && !f.hash) a.setAttribute("aria-current", "page"); });
    document.querySelectorAll(".menu[aria-controls]").forEach(btn => {
      const panel = document.getElementById(btn.getAttribute("aria-controls")); if (!panel) return;
      const set = open => { btn.setAttribute("aria-expanded", String(open)); panel.classList.toggle("open", open); };
      set(false);
      btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
      panel.addEventListener("keydown", e => { if (e.key === "Escape") { set(false); btn.focus(); } });
      btn.addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
    });
  }

  /* Chips that copy their text. */
  function chips() {
    let live = document.getElementById("ccs-live");
    document.querySelectorAll("button.chip").forEach(b => b.addEventListener("click", async () => {
      const t = b.dataset.copy || b.textContent.trim();
      try { await navigator.clipboard.writeText(t); } catch (e) {}
      if (!live) { live = document.createElement("p"); live.id = "ccs-live"; live.className = "sr-only"; live.setAttribute("aria-live", "polite"); document.body.append(live); }
      live.textContent = "Copied " + t;
    }));
  }

  async function init() {
    document.documentElement.classList.add("ccs-js");
    paint(); cutSides(); cuts(); nav(); chips();
    await Promise.all([marks(), foundC()]);
    cutSides(); cuts(); fitCuts(); await lits();
    let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { cutSides(); cuts(); fitCuts(); }, 120); });
    enter();
    document.querySelectorAll("[data-assemble]").forEach(el => el.classList.add("asm"));
    document.dispatchEvent(new CustomEvent("ccs:ready"));
  }

  window.CCS = { vars, paint, cuts, cutSides, fitCuts, lits, marks, placeMark, foundC, enter, assemble, nav, manifest, init, MARKS, RV };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
