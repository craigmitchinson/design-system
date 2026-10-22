// Builds the variant matrix: each variant on white, black and Lloyds green, at 256, 64, 32 and 16px.
(() => {
  const V = [
    { n: 'A. Black, green Cs', d: 'Panels #0B0B0C, Cs #006A4D. On black: white panels, #11B67A Cs. On Lloyds green: white panels, lime #6CF479 Cs. Small cut: the same two tones.', f: { w: 'a-light', b: 'a-dark', g: 'a-green' } },
    { n: 'B. Green light', d: 'All #0B0B0C, middle panel #006A4D; #11B67A on black, lime #6CF479 on Lloyds green, with white panels on both. Small cut: the middle lifts to #11B67A so it parts from the black at 16px.', f: { w: 'b-light', b: 'b-dark', g: 'b-green' } },
    { n: 'C. On green', d: 'Black panels and #024731 Cs on a #11B67A tile. Small cut: one tone, black on the tile, as deep green Cs vanish at 16px.', f: { w: 'c', b: 'c', g: 'c' } },
    { n: 'D. Campaign', d: 'Black #0B0B0C on a #6CF479 lime tile. One tone at every size.', f: { w: 'd', b: 'd', g: 'd' } },
    { n: 'Mono', d: 'Black #0B0B0C on light grounds, white on black and green.', f: { w: 'mono-black', b: 'mono-white', g: 'mono-white' } },
  ];
  const G = { w: 'white', b: 'black', g: 'Lloyds green' };
  const root = document.getElementById('matrix');
  if (!root) return;
  root.innerHTML = V.map(v => `<div class="vrow"><div class="vhead"><h3 class="sub3">${v.n}</h3><p>${v.d}</p></div><div class="vcells">${
    Object.keys(G).map(g => `<div class="cell g${g}"><img src="marks/${v.f[g]}.svg" alt="${v.n} on ${G[g]}, at 256, 64, 32 and 16px" class="s256"><img src="marks/${v.f[g]}.svg" alt="" style="height:64px"><img src="marks/small-${v.f[g]}.svg" alt="" style="height:32px"><img src="marks/small-${v.f[g]}.svg" alt="" style="height:16px"></div>`).join('')
  }</div></div>`).join('');
})();

// LBG matrix: each LBG variant on white and on LBG navy #15223E, then beside the horse on white, at 256, 64, 32 and 16px.
(() => {
  const root = document.getElementById('lbg-matrix');
  if (!root) return;
  const V = [
    { k: 'e', n: 'E. Navy, gold Cs', d: 'Lead candidate. Panels #243B6B, middle #7C89A6, Cs #C98900. On #15223E: panels #ACB5C7, middle #F5EAD1, Cs #DFB866. Small cut: the same tones.' },
    { k: 'f', n: 'F. Crimson primary', d: 'Panels #CE143D, middle #E2728B, Cs #770C23. On #15223E: panels #ECA6B5, middle #F6D5DC, Cs #E2728B. Small cut: the same tones.' },
  ];
  const sizes = (k, g) => `<img src="marks/${k}-${g}.svg" alt="" class="s256"><img src="marks/${k}-${g}.svg" alt="" style="height:64px"><img src="marks/small-${k}-${g}.svg" alt="" style="height:32px"><img src="marks/small-${k}-${g}.svg" alt="" style="height:16px">`;
  const H = 'lloyds-official/Lloyds_Bank_Symbol_6.svg';
  const pair = (k, cls, st) => `<span class="pair"><img src="${H}" alt="" ${cls ? 'class="' + cls + '"' : 'style="' + st + '"'}><img src="marks/${st && parseInt(st.slice(7)) <= 32 ? 'small-' : ''}${k}-light.svg" alt="" ${cls ? 'class="' + cls + '"' : 'style="' + st + '"'}></span>`;
  root.innerHTML = V.map(v => `<div class="vrow"><div class="vhead"><h3 class="sub3">${v.n}</h3><p>${v.d}</p></div><div class="vcells lbg-cells">
    <div class="cell gw" role="img" aria-label="${v.n} on white, at 256, 64, 32 and 16px">${sizes(v.k, 'light')}</div>
    <div class="cell gn" role="img" aria-label="${v.n} on LBG navy, at 256, 64, 32 and 16px">${sizes(v.k, 'navy')}</div>
    <div class="cell gw beside" role="img" aria-label="${v.n} beside the Lloyds symbol as supplied, at 256, 64, 32 and 16px">${pair(v.k, 's256')}${pair(v.k, '', 'height:64px')}${pair(v.k, '', 'height:32px')}${pair(v.k, '', 'height:16px')}</div>
  </div></div>`).join('');
})();
