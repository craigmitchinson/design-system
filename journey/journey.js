/* Design Journey: renders the five v2 candidates and the wordmark record from the v2 data.
   Candidate text, scores and files are copied from "CCS - Design Journey.dc.html". */
(function () {
  var J = 'assets/journey/pal-ccs/', J0 = 'assets/journey/', R = 'assets/ribbon/v2/pal-ccs/';
  var LENS = ['Clever', 'Sleek', 'Unique', 'Applicable'];
  var LABS = [['teal', 'Lab 1', 'Teal'], ['crimson', 'Lab 2', 'Crimson'], ['cobalt', 'Lab 3', 'Cobalt'], ['amber', 'Lab 4', 'Amber']];

  var V = {
    c1: { name: 'The loop', p: 'loop', tone: 'two', caption: 'Two circles, one crossing',
      headline: 'Two circles joined by a single crossing. The ribbon that crosses over is the S.',
      body: 'Service as an unbroken line; colleague and customer as the two circles it runs through. Built on true circles and straight tangents so the crossing is clean. Each lab wears the whole loop in its own colour.',
      strengths: 'applicable everywhere. Strokes scale, recolour, embroider and animate; it holds at 16px and in one colour.',
      watch: 'the crossing can read as an X before it reads as an S, and infinity loops are a familiar shape.', scores: [1, 2, 1, 3] },
    c5: { name: 'The ribbon loop', p: 'chain', single: true, caption: 'One strand, folded in 3D',
      headline: 'One strand, folded over itself. The loop is the C; the fold is the S.',
      body: 'The ribbon as a system: the platform is the strand in its own colour; each lab is the same loop in its lab colour, folded in 3D. Drawn in Figma, with a one-colour version for dark and single-ink use.',
      strengths: 'the feeling. Depth, sheen and motion that none of the flat candidates have, and lab marks that are literally the platform strand recoloured.',
      watch: 'in one colour and at 16px the fold has to carry the C; the open end of the strand divides opinion.', scores: [3, 3, 3, 1],
      files: { light: R + 'platform.svg', dark: R + 'platform-dark.svg', mono: J0 + 'chain-mono-white.svg',
        ways: [['services', 'teal'], ['agentic', 'crimson'], ['tooling', 'cobalt'], ['insights', 'amber']].map(function (a) { return [a[1], R + a[0] + '.svg']; }) } },
    c2: { name: 'The S ribbon', p: 's-mark', tone: 'four', waysDark: true, caption: 'Four curved panels, one strand under',
      headline: 'Two ribbon C’s facing each other, and the S appears on its own.',
      body: 'The most immediate of the set: the S is legible without a caption. Drawn as four panels it takes the platform tones without losing the fold, and each lab’s colourway keeps the over/under in hue and tint.',
      strengths: 'clever and sleek at once. People see the S, and it has the most warmth of the set.',
      watch: 'at 16px and in one colour the fold has to carry everything; the lower C can read as a tail.', scores: [3, 3, 2, 2] },
    c4: { name: 'The hexagon', p: 'hex', tone: 'four', waysDark: true, caption: 'One band, turned 180°',
      headline: 'One hexagonal band. Draw it once, turn it 180°, and the S stacks itself.',
      body: 'Geometry on a grid: two nested hex C’s above, mirrored below. Four panels, released just enough that the channel between the halves matches the two openings: every gap the same.',
      strengths: 'the most systematic of the set. Every panel is the same shape, so the tones and each lab colourway read cleanly.',
      watch: 'it reads engineered rather than drawn, and below 40px the inner gaps start to close.', scores: [2, 1, 2, 3] },
    c3: { name: 'The tile', p: 'tile', tone: 'two', caption: 'Flat interlock in a square',
      headline: 'A grammar that can only ever produce the S.',
      body: 'Two flat C’s, one over, one under, locked in a square tile. Each lab wears the whole tile in its own colour. The interlocking monogram is the same idea with an italic stroke and no tile.',
      strengths: 'the family problem solved twice over. Every lab is visibly the same mark; mono and favicon come for free; tiles pattern.',
      watch: 'flat and square, it is correct before it is beautiful. The S can read as a puzzle piece first.', scores: [2, 2, 3, 3] },
    c3m: { name: 'The interlocking monogram', p: 'monogram', tone: 'two', caption: 'Italic stroke, no tile',
      headline: 'The same over-under grammar, drawn with an italic stroke and no square around it.',
      body: 'Two C’s interlock exactly as in the tile, but the stroke leans and the frame is gone, so it reads as a letterform rather than a badge. Each lab wears the whole monogram in its colourway.',
      strengths: 'warmer and more typographic than the tile while keeping its logic; works as a wordmark initial.',
      watch: 'without the tile it loses the patterning and favicon advantage, and the lean can look borrowed from a sports badge.', scores: [2, 3, 2, 2] },
    c6a: { name: 'The five-panel S, version A', p: 'five-a', tone: 'three', waysDark: true, caption: 'True-circle C’s, tapered tips',
      headline: 'Three panels slide back along one diagonal, and the two C’s are the space they leave.',
      body: 'Five shapes inside a single S silhouette: two outer panels, a bridging middle panel, and a C at each end built from one true circle outside and one inside, tapering into the panels at the angle of their tips. The gap is constant all round. Version B slides the panels further back, so the C’s are fuller.',
      strengths: 'the most resolved drawing of the set: one silhouette, clean geometry, and the S reads at a glance. The C’s anchor every colourway to the platform.',
      watch: 'five parts is the most to hold at 16px; the C’s and gaps start to fill in below about 24px, where the one-colour version should take over.', scores: [3, 3, 3, 2] },
    c6b: { name: 'The five-panel S, version B', p: 'five-b', tone: 'three', waysDark: true, caption: 'The panels slid further back', scores: [3, 3, 3, 2],
      headline: 'Version B slides the panels further back, so the C’s are fuller.' },
    c6: { name: 'The three-band S', p: 'crescent', tone: 'two', caption: 'Three flat bands',
      headline: 'Three parallel bands, rounded at either end. The sweep through them is the S.',
      body: 'Drawn on one diagonal: two outer bands and a middle band that bridges them, so the S comes from the rhythm rather than a single curve. Flat throughout: each lab is its base colour on the outer bands with a lighter tint bridging the middle, so the lab hue leads at every size.',
      strengths: 'calm and modern. Three flat shapes recolour, cut and embroider cleanly, and the ramp gives depth without gradients.',
      watch: 'the S reads as a slash or a stack of pills before it reads as a letter, and three bands do not divide into four labs.', scores: [2, 3, 2, 3] }
  };
  var CHAPTERS = [
    { id: 'c1', surface: 'platform', ids: ['c1', 'c5'] },
    { id: 'c2', surface: 'stone', ids: ['c2'] },
    { id: 'c4', surface: 'platform', ids: ['c4'] },
    { id: 'c3', surface: 'stone', ids: ['c3', 'c3m'] },
    { id: 'c6', surface: 'platform', ids: ['c6a', 'c6b', 'c6'] }
  ];

  function files(o) {
    if (o.files) return o.files;
    var P = J + o.p, TF = o.tone === 'four' ? '-four' : '-platform';
    return { light: P + TF + '.svg', dark: P + TF + '-dark.svg', mono: J0 + o.p + '-mono-white.svg',
      ways: o.p === 'tile' ? [['teal', 'cut-ring'], ['crimson', 'cut-arrow'], ['cobalt', 'cut-plug'], ['amber', 'cut-staircase']].map(function (a) { return [a[0], J + a[1] + '.svg', J + 'tile-' + a[0] + '.svg']; })
        : LABS.map(function (l) { return [l[0], P + '-' + l[0] + '.svg', o.waysDark ? P + '-' + l[0] + '-dark.svg' : null]; }) };
  }

  /* Score state, in the same localStorage entry as v2: journey-state.my[id]. */
  function load() { try { return JSON.parse(localStorage.getItem('journey-state') || '{}'); } catch (e) { return {}; } }
  function mine(id) { var s = load(); return (s.my && s.my[id]) || V[id].scores.slice(); }
  function save(id, v) { try { var s = load(); s.my = s.my || {}; if (v) s.my[id] = v; else delete s.my[id]; localStorage.setItem('journey-state', JSON.stringify(s)); } catch (e) {} }
  var esc = function (t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  var labOf = function (k) { return LABS.filter(function (l) { return l[0] === k; })[0]; };

  function scoreBlock(id) {
    var my = mine(id), rec = V[id].scores, h = '<div class="score" data-id="' + id + '">';
    LENS.forEach(function (lens, i) {
      h += '<div class="srow"><span class="slens">' + lens + '</span><span class="dots">';
      for (var v = 1; v <= 3; v++) h += '<button type="button" class="dot" data-i="' + i + '" data-v="' + v + '" aria-pressed="' + (my[i] >= v) + '" aria-label="' + lens + ', ' + v + ' of 3, ' + esc(V[id].name) + '"><span></span></button>';
      h += '</span><span class="srec muted">Recorded ' + rec[i] + '</span></div>';
    });
    var t = my.reduce(function (a, b) { return a + b; }, 0), rt = rec.reduce(function (a, b) { return a + b; }, 0);
    return h + '<p class="stotal" aria-live="polite">Your score <strong class="mono">' + t + '</strong> of 12. Recorded <span class="mono">' + rt + '</span> of 12.</p></div>';
  }

  function candidate(id, dark, main) {
    var o = V[id], f = files(o), art = dark ? f.dark : f.light, h = '';
    h += '<article class="cand' + (main ? ' cand-main' : ' cand-var') + '" aria-labelledby="' + id + '-h">';
    h += '<div class="cand-art"><img src="' + art + '" alt="' + esc(o.name) + ', platform version" loading="lazy"></div>';
    h += '<div class="cand-txt"><h3 id="' + id + '-h" class="display ' + (main ? 'name' : 'sub') + '">' + esc(o.name) + '</h3><p class="tag">' + esc(o.caption) + '</p>';
    h += '<p class="lead' + (main ? ' lit lit-pad' : '') + '">' + esc(o.headline) + '</p>';
    if (o.body) h += '<p>' + esc(o.body) + '</p>';
    if (o.strengths) h += '<p><strong>Strengths:</strong> ' + esc(o.strengths) + '</p><p><strong>Watch-outs:</strong> ' + esc(o.watch) + '</p>';
    h += scoreBlock(id) + '</div>';
    /* Colourways and the size ladder, the one in-use view kept from v2. */
    h += '<div class="cand-more"><h4 class="display sub">The labs</h4><ul class="ways">';
    f.ways.forEach(function (w) { var l = labOf(w[0]); h += '<li><img src="' + (dark && w[2] ? w[2] : w[1]) + '" alt="" loading="lazy"><span>' + l[1] + ' · ' + l[2] + '</span></li>'; });
    h += '</ul><h4 class="display sub">In use</h4><div class="inuse"><span class="appicon"><img src="' + f.dark + '" alt="' + esc(o.name) + ' as an app icon" loading="lazy"></span><span class="ladder" aria-label="The platform mark at 72, 48, 24 and 16 pixels" role="img">';
    [72, 48, 24, 16].forEach(function (s) { h += '<img src="' + art + '" alt="" style="height:' + s + 'px" loading="lazy">'; });
    h += '</span></div>';
    var dl = [['Platform SVG', f.light], ['Platform on dark', f.dark], ['One-colour', f.mono]].concat(f.ways.map(function (w) { var l = labOf(w[0]); return [l[1] + ' ' + l[2], w[1]]; }));
    if (o.single) dl.splice(1, 1);
    h += '<h4 class="display sub">Take it with you</h4><ul class="dl">';
    dl.forEach(function (d) { h += '<li><a class="btn btn-sm" href="' + d[1] + '" download>' + d[0] + '</a></li>'; });
    return h + '</ul></div></article>';
  }

  var cuts = ['right', 'left'];
  var html = '';
  CHAPTERS.forEach(function (c, n) {
    var dark = c.surface !== 'stone', a = c.surface === 'stone' ? 'data-surface="stone"' : 'data-colourway="platform"';
    html += '<section class="section cands" ' + a + ' data-cut="' + cuts[n % 2] + '" aria-label="' + esc(V[c.ids[0]].name) + '">';
    c.ids.forEach(function (id, i) { html += candidate(id, dark, i === 0); });
    html += '</section>';
  });
  document.getElementById('cands').outerHTML = html;
  (function () { var b = document.getElementById("reset-scores"), n = document.getElementById("reset-note"), sc = document.querySelector(".cands .score"); if (b && sc) { sc.insertAdjacentElement("afterend", n); sc.insertAdjacentElement("afterend", b); } })();

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.dot'); if (b) {
      var box = b.closest('.score'), id = box.dataset.id, my = mine(id), i = +b.dataset.i, v = +b.dataset.v;
      my[i] = my[i] === v ? v - 1 : v; save(id, my); box.outerHTML = scoreBlock(id);
      var nb = document.querySelector('.score[data-id="' + id + '"] .dot[data-i="' + i + '"][data-v="' + v + '"]'); if (nb) nb.focus();
      return;
    }
    if (e.target.closest('#reset-scores')) { var s = load(); s.my = {}; try { localStorage.setItem('journey-state', JSON.stringify(s)); } catch (x) {}
      document.querySelectorAll('.score').forEach(function (el) { el.outerHTML = scoreBlock(el.dataset.id); });
      document.getElementById('reset-note').textContent = 'Your scores are reset to the record.'; }
  });

  /* Wordmark exploration: every face, set in itself. */
  var WM = [["Sora","Geometric","Sora,sans-serif",700,"0.04em","36px","Round bowls echo the crescents."],["Urbanist","Geometric","Urbanist,sans-serif",800,"0.03em","38px","Pure circles and straight stems; clean, modern, quiet."],["Lexend","Geometric","Lexend,sans-serif",600,"0.04em","36px","Built for legibility; calm and very readable at small sizes."],["Red Hat Display","Geometric","'Red Hat Display',sans-serif",800,"0.02em","38px","Confident corporate geometric with a slight warmth."],["Unbounded","Wide","Unbounded,sans-serif",600,"0.02em","31px","Broad and soft; balances the tall S."],["Krona One","Wide","'Krona One',sans-serif",400,"0.04em","30px","Wide and solid, a little retro-industrial."],["Michroma","Wide","Michroma,sans-serif",400,"0.06em","27px","Engineered, horizontal, infrastructural."],["Syne","Wide","Syne,sans-serif",800,"0.02em","38px","Expressive, slightly wide, distinctive."],["Chakra Petch","Technical","'Chakra Petch',sans-serif",700,"0.08em","38px","Cut corners mirror the angled panel ends."],["Oxanium","Technical","Oxanium,sans-serif",700,"0.06em","38px","Squared, chamfered and crisp; facets in letter form."],["Saira","Technical","Saira,sans-serif",700,"0.06em","38px","Squarish tech sans, compact and disciplined."],["Space Grotesk","Technical","'Space Grotesk',sans-serif",700,"0.03em","38px","Precise with a hint of quirk."],["Tomorrow","Technical","Tomorrow,sans-serif",600,"0.06em","36px","Rounded-square forms; a softer techno."],["Bricolage Grotesque","Grotesk","'Bricolage Grotesque',sans-serif",800,"-0.01em","38px","Characterful contemporary grotesk with ink-trap detail."],["Familjen Grotesk","Chosen","'Familjen Grotesk',sans-serif",700,"0.01em","38px","Sturdy Scandinavian grotesk; trustworthy, unfussy. Chosen: Bold, tracking +10."],["Schibsted Grotesk","Grotesk","'Schibsted Grotesk',sans-serif",800,"0","38px","Editorial grotesk; reads like a serious institution."],["Archivo Black","Grotesk","'Archivo Black',sans-serif",400,"0.01em","38px","Heavy and compact; matches the mark’s visual weight."],["Righteous","Rounded","Righteous,sans-serif",400,"0.04em","38px","Rounded terminals pick up the crescent curves directly."],["Quicksand","Rounded","Quicksand,sans-serif",700,"0.05em","38px","Soft and friendly; colleague-facing rather than corporate."],["M PLUS Rounded 1c","Rounded","'M PLUS Rounded 1c',sans-serif",800,"0.03em","38px","Rounded geometric with a solid bold."],["Instrument Serif","Serif","'Instrument Serif',sans-serif",400,"0.01em","46px","Sharp contrast to the mark; editorial, premium."],["DM Serif Display","Serif","'DM Serif Display',sans-serif",400,"0.02em","40px","High-contrast display serif; classic financial-services feel."],["Young Serif","Serif","'Young Serif',sans-serif",400,"0.02em","38px","Warm, sturdy serif; heritage without stiffness."],["Manrope","Earlier working face","Manrope,sans-serif",800,"-0.02em","38px","The face the early rounds used. Reference only."]];
  var w = '';
  WM.forEach(function (f) {
    var chosen = f[1] === 'Chosen';
    w += '<li class="face' + (chosen ? ' lit lit-pad' : '') + '"><span class="wm" aria-hidden="true" style="font-family:' + f[2] + ';font-weight:' + f[3] + ';letter-spacing:' + f[4] + ';font-size:' + f[5] + '">CCS</span><span class="fname">' + f[0] + '</span><span class="tag">' + f[1] + '</span><span class="fwhy">' + f[6] + '</span></li>';
  });
  document.getElementById('faces').innerHTML = w;
})();
