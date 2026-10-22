// Renders the family palette proposal from family-data.js (written by gen-family.mjs).
(() => {
  const F = window.LLOYDS_FAMILY;
  if (!F) return;
  const R = F.roles, M = 'marks/family/', H = 'lloyds-official/Lloyds_Bank_Symbol_6.svg', LG = '#006A4D';
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const pick = r => r.opts[0];
  const short = r => r.role.replace(/ · .*/, '');
  const src = c => c.src === 'lbg' ? 'LBG theme' : 'Lloyds site';
  const mk = (key, g, h, f = '') => `<img src="${M}${f}${h <= 32 ? 'small-' : ''}${key}-${g}.svg" alt="" style="height:${h}px">`;
  const sizes = (key, g, f = '') => `<img src="${M}${f}${key}-${g}.svg" alt="" class="s256">${mk(key, g, 64, f)}${mk(key, g, 32, f)}${mk(key, g, 16, f)}`;
  const sw = (hex, label) => `<li><span class="sw" style="background:${hex}" aria-hidden="true"></span>${label} <b>${hex}</b></li>`;

  // Hero rows.
  const fig = (r, g) => `<figure><img src="${M}${pick(r).key}-${g}.svg" alt=""><figcaption>${esc(short(r))}</figcaption></figure>`;
  $('hero-light').innerHTML = R.map(r => fig(r, 'light')).join('');
  $('hero-dark').innerHTML = R.map(r => fig(r, 'dark')).join('');

  // Role by role.
  $('role-list').innerHTML = R.map(r => `<article class="role" aria-labelledby="r-${r.id}"><h3 class="sub3" id="r-${r.id}">${esc(r.role)}</h3><p class="role-was">Was ${esc(r.was)}.</p>${
    r.opts.map((o, i) => `<div class="opt"><div class="opt-head"><div><p class="opt-tag">${r.id === 'platform' ? 'Decided' : i ? 'Alternative' : 'Pick'}${o.flag ? ' · <span class="flag">flagged: gold is reserved for status</span>' : ''}</p><h4>${esc(o.name)}</h4><p>${esc(o.why)}</p></div><div>
      <ul class="hexes">${sw(o.light.hex, 'Cs on light')}${sw(o.dark.hex, 'Cs on dark')}${sw(o.ground.hex, 'Dark ground')}${sw(o.tint.hex, 'Tint')}</ul>
      <p class="src-note">Sources: ${['light', 'dark', 'ground', 'tint'].map(k => `${{ light: 'Cs on light', dark: 'Cs on dark', ground: 'ground', tint: 'tint' }[k]}, ${src(o[k])} ${esc(o[k].note)}`).join('; ')}.</p>
      <p class="src-note">Cs on light ${o.check.lightVsWhite}:1 on white. Cs on dark ${o.check.darkVsGround}:1 on the ground, delta E ${o.check.darkVsWhiteDE} from the white panels.${o.check.vsPlatform != null ? ` Delta E ${o.check.vsPlatform} from Platform green.` : ''}${o.check.pass ? '' : ' <strong class="flag">Below 3:1 on white.</strong>'}</p></div></div>
      <div class="opt-cells">
        <div class="cell gw" role="img" aria-label="${esc(r.role)}, ${esc(o.name)}, on white at 256, 64, 32 and 16px">${sizes(o.key, 'light')}</div>
        <div class="cell" style="background:${o.ground.hex}" role="img" aria-label="${esc(r.role)}, ${esc(o.name)}, on its dark ground ${o.ground.hex} at 256, 64, 32 and 16px">${sizes(o.key, 'dark')}</div>
        <div class="cell gw beside" role="img" aria-label="${esc(r.role)}, ${esc(o.name)}, beside the Lloyds symbol as supplied, at 256, 64, 32 and 16px">${[256, 64, 32, 16].map(h => `<span class="pair"><img src="${H}" alt="" ${h === 256 ? 'class="s256"' : `style="height:${h}px"`}>${h === 256 ? `<img src="${M}${o.key}-light.svg" alt="" class="s256">` : mk(o.key, 'light', h)}</span>`).join('')}</div>
      </div></div>`).join('')}</article>`).join('');

  // Family test strips.
  const strip = g => R.map(r => `<img src="${M}small-${pick(r).key}-${g}.svg" alt="">`).join('');
  $('strip-w').innerHTML = strip('light'); $('strip-b').innerHTML = strip('dark'); $('strip-g').innerHTML = strip('green');

  // Delta E matrix: upper triangle light-ground Cs, lower triangle dark-ground Cs.
  let fails = 0, min = 99;
  const head = `<caption class="sr-only">CIEDE2000 between the picks. Upper triangle: Cs on light grounds. Lower triangle: Cs on dark grounds.</caption><thead><tr><th scope="col"><span class="sr-only">Role</span></th>${R.map(r => `<th scope="col">${esc(short(r))}</th>`).join('')}</tr></thead>`;
  const body = R.map((a, i) => `<tr><th scope="row">${esc(short(a))}</th>${R.map((b, j) => {
    if (i === j) return '<td class="self">n/a</td>';
    const v = (j > i ? F.matrix.light : F.matrix.dark)[i][j], ok = v >= 20; if (!ok) fails++; min = Math.min(min, v);
    return `<td class="${ok ? 'pass' : 'fail'}">${v.toFixed(1)} ${ok ? 'pass' : 'fail'}</td>`;
  }).join('')}</tr>`).join('');
  $('de-table').innerHTML = head + '<tbody>' + body + '</tbody>';
  $('de-verdict').textContent = fails ? `${fails} pairs below 20. Fail.` : `All 56 pairs pass. The closest pair is ${min.toFixed(1)}.`;

  // Teams tiles.
  $('tiles').innerHTML = R.map(r => `<li><span class="tile" style="background:${pick(r).ground.hex}"><img src="${M}${pick(r).key}-dark.svg" alt=""></span><span>${esc(short(r))}</span></li>`).join('');

  // Frontier F.
  const fr = R.find(r => r.frontier), fo = pick(fr);
  $('fr-lead').textContent = `The F takes the Frontier pick, ${fo.name.toLowerCase()}: Cs ${fo.light.hex} on light grounds, ${fo.dark.hex} on dark, on its ground ${fo.ground.hex}. Shown at 256, 64, 32 and 16px.`;
  $('fr-cells').innerHTML = `<div class="cell gw" role="img" aria-label="Frontier F on white">${sizes(fo.key, 'light', 'f-')}</div>
    <div class="cell" style="background:${fo.ground.hex}" role="img" aria-label="Frontier F on its dark ground">${sizes(fo.key, 'dark', 'f-')}</div>
    <div class="cell gb" role="img" aria-label="Frontier F on black">${sizes(fo.key, 'dark', 'f-')}</div>`;

  // Full colour: no black. Outer panels the role colour, the middle a lighter tint, the Cs a deeper tone.
  const fm = r => r.frontier ? 'f-' : '';
  const fcFig = (r, g, bg) => `<figure${bg ? ` style="background:${bg};padding:16px 8px"` : ''}><img src="${M}${fm(r)}${pick(r).key}-fc-${g}.svg" alt=""><figcaption>${esc(short(r))}</figcaption></figure>`;
  $('fc-white').innerHTML = R.map(r => fcFig(r, 'light')).join('');
  $('fc-dark').innerHTML = R.map(r => fcFig(r, 'dark', pick(r).fc.dark.ground)).join('');
  $('fc-green').innerHTML = R.map(r => fcFig(r, 'green', LG)).join('');
  const trio = v => `${sw(v.panel.hex, 'Panels')}${sw(v.mid.hex, 'Middle')}${sw(v.cs.hex, 'Cs')}`;
  const chk = v => `Middle ${v.check.midVsPanel} and Cs ${v.check.csVsPanel} from the panels; panels ${v.check.panelVsGround} from the ground; Cs ${v.check.csVsGround} from the ground. Delta E, CIEDE2000.`;
  $('fc-list').innerHTML = R.map(r => { const o = pick(r), f = fm(r), k = o.key, fc = o.fc;
    return `<article class="fc-ladder" aria-labelledby="fc-${r.id}"><h3 class="sub3" id="fc-${r.id}">${esc(r.role)}${r.frontier ? ', with the F' : ''}</h3>
    <div class="opt-head"><div><p class="opt-tag">On white</p><ul class="hexes">${trio(fc.light)}</ul><p class="src-note">${chk(fc.light)}</p></div>
      <div><p class="opt-tag">On its dark ground ${fc.dark.ground} · on Lloyds green ${LG}</p><ul class="hexes">${trio(fc.dark)}</ul><ul class="hexes">${trio(fc.green)}</ul><p class="src-note">Dark ground: ${chk(fc.dark)} Lloyds green: ${chk(fc.green)}</p></div></div>
    <div class="opt-cells">
      <div class="cell gw" role="img" aria-label="${esc(r.role)}, full colour, on white at 256, 64, 32 and 16px"><p class="cap">Full colour, on white</p>${sizes(k, 'fc-light', f)}</div>
      <div class="cell gw" role="img" aria-label="${esc(r.role)}, black-panel build, on white at 256, 64, 32 and 16px"><p class="cap">Black panels, for comparison</p>${sizes(k, 'light', f)}</div>
      <div class="cell" style="background:${fc.dark.ground};color:#fff" role="img" aria-label="${esc(r.role)}, full colour, on its dark ground ${fc.dark.ground} at 256, 64, 32 and 16px"><p class="cap">Full colour, on its dark ground</p>${sizes(k, 'fc-dark', f)}</div>
      <div class="cell gg" style="color:#fff" role="img" aria-label="${esc(r.role)}, full colour, on Lloyds green at 256, 64, 32 and 16px"><p class="cap">Full colour, on Lloyds green</p>${sizes(k, 'fc-green', f)}</div>
    </div></article>`; }).join('');

  // Summary.
  const c = x => `<span class="sw" style="background:${x.hex}" aria-hidden="true"></span><b>${x.hex}</b>`;
  $('sum-table').innerHTML = `<thead><tr><th scope="col">Role</th><th scope="col">Pick</th><th scope="col">Cs on light</th><th scope="col">Cs on dark</th><th scope="col">Dark ground</th><th scope="col">Tint</th><th scope="col">Cs on Lloyds green</th><th scope="col">Full colour on white</th><th scope="col">Full colour on dark</th><th scope="col">Full colour on Lloyds green</th><th scope="col">Source</th></tr></thead><tbody>${
    R.map(r => { const o = pick(r); const s = [...new Set(['light', 'dark', 'ground', 'tint'].map(k => src(o[k])))].join(' and ');
      return `<tr><th scope="row">${esc(r.role)}</th><td>${esc(o.name)}</td><td>${c(o.light)}</td><td>${c(o.dark)}</td><td>${c(o.ground)}</td><td>${c(o.tint)}</td><td>${c(o.green)}</td>${['light', 'dark', 'green'].map(g => `<td>${['panel', 'mid', 'cs'].map(k => c(o.fc[g][k])).join('<br>')}</td>`).join('')}<td>${s}</td></tr>`; }).join('')}</tbody>`;
})();
