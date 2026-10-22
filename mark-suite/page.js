/* Mark Suite page script. Builds the repeated specimens, runs the colourway picker, and draws the builds the kit
   does not carry: the Frontier F (from the refined F files), print, outline and single-tone builds (from the parts files).
   Loaded after palette.js and before kit/ccs.js, so the kit places every S mark this script writes. */
(() => {
  const P = window.CCS_PALETTE || {};
  const KEYS = Object.keys(P).sort((a, b) => P[a].order - P[b].order);
  const SIX = KEYS.filter(k => P[k].role !== "Spare");
  const MARKS = "marks/";
  const KIT = new Set(["auto", "dark", "light", "flat", "small", "parts"]);
  const PAPER = "#E3DFD6";
  let man = null;
  const manP = fetch(MARKS + "manifest.json").then(r => r.json()).then(m => (man = m)).catch(() => null);
  let cur = new URLSearchParams(location.search).get("c");
  if (!P[cur]) cur = "platform";
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const role = k => (P[k].role.split(" · ")[1] || P[k].role);
  const sub = k => k === "platform" ? "Parent for every lab" : k === "neon-cyberpunk" ? "Innovation forum" : P[k].role;
  const pickRole = k => k === "platform" ? "All labs together" : k === "neon-cyberpunk" ? "Innovation forum" : P[k].role;
  const labName = k => k === "platform" ? "Platform" : P[k].role === "Spare" ? P[k].short : role(k);

  /* Mark markup. b: auto dark light flat small parts, or page builds: print outline quiet deboss monoInk monoWhite. */
  const mk = (k, b = "auto", o = {}) =>
    `<span class="mark${o.cls ? " " + o.cls : ""}" data-k="${k}" data-b="${b}"${o.s ? " data-s" : ""}${o.f ? " data-follow" : ""} style="--mark-h:${o.h || "120px"}"${o.label ? ` role="img" aria-label="${o.label}"` : ""}></span>`;

  /* Parts cache: the five path outlines and viewBox from a parts file, for the page builds. */
  const parts = {};
  function getParts(file) {
    if (!parts[file]) parts[file] = fetch(MARKS + file).then(r => r.text()).then(t => {
      const d = new DOMParser().parseFromString(t, "image/svg+xml"), svg = d.querySelector("svg");
      const p = {}; ["panel-upper", "panel-middle", "panel-lower", "crescent-left", "crescent-right"].forEach(id => { const e = d.getElementById(id); p[id] = e ? e.getAttribute("d") : ""; });
      return { vb: svg.getAttribute("viewBox"), p };
    });
    return parts[file];
  }
  function toneSVG({ vb, p }, k, b) {
    const c = P[k];
    let fills, extra = "";
    if (b === "print") fills = [c.inkDeep, c.g[0][0], c.inkDeep, c.deep, c.deep];
    else if (b === "quiet") fills = Array(5).fill(c.groundHi);
    else if (b === "paper") fills = Array(5).fill(PAPER);
    else if (b === "deboss") fills = Array(5).fill(c.deep);
    else { fills = Array(5).fill("none"); extra = ` stroke="${c.stroke}" stroke-width="64" stroke-linejoin="round"`; }
    const ids = ["panel-upper", "panel-middle", "panel-lower", "crescent-left", "crescent-right"];
    return `<svg viewBox="${vb}" aria-hidden="true" focusable="false">${ids.map((id, i) => `<path d="${p[id]}" fill="${fills[i]}"${extra}/>`).join("")}</svg>`;
  }

  /* Place one mark: S builds through the kit, everything else here. */
  async function put(el, kitReady) {
    const k = el.dataset.k, b = el.dataset.b || "auto", F = k === "neon-cyberpunk" && !el.hasAttribute("data-s");
    if (!F && KIT.has(b)) {
      el.classList.remove("fm", "fm-small", "has-glow");
      el.dataset.mark = k; el.dataset.build = b;
      if (kitReady && window.CCS) await window.CCS.placeMark(el);
      return;
    }
    delete el.dataset.mark; delete el.dataset.build; delete el.dataset.built;
    const m = await manP;
    const stone = !!el.closest('[data-surface="stone"],.on-light');
    const h = el.getBoundingClientRect().height || parseFloat(getComputedStyle(el).height) || 120;
    let bb = b;
    if (b === "small" && stone) bb = "smallLight";
    if (b === "auto") bb = h < 40 ? "small" : stone ? "light" : "dark";
    el.classList.toggle("fm", F); el.classList.toggle("fm-small", F && bb.startsWith("small"));
    const files = F ? (m && m.frontier.files) : null, cw = m && m.colourways.find(c => c.key === k);
    try {
      if (["print", "quiet", "paper", "deboss"].includes(bb)) {
        const file = F ? files.parts : cw.files.parts;
        el.innerHTML = toneSVG(await getParts(file), k, bb);
      } else {
        const file = F ? files[bb] : bb.startsWith("mono") ? m.files[bb] : cw.files[bb];
        const img = new Image(); img.alt = ""; img.decoding = "async"; img.src = MARKS + file; el.replaceChildren(img);
      }
    } catch (e) { el.textContent = ""; }
    const glow = !stone && h >= 64 && bb === "dark" && !el.classList.contains("noglow");
    el.classList.toggle("has-glow", glow);
    if (glow) { el.style.setProperty("--glow", P[k].glow); el.style.setProperty("--glow-r", Math.round(Math.max(4, h * .03)) + "px"); }
  }

  /* ---------- Specimens ---------- */
  const fill = (id, html) => { const e = document.getElementById(id); if (e) e.innerHTML = html; };

  fill("suite-dark", SIX.map(k => `<li data-swatch="${k}">${mk(k, "dark", { h: "var(--sh)", label: `${P[k].short} mark, dark build` })}<span class="sn">${P[k].short}</span><span class="sr">${sub(k)}</span></li>`).join(""));
  fill("suite-light", SIX.map(k => `<li>${mk(k, "light", { h: "var(--sh)", label: `${P[k].short} mark, light build` })}<span class="sn">${P[k].short}</span><span class="sr">${sub(k)}</span></li>`).join(""));
  fill("suite-small", SIX.map(k => `<li><span class="dot" data-swatch="${k}">${mk(k, "small", { h: "26px" })}</span>${mk(k, "small", { h: "16px", label: `${P[k].short} mark at 16 pixels` })}<span class="sbar" style="background:${P[k].g[0][0]}"></span><span class="sn">${P[k].short}</span></li>`).join(""));

  const frV = [["On light", "light", "on-light"], ["Flat", "flat", ""], ["Print on light", "print", "on-light canvas"], ["Mono reversed", "monoWhite", ""], ["Mono ink", "monoInk", "on-light"]];
  fill("fr-vars", frV.map(([l, b, c]) => `<li class="${c}"${c ? "" : ' data-swatch="neon-cyberpunk"'}>${mk("neon-cyberpunk", b, { h: "clamp(96px,9vw,150px)" })}<span class="vl">${l}</span></li>`).join(""));
  fill("fr-sizes", [64, 32, 16].map(n => `<li>${mk("neon-cyberpunk", n >= 40 ? "dark" : "small", { h: n + "px" })}<span class="mono">${n}px</span></li>`).join(""));

  fill("picker", KEYS.map(k => `<li><button type="button" class="pick nudge" data-swatch="${k}" data-key="${k}" aria-pressed="false">${mk(k, "dark", { h: "clamp(72px,7vw,104px)" })}<span class="pn">${P[k].short}</span><span class="pr">${pickRole(k)}</span><span class="pf">${P[k].name}</span><span class="ps">Showing</span></button></li>`).join(""));

  const V = [
    ["Primary", "dark", "Symmetric panels, glowing crescents, no outline. The default on dark grounds.", "sw"],
    ["No glow", "dark", "For print and busy imagery, where the bloom reads as blur.", "sw noglow"],
    ["On light", "light", "The light-ground build. Pale tones are deepened where needed.", "on-light"],
    ["Flat colour", "flat", "Solid fills for screens and mid sizes.", "sw"],
    ["Print on light", "print", "Two panel tones and dark crescents. For canvas, paper and embroidery.", "on-light canvas"],
    ["Small size", "small", "Flat fills with widened gaps. Use below 40px: favicons, avatars, tabs.", "sw small"],
    ["Mono reversed", "monoWhite", "White on any dark or photographic ground.", "sw"],
    ["Mono ink", "monoInk", "One-colour print, stamps and legal documents.", "on-light"]];
  fill("vars", V.map(([l, b, n, c]) => `<li><div class="vt ${c.replace("sw", "")}"${c.startsWith("sw") ? ' data-swatch="platform" data-follow' : ""}>${mk("platform", b, { f: 1, h: c.includes("small") ? "32px" : "clamp(110px,11vw,170px)", cls: c.includes("noglow") ? "noglow" : "" })}</div><h3 class="display vh">${l}</h3><p>${n}</p></li>`).join(""));

  fill("ladder", [160, 96, 64, 40, 24, 16].map(n => `<li>${mk("platform", n >= 40 ? "dark" : "small", { f: 1, h: n + "px" })}<span class="mono">${n}px</span></li>`).join(""));

  /* Teams wallpaper: a field of quiet marks with one slot lit. */
  const field = (b, lit) => Array.from({ length: 24 }, (_, i) => i === lit ? mk("platform", b === "paper" ? "light" : "dark", { f: 1, h: "var(--fh)", s: 1, cls: "noglow" }) : mk("platform", b, { f: 1, h: "var(--fh)", s: 1 })).join("");
  fill("bg-wall", field("quiet", 15));
  fill("bg-paper", field("paper", 8));

  const hex = h => `<button type="button" class="chip" style="--c:${h}">${h}</button>`;
  fill("pal-body", KEYS.map(k => { const c = P[k]; return `<tr><th scope="row">${c.short}<span class="muted pr-role">${c.role}</span></th><td>${hex(c.g[0][0])} ${hex(c.g[0][1])}</td><td>${hex(c.g[1][0])} ${hex(c.g[1][1])}</td><td>${hex(c.g[3][0])} ${hex(c.g[3][1])}</td><td>${hex(c.ground)}</td><td>${hex(c.inkDeep)}</td></tr>`; }).join(""));

  /* ---------- Colourway picker ---------- */
  function anatomy(k) {
    const c = P[k], rows = [["Upper panel", c.g[0]], ["Middle panel", c.g[1]], ["Lower panel", [c.g[0][1], c.g[0][0]]], ["Left crescent", c.g[3]], ["Right crescent", c.g[4]]];
    return rows.map(([l, [a, b]]) => `<li><span class="sw2" style="background:linear-gradient(135deg,${a},${b})"></span><span class="al">${l}</span><span class="mono">${a} to ${b}</span></li>`).join("");
  }
  function apply(kitReady) {
    const c = P[cur];
    $$("[data-follow]").forEach(el => {
      if (el.classList.contains("mark")) { el.dataset.k = cur; return; }
      if (el.hasAttribute("data-colourway")) el.dataset.colourway = cur;
      if (el.hasAttribute("data-swatch")) el.dataset.swatch = cur;
    });
    $$("[data-t]").forEach(el => {
      const t = el.dataset.t;
      el.textContent = t === "short" ? c.short : t === "name" ? c.name : t === "role" ? c.role : t === "lab" ? labName(cur) : t === "team" ? (cur === "platform" ? "CCS Platform" : "CCS " + labName(cur)) : "";
    });
    $$(".lead-c,[data-lc]").forEach(el => el.style.setProperty("--lc", c.g[0][0]));
    fill("anatomy", anatomy(cur));
    $$(".pick").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.key === cur)));
    const marks = $$(".mark[data-k]");
    if (kitReady && window.CCS) { window.CCS.paint(document); }
    return Promise.all(marks.filter(m => !kitReady ? true : m.hasAttribute("data-follow")).map(m => put(m, kitReady)));
  }
  /* First pass before the kit loads: S marks get data-mark, the rest render once the manifest arrives. */
  $$(".mark[data-k]").forEach(m => { const F = m.dataset.k === "neon-cyberpunk" && !m.hasAttribute("data-s"); if (!F && KIT.has(m.dataset.b)) { m.dataset.mark = m.dataset.k; m.dataset.build = m.dataset.b; } });
  apply(false);
  document.addEventListener("click", e => {
    const b = e.target.closest(".pick"); if (!b) return;
    cur = b.dataset.key;
    const u = new URL(location.href); u.searchParams.set("c", cur); history.replaceState(null, "", u);
    apply(true);
    const say = document.getElementById("pick-say"); if (say) say.textContent = `${P[cur].short} now sets every view below.`;
  });
})();
