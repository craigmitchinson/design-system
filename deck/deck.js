/* Mark Deck controller. Loads after palette.js and before kit/ccs.js.
   Keys: arrows, Page Up/Down, Home/End, P present, N notes, Escape exits present mode. Swipe on touch. #slide-n deep links. */
(function () {
  "use strict";
  const P = window.CCS_PALETTE || {};

  /* Slide 8: the six colourway specimens, written from palette.js before the kit paints the page. */
  const box = document.getElementById("colours");
  if (box) box.innerHTML = ["platform", "ember", "crimson-obsidian", "royal-sapphire", "seafoam-teal", "neon-cyberpunk"].map(k => {
    const c = P[k]; if (!c) return "";
    const f = s => `linear-gradient(135deg,${s[0]},${s[1]})`;
    return `<div><i class="sw-main slab" style="display:block;background:${f(c.g[0])}" aria-hidden="true"></i>` +
      `<div class="sw-pair" aria-hidden="true"><i style="background:${f(c.g[1])}"></i><i style="background:${f(c.g[3])}"></i></div>` +
      `<p class="s-name">${k === "platform" ? "Navy" : k === "neon-cyberpunk" ? "Violet" : c.short}</p>` +
      `<span class="mono">${c.g[0][0]}<br>${c.g[1][0]}<br>${c.g[3][0]}</span></div>`;
  }).join("");

  const slides = [...document.querySelectorAll(".slide")], N = slides.length;
  const deck = document.getElementById("deck"), stage = document.getElementById("stage"), fit = document.getElementById("fit");
  const controls = document.getElementById("controls"), counter = document.getElementById("counter");
  const prevB = document.getElementById("prev"), nextB = document.getElementById("next");
  const notesB = document.getElementById("notes-btn"), presentB = document.getElementById("present-btn");
  const notes = document.getElementById("notes"), notesBody = document.getElementById("notes-body");
  const hint = document.getElementById("hint");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let cur = -1, presenting = false;

  /* Fit the 1920 x 1080 frame to the space, letterboxed. */
  function layout() {
    const w = stage.clientWidth || innerWidth;
    let h;
    if (presenting) h = innerHeight;
    else {
      const hh = hint && getComputedStyle(hint).display !== "none" ? hint.offsetHeight : 0;
      const nh = (!notes || notes.hidden) ? 0 : notes.offsetHeight;
      h = Math.max(180, Math.min(innerHeight - controls.offsetHeight - hh - nh, w * 1080 / 1920));
    }
    stage.style.height = h + "px";
    fit.style.setProperty("--k", Math.min(w / 1920, h / 1080));
  }

  function go(i, push = true) {
    i = Math.max(0, Math.min(N - 1, i));
    if (i === cur) return;
    const dir = i > cur ? "fwd" : "back", old = slides[cur], nu = slides[i], animate = old && !reduce.matches;
    slides.forEach(s => { if (s !== old) s.classList.remove("out", "fwd", "back"); });
    if (old) {
      old.classList.remove("on", "fwd", "back"); old.setAttribute("aria-hidden", "true"); old.inert = true;
      if (animate) { old.classList.add("out", dir); setTimeout(() => { if (!old.classList.contains("on")) old.classList.remove("out", "fwd", "back"); }, 460); }
    }
    nu.classList.add("on"); if (animate) nu.classList.add(dir);
    nu.removeAttribute("aria-hidden"); nu.inert = false;
    cur = i;
    const title = nu.getAttribute("aria-label");
    counter.innerHTML = `Slide ${i + 1} of ${N}: ${title}<span class="muted">${nu.dataset.section}</span>`;
    prevB.disabled = i === 0; nextB.disabled = i === N - 1;
    const n = nu.querySelector(".notes"); notesBody.innerHTML = n ? n.innerHTML : "<p>No notes for this slide.</p>";
    if (!notes.hidden) layout();
    if (push) history.replaceState(null, "", "#slide-" + (i + 1));
    /* Replay the assembly and the found C each time their slide comes up. */
    if (window.CCS) nu.querySelectorAll("[data-assemble]").forEach(el => CCS.assemble(el));
    nu.querySelectorAll(".found-c").forEach(el => { el.classList.remove("in"); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("in"))); });
  }
  slides.forEach(s => { s.setAttribute("aria-hidden", "true"); s.inert = true; });

  function fromHash() { const m = location.hash.match(/^#slide-(\d+)$/); return m ? +m[1] - 1 : null; }

  function setPresenting(on) {
    presenting = on;
    deck.classList.toggle("presenting", on);
    document.documentElement.classList.toggle("dk-presenting", on);
    presentB.setAttribute("aria-pressed", String(on));
    layout();
  }
  async function enterPresent() {
    setPresenting(true);
    if (deck.requestFullscreen && !document.fullscreenElement) { try { await deck.requestFullscreen(); } catch (e) { /* stays in the in-page present mode */ } }
    layout();
  }
  async function exitPresent() {
    if (document.fullscreenElement) { try { await document.exitFullscreen(); } catch (e) {} }
    setPresenting(false);
  }
  const togglePresent = () => presenting ? exitPresent() : enterPresent();
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && presenting) setPresenting(false); else layout(); });

  function toggleNotes(force) {
    const open = typeof force === "boolean" ? force : notes.hidden;
    notes.hidden = !open; notesB.setAttribute("aria-expanded", String(open));
    layout();
  }

  prevB.addEventListener("click", () => go(cur - 1));
  nextB.addEventListener("click", () => go(cur + 1));
  notesB.addEventListener("click", () => toggleNotes());
  presentB.addEventListener("click", togglePresent);

  addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest && e.target.closest("input,textarea,select,[contenteditable]")) return;
    const k = e.key;
    if (k === "ArrowRight" || k === "ArrowDown" || k === "PageDown") { e.preventDefault(); go(cur + 1); }
    else if (k === "ArrowLeft" || k === "ArrowUp" || k === "PageUp") { e.preventDefault(); go(cur - 1); }
    else if (k === "Home") { e.preventDefault(); go(0); }
    else if (k === "End") { e.preventDefault(); go(N - 1); }
    else if (k === "p" || k === "P") { e.preventDefault(); togglePresent(); }
    else if (k === "n" || k === "N") { e.preventDefault(); toggleNotes(); }
    else if (k === "Escape" && presenting) exitPresent();
  });

  /* Swipe: a clear horizontal flick of 50px or more. */
  let x0 = null, y0 = 0;
  stage.addEventListener("touchstart", e => { const t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; }, { passive: true });
  stage.addEventListener("touchend", e => {
    if (x0 === null) return;
    const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0; x0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(cur + (dx < 0 ? 1 : -1));
  }, { passive: true });

  addEventListener("hashchange", () => { const i = fromHash(); if (i !== null) go(i, false); });
  addEventListener("resize", layout);
  if ("ResizeObserver" in window) new ResizeObserver(layout).observe(stage);

  /* Phones in portrait: a dismissible hint to turn sideways, remembered for the session. */
  try { if (sessionStorage.getItem("dk-hint") === "gone") hint.classList.add("gone"); } catch (e) {}
  document.getElementById("hint-x").addEventListener("click", () => {
    hint.classList.add("gone"); try { sessionStorage.setItem("dk-hint", "gone"); } catch (e) {}
    layout(); prevB.focus();
  });

  layout();
  go(fromHash() ?? 0, false);
  if (fromHash() === null) history.replaceState(null, "", location.pathname + location.search + "#slide-1");
  window.DECK = { go, get current() { return cur; }, count: N, toggleNotes, togglePresent };
})();
