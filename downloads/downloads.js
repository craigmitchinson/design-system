/* Downloads: colourway and version pickers, live preview, six files rendered client-side, zip, email signature. */
(function () {
  "use strict";
  const MARKS = (window.CCS && window.CCS.MARKS) || new URL("marks/", location.href).href;
  const STONE = "#F3F1EC", INK = "#0D1730";
  const ORDER = ["platform", "ember", "crimson-obsidian", "royal-sapphire", "seafoam-teal", "neon-cyberpunk", "cyber-emerald", "saffron"];
  const SLUG = { "platform": "platform", "ember": "ember", "crimson-obsidian": "crimson", "royal-sapphire": "sapphire", "seafoam-teal": "seafoam", "neon-cyberpunk": "frontier", "cyber-emerald": "emerald", "saffron": "saffron" };
  const SPARE = { "cyber-emerald": 1, "saffron": 1 };
  const VERS = [
    { k: "dark", label: "Gradient, for dark", long: "Gradient, for dark grounds", stone: false },
    { k: "light", label: "Gradient, for light", long: "Gradient, for light grounds", stone: true },
    { k: "flat", label: "Flat colour", long: "Flat colour", stone: false },
    { k: "mono-white", label: "Mono white", long: "Mono white", stone: false },
    { k: "mono-ink", label: "Mono ink", long: "Mono ink", stone: true }
  ];
  const $ = id => document.getElementById(id);
  const pal = () => window.CCS_PALETTE || {};
  const state = { key: "platform", ver: "dark" };
  const cache = {};
  let man = null;

  /* ---------- Files and SVG text ---------- */
  function fileFor(key, ver) {
    const fr = key === "neon-cyberpunk" && man.frontier, f = fr ? man.frontier.files : man.colourways.find(c => c.key === key).files;
    if (ver === "mono-white") return fr ? f.monoWhite : man.files.monoWhite;
    if (ver === "mono-ink") return fr ? f.monoInk : man.files.monoInk;
    if (ver === "small") return f.small;
    return f[ver];
  }
  async function text(file) {
    if (!cache[file]) cache[file] = fetch(MARKS + file).then(r => { if (!r.ok) throw new Error(file + " " + r.status); return r.text(); });
    return cache[file];
  }
  const firstFill = s => (s.match(/fill="(#[0-9A-Fa-f]{6})"/) || [])[1];
  /* The small cut for the favicon, recoloured to match a flat or mono version. */
  /* light: the mark sits on a light ground, so take the light small cut (manifest smallLight). */
  async function smallFor(key, ver, light) {
    let s = await text(fileFor(key, light ? "smallLight" : "small"));
    let one = null;
    if (ver === "mono-white") one = "#FFFFFF"; else if (ver === "mono-ink") one = INK;
    else if (ver === "flat") one = firstFill(await text(fileFor(key, "flat")));
    if (one) s = s.replace(/fill="#[0-9A-Fa-f]{6}"/g, `fill="${one}"`);
    return s;
  }
  const viewBox = s => s.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const aspect = s => { const v = viewBox(s); return v[2] / v[3]; };
  const sized = (s, w, h) => s.replace(/<svg([^>]*?)\swidth="[^"]*"/, `<svg$1 width="${w}"`).replace(/<svg([^>]*?)\sheight="[^"]*"/, `<svg$1 height="${h}"`);

  /* ---------- Raster ---------- */
  function loadImg(svg) {
    return new Promise((ok, no) => {
      const u = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })), img = new Image();
      img.onload = () => { URL.revokeObjectURL(u); ok(img); }; img.onerror = e => { URL.revokeObjectURL(u); no(e); };
      img.src = u;
    });
  }
  /* Draw svg into a W x H canvas. markH is the mark height; ground is null (transparent), "stone" or a colourway key. */
  async function raster(svg, W, H, markH, ground) {
    const r = aspect(svg), mh = markH || H, mw = mh * r;
    const img = await loadImg(sized(svg, Math.round(mw * 100) / 100, mh));
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const x = c.getContext("2d");
    if (ground === "stone") { x.fillStyle = STONE; x.fillRect(0, 0, W, H); }
    else if (ground) { const p = pal()[ground], g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, p.ground); g.addColorStop(1, p.groundHi); x.fillStyle = g; x.fillRect(0, 0, W, H); }
    x.drawImage(img, (W - mw) / 2, (H - mh) / 2, mw, mh);
    return c;
  }
  const toBlob = c => new Promise(ok => c.toBlob(ok, "image/png"));

  /* ---------- The six files ---------- */
  const verOf = k => VERS.find(v => v.k === k);
  const base = () => `ccs-${SLUG[state.key]}-${state.ver}`;
  function iconGround() { return verOf(state.ver).stone ? "stone" : state.key; }
  function specs() {
    const b = base();
    return [
      { id: "svg", name: "Vector mark", note: "SVG, transparent, scales to any size", file: `${b}-vector.svg`,
        make: async () => new Blob([await text(fileFor(state.key, state.ver))], { type: "image/svg+xml" }) },
      { id: "png-large", name: "Mark, large", note: "PNG, 2048 px tall, transparent", file: `${b}-2048.png`,
        make: async () => { const s = await text(fileFor(state.key, state.ver)); return toBlob(await raster(s, Math.round(2048 * aspect(s)), 2048, 2048, null)); } },
      { id: "png-web", name: "Mark, web", note: "PNG, 512 px tall, transparent", file: `${b}-512.png`,
        make: async () => { const s = await text(fileFor(state.key, state.ver)); return toBlob(await raster(s, Math.round(512 * aspect(s)), 512, 512, null)); } },
      { id: "app", name: "App icon", note: "PNG, 1024 px square on the ground", file: `${b}-app-1024.png`,
        make: async () => toBlob(await raster(await text(fileFor(state.key, state.ver)), 1024, 1024, 640, iconGround())) },
      { id: "favicon", name: "Favicon", note: "PNG, 32 px, the small cut, transparent", file: `${b}-favicon-32.png`,
        make: async () => toBlob(await raster(await smallFor(state.key, state.ver, verOf(state.ver).stone), 32, 32, 32, null)) },
      { id: "touch", name: "Touch icon", note: "PNG, 180 px square on the ground, for phones", file: `${b}-touch-180.png`,
        make: async () => toBlob(await raster(await text(fileFor(state.key, state.ver)), 180, 180, 116, iconGround())) }
    ];
  }
  function save(blob, name) {
    const u = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 4000);
  }
  async function download(spec) {
    try { save(await spec.make(), spec.file); $("status").textContent = `Downloaded ${spec.file}`; }
    catch (e) { console.error(e); $("status").textContent = `Could not make ${spec.file}. Try again.`; }
  }

  /* ---------- Zip, stored, no compression ---------- */
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = d => { let c = 0xFFFFFFFF; for (let i = 0; i < d.length; i++) c = CRC[(c ^ d[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  function zip(entries) {
    const enc = new TextEncoder(), parts = [], central = []; let off = 0;
    for (const e of entries) {
      const name = enc.encode(e.name), crc = crc32(e.data), n = e.data.length;
      const h = new DataView(new ArrayBuffer(30));
      [[0, 0x04034b50, 4], [4, 20, 2], [6, 0, 2], [8, 0, 2], [10, 0, 2], [12, 33, 2], [14, crc, 4], [18, n, 4], [22, n, 4], [26, name.length, 2], [28, 0, 2]].forEach(([o, v, s]) => s === 4 ? h.setUint32(o, v, true) : h.setUint16(o, v, true));
      parts.push(new Uint8Array(h.buffer), name, e.data);
      const c = new DataView(new ArrayBuffer(46));
      [[0, 0x02014b50, 4], [4, 20, 2], [6, 20, 2], [8, 0, 2], [10, 0, 2], [12, 0, 2], [14, 33, 2], [16, crc, 4], [20, n, 4], [24, n, 4], [28, name.length, 2], [30, 0, 2], [32, 0, 2], [34, 0, 2], [36, 0, 2], [38, 0, 4], [42, off, 4]].forEach(([o, v, s]) => s === 4 ? c.setUint32(o, v, true) : c.setUint16(o, v, true));
      central.push(new Uint8Array(c.buffer), name);
      off += 30 + name.length + n;
    }
    const cdSize = central.reduce((a, b) => a + b.length, 0), end = new DataView(new ArrayBuffer(22));
    [[0, 0x06054b50, 4], [4, 0, 2], [6, 0, 2], [8, entries.length, 2], [10, entries.length, 2], [12, cdSize, 4], [16, off, 4], [20, 0, 2]].forEach(([o, v, s]) => s === 4 ? end.setUint32(o, v, true) : end.setUint16(o, v, true));
    return new Blob([...parts, ...central, new Uint8Array(end.buffer)], { type: "application/zip" });
  }
  async function downloadAll() {
    const btn = $("zip"); btn.disabled = true; $("status").textContent = "Making the zip.";
    try {
      const list = specs(), entries = [];
      for (const s of list) entries.push({ name: s.file, data: new Uint8Array(await (await s.make()).arrayBuffer()) });
      const name = `${base()}-all.zip`; save(zip(entries), name); $("status").textContent = `Downloaded ${name}`;
    } catch (e) { console.error(e); $("status").textContent = "Could not make the zip. Try again."; }
    btn.disabled = false;
  }

  /* ---------- Pickers ---------- */
  function radios(host, items, current, onPick) {
    host.replaceChildren(...items.map(it => {
      const b = document.createElement("button"), on = it.k === current;
      b.type = "button"; b.className = "opt"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", on); b.tabIndex = on ? 0 : -1; b.dataset.k = it.k;
      b.innerHTML = `<span class="tick" aria-hidden="true">${on ? "✓" : ""}</span>${it.sw ? `<span class="sw" aria-hidden="true" style="background:${it.sw}"></span>` : ""}<span>${it.label}${it.spare ? "<span class=\"sp\">, spare</span>" : ""}</span>`;
      b.addEventListener("click", () => onPick(it.k, true));
      b.addEventListener("keydown", e => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!d) return;
        e.preventDefault(); const i = (items.findIndex(x => x.k === it.k) + d + items.length) % items.length; onPick(items[i].k, true);
      });
      return b;
    }));
  }
  function focusChecked(host) { const b = host.querySelector('[aria-checked="true"]'); if (b && host.contains(document.activeElement)) b.focus(); }
  function drawPickers() {
    const P = pal();
    radios($("cw"), ORDER.filter(k => P[k]).map(k => ({ k, label: k === "neon-cyberpunk" ? "Frontier" : P[k].short, spare: SPARE[k], sw: `linear-gradient(135deg,${P[k].g[0][0]},${P[k].g[1][1]})` })), state.key,
      (k, f) => { state.key = k; update(); if (f) focusChecked($("cw")); });
    radios($("ver"), VERS.map(v => ({ k: v.k, label: v.label })), state.ver, (k, f) => { state.ver = k; update(); if (f) focusChecked($("ver")); });
  }

  /* ---------- Preview, files list, icons ---------- */
  function drawPreview() {
    const P = pal()[state.key], v = verOf(state.ver), pv = $("preview"), name = state.key === "neon-cyberpunk" ? "Frontier" : P.short;
    /* The band is the one dark surface: repaint it in the picked colourway. Light builds sit on a Stone panel inside it. */
    const band = $("band"), vars = window.CCS && window.CCS.vars(state.key);
    if (band.dataset.colourway !== state.key) {
      band.dataset.colourway = state.key;
      if (vars) for (const k in vars) band.style.setProperty(k, vars[k]);
      const wm = band.querySelector(".wordmark [data-mark]");
      if (wm && window.CCS) { wm.dataset.mark = state.key; window.CCS.placeMark(wm); }
    }
    pv.classList.toggle("on-stone", v.stone);
    const img = $("pv-img"); img.src = MARKS + fileFor(state.key, state.ver);
    img.alt = `${state.key === "neon-cyberpunk" ? "The Frontier F" : "The CCS mark"}, ${name}, ${v.long.toLowerCase()}, on ${v.stone ? "Stone" : "the " + name + " ground"}`;
    $("pv-cap").innerHTML = `<strong>${name}, ${v.long.toLowerCase()}</strong><span class="chip" style="--c:${P.g[0][0]}">${P.g[0][0]}</span><span class="chip" style="--c:${v.stone ? STONE : P.ground}">${v.stone ? STONE : P.ground}</span>`;
  }
  function drawFiles() {
    const list = specs(), ul = $("files");
    ul.removeAttribute("data-swatch");
    ul.replaceChildren(...list.map((s, i) => {
      const li = document.createElement("li");
      if (i === 0) {
        li.className = "lit lit-pad"; li.dataset.lead = state.key;
        li.innerHTML = `<button type="button" class="primary"><span><span class="fn">${s.name}</span><span class="fd">${s.note}</span><span class="ff">${s.file}</span></span><span class="go">Download SVG</span></button>`;
      } else {
        li.innerHTML = `<span><span class="fn">${s.name}</span><span class="fd">${s.note}</span><span class="ff">${s.file}</span></span><button type="button" class="btn btn-sm">Download<span class="sr-only"> ${s.name}</span></button>`;
      }
      li.querySelector("button").dataset.file = s.id;
      li.querySelector("button").addEventListener("click", () => download(s));
      return li;
    }));
    /* The Stone lit takes the colourway's light-ground middle fade, set by the kit. */
    if (window.CCS && window.CCS.lits) window.CCS.lits(ul);
  }
  let iconTick = 0;
  async function drawIcons() {
    const t = ++iconTick, host = $("icons");
    try {
      const s = await text(fileFor(state.key, state.ver)), sm = await smallFor(state.key, state.ver, true);
      const app = await raster(s, 240, 240, 150, iconGround()), touch = await raster(s, 180, 180, 116, iconGround()), fav = await raster(sm, 64, 64, 64, null);
      if (t !== iconTick) return;
      const fig = (c, w, label, alt) => `<figure><img src="${c.toDataURL()}" width="${w}" height="${w}" alt="${alt}"><figcaption>${label}</figcaption></figure>`;
      host.innerHTML = fig(app, 96, "App icon", "App icon preview") + fig(touch, 60, "Touch icon", "Touch icon preview") + fig(fav, 32, "Favicon", "Favicon preview");
    } catch (e) { console.error(e); }
  }

  /* ---------- Signature ---------- */
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  let sigTile = null, sigTileKey = "";
  async function tile() {
    if (sigTileKey === state.key && sigTile) return sigTile;
    const c = await raster(await text(fileFor(state.key, "small")), 128, 128, 88, state.key);
    sigTile = c.toDataURL("image/png"); sigTileKey = state.key; return sigTile;
  }
  function team() {
    const P = pal()[state.key]; if (state.key === "neon-cyberpunk") return "Frontier";
    if (SPARE[state.key] || state.key === "platform") return "";
    return (P.role || "").split("·").pop().trim();
  }
  async function sigHTML() {
    const v = k => $(k).value.trim(), src = await tile(), lab = team();
    const line = (t, st) => t ? `<tr><td style="font-family:Arial,Helvetica,sans-serif;${st}">${esc(t)}</td></tr>` : "";
    return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0"><tr>` +
      `<td valign="top" width="64" style="width:64px;padding:0 16px 0 0;vertical-align:top"><img src="${src}" width="64" height="64" alt="CCS" style="display:block;width:64px;height:64px;border:0;outline:none"></td>` +
      `<td valign="top" style="vertical-align:top"><table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse">` +
      line(v("s-name"), "font-size:16px;line-height:22px;font-weight:bold;color:#0D1730") +
      line(v("s-role"), "font-size:14px;line-height:20px;color:#3B4763") +
      line(v("s-mail"), "font-size:14px;line-height:20px;color:#3B4763") +
      line(v("s-tel"), "font-size:14px;line-height:20px;color:#3B4763") +
      line("Colleague & Customer Service" + (lab ? " · " + lab : ""), "font-size:12px;line-height:18px;color:#3B4763;padding-top:6px") +
      `</table></td></tr></table>`;
  }
  let sigTick = 0;
  async function drawSig() { const t = ++sigTick, h = await sigHTML(); if (t === sigTick) $("sigprev").innerHTML = h; }
  async function copySig() {
    const h = await sigHTML(), plain = ["s-name", "s-role", "s-mail", "s-tel"].map(k => $(k).value.trim()).filter(Boolean).join("\n") + "\nColleague & Customer Service";
    let ok = false;
    try {
      if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
        await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([h], { type: "text/html" }), "text/plain": new Blob([plain], { type: "text/plain" }) })]); ok = true;
      }
    } catch (e) { ok = false; }
    if (!ok) {
      /* Fallback: select the rendered preview and copy it, which keeps the formatting. */
      const r = document.createRange(), sel = getSelection(); r.selectNodeContents($("sigprev")); sel.removeAllRanges(); sel.addRange(r);
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      sel.removeAllRanges();
    }
    $("sig-status").textContent = ok ? "Copied. Paste it into Outlook." : "Copy was blocked. Select the preview and copy it by hand.";
  }

  /* ---------- Wiring ---------- */
  function update() { drawPickers(); drawPreview(); drawFiles(); drawIcons(); drawSig(); $("status").textContent = ""; if (window.CCS && window.CCS.fitCuts) requestAnimationFrame(() => window.CCS.fitCuts()); }
  async function start() {
    try { man = window.CCS ? await window.CCS.manifest() : null; } catch (e) { man = null; }
    if (!man) man = await fetch(MARKS + "manifest.json").then(r => r.json());
    $("zip").addEventListener("click", downloadAll);
    $("copy").addEventListener("click", copySig);
    ["s-name", "s-role", "s-mail", "s-tel"].forEach(k => $(k).addEventListener("input", drawSig));
    update();
  }
  start();
})();
