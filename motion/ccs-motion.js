// CCS mark motion page, packed for a Claude Design board. Mounts the page into #ccs-motion-host when the board renders it.
(function () {
  var MARKUP = "<div class=\"layout\">\n  <section class=\"stagecol\" aria-label=\"Animation stage\">\n    <div class=\"stage\" id=\"stage\" data-ground=\"for-dark\">\n      <svg id=\"mark\" role=\"img\" aria-label=\"The CCS mark: three panels in an S, with a C at each end\"></svg>\n      <div class=\"readout\" aria-hidden=\"true\"><span>Slide <b id=\"roK\">947</b></span><span>Gap <b id=\"roGap\">237</b></span><span><span id=\"roRadLabel\">C radius</span> <b id=\"roRad\">1434 / 1671</b></span><span>T <b id=\"roT\">0.00</b> s</span><span id=\"roCw\">Navy</span></div>\n    </div>\n    <div class=\"caption\" aria-live=\"polite\">\n      <h2 id=\"npName\" class=\"display sub\">Construct</h2>\n      <p class=\"np-meta muted\" id=\"npKicker\">Opener or closer, 3.6 s</p>\n      <p class=\"desc\" id=\"npDesc\"></p>\n      <div class=\"transport\">\n        <button class=\"opt\" id=\"replay\">Play</button>\n        <button class=\"opt\" id=\"stop\">Stop</button>\n        <button class=\"opt\" id=\"loop\" aria-pressed=\"true\">Loop: on</button>\n        <div class=\"seg\" role=\"group\" aria-label=\"Speed\"><button data-speed=\"0.5\" aria-pressed=\"false\">0.5x</button><button data-speed=\"1\" aria-pressed=\"true\">1x</button><button data-speed=\"2\" aria-pressed=\"false\">2x</button></div>\n        <button class=\"opt\" id=\"sound\" aria-pressed=\"false\">Turn sound on</button>\n        <div class=\"seg\" role=\"group\" aria-label=\"Sound style\"><button id=\"sndClean\" aria-pressed=\"true\">Clean</button><button id=\"sndWarm\" aria-pressed=\"false\">Warm</button></div>\n      </div>\n      <p class=\"note\" id=\"soundNote\" role=\"status\"></p>\n    </div>\n  </section>\n  <div class=\"side\">\n    <div class=\"group\"><h3>Openers and closers</h3><p class=\"note\">For the start or end of a video or page.</p><div class=\"tiles\" data-group=\"Openers\"></div></div>\n    <div class=\"group\"><h3>Loops</h3><p class=\"note\">Loaders and idle states. Each exports as one seamless cycle.</p><div class=\"tiles\" data-group=\"Loops\"></div></div>\n    <div class=\"group\"><h3>Interface</h3><p class=\"note\">Short moments for buttons and links.</p><div class=\"tiles\" data-group=\"Interface\"></div></div>\n    <div class=\"group\"><h3>Showcase</h3><div class=\"tiles\" data-group=\"Showcase\"></div></div>\n    <div class=\"group\">\n      <h3>Look</h3>\n      <div class=\"row\"><span class=\"lbl\" id=\"lblL\">Logo</span><div class=\"seg\" role=\"group\" aria-labelledby=\"lblL\"><button id=\"lgC\" aria-pressed=\"true\">CCS</button><button id=\"lgF\" aria-pressed=\"false\">Frontier</button></div></div>\n      <div class=\"row\"><span class=\"lbl\" id=\"lblG\">Ground</span><div class=\"seg\" role=\"group\" aria-labelledby=\"lblG\"><button id=\"gL\" aria-pressed=\"false\">Light</button><button id=\"gD\" aria-pressed=\"true\">Dark</button></div></div>\n      <div class=\"row\"><span class=\"lbl\" id=\"lblT\">Crescent</span><div class=\"seg\" role=\"group\" aria-labelledby=\"lblT\"><button id=\"tD\" aria-pressed=\"true\">Darker</button><button id=\"tL\" aria-pressed=\"false\">Lighter</button></div></div>\n      <p class=\"note\" id=\"toneNote\"></p>\n      <div class=\"row\"><span class=\"lbl\" id=\"lblV\">Version</span><div class=\"seg\" role=\"group\" aria-labelledby=\"lblV\"><button id=\"vA\" aria-pressed=\"true\">A, 947</button><button id=\"vB\" aria-pressed=\"false\">B, 1000</button></div></div>\n      <div class=\"cws\" id=\"chips\" role=\"group\" aria-label=\"Colourway\"></div>\n    </div>\n    <div class=\"group\">\n      <h3><label for=\"k\">Construction</label></h3>\n      <div class=\"slider\"><input type=\"range\" id=\"k\" min=\"0\" max=\"1000\" step=\"1\" value=\"947\"><output id=\"kOut\" for=\"k\">947 units</output></div>\n      <p class=\"note\">Drag to slide the panels back by hand. Version A stops at 947 units, the finished mark: the crescent at its widest is 0.54 of a panel. Version B opens to 1000. Units are those of the refined master, where every panel is 1316 wide and every gap 237.</p>\n    </div>\n    <div class=\"group\">\n      <h3>Export <span class=\"muted\" id=\"exScene\">Current scene: Construct</span></h3>\n      <div class=\"row\"><span class=\"lbl\" id=\"lblF\">Format</span><div class=\"seg\" role=\"group\" aria-labelledby=\"lblF\"><button id=\"fMp4\" aria-pressed=\"true\">MP4</button><button id=\"fGif\" aria-pressed=\"false\">GIF</button></div></div>\n      <div class=\"row\"><span class=\"lbl\" id=\"lblFr\">Frame</span><div class=\"seg\" role=\"group\" aria-labelledby=\"lblFr\"><button id=\"frSq\" aria-pressed=\"true\">Square</button><button id=\"frWide\" aria-pressed=\"false\">Wide 16:9</button></div></div>\n      <p class=\"note\" id=\"exSize\">1080 by 1080, 60 fps</p>\n      <div class=\"row\"><span class=\"lbl\" id=\"lblSo\">Sound</span><div class=\"seg\" role=\"group\" aria-labelledby=\"lblSo\"><button id=\"soOn\" aria-pressed=\"true\">With sound</button><button id=\"soOff\" aria-pressed=\"false\">Silent</button></div></div>\n      <div class=\"row\"><button class=\"opt opt-main\" id=\"export\">Export scene</button><p class=\"status\" id=\"exStatus\" role=\"status\"></p></div>\n      <p class=\"note\">Exports render frame by frame in Edge or Chrome, so a long scene takes a little while. You confirm each save.</p>\n    </div>\n  </div>\n</div>";
  function run() {
gsap.defaults({ lazy: false });   // write every first frame immediately, so a scene killed in the same tick cannot write over the next one
const G = {"ccs":{"viewBox":"-1044.93 -500 7007.19 7007.19","CEN":[2458.66,3003.595],"A":[1391.5949999999998,2988.395],"R":1423.0736103413628,"GAP":214.96046148071036,"uhat":[0.7071067811865475,-0.7071067811865475],"versions":{"a":850,"b":1000},"bars":["M2367.46 0 C2614.18 246.72 2752.79 581.35 2752.79 930.27 C2752.79 1279.18 2614.18 1613.81 2367.46 1860.53 L312.2 3915.79 C-172.81 3351.28 -140.93 2508.39 385.33 1982.13 L2367.46 0 Z","M464.2 4067.79 C1028.71 4552.8 1871.6 4520.92 2397.86 3994.66 L4453.12 1939.4 C3888.61 1454.39 3045.72 1486.27 2519.46 2012.53 L464.2 4067.79 Z","M2549.86 6007.19 C2303.14 5760.47 2164.53 5425.84 2164.53 5076.92 C2164.53 4728.01 2303.14 4393.38 2549.86 4146.66 L4605.12 2091.4 C5090.13 2655.91 5058.25 3498.8 4531.99 4025.06 L2549.86 6007.19 Z"],"craw":"M1092.44 1275.02 L385.33 1982.13 C-170.41 2537.87 -170.41 3438.92 385.33 3994.66 C941.07 4550.4 1842.12 4550.4 2397.86 3994.66 L3104.97 3287.55 L1092.44 1275.02 Z","crawBot":"M3824.88 4732.17 L4531.99 4025.06 C5087.73 3469.32 5087.73 2568.27 4531.99 2012.53 C3976.25 1456.79 3075.2 1456.79 2519.46 2012.53 L1812.35 2719.64 L3824.88 4732.17 Z","light":{"platform":["#2B4A86","#5B82D1","#7E93B8"],"frontier":["#4F2391","#7C3AED","#F472B6"],"ember":["#8F3A0E","#E4571E","#E07A36"],"crimson":["#A11030","#D7263D","#FF4D6D"],"sapphire":["#1D3F9E","#2563EB","#60A5FA"],"seafoam":["#0A6E8C","#14C8B4","#5FD0DA"],"mono":["#14244A","#14244A","#14244A"],"emerald":["#047857","#10B981","#6EE7B7"],"saffron":["#8A5A00","#D98E04","#FFC23D"]},"lightC":{"platform":["#7E93B8","#5B82D1","#7E93B8"],"frontier":["#A855F7","#7C3AED","#F472B6"],"ember":["#FF8A4C","#E4571E","#E07A36"],"crimson":["#FF2A4B","#D7263D","#FF4D6D"],"sapphire":["#3B82F6","#2563EB","#60A5FA"],"seafoam":["#2FD8C2","#14C8B4","#5FD0DA"],"mono":["#7E93B8","#14244A","#14244A"],"emerald":["#34D399","#10B981","#6EE7B7"],"saffron":["#FFC23D","#D98E04","#FFC23D"]},"dark":{"platform":["#E6ECF5","#5B82D1","#F4F7FB"],"frontier":["#F0ABFC","#7C3AED","#F472B6"],"ember":["#FF8A4C","#E4571E","#FFC394"],"crimson":["#FF2A4B","#D7263D","#FF85A1"],"sapphire":["#3B82F6","#2563EB","#93C5FD"],"seafoam":["#2FD8C2","#14C8B4","#9FE3EA"],"mono":["#FFFFFF","#FFFFFF","#FFFFFF"],"emerald":["#34D399","#10B981","#A7F3D0"],"saffron":["#FFC23D","#D98E04","#FFD978"]},"finals":{"a":{"segs":["M2367.46 0 C2614.18 246.72 2752.79 581.35 2752.79 930.27 C2752.79 1279.18 2614.18 1613.81 2367.46 1860.53 L913.24 3314.75 C428.23 2750.24 460.11 1907.35 986.37 1381.09 L2367.46 0 Z","M1065.24 3466.75 C1629.75 3951.76 2472.64 3919.88 2998.9 3393.62 L3852.08 2540.44 C3287.57 2055.43 2444.68 2087.31 1918.42 2613.57 L1065.24 3466.75 Z","M2549.86 6007.19 C2303.14 5760.47 2164.53 5425.84 2164.53 5076.92 C2164.53 4728.01 2303.14 4393.38 2549.86 4146.66 L4004.08 2692.44 C4489.09 3256.95 4457.21 4099.84 3930.95 4626.1 L2549.86 6007.19 Z"],"topC":"M412.78 1954.68 L385.33 1982.13 C-170.41 2537.87 -170.41 3438.92 385.33 3994.66 C941.07 4550.4 1842.12 4550.4 2397.86 3994.66 L2425.31 3967.21 C1857.77 4122.64 1250.46 3961.71 834.37 3545.62 C418.28 3129.53 257.35 2522.22 412.78 1954.68 Z","botC":"M4504.54 4052.51 L4531.99 4025.06 C5087.73 3469.32 5087.73 2568.27 4531.99 2012.53 C3976.25 1456.79 3075.2 1456.79 2519.46 2012.53 L2492.01 2039.98 C3059.55 1884.55 3666.86 2045.48 4082.95 2461.57 C4499.04 2877.66 4659.97 3484.97 4504.54 4052.51 Z"},"b":{"segs":["M2367.46 0 C2614.18 246.72 2752.79 581.35 2752.79 930.27 C2752.79 1279.18 2614.18 1613.81 2367.46 1860.53 L1019.31 3208.68 C534.3 2644.17 566.17 1801.29 1092.44 1275.02 L2367.46 0 Z","M1171.31 3360.68 C1735.82 3845.69 2578.7 3813.82 3104.97 3287.55 L3746.01 2646.51 C3181.5 2161.5 2338.62 2193.37 1812.35 2719.64 L1171.31 3360.68 Z","M2549.86 6007.19 C2303.14 5760.47 2164.53 5425.84 2164.53 5076.92 C2164.53 4728.01 2303.14 4393.38 2549.86 4146.66 L3898.01 2798.51 C4383.02 3363.02 4351.15 4205.9 3824.88 4732.17 L2549.86 6007.19 Z"],"topC":"M518.84 1848.62 L385.33 1982.13 C-170.41 2537.87 -170.41 3438.92 385.33 3994.66 C941.07 4550.4 1842.12 4550.4 2397.86 3994.66 L2531.37 3861.15 C1963.83 4016.58 1356.53 3855.64 940.44 3439.55 C524.35 3023.46 363.41 2416.16 518.84 1848.62 Z","botC":"M4398.48 4158.57 L4531.99 4025.06 C5087.73 3469.32 5087.73 2568.27 4531.99 2012.53 C3976.25 1456.79 3075.2 1456.79 2519.46 2012.53 L2385.95 2146.04 C2953.49 1990.61 3560.79 2151.55 3976.88 2567.64 C4392.97 2983.73 4553.91 3591.03 4398.48 4158.57 Z"}}},"frontier":{"W":1315.59,"g":214.96,"L1":3733,"L2":3100,"viewBox":"-1080.85 -3139.63 6734.42 6734.42","CEN":[2286.36,227.58],"versions":{"a":1000,"b":1000},"slideDir":[-0.71,0.71],"armAxis":[0.71,-0.71],"stemAxis":[0.71,0.71],"bars":{"top":"M930.26 930.26 C416.49 416.49 416.49 -416.49 930.26 -930.26 L2639.63 -2639.63 C3153.4 -2125.86 3153.4 -1292.87 2639.63 -779.1 L930.26 930.26 Z","mid":"M2012.52 2012.52 L4204.56 -179.51 C3690.79 -693.28 2857.8 -693.28 2344.03 -179.51 L1082.26 1082.26 Z","foot":"M2164.52 2164.52 L3094.79 1234.26 L3094.79 1234.26 C3608.56 1748.03 3608.56 2581.02 3094.79 3094.79 Z"},"leaf":{"top":[1709.37,-1709.37],"mid":[3274.3,750.75]},"capClip":{"top":"M-2533.27 -5952.01 L2639.63 -11124.91 L11124.91 -2639.63 L5952.01 2533.27 Z","mid":"M-2980.87 -5504.41 L2192.03 -10677.32 L10677.32 -2192.03 L5504.41 2980.87 Z"},"finals":{"a":{"c1":"M2084.52 -2084.52 L2639.63 -2639.63 C3153.4 -2125.86 3153.4 -1292.87 2639.63 -779.1 L2485.61 -625.08 C2618.64 -1148.25 2466.23 -1702.81 2084.52 -2084.52 Z","p1":"M930.26 930.26 C416.49 416.49 416.49 -416.49 930.26 -930.26 L1932.52 -1932.52 C2446.29 -1418.75 2446.29 -585.77 1932.52 -72 L930.26 930.26 Z","p2":"M2012.52 2012.52 L3497.45 527.6 C2983.68 13.83 2150.69 13.83 1636.92 527.6 L1082.26 1082.26 Z","p3":"M2164.52 2164.52 L3094.79 1234.26 L3094.79 1234.26 C3608.56 1748.03 3608.56 2581.02 3094.79 3094.79 Z","c2":"M3649.45 375.6 L4204.56 -179.51 C3690.79 -693.28 2857.8 -693.28 2344.03 -179.51 L2190.01 -25.48 C2713.18 -158.51 3267.74 -6.11 3649.45 375.6 Z"},"b":{"c1":"M2084.52 -2084.52 L2639.63 -2639.63 C3153.4 -2125.86 3153.4 -1292.87 2639.63 -779.1 L2485.61 -625.08 C2618.64 -1148.25 2466.23 -1702.81 2084.52 -2084.52 Z","p1":"M930.26 930.26 C416.49 416.49 416.49 -416.49 930.26 -930.26 L1932.52 -1932.52 C2446.29 -1418.75 2446.29 -585.77 1932.52 -72 L930.26 930.26 Z","p2":"M2012.52 2012.52 L3497.45 527.6 C2983.68 13.83 2150.69 13.83 1636.92 527.6 L1082.26 1082.26 Z","p3":"M2164.52 2164.52 L3094.79 1234.26 L3094.79 1234.26 C3608.56 1748.03 3608.56 2581.02 3094.79 3094.79 Z","c2":"M3649.45 375.6 L4204.56 -179.51 C3690.79 -693.28 2857.8 -693.28 2344.03 -179.51 L2190.01 -25.48 C2713.18 -158.51 3267.74 -6.11 3649.45 375.6 Z"}},"push":{"p1":[-0.72,-0.7],"p3":[0.27,0.96],"c1":[0.17,-0.99],"c2":[0.97,-0.24]},"dropOrder":["p3w","p2w","c2w","p1w","c1w"]},"frontierSets":{"light":{"platform":["#2B4A86","#5B82D1","#7E93B8"],"frontier":["#4F2391","#7C3AED","#F472B6"],"ember":["#8F3A0E","#E4571E","#E07A36"],"crimson":["#A11030","#D7263D","#FF4D6D"],"sapphire":["#1D3F9E","#2563EB","#60A5FA"],"seafoam":["#0A6E8C","#14C8B4","#5FD0DA"],"mono":["#14244A","#14244A","#14244A"],"emerald":["#047857","#10B981","#6EE7B7"],"saffron":["#8A5A00","#D98E04","#FFC23D"]},"lightC":{"platform":["#7E93B8","#5B82D1","#7E93B8"],"frontier":["#A855F7","#7C3AED","#F472B6"],"ember":["#FF8A4C","#E4571E","#E07A36"],"crimson":["#FF2A4B","#D7263D","#FF4D6D"],"sapphire":["#3B82F6","#2563EB","#60A5FA"],"seafoam":["#2FD8C2","#14C8B4","#5FD0DA"],"mono":["#7E93B8","#14244A","#14244A"],"emerald":["#34D399","#10B981","#6EE7B7"],"saffron":["#FFC23D","#D98E04","#FFC23D"]},"dark":{"platform":["#E6ECF5","#5B82D1","#F4F7FB"],"frontier":["#F0ABFC","#7C3AED","#F472B6"],"ember":["#FF8A4C","#E4571E","#FFC394"],"crimson":["#FF2A4B","#D7263D","#FF85A1"],"sapphire":["#3B82F6","#2563EB","#93C5FD"],"seafoam":["#2FD8C2","#14C8B4","#9FE3EA"],"mono":["#FFFFFF","#FFFFFF","#FFFFFF"],"emerald":["#34D399","#10B981","#A7F3D0"],"saffron":["#FFC23D","#D98E04","#FFD978"]}}};
// ---------- refined geometry, computed from the refined parameters (directions/mark-study/build.mjs facetS, synthesis/marks/gen.mjs frontierF) ----------
// W panel width, g = 0.18 W one gap everywhere, t = 0.54 W crescent at its widest, R = W + g/2 panel-end radius, slide axis 45 degrees.
// The finished slide is the crescent offset t + g. The rig slides the panel ends back by k and cuts each crescent with a circle of R + g.
(function refine(G) {
  const S2 = Math.SQRT2, PI = Math.PI, r2 = (n) => Math.round(n * 100) / 100;
  const P = (map) => {
    let d = '';
    const pt = (q) => { const p = map(q); return `${r2(p.x)} ${r2(p.y)}`; };
    const api = {
      M(q) { d += `M${pt(q)} `; return api; },
      L(q) { d += `L${pt(q)} `; return api; },
      A(c, r, a0, a1) { // circular arc as cubic Beziers of at most 90 degrees each
        const n = Math.max(1, Math.ceil(Math.abs(a1 - a0) / (PI / 2) - 1e-9)), s = (a1 - a0) / n, k = (4 / 3) * Math.tan(s / 4);
        for (let i = 0; i < n; i++) {
          const b0 = a0 + s * i, b1 = b0 + s;
          const p0 = { x: c.x + r * Math.cos(b0), y: c.y + r * Math.sin(b0) }, p1 = { x: c.x + r * Math.cos(b1), y: c.y + r * Math.sin(b1) };
          d += `C${pt({ x: p0.x - k * r * Math.sin(b0), y: p0.y + k * r * Math.cos(b0) })} ${pt({ x: p1.x + k * r * Math.sin(b1), y: p1.y - k * r * Math.cos(b1) })} ${pt(p1)} `;
        }
        return api;
      },
      Z() { return d + 'Z'; },
    };
    return api;
  };
  const ang = (c, p) => Math.atan2(p.y - c.y, p.x - c.x);
  const W = 1315.59, g = 0.18 * W, t = 0.54 * W, R = W + g / 2, Rin = R + g, kA = t + g, kB = 1000;

  // CCS: u along the panels, v across them, origin at the turn centre
  const O = { x: 2458.66, y: 3003.59 }, uP = g / 2 - kA, uT = -uP, vo = -1.5 * W - g, vi = -W / 2 - g, vc = -(W + g) / 2;
  const toXY = (q) => ({ x: O.x + (q.x + q.y) / S2, y: O.y + (q.y - q.x) / S2 }), rot = (q) => toXY({ x: -q.x, y: -q.y });
  const uAof = (uQ) => uQ - Math.sqrt(R * R - (g * g) / 4);
  const upper = (map, uQ) => {
    const Q = { x: uQ, y: vc }, uA = uAof(uQ);
    return P(map).M({ x: uT + W, y: vo }).A({ x: uT, y: vo }, W, 0, PI / 2).L({ x: uA, y: vi }).A(Q, R, ang(Q, { x: uA, y: vi }), -PI / 2).L({ x: uT + W, y: vo }).Z();
  };
  const middle = (uQ) => {
    const Q = { x: uQ, y: vc }, Q2 = { x: -uQ, y: -vc }, uA = uAof(uQ);
    return P(toXY).M({ x: uA, y: -W / 2 }).L({ x: -uQ, y: -W / 2 }).A(Q2, R, -PI / 2, ang(Q2, { x: -uA, y: W / 2 }))
      .L({ x: uQ, y: W / 2 }).A(Q, R, PI / 2, ang(Q, { x: uA, y: -W / 2 })).Z();
  };
  const Pc = { x: uP, y: vc };
  const crescent = (map, k) => {
    const Q = { x: uP + k, y: vc }, a = (k * k + R * R - Rin * Rin) / (2 * k), h = Math.sqrt(R * R - a * a);
    const t1 = { x: uP + a, y: vc - h }, t2 = { x: uP + a, y: vc + h }, b0 = ang(Q, t2);
    let b1 = ang(Q, t1); if (b1 < b0) b1 += 2 * PI;
    return P(map).M(t1).A(Pc, R, ang(Pc, t1), ang(Pc, t2) - 2 * PI).A(Q, Rin, b0, b1).Z();
  };
  // the crescent's outer circle; the inner circle moving with the panel end cuts it, so each C is exactly the space left
  const disc = (map) => P(map).M({ x: uP + R, y: vc }).A(Pc, R, 0, 2 * PI).Z();
  const at = (k) => { const uQ = uP + k; return { segs: [upper(toXY, uQ), middle(uQ), upper(rot, uQ)], topC: crescent(toXY, k), botC: crescent(rot, k) }; };
  const side = 6158.35 + 1000, A = toXY(Pc);
  Object.assign(G.ccs, {
    viewBox: `${r2(O.x - side / 2)} ${r2(O.y - side / 2)} ${side} ${side}`, CEN: [O.x, O.y], A: [A.x, A.y], R, GAP: g, RIN: Rin,
    versions: { a: r2(kA), b: kB }, bars: at(0).segs, craw: disc(toXY), crawBot: disc(rot), finals: { a: at(kA), b: at(kB) },
  });

  // Frontier F: three bands of width W separated by g, panel ends quarter circles of radius W, crescent offset t + g
  const Fr = G.frontier, s = kA, u1 = 1417.41, u2 = 784.41, b2 = W + g, b3 = 2 * W + 2 * g;
  const kk = Math.sqrt((W + g) ** 2 - W * W), e = Math.asin(W / (W + g));
  const fm = (q) => ({ x: (q.x + q.y) / S2, y: (q.y - q.x) / S2 }), fpt = (u, v) => { const p = fm({ x: u, y: v }); return [r2(p.x), r2(p.y)]; };
  const fUpper = (uE) => P(fm).M({ x: 0, y: W }).A({ x: W, y: W }, W, PI, 1.5 * PI).L({ x: uE + W, y: 0 }).A({ x: uE, y: 0 }, W, 0, PI / 2).Z();
  const fMiddle = (uE) => P(fm).M({ x: 0, y: b2 + W }).L({ x: uE + W, y: b2 + W }).A({ x: uE, y: b2 + W }, W, 0, -PI / 2).L({ x: 0, y: b2 }).Z();
  const fFoot = P(fm).M({ x: 0, y: b3 }).L({ x: W, y: b3 }).A({ x: 0, y: b3 }, W, 0, PI / 2).Z();
  const cl = P(fm).M({ x: u1 + W + g, y: 0 }).L({ x: u1 + s + W, y: 0 }).A({ x: u1 + s, y: 0 }, W, 0, PI / 2).L({ x: u1 + kk, y: W }).A({ x: u1, y: 0 }, W + g, e, 0).Z();
  const cr = P(fm).M({ x: u2 + W + g, y: b2 + W }).L({ x: u2 + s + W, y: b2 + W }).A({ x: u2 + s, y: b2 + W }, W, 0, -PI / 2).L({ x: u2 + kk, y: b2 }).A({ x: u2, y: b2 + W }, W + g, -e, 0).Z();
  const quad = (u0) => P(fm).M({ x: u0, y: -6000 }).L({ x: u0 + 7315.5, y: -6000 }).L({ x: u0 + 7315.5, y: 6000 }).L({ x: u0, y: 6000 }).Z();
  const fin = { c1: cl, p1: fUpper(u1), p2: fMiddle(u2), p3: fFoot, c2: cr };
  const fx0 = 544.93, fy0 = -2602.31, fw = 3637.75, fh = 5727.99, fc = [r2(fx0 + fw / 2), r2(fy0 + fh / 2)], fs = r2(fh + 1000);
  Object.assign(Fr, {
    W, g, viewBox: `${r2(fc[0] - fs / 2)} ${r2(fc[1] - fs / 2)} ${fs} ${fs}`, CEN: fc, versions: { a: r2(s), b: r2(s) },
    bars: { top: fUpper(u1 + s), mid: fMiddle(u2 + s), foot: fFoot }, leaf: { top: fpt(u1 + s, 0), mid: fpt(u2 + s, b2 + W) },
    capClip: { top: quad(u1 + s), mid: quad(u2 + s) }, finals: { a: fin, b: fin },
  });
})(G);
const GAP_TXT = Math.round(G.ccs.GAP);
const SURF = { platform: 'platform', frontier: 'neon-cyberpunk', ember: 'ember', crimson: 'crimson-obsidian', sapphire: 'royal-sapphire', seafoam: 'seafoam-teal', emerald: 'cyber-emerald', saffron: 'saffron', mono: 'platform' };
// the stage sits on the chosen colourway's surface from the kit, and on Stone for the light ground
function stageGround() {
  if (state.ground !== 'for-dark') return { ground: '#F3F1EC', hi: '#F3F1EC', fg: '#0D1730', fg2: '#3B4763' };
  const kit = window.CCS, v = kit && kit.vars ? kit.vars(SURF[state.cw] || 'platform') : null;
  return v && v['--ground'] ? { ground: v['--ground'], hi: v['--ground-hi'], fg: v['--fg'], fg2: v['--fg-2'] } : { ground: '#0D1730', hi: '#233A6E', fg: '#F4F7FB', fg2: '#C9D3E6' };
}
function paintStage() {
  const s = stageGround(), st = document.getElementById('stage'); if (!st) return;
  st.style.setProperty('--ground', s.ground); st.style.setProperty('--ground-hi', s.hi); st.style.setProperty('--fg', s.fg); st.style.setProperty('--fg-2', s.fg2);
  st.style.background = `linear-gradient(135deg, ${s.ground}, ${s.hi})`;
}
function groundFill(ctx, w, h) { const s = stageGround(), gr = ctx.createLinearGradient(0, 0, w, h); gr.addColorStop(0, s.ground); gr.addColorStop(1, s.hi); return gr; }
// shape morph without a library: both outlines sampled evenly, aligned for the least travel, then interpolated point by point
function morphLerp(a, b, n = 180) {
  const samp = (d) => {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', d); document.getElementById('mark').appendChild(p);
    const L = p.getTotalLength(), pts = [];
    for (let i = 0; i < n; i++) { const q = p.getPointAtLength((L * i) / n); pts.push([q.x, q.y]); }
    p.remove(); return pts;
  };
  const A = samp(a), B0 = samp(b), B1 = B0.slice().reverse();
  let best = null, bestE = Infinity;
  for (const B of [B0, B1]) for (let r = 0; r < n; r++) {
    let e = 0; for (let i = 0; i < n; i += 3) { const p = A[i], q = B[(i + r) % n]; e += (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2; }
    if (e < bestE) { bestE = e; best = A.map((_, i) => B[(i + r) % n]); }
  }
  return (t) => (t <= 0 ? a : t >= 1 ? b : 'M' + A.map((p, i) => `${(p[0] + (best[i][0] - p[0]) * t).toFixed(1)} ${(p[1] + (best[i][1] - p[1]) * t).toFixed(1)}`).join('L') + 'Z');
}

const CW_GROUPS = [{"name":"Core","note":"The platform, Frontier and mono.","keys":["platform","frontier","mono"]},{"name":"Colourways","note":"The four colourways, same depth as the platform.","keys":["ember","crimson","sapphire","seafoam"]},{"name":"Spares","note":"Held for future Labs.","keys":["emerald","saffron"]}];
const CW_LABEL = {"platform":"Navy","mono":"Mono","frontier":"Frontier violet","ember":"Ember","crimson":"Crimson","sapphire":"Sapphire","seafoam":"Seafoam","emerald":"Emerald","saffron":"Saffron"};
const V = [Math.SQRT1_2, Math.SQRT1_2];
const o = (p) => `${p[0]} ${p[1]}`;
const $ = (id) => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const add = (p, v, k = 1) => [p[0] + v[0] * k, p[1] + v[1] * k];
const state = { logo: 'ccs', k: G.ccs.versions.a, dt: 0, db: 0, s: G.ccs.versions.a, ground: 'for-dark', tone: 'darker', palette: 'clean', lastFrontier: 'frontier', cw: 'platform', loop: true, scene: null, reel: false, last: 'reel', sound: false, exporting: false, hovering: false };

const INFO = [
  { id: 'construct', group: 'Openers', name: 'Construct', time: '3.6 s', desc: 'One solid shape. The panels slide back along their own axis and the crescents grow in the space they leave, keeping the 237 gap all the way.' },
  { id: 'blueprint', group: 'Openers', name: 'Blueprint', time: '4.9 s', desc: 'The construction as a technical drawing: the end circles, the slide and the gap rings, with live dimensions while the panels slide back, then the colour comes in.' },
  { id: 'assemble', group: 'Openers', name: 'Assemble', time: '2.9 s', desc: 'The panels shoot in along their bars, the middle part springs in and the crescents roll round their own circle into place.' },
  { id: 'sketch', group: 'Openers', name: 'Sketch', time: '3.4 s', desc: 'Each outline draws itself in one stroke, then the colour floods in part by part.' },
  { id: 'drop', group: 'Openers', name: 'Drop', time: '2.4 s', desc: 'The parts fall in under gravity, in an order worked out from the shapes: nothing lands until whatever it rests on is down.' },
  { id: 'outro', group: 'Openers', name: 'Outro', time: '2.6 s', desc: 'Construct in reverse. The panels slide forward until the crescents close up into a solid shape, which then sinks away. Pairs with Construct to open and close a video.' },
  { id: 'turn', group: 'Loops', name: 'Turn', time: '1.6 s a cycle', desc: 'A turn while the parts breathe apart. CCS needs only a half turn, because it reads the same upside down; Frontier makes a full one.' },
  { id: 'orbit', group: 'Loops', name: 'Orbit', time: '3.5 s a cycle', desc: 'The panels fold away and the two crescents close into a ring that spins. Then the mark rebuilds.' },
  { id: 'heartbeat', group: 'Loops', name: 'Heartbeat', time: '1.6 s a cycle', desc: 'A double pulse of the real slide: the crescents swell, the panels draw in and a signal ring goes out on each beat. A listening state.' },
  { id: 'thinking', group: 'Loops', name: 'Thinking', time: '2.4 s a cycle', desc: 'Each crescent breathes in turn, like a slow tick. A calmer working state than Heartbeat.' },
  { id: 'sheen', group: 'Loops', name: 'Sheen', time: '2 s a cycle', desc: 'A band of light crosses the mark, as if the panels were enamel catching a lamp.' },
  { id: 'confirm', group: 'Interface', name: 'Confirm', time: '1.5 s', desc: 'A quick stamp for a done moment: the mark presses in, the crescents swell, and it springs back with a bright chime.' },
  { id: 'hover', group: 'Interface', name: 'Hover', time: '2.4 s a cycle', desc: 'The parts ease apart and settle back, as on a link. When nothing is playing, point at the stage to try it. The CCS web snippet is in the hover folder beside this page.' },
  { id: 'family', group: 'Showcase', name: 'Family', time: '5.5 s', desc: 'Platform and Frontier in one move: the CCS mark re-forms into Frontier and back. From CCS it pairs with the Frontier version you last chose. Both marks share the same bar width and gap, so every crescent and panel travels to its counterpart at the same scale.' },
  { id: 'colourways', group: 'Showcase', name: 'Colourways', time: '1.4 s each', desc: 'Every colour in the current set, washing down the mark part by part. Pick a colour from a set under Look to play that set.' },
  { id: 'reel', group: 'Showcase', name: 'Reel', time: 'about 1 min', desc: 'Every scene back to back, looping.' },
];
const REEL = ['construct', 'assemble', 'turn', 'sketch', 'orbit', 'drop', 'thinking', 'heartbeat', 'blueprint', 'sheen', 'confirm', 'colourways', 'family', 'outro'];
const LOOPS = new Set(INFO.filter((i) => i.group === 'Loops' || i.id === 'hover').map((i) => i.id));

// ---------- logos: each supplies its construction rig, anchors and motion directions; every scene runs on either ----------
const big = 'x="-6000" y="-6000" width="18000" height="18000"';
const maskOf = (id, r) => `<mask id="${id}" maskUnits="userSpaceOnUse" ${big}><rect ${big} fill="#fff"/><circle id="${id}c" r="${r}" fill="#000"/></mask>`;
const LOGOS = {};
{ // CCS: full bars clipped by moving copies of themselves; each C is revealed by a moving circle
  const C = G.ccs, U = C.uhat, A = C.A, CEN = C.CEN, R = C.R, RG = C.R + C.GAP;
  const A2 = [2 * CEN[0] - A[0], 2 * CEN[1] - A[1]], d = [A[0] - CEN[0], A[1] - CEN[1]], n = Math.hypot(...d), dc = [d[0] / n, d[1] / n];
  LOGOS.ccs = {
    id: 'ccs-mark', name: 'CCS', viewBox: C.viewBox, CEN, versions: C.versions, firstCw: 'platform',
    sets: { light: C.light, lightC: C.lightC, dark: C.dark },
    finals: (v) => { const f = C.finals[v]; return [f.topC, f.segs[0], f.segs[1], f.segs[2], f.botC]; },
    readout: ['C radius', `${Math.round(R)} / ${Math.round(RG)}`],
    rigIds: ['k1p', 'k2ap', 'k2bp', 'k3p', 'm1c', 'm2c'],
    rigDefs: () => `<clipPath id="k1"><path id="k1p" d="${C.bars[0]}"/></clipPath><clipPath id="k2a"><path id="k2ap" d="${C.bars[1]}"/></clipPath>
      <clipPath id="k2b"><path id="k2bp" d="${C.bars[1]}"/></clipPath><clipPath id="k3"><path id="k3p" d="${C.bars[2]}"/></clipPath>${maskOf('m1', RG)}${maskOf('m2', RG)}`,
    rigParts: () => `<g id="c1w"><path id="c1" d="${C.craw}" mask="url(#m1)"/></g><g id="c2w"><path id="c2" d="${C.crawBot}" mask="url(#m2)"/></g>
      <g id="p1w"><g clip-path="url(#k1)"><path id="p1" d="${C.bars[0]}"/></g></g>
      <g id="p2w"><g clip-path="url(#k2a)"><g clip-path="url(#k2b)"><path id="p2" d="${C.bars[1]}"/></g></g></g>
      <g id="p3w"><g clip-path="url(#k3)"><path id="p3" d="${C.bars[2]}"/></g></g>`,
    setK(kt, kb) {
      const t = `translate(${U[0] * kt} ${U[1] * kt})`, b = `translate(${-U[0] * kb} ${-U[1] * kb})`;
      el.k1p.setAttribute('transform', t); el.k2ap.setAttribute('transform', t); el.k2bp.setAttribute('transform', b); el.k3p.setAttribute('transform', b);
      const B1 = add(A, U, kt), B2 = add(A2, U, -kb);
      el.m1c.setAttribute('cx', B1[0]); el.m1c.setAttribute('cy', B1[1]); el.m2c.setAttribute('cx', B2[0]); el.m2c.setAttribute('cy', B2[1]);
      return [B1, B2];
    },
    pivots: { c1: A, c2: A2 },
    fly: { p1: U, p3: [-U[0], -U[1]] },
    push: { p1: U, p3: [-U[0], -U[1]], c1: dc, c2: [-dc[0], -dc[1]] },
    turnAngle: 180, orbitSpin: 540,
    orbit: { c1: { pivot: A, rot: 0 }, c2: { pivot: A2, rot: 0 } },
    dropOrder: ['p3w', 'c1w', 'p2w', 'c2w', 'p1w'],
    rings: [2500, 5200, 4600],
    bp: {
      fixed: [[A, R], [A2, R]], rMove: R,
      r1: { x: A[0] - R - 90, y: A[1] + 52, anchor: 'end', text: `R ${Math.round(R)}` }, r2: { x: A2[0] + R + 90, y: A2[1] + 52, anchor: 'start', text: `R ${Math.round(R)}` },
      gap: { x: A[0] - 150, y: A[1] + R + 300, text: `GAP ${GAP_TXT} · INNER R ${Math.round(RG)}` },
      slide: (i, F, B) => (i === 0 ? add([(F[0] + B[0]) / 2, (F[1] + B[1]) / 2], V, -140) : add([(F[0] + B[0]) / 2, (F[1] + B[1]) / 2], V, 260)),
    },
  };
}
// Frontier (both versions): each arm is its full bar clipped by a copy sliding back along the arm; each crescent is revealed by a circle
// that follows the slid-back leaf end, clipped to the side of that leaf so none of it ever hides behind a panel
function makeFrontier(Fr, key, id, name, ringTurn) {
  const CEN = Fr.CEN, W = Fr.W, RG = Fr.W + Fr.g, S = Fr.slideDir, P1 = Fr.leaf.top, P2 = Fr.leaf.mid;
  const rel = (p) => [CEN[0] - p[0], CEN[1] - p[1]];
  LOGOS[key] = {
    id, name, viewBox: Fr.viewBox, CEN, versions: Fr.versions, firstCw: 'frontier',
    sets: G.frontierSets,                                   // the official Frontier ramp, roles as palette.mjs
    finals: (v) => { const f = Fr.finals[v]; return [f.c1, f.p1, f.p2, f.p3, f.c2]; },
    readout: ['End radius', `${Math.round(W)} / ${Math.round(RG)}`],
    rigIds: ['fk1p', 'fk2p', 'fq1p', 'fq2p', 'm1c', 'm2c'],
    rigDefs: () => `<clipPath id="fk1"><path id="fk1p" d="${Fr.bars.top}"/></clipPath><clipPath id="fk2"><path id="fk2p" d="${Fr.bars.mid}"/></clipPath>
      <clipPath id="fq1"><path id="fq1p" d="${Fr.capClip.top}"/></clipPath><clipPath id="fq2"><path id="fq2p" d="${Fr.capClip.mid}"/></clipPath>${maskOf('m1', RG)}${maskOf('m2', RG)}`,
    rigParts: () => `<g id="c1w"><g clip-path="url(#fq1)"><path id="c1" d="${Fr.bars.top}" mask="url(#m1)"/></g></g><g id="c2w"><g clip-path="url(#fq2)"><path id="c2" d="${Fr.bars.mid}" mask="url(#m2)"/></g></g>
      <g id="p1w"><g clip-path="url(#fk1)"><path id="p1" d="${Fr.bars.top}"/></g></g>
      <g id="p2w"><g clip-path="url(#fk2)"><path id="p2" d="${Fr.bars.mid}"/></g></g>
      <g id="p3w"><path id="p3" d="${Fr.bars.foot}"/></g>`,
    setK(kt, kb) {
      const ta = `translate(${S[0] * kt} ${S[1] * kt})`, tb = `translate(${S[0] * kb} ${S[1] * kb})`;
      el.fk1p.setAttribute('transform', ta); el.fk2p.setAttribute('transform', tb); el.fq1p.setAttribute('transform', ta); el.fq2p.setAttribute('transform', tb);
      const B1 = add(P1, S, kt), B2 = add(P2, S, kb);
      el.m1c.setAttribute('cx', B1[0]); el.m1c.setAttribute('cy', B1[1]); el.m2c.setAttribute('cx', B2[0]); el.m2c.setAttribute('cy', B2[1]);
      return [B1, B2];
    },
    pivots: { c1: P1, c2: P2 },
    fly: { p1: Fr.armAxis, p3: Fr.stemAxis },
    push: Fr.push,
    turnAngle: 360, orbitSpin: 720,
    orbit: { c1: { pivot: P1, rot: 0 }, c2: { pivot: P2, rot: ringTurn } },   // the second crescent turns so the two face each other and close into a ring
    dropOrder: Fr.dropOrder,
    rings: [2300, 4900, 4300],
    bp: {
      fixed: [[P1, W], [P2, W]], rMove: W,
      r1: { x: P1[0] + W + 90, y: P1[1] + 52, anchor: 'start', text: 'R 1316' }, r2: { x: P2[0] + W + 90, y: P2[1] + 52, anchor: 'start', text: 'R 1316' },
      gap: { x: CEN[0] - 700, y: CEN[1] + parseFloat(Fr.viewBox.split(' ')[3]) / 2 - 900, text: `GAP ${GAP_TXT} · INNER R ${Math.round(RG)}` },
      slide: (i, F, B) => add([(F[0] + B[0]) / 2, (F[1] + B[1]) / 2], V, -150),
    },
  };
  for (const k of ['c1', 'c2']) LOGOS[key].orbit[k].to = rel(LOGOS[key].orbit[k].pivot);
}
makeFrontier(G.frontier, 'frontier', 'frontier-mark', 'Frontier', -90);
LOGOS.ccs.orbit.c1.to = [LOGOS.ccs.CEN[0] - LOGOS.ccs.pivots.c1[0], LOGOS.ccs.CEN[1] - LOGOS.ccs.pivots.c1[1]];
LOGOS.ccs.orbit.c2.to = [LOGOS.ccs.CEN[0] - LOGOS.ccs.pivots.c2[0], LOGOS.ccs.CEN[1] - LOGOS.ccs.pivots.c2[1]];
let LOGO = LOGOS.ccs, CEN = LOGO.CEN;

// ---------- the stage: the current logo's rig plus the shared layers (rings, sketch, sheen, blueprint) ----------
const svg = $('mark');
const five = (f) => [0, 1, 2, 3, 4].map(f).join('');
const TXT = `font-family="'IBM Plex Mono', Consolas, 'SF Mono', Menlo, monospace" font-size="150" letter-spacing="18" stroke="none"`;
const PARTS = ['c1w', 'p1w', 'p2w', 'p3w', 'c2w'];          // top crescent, top panel, middle panel, bottom or foot panel, second crescent
const COMMON = ['morph', 'spin', 'c1w', 'c2w', 'p1w', 'p2w', 'p3w', 'c1', 'c2', 'p1', 'p2', 'p3', 'rings', 'ringA', 'ringB', 'sketch', 'sheen', 'sheenWide', 'sheenThin', 'bp',
  'bpD1', 'bpD2', 'bpB1', 'bpB2', 'bpG1', 'bpG2', 'bpL1', 'bpL2', 'bpA1', 'bpA2', 'bpE1', 'bpE2', 'bpR1', 'bpR2', 'bpS1', 'bpS2', 'bpGt'];
let el = {}, SK = [], SC = [], MP = [];
function buildRig() {
  const bp = LOGO.bp, [[F1, r1], [F2, r2]] = bp.fixed, rm = bp.rMove, rg = rm + G.ccs.GAP;
  svg.setAttribute('viewBox', LOGO.viewBox);
  svg.setAttribute('aria-label', LOGO.name === 'CCS' ? 'The CCS mark: three panels in an S, with a C at each end' : `The ${LOGO.name} mark: an F of three panels, with a crescent at the end of each arm`);
  svg.innerHTML = `
<defs>
  ${LOGO.rigDefs()}
  <clipPath id="sheenClip">${five((i) => `<path id="sc${i}"/>`)}</clipPath>
  <linearGradient id="sgWide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.32"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="sgThin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
</defs>
<g id="rings" fill="none"><circle id="ringA" cx="${CEN[0]}" cy="${CEN[1]}" r="${LOGO.rings[0]}" stroke-opacity="0"/><circle id="ringB" cx="${CEN[0]}" cy="${CEN[1]}" r="${LOGO.rings[0]}" stroke-opacity="0"/></g>
<g id="spin">
  ${LOGO.rigParts()}
  <g id="morph" style="display: none">${five((i) => `<path id="mp${i}"/>`)}</g>
  <g id="sketch" opacity="0" stroke-linejoin="round">${five((i) => `<path id="sk${i}" stroke-width="20"/>`)}</g>
  <g id="sheen" opacity="0" clip-path="url(#sheenClip)">
    <g id="sheenWide"><rect x="-900" y="-7000" width="1800" height="14000" fill="url(#sgWide)" transform="rotate(45)"/></g>
    <g id="sheenThin"><rect x="-210" y="-7000" width="420" height="14000" fill="url(#sgThin)" transform="rotate(45)"/></g>
  </g>
  <g id="bp" opacity="0" fill="none" stroke-width="10">
    <circle id="bpD1" cx="${F1[0]}" cy="${F1[1]}" r="${r1}" stroke-dasharray="60 40"/><circle id="bpD2" cx="${F2[0]}" cy="${F2[1]}" r="${r2}" stroke-dasharray="60 40"/>
    <circle id="bpB1" r="${rm}"/><circle id="bpB2" r="${rm}"/>
    <circle id="bpG1" r="${rg}" stroke-dasharray="16 26"/><circle id="bpG2" r="${rg}" stroke-dasharray="16 26"/>
    <line id="bpL1" x1="${F1[0]}" y1="${F1[1]}"/><line id="bpL2" x1="${F2[0]}" y1="${F2[1]}"/>
    <circle id="bpA1" cx="${F1[0]}" cy="${F1[1]}" r="34" stroke="none"/><circle id="bpA2" cx="${F2[0]}" cy="${F2[1]}" r="34" stroke="none"/>
    <circle id="bpE1" r="34" stroke="none"/><circle id="bpE2" r="34" stroke="none"/>
    <text id="bpR1" ${TXT} x="${bp.r1.x}" y="${bp.r1.y}" text-anchor="${bp.r1.anchor}">${bp.r1.text}</text>
    <text id="bpR2" ${TXT} x="${bp.r2.x}" y="${bp.r2.y}" text-anchor="${bp.r2.anchor}">${bp.r2.text}</text>
    <text id="bpS1" ${TXT} text-anchor="middle">SLIDE 0</text>
    <text id="bpS2" ${TXT} text-anchor="middle">SLIDE 0</text>
    <text id="bpGt" ${TXT} x="${bp.gap.x}" y="${bp.gap.y}" text-anchor="middle">${bp.gap.text}</text>
  </g>
</g>`;
  el = Object.fromEntries([...COMMON, ...LOGO.rigIds].map((id) => [id, $(id)]));
  SK = [0, 1, 2, 3, 4].map((i) => $(`sk${i}`)); SC = [0, 1, 2, 3, 4].map((i) => $(`sc${i}`)); MP = [0, 1, 2, 3, 4].map((i) => $(`mp${i}`));
  $('roRadLabel').textContent = LOGO.readout[0]; $('roRad').textContent = LOGO.readout[1];
  paintStage();
}

// ---------- gradient skin: scenes tween solid fills; each part renders as its colourway gradient ----------
const GLUT = {"c1|#2B4A86":["#7E93B8","#2B4A86"],"c2|#2B4A86":["#2B4A86","#7E93B8"],"p1|#5B82D1":["#5B82D1","#8AA9E3"],"p2|#7E93B8":["#7E93B8","#A3B4CF"],"p3|#5B82D1":["#8AA9E3","#5B82D1"],"c1|#8F3A0E":["#FF8A4C","#8F3A0E"],"c2|#8F3A0E":["#8F3A0E","#FF8A4C"],"p1|#E4571E":["#E4571E","#F47A3C"],"p2|#E07A36":["#E07A36","#F09A5C"],"p3|#E4571E":["#F47A3C","#E4571E"],"c1|#A11030":["#FF2A4B","#A11030"],"c2|#A11030":["#A11030","#FF2A4B"],"p1|#D7263D":["#D7263D","#FF4D6D"],"p2|#FF4D6D":["#FF4D6D","#FF85A1"],"p3|#D7263D":["#FF4D6D","#D7263D"],"c1|#1D3F9E":["#3B82F6","#1D3F9E"],"c2|#1D3F9E":["#1D3F9E","#3B82F6"],"p1|#2563EB":["#2563EB","#3B82F6"],"p2|#60A5FA":["#60A5FA","#93C5FD"],"p3|#2563EB":["#3B82F6","#2563EB"],"c1|#0A6E8C":["#2FD8C2","#0A6E8C"],"c2|#0A6E8C":["#0A6E8C","#2FD8C2"],"p1|#14C8B4":["#14C8B4","#1AA6D6"],"p2|#5FD0DA":["#5FD0DA","#9FE3EA"],"p3|#14C8B4":["#1AA6D6","#14C8B4"],"c1|#4F2391":["#A855F7","#4F2391"],"c2|#4F2391":["#4F2391","#A855F7"],"p1|#7C3AED":["#7C3AED","#A78BFA"],"p2|#F472B6":["#F0ABFC","#F472B6"],"p3|#7C3AED":["#A78BFA","#7C3AED"],"c1|#047857":["#34D399","#047857"],"c2|#047857":["#047857","#34D399"],"p1|#10B981":["#10B981","#34D399"],"p2|#6EE7B7":["#6EE7B7","#A7F3D0"],"p3|#10B981":["#34D399","#10B981"],"c1|#8A5A00":["#FFC23D","#8A5A00"],"c2|#8A5A00":["#8A5A00","#FFC23D"],"p1|#D98E04":["#D98E04","#F2A900"],"p2|#FFC23D":["#FFC23D","#FFD978"],"p3|#D98E04":["#F2A900","#D98E04"],"c1|#7E93B8":["#2B4A86","#7E93B8"],"c2|#7E93B8":["#7E93B8","#2B4A86"],"c1|#FF8A4C":["#8F3A0E","#FF8A4C"],"c2|#FF8A4C":["#FF8A4C","#8F3A0E"],"c1|#FF2A4B":["#A11030","#FF2A4B"],"c2|#FF2A4B":["#FF2A4B","#A11030"],"c1|#3B82F6":["#1D3F9E","#3B82F6"],"c2|#3B82F6":["#3B82F6","#1D3F9E"],"c1|#2FD8C2":["#0A6E8C","#2FD8C2"],"c2|#2FD8C2":["#2FD8C2","#0A6E8C"],"c1|#A855F7":["#4F2391","#A855F7"],"c2|#A855F7":["#A855F7","#4F2391"],"c1|#34D399":["#047857","#34D399"],"c2|#34D399":["#34D399","#047857"],"c1|#FFC23D":["#8A5A00","#FFC23D"],"c2|#FFC23D":["#FFC23D","#8A5A00"],"c1|#E6ECF5":["#E6ECF5","#2B4A86"],"c2|#E6ECF5":["#2B4A86","#E6ECF5"],"p2|#F4F7FB":["#D4DCEA","#F4F7FB"],"p2|#FFC394":["#FF9F5A","#FFC394"],"p2|#FF85A1":["#FF4D6D","#FF85A1"],"p2|#93C5FD":["#60A5FA","#93C5FD"],"p2|#9FE3EA":["#5FD0DA","#9FE3EA"],"c1|#F0ABFC":["#F0ABFC","#4F2391"],"c2|#F0ABFC":["#4F2391","#F0ABFC"],"p2|#A7F3D0":["#6EE7B7","#A7F3D0"],"p2|#FFD978":["#FFC23D","#FFD978"]};
const GPART = ['c1', 'p1', 'p2', 'p3', 'c2'];
const hex2 = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
const toHex = (c) => { if (!c) return null; c = String(c).trim(); if (c[0] === '#') return c.length === 4 ? ('#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3]).toUpperCase() : c.slice(0, 7).toUpperCase(); const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(',').map(parseFloat); return ('#' + hex2(v[0]) + hex2(v[1]) + hex2(v[2])).toUpperCase(); };
const lift = (h) => '#' + [1, 3, 5].map((i) => hex2(parseInt(h.substr(i, 2), 16) * 0.72 + 255 * 0.28)).join('');
function skinGradients() {
  if (!svg) return;
  let defs = svg.querySelector('defs'); if (!defs) return;
  if (!svg.querySelector('#gsk-c1')) defs.insertAdjacentHTML('beforeend', GPART.map((p) => '<linearGradient id="gsk-' + p + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0"/><stop offset="1"/></linearGradient>').join('') + [0, 1, 2, 3, 4].map((i) => '<linearGradient id="gsk-m' + i + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0"/><stop offset="1"/></linearGradient>').join(''));
  const apply = (node, part, gid) => { if (!node) return; const h = toHex(node.getAttribute('fill')); if (!h) return; const pair = GLUT[part + '|' + h] || [h, lift(h)]; const g = svg.querySelector('#' + gid); if (!g) return; const st = g.children; if (st[0].getAttribute('stop-color') !== pair[0]) st[0].setAttribute('stop-color', pair[0]); if (st[1].getAttribute('stop-color') !== pair[1]) st[1].setAttribute('stop-color', pair[1]); const f = 'url(#' + gid + ')'; if (node.style.fill !== f) node.style.fill = f; };
  GPART.forEach((p) => apply(el[p], p, 'gsk-' + p));
  (MP || []).forEach((m, i) => apply(m, GPART[i], 'gsk-m' + i));
}
gsap.ticker.add(skinGradients);

// ---------- explicit transforms: every moving group owns its own numbers, nothing carries between scenes ----------
const DEF = { x: 0, y: 0, r: 0, s: 1, sx: 1, sy: 1, o: 1, ox: 0, oy: 0 };
const TR = Object.fromEntries(['spin', ...PARTS].map((id) => [id, { ...DEF }]));
const pivot = (t, p) => { t.ox = p[0]; t.oy = p[1]; };
function renderTR() {
  for (const id in TR) {
    const t = TR[id], node = el[id];
    if (!node) continue;
    node.setAttribute('transform', `translate(${t.x} ${t.y}) translate(${t.ox} ${t.oy}) rotate(${t.r}) scale(${t.s * t.sx} ${t.s * t.sy}) translate(${-t.ox} ${-t.oy})`);
    node.setAttribute('opacity', t.o);
  }
}
gsap.ticker.add(renderTR);

const finalsD = () => LOGO.finals(state.s === LOGO.versions.b ? 'b' : 'a');
function boxes() {   // bounding boxes of the finished parts, in PARTS order
  return finalsD().map((d) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); svg.appendChild(p); const b = p.getBBox(); p.remove(); return { cx: b.x + b.width / 2, cy: b.y + b.height / 2, bottom: b.y + b.height }; });
}

// the slide: k for both ends, plus dt and db so the two crescents can breathe on their own
function setK(k) {
  state.k = k;
  const kt = k + state.dt, kb = k + state.db;
  const [B1, B2] = LOGO.setK(kt, kb);
  el.c1.style.opacity = Math.min(1, Math.max(0, (kt - 20) / 80)); el.c2.style.opacity = Math.min(1, Math.max(0, (kb - 20) / 80));
  for (const [n, p] of [['B1', B1], ['G1', B1], ['E1', B1], ['B2', B2], ['G2', B2], ['E2', B2]]) { el[`bp${n}`].setAttribute('cx', p[0]); el[`bp${n}`].setAttribute('cy', p[1]); }
  el.bpL1.setAttribute('x2', B1[0]); el.bpL1.setAttribute('y2', B1[1]); el.bpL2.setAttribute('x2', B2[0]); el.bpL2.setAttribute('y2', B2[1]);
  const [[F1], [F2]] = LOGO.bp.fixed;
  for (const [i, t, F, B, kk] of [[0, el.bpS1, F1, B1, kt], [1, el.bpS2, F2, B2, kb]]) { const m = LOGO.bp.slide(i, F, B); t.setAttribute('x', m[0]); t.setAttribute('y', m[1]); t.setAttribute('transform', `rotate(-45 ${m[0]} ${m[1]})`); t.textContent = `SLIDE ${Math.round(kk)}`; }
  const r = Math.round(k);
  if (!state.exporting) { $('k').value = Math.min(1000, r); $('kOut').textContent = `${r} units`; $('roK').textContent = r; }
}

// ---------- colour ----------
const sets = () => (state.ground === 'for-dark' ? LOGO.sets.dark : state.tone === 'lighter' ? LOGO.sets.lightC : LOGO.sets.light);
const colours = (name = state.cw) => sets()[name] || sets()[LOGO.firstCw];
const ink = () => (state.ground === 'for-dark' ? '#FFFFFF' : '#0D1730');
const groundHex = () => (state.ground === 'for-dark' ? '#14244A' : '#F3F2F1');
const FILLS = ['c1', 'p1', 'p2', 'p3', 'c2'];
const fillOf = (c, id) => (id[0] === 'c' ? c[0] : id === 'p2' ? c[2] : c[1]);
function paint(c, dur = 0, stagger = 0) {
  FILLS.forEach((id, i) => (dur ? gsap.to(el[id], { attr: { fill: fillOf(c, id) }, duration: dur, delay: i * stagger, ease: 'power2.inOut' }) : gsap.set(el[id], { attr: { fill: fillOf(c, id) } })));
}
const label = (n) => CW_LABEL[n] || n.replace(/-/g, ' ');
function renderChips() {
  const box = $('chips'); box.innerHTML = '';
  const all = sets();
  for (const g of CW_GROUPS) {
    const keys = g.keys.filter((k) => all[k]);
    if (!keys.length) continue;
    const h = document.createElement('div'); h.className = 'cwgroup';
    h.innerHTML = `<span class="cwname">${g.name}</span><span class="cwnote">${g.note}</span>`;
    box.appendChild(h);
    for (const name of keys) {
      const c = all[name], b = document.createElement('button');
      b.className = 'cw'; b.setAttribute('aria-pressed', String(name === state.cw)); b.dataset.cw = name;
      b.innerHTML = `<span class="sw" aria-hidden="true"><i style="background:${c[1]}"></i><i style="background:${c[2]}"></i><i style="background:${c[0]}"></i></span>${label(name)}`;
      b.addEventListener('click', () => { if (state.exporting) return; state.cw = name; markChips(); paintStage(); paint(colours(), 0.5, 0.06); $('roCw').textContent = label(name); sfx('pop', { g: 0.25 }); });
      box.appendChild(b);
    }
  }
}
const markChips = () => document.querySelectorAll('.cw').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cw === state.cw)));

// Two palettes, both aimed at quiet elegance rather than effects:
//   clean  interface sounds in the Apple manner: short soft clicks and taps that do not ring, a rounded low thump, smooth brief
//          air, and a two-note marimba rise for a settle; very little room, nothing detuned, nothing gliding
//   warm   a soft felt piano: gentle notes and a rolled major chord on a settle, in a slightly larger room
// Every pitched sound snaps to D major, so overlapping cues stay consonant.
const NOISE = new WeakMap(), ROOMS = new WeakMap();
function noise(ac) {
  if (!NOISE.has(ac)) {
    const b = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), d = b.getChannelData(0); let s = 12345, last = 0;
    for (let i = 0; i < d.length; i++) { s = (s * 1103515245 + 12345) & 0x7fffffff; const w = (s / 0x3fffffff) - 1; last = 0.6 * last + 0.4 * w; d[i] = last; }
    NOISE.set(ac, b);
  }
  const n = ac.createBufferSource(); n.buffer = NOISE.get(ac); n.loop = true; return n;
}
function room(ac, seconds) {                              // a smooth, dark room: decaying stereo noise used as a convolution reverb
  if (!ROOMS.has(ac)) ROOMS.set(ac, {});
  const cache = ROOMS.get(ac);
  if (!cache[seconds]) {
    const len = Math.round(ac.sampleRate * seconds), b = ac.createBuffer(2, len, ac.sampleRate); let s = 777;
    for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); let lp = 0; for (let i = 0; i < len; i++) { s = (s * 16807) % 2147483647; const w = (s / 1073741823.5) - 1; lp = 0.7 * lp + 0.3 * w; d[i] = lp * Math.pow(1 - i / len, 4); } }
    cache[seconds] = b;
  }
  return cache[seconds];
}
const MAJOR = [146.83, 164.81, 185, 196, 220, 246.94, 277.18];   // D major, D3 upwards; pitched voices snap to these in any octave
function inKey(f) { let best = f, err = Infinity; for (let o = -2; o <= 5; o++) for (const n of MAJOR) { const c = n * 2 ** o, e = Math.abs(Math.log2(c / f)); if (e < err) { err = e; best = c; } } return best; }
const note = (n, oct) => MAJOR[n] * 2 ** oct;             // 0 = D, 2 = F sharp, 4 = A
function env(ac, t, a, peak, d, floor = 0.0001) { const g = ac.createGain(); g.gain.setValueAtTime(floor, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(floor, t + a + d); return g; }
function sine(ac, f, t) { const n = ac.createOscillator(); n.type = 'sine'; n.frequency.setValueAtTime(f, t); return n; }
function pan(ac, out, v) { const p = ac.createStereoPanner(); p.pan.value = v; p.connect(out); return p; }
function air(ac, out, t, d, g, f0, f1, q = 0.55, p0 = 0, p1 = 0) {   // smooth filtered air with an even rise and fall
  const n = noise(ac), bp = ac.createBiquadFilter(), gn = ac.createGain(), p = ac.createStereoPanner();
  bp.type = 'bandpass'; bp.Q.value = q; bp.frequency.setValueAtTime(f0, t); bp.frequency.exponentialRampToValueAtTime(f1, t + d);
  gn.gain.setValueAtTime(0.0001, t); gn.gain.linearRampToValueAtTime(g, t + d * 0.5); gn.gain.linearRampToValueAtTime(0.0001, t + d);
  p.pan.setValueAtTime(p0, t); p.pan.linearRampToValueAtTime(p1, t + d);
  n.connect(bp).connect(gn).connect(p).connect(out); n.start(t); n.stop(t + d + 0.05);
}
function marimba(ac, out, t, f, g, d = 0.45, pv = 0) {    // a soft mallet: the fundamental and the bright fourth partial that dies quickly
  const o = pan(ac, out, pv);
  const a = sine(ac, f, t), ea = env(ac, t, 0.004, g, d); a.connect(ea).connect(o); a.start(t); a.stop(t + d + 0.05);
  const b = sine(ac, f * 3.93, t), eb = env(ac, t, 0.002, g * 0.18, 0.06); b.connect(eb).connect(o); b.start(t); b.stop(t + 0.1);
}
function piano(ac, out, t, f, g, d = 1.4, pv = 0) {       // a felt piano: a soft hammer, gentle harmonics, darkened
  const o = pan(ac, out, pv), lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = Math.min(3200, f * 6); lp.connect(o);
  for (const [m, gg, dd] of [[1, 1, d], [2, 0.32, d * 0.6], [3, 0.1, d * 0.35]]) { const s = sine(ac, f * m, t), e = env(ac, t, 0.006, g * gg, dd); s.connect(e).connect(lp); s.start(t); s.stop(t + dd + 0.05); }
}
function click(ac, out, t, g, centre = 2400) {           // a soft click: a few milliseconds of band-limited air
  const n = noise(ac), bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = centre; bp.Q.value = 0.9;
  const e = env(ac, t, 0.0015, g, 0.02); n.connect(bp).connect(e).connect(out); n.start(t); n.stop(t + 0.04);
}
const SFX_SETS = {
  clean: {
    room: 0.7, wet: 0.12, top: 9000, gain: 1.1,
    swish(ac, out, t, { d = 0.8, g = 0.4, f0 = 280, f1 = 2400, pan: pv = 0 } = {}) { const dd = Math.min(d, 0.9); air(ac, out, t, dd, g * 0.42, f0 < f1 ? 420 : 2000, f0 < f1 ? 2000 : 420, 0.5, -pv * 0.5, pv * 0.5); },
    whirl(ac, out, t, { d = 1.2, g = 0.3 } = {}) { air(ac, out, t, Math.min(d, 1.2), g * 0.45, 320, 1300, 0.6, -0.4, 0.4); },
    thud(ac, out, t, { g = 0.7 } = {}) { const s = sine(ac, 140, t); s.frequency.exponentialRampToValueAtTime(92, t + 0.14); const e = env(ac, t, 0.012, g * 0.42, 0.2); s.connect(e).connect(out); s.start(t); s.stop(t + 0.26); click(ac, out, t, g * 0.04, 800); },
    tick(ac, out, t, { g = 0.22 } = {}) { click(ac, out, t, g * 0.9, 2600); const s = sine(ac, 880, t), e = env(ac, t, 0.002, g * 0.12, 0.025); s.connect(e).connect(out); s.start(t); s.stop(t + 0.05); },
    tock(ac, out, t, { g = 0.32, f = 540 } = {}) { marimba(ac, out, t, inKey(Math.max(330, Math.min(f, 660))), g * 0.7, 0.12); },
    pop(ac, out, t, { g = 0.3, f = 520 } = {}) { marimba(ac, out, t, inKey(Math.max(440, Math.min(f, 880))), g * 0.6, 0.14); },
    chime(ac, out, t, { g = 0.22 } = {}) { marimba(ac, out, t, note(0, 2), g * 0.9, 0.5, -0.15); marimba(ac, out, t + 0.1, note(4, 2), g * 0.8, 0.6, 0.15); },
    air(ac, out, t, { g = 0.18, d = 1.4 } = {}) { air(ac, out, t, Math.min(d, 1.1), g * 0.35, 900, 300, 0.5); },
    scratch(ac, out, t, { g = 0.1, d = 1.6 } = {}) { air(ac, out, t, d, g * 0.22, 1800, 1400, 0.8); },
    shimmer(ac, out, t, { g = 0.08, d = 1.4 } = {}) { [note(0, 2), note(2, 2), note(4, 2)].forEach((f, i) => marimba(ac, out, t + i * d * 0.18, f, g * 1.6, 0.35, -0.3 + i * 0.3)); },
    down(ac, out, t, { g = 0.3 } = {}) { marimba(ac, out, t, note(4, 2), g * 0.6, 0.35, 0.1); marimba(ac, out, t + 0.12, note(0, 2), g * 0.55, 0.5, -0.1); },
  },
  warm: {
    room: 1.4, wet: 0.2, top: 6500, gain: 1.15,
    swish(ac, out, t, { d = 0.8, g = 0.4, f0 = 280, f1 = 2400, pan: pv = 0 } = {}) { air(ac, out, t, Math.min(d, 1.1), g * 0.3, f0 < f1 ? 300 : 1400, f0 < f1 ? 1400 : 300, 0.5, -pv * 0.4, pv * 0.4); },
    whirl(ac, out, t, { d = 1.2, g = 0.3 } = {}) { air(ac, out, t, Math.min(d, 1.3), g * 0.32, 260, 1000, 0.6, -0.3, 0.3); },
    thud(ac, out, t, { g = 0.7 } = {}) { piano(ac, out, t, note(0, 0), g * 0.5, 0.9); },
    tick(ac, out, t, { g = 0.22 } = {}) { piano(ac, out, t, note(4, 2), g * 0.45, 0.5); },
    tock(ac, out, t, { g = 0.32, f = 540 } = {}) { piano(ac, out, t, inKey(Math.max(294, Math.min(f, 587))), g * 0.55, 0.6); },
    pop(ac, out, t, { g = 0.3, f = 520 } = {}) { piano(ac, out, t, inKey(Math.max(440, Math.min(f, 880))), g * 0.45, 0.55); },
    chime(ac, out, t, { g = 0.22 } = {}) { [note(0, 1), note(2, 1), note(4, 1), note(1, 2)].forEach((f, i) => piano(ac, out, t + i * 0.07, f, g * 0.7, 1.8, -0.3 + i * 0.2)); },
    air(ac, out, t, { g = 0.18, d = 1.4 } = {}) { air(ac, out, t, Math.min(d, 1.2), g * 0.3, 800, 260, 0.5); },
    scratch(ac, out, t, { g = 0.1, d = 1.6 } = {}) { air(ac, out, t, d, g * 0.18, 1500, 1200, 0.8); },
    shimmer(ac, out, t, { g = 0.08, d = 1.4 } = {}) { [note(0, 2), note(2, 2), note(4, 2), note(0, 3)].forEach((f, i) => piano(ac, out, t + i * d * 0.15, f, g * 1.3, 0.8, -0.3 + i * 0.2)); },
    down(ac, out, t, { g = 0.3 } = {}) { piano(ac, out, t, note(4, 1), g * 0.45, 0.7); piano(ac, out, t + 0.14, note(0, 1), g * 0.45, 1.0); },
  },
};
let SFX = SFX_SETS.clean;
// master: dry and a little room, the top end rolled off, a gentle compressor; .comp is where the iPhone route taps in
function bus(ac) {
  const P = SFX, g = ac.createGain(); g.gain.value = P.gain;
  const dry = ac.createGain(); dry.gain.value = 1 - P.wet;
  const verb = ac.createConvolver(); verb.buffer = room(ac, P.room);
  const wet = ac.createGain(); wet.gain.value = P.wet * 1.6;
  const tone = ac.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = P.top; tone.Q.value = 0.5;
  const c = ac.createDynamicsCompressor(); c.threshold.value = -18; c.ratio.value = 2.5; c.attack.value = 0.01; c.release.value = 0.25;
  g.connect(dry).connect(tone); g.connect(verb).connect(wet).connect(tone);
  tone.connect(c).connect(ac.destination);
  g.comp = c; return g;
}
let AC = null, LIVE = null, MEDIA = null;
function sfx(type, p = {}) {
  if (!state.sound || state.exporting || !AC) return;
  const ts = gsap.globalTimeline.timeScale(), q = { ...p };
  if (q.d) q.d = q.d / ts;
  SFX[type](AC, LIVE, AC.currentTime + 0.005, q);
}
// cues: live calls on the timeline, and a list kept on the timeline for offline rendering
function cues(t, list) { t.data = { cues: list }; list.forEach(([at, type, p]) => t.call(() => sfx(type, p), null, Math.max(0.001, at))); return t; }

// ---------- scenes ----------
let tl = null, pending = null;
function reset(k = state.s) {
  gsap.killTweensOf([...Object.values(TR), state, ...SK, el.sketch, el.sheen, el.sheenWide, el.sheenThin, el.bp, ...el.bp.children, el.ringA, el.ringB]);
  for (const id in TR) Object.assign(TR[id], DEF);
  state.dt = 0; state.db = 0;
  gsap.set([el.sketch, el.sheen, el.bp], { opacity: 0 });
  gsap.killTweensOf(MP); el.morph.style.display = 'none';
  gsap.set([el.ringA, el.ringB], { attr: { 'stroke-opacity': 0, r: LOGO.rings[0] } });
  setK(k); paint(colours()); renderTR();
}
function stopScene() {
  if (pending) { pending.kill(); pending = null; }
  if (tl) { tl.kill(); tl = null; }
  state.scene = null; state.reel = false;
  document.querySelectorAll('.tile').forEach((b) => { b.setAttribute('aria-pressed', 'false'); b.querySelector('.bar').style.transform = 'scaleX(0)'; });
}
const kTo = (k, vars) => ({ k, onUpdate: () => setK(state.k), ...vars });
const up = () => setK(state.k);
const parts = (...names) => names.map((n) => TR[n]);
const solidFor = (c) => (state.ground === 'for-light' && state.tone === 'lighter' ? c[1] : c[0]);

const SCENES = {
  construct() {
    const c = colours(); reset(0);
    FILLS.forEach((id) => gsap.set(el[id], { attr: { fill: solidFor(c) } }));
    pivot(TR.spin, CEN); pivot(TR.p2w, CEN);
    const t = gsap.timeline()
      .from(TR.spin, { s: 0.82, o: 0, duration: 0.8, ease: 'power3.out' }, 0)
      .to(state, kTo(state.s, { duration: 1.7, ease: 'expo.inOut' }), 0.85)
      .to([el.p1, el.p3], { attr: { fill: c[1] }, duration: 1.0, ease: 'power1.inOut' }, 1.3)
      .to([el.c1, el.c2], { attr: { fill: c[0] }, duration: 0.9, ease: 'power1.inOut' }, 1.5)
      .to(el.p2, { attr: { fill: c[2] }, duration: 1.0, ease: 'power1.inOut' }, 1.45)
      .to(TR.p2w, { s: 1.045, duration: 0.16, ease: 'power2.out', yoyo: true, repeat: 1 }, 2.5)
      .to({}, { duration: 0.75 });
    return cues(t, [[0.02, 'air', { g: 0.1, d: 0.9 }], [0.85, 'swish', { d: 1.7, g: 0.38 }], [2.5, 'chime', { g: 0.2 }]]);
  },
  blueprint() {
    reset(0);
    const I = ink();
    el.bp.setAttribute('stroke', I);
    [el.bpA1, el.bpA2, el.bpE1, el.bpE2, el.bpR1, el.bpR2, el.bpS1, el.bpS2, el.bpGt].forEach((n) => n.setAttribute('fill', I));
    PARTS.forEach((p) => { TR[p].o = 0.16; });
    const later = [el.bpB1, el.bpB2, el.bpG1, el.bpG2, el.bpL1, el.bpL2, el.bpE1, el.bpE2, el.bpS1, el.bpS2, el.bpGt];
    gsap.set([el.bpD1, el.bpD2], { attr: { r: 0 } });
    gsap.set([el.bpR1, el.bpR2, ...later], { opacity: 0 });
    gsap.set(el.bp, { opacity: 1 });
    const t = gsap.timeline()
      .from(PARTS.map((p) => TR[p]), { o: 0, duration: 0.5 }, 0)
      .to(el.bpD1, { attr: { r: LOGO.bp.fixed[0][1] }, duration: 0.9, ease: 'expo.out' }, 0.15)
      .to(el.bpD2, { attr: { r: LOGO.bp.fixed[1][1] }, duration: 0.9, ease: 'expo.out' }, 0.27)
      .to([el.bpR1, el.bpR2], { opacity: 1, duration: 0.4 }, 0.7)
      .to(later, { opacity: 1, duration: 0.35, stagger: 0.03 }, 1.0)
      .to(state, kTo(state.s, { duration: 1.9, ease: 'power2.inOut' }), 1.3)
      .to(PARTS.map((p) => TR[p]), { o: 1, duration: 0.55, ease: 'power1.out', stagger: 0.09 }, 3.3)
      .to(el.bp, { opacity: 0, duration: 0.5 }, 3.9)
      .to({}, { duration: 0.5 });
    return cues(t, [[0.15, 'tick', { g: 0.2, f: 1900 }], [0.27, 'tick', { g: 0.2, f: 1700 }], [1.0, 'scratch', { g: 0.06, d: 0.5 }], [1.3, 'swish', { d: 1.9, g: 0.3, f1: 1800 }], [3.3, 'pop', { g: 0.2 }], [3.5, 'chime', { g: 0.16 }]]);
  },
  assemble() {
    reset();
    const far = 3200, dur = 1.15;
    pivot(TR.p2w, CEN); pivot(TR.c1w, LOGO.pivots.c1); pivot(TR.c2w, LOGO.pivots.c2); pivot(TR.spin, CEN);
    const t = gsap.timeline()
      .from(TR.p1w, { x: LOGO.fly.p1[0] * far, y: LOGO.fly.p1[1] * far, duration: dur, ease: 'expo.out' }, 0)
      .from(TR.p3w, { x: LOGO.fly.p3[0] * far, y: LOGO.fly.p3[1] * far, duration: dur, ease: 'expo.out' }, 0.1)
      .from(TR.p2w, { s: 0, duration: 0.9, ease: 'back.out(1.9)' }, 0.32)
      .from([TR.c1w, TR.c2w], { r: -160, o: 0, duration: 1.3, ease: 'expo.out' }, 0.5)
      .from(TR.spin, { r: -14, duration: 1.9, ease: 'elastic.out(1, 0.42)' }, 0.25)
      .to({}, { duration: 0.6 });
    return cues(t, [[0.0, 'swish', { d: 0.55, g: 0.4, pan: 0.6 }], [0.1, 'swish', { d: 0.55, g: 0.35, pan: -0.6 }], [0.36, 'pop', { g: 0.3 }], [0.5, 'whirl', { d: 0.9, g: 0.22 }], [1.3, 'chime', { g: 0.2 }]]);
  },
  sketch() {
    reset();
    const c = colours(), ds = finalsD(), I = ink();
    PARTS.forEach((p) => { TR[p].o = 0; });
    SK.forEach((p, i) => {
      p.setAttribute('d', ds[i]);
      const L = p.getTotalLength();
      gsap.set(p, { attr: { fill: fillOf(c, FILLS[i]), 'fill-opacity': 0, stroke: I, 'stroke-opacity': 1, 'stroke-dasharray': L, 'stroke-dashoffset': L } });
    });
    gsap.set(el.sketch, { opacity: 1 });
    const t = gsap.timeline()
      .to(SK, { attr: { 'stroke-dashoffset': 0 }, duration: 1.6, ease: 'power2.inOut', stagger: 0.13 }, 0.1)
      .to(SK, { attr: { 'fill-opacity': 1 }, duration: 0.55, ease: 'power1.out', stagger: 0.1 }, 1.7)
      .to(SK, { attr: { 'stroke-opacity': 0 }, duration: 0.45, ease: 'power1.in' }, 2.35)
      .set(PARTS.map((p) => TR[p]), { o: 1 }, 2.85)
      .set(el.sketch, { opacity: 0 }, 2.85)
      .to({}, { duration: 0.55 });
    return cues(t, [[0.1, 'scratch', { g: 0.1, d: 2.1 }], [1.7, 'pop', { g: 0.14, f: 440 }], [1.8, 'pop', { g: 0.14, f: 494 }], [1.9, 'pop', { g: 0.14, f: 554 }], [2.0, 'pop', { g: 0.14, f: 587 }], [2.1, 'pop', { g: 0.14, f: 659 }], [2.4, 'chime', { g: 0.16 }]]);
  },
  drop() {
    reset();
    const bx = boxes(), idx = Object.fromEntries(PARTS.map((p, i) => [p, i]));
    const order = LOGO.dropOrder;                              // each part lands only after everything beneath it
    const tilt = { p3w: 7, c1w: -6, p2w: 5, c2w: -7, p1w: 6 };
    // gravity fall, then two small damped bounces; the bigger rebound (140) stays inside the 237 gap, so no part can pass through another
    const fall = 0.55, gapT = 0.2;
    const t = gsap.timeline(), cl = [];
    order.forEach((p, i) => {
      const b = bx[idx[p]], at = i * gapT, hit = at + fall;
      pivot(TR[p], [b.cx, b.cy]);
      TR[p].y = -7600; TR[p].r = tilt[p];
      t.to(TR[p], { y: 0, duration: fall, ease: 'power2.in' }, at)
        .to(TR[p], { r: 0, duration: fall * 0.9, ease: 'power2.out' }, at)
        .to(TR[p], { y: -140, duration: 0.13, ease: 'power2.out' }, hit)
        .to(TR[p], { y: 0, duration: 0.13, ease: 'power2.in' }, hit + 0.13)
        .to(TR[p], { y: -40, duration: 0.07, ease: 'power2.out' }, hit + 0.26)
        .to(TR[p], { y: 0, duration: 0.07, ease: 'power2.in' }, hit + 0.33)
        .set(TR[p], { ox: b.cx, oy: b.bottom }, hit)
        .to(TR[p], { sx: 1.04, sy: 0.95, duration: 0.07, ease: 'power2.out', yoyo: true, repeat: 1 }, hit)
        .to(TR[p], { sx: 1.015, sy: 0.985, duration: 0.05, ease: 'power2.out', yoyo: true, repeat: 1 }, hit + 0.26);
      cl.push([hit, 'thud', { g: 0.55, f: 70 + i * 12 }], [hit, 'tick', { g: 0.12, f: 1600 + i * 150 }], [hit + 0.26, 'tick', { g: 0.07, f: 1500 + i * 150 }]);
    });
    pivot(TR.spin, [CEN[0], Math.max(...bx.map((q) => q.bottom))]);
    const last = (order.length - 1) * gapT + fall;
    t.to(TR.spin, { sx: 1.025, sy: 0.97, duration: 0.09, ease: 'power2.out', yoyo: true, repeat: 1 }, last)
      .to({}, { duration: 0.7 }, last + 0.4);
    cl.push([last + 0.35, 'chime', { g: 0.15 }]);
    return cues(t, cl);
  },
  outro() {
    const c = colours(); reset();
    pivot(TR.spin, CEN);
    const solid = solidFor(c);
    const t = gsap.timeline()
      .to(state, kTo(0, { duration: 1.3, ease: 'expo.inOut' }), 0.15)
      .to([el.p1, el.p2, el.p3], { attr: { fill: solid }, duration: 0.8, ease: 'power1.inOut' }, 0.5)
      .to(TR.spin, { s: 0.8, o: 0, duration: 0.65, ease: 'power3.in' }, 1.55)
      .to({}, { duration: 0.4 });
    return cues(t, [[0.15, 'swish', { d: 1.3, g: 0.34, f0: 2400, f1: 300 }], [1.55, 'down', { g: 0.22, d: 0.65 }]]);
  },
  turn(finite) {
    reset();
    const push = 190, P = LOGO.push;
    const yo = { duration: 0.62, ease: 'power2.inOut', yoyo: true, repeat: 1 };
    pivot(TR.spin, CEN); pivot(TR.p2w, CEN);
    const t = gsap.timeline({ repeat: finite ? 2 : -1, repeatDelay: 0.38 })
      .to(TR.spin, { r: LOGO.turnAngle, duration: LOGO.turnAngle > 180 ? 1.4 : 1.24, ease: 'expo.inOut' }, 0)
      .to(TR.p1w, { x: P.p1[0] * push, y: P.p1[1] * push, ...yo }, 0)
      .to(TR.p3w, { x: P.p3[0] * push, y: P.p3[1] * push, ...yo }, 0)
      .to(TR.c1w, { x: P.c1[0] * push, y: P.c1[1] * push, ...yo }, 0)
      .to(TR.c2w, { x: P.c2[0] * push, y: P.c2[1] * push, ...yo }, 0)
      .to(TR.p2w, { s: 0.9, ...yo }, 0);
    return cues(t, [[0.05, 'whirl', { d: 1.15, g: 0.24 }], [1.2, 'tick', { g: 0.14, f: 1900 }]]);
  },
  orbit(finite) {
    reset();
    const bx = boxes();
    ['p1w', 'p2w', 'p3w'].forEach((p) => { const b = bx[PARTS.indexOf(p)]; pivot(TR[p], [b.cx, b.cy]); });
    pivot(TR.spin, CEN); pivot(TR.c1w, LOGO.orbit.c1.pivot); pivot(TR.c2w, LOGO.orbit.c2.pivot);
    const panels = parts('p1w', 'p2w', 'p3w'), O = LOGO.orbit;
    const t = gsap.timeline({ repeat: finite ? 1 : -1, repeatDelay: 0.3 })
      .to(panels, { s: 0, duration: 0.45, ease: 'back.in(1.7)', stagger: 0.06 }, 0)
      .to(TR.c1w, { x: O.c1.to[0], y: O.c1.to[1], r: O.c1.rot, duration: 0.6, ease: 'power3.inOut' }, 0.25)
      .to(TR.c2w, { x: O.c2.to[0], y: O.c2.to[1], r: O.c2.rot, duration: 0.6, ease: 'power3.inOut' }, 0.25)
      .to(TR.spin, { r: LOGO.orbitSpin, duration: 1.7, ease: 'power3.inOut' }, 0.6)
      .to([TR.c1w, TR.c2w], { x: 0, y: 0, r: 0, duration: 0.6, ease: 'power3.inOut' }, 2.15)
      .to(panels, { s: 1, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.06 }, 2.45)
      .set(TR.spin, { r: 0 }, 3.2);
    return cues(t, [[0.0, 'swish', { d: 0.5, g: 0.25, f0: 1800, f1: 400 }], [0.6, 'whirl', { d: 1.7, g: 0.26 }], [2.45, 'pop', { g: 0.22, f: 480 }], [2.57, 'pop', { g: 0.22, f: 560 }], [2.69, 'pop', { g: 0.22, f: 640 }]]);
  },
  heartbeat(finite) {
    reset();
    const s = state.s, I = ink();
    pivot(TR.spin, CEN);
    el.ringA.setAttribute('stroke', I); el.ringB.setAttribute('stroke', I);
    const t = gsap.timeline({ repeat: finite ? 2 : -1 })
      .to(state, kTo(s + 150, { duration: 0.13, ease: 'power2.out' }), 0)
      .to(state, kTo(s, { duration: 0.24, ease: 'power2.in' }), 0.13)
      .to(state, kTo(s + 95, { duration: 0.11, ease: 'power2.out' }), 0.42)
      .to(state, kTo(s, { duration: 0.62, ease: 'elastic.out(1, 0.45)' }), 0.53)
      .to(TR.spin, { s: 1.028, duration: 0.13, ease: 'power2.out', yoyo: true, repeat: 1 }, 0)
      .to(TR.spin, { s: 1.015, duration: 0.11, ease: 'power2.out', yoyo: true, repeat: 1 }, 0.42)
      .fromTo(el.ringA, { attr: { r: LOGO.rings[0], 'stroke-width': 90, 'stroke-opacity': 0.45 } }, { attr: { r: LOGO.rings[1], 'stroke-width': 8, 'stroke-opacity': 0 }, duration: 1.5, ease: 'power2.out' }, 0)
      .fromTo(el.ringB, { attr: { r: LOGO.rings[0], 'stroke-width': 54, 'stroke-opacity': 0.27 } }, { attr: { r: LOGO.rings[2], 'stroke-width': 8, 'stroke-opacity': 0 }, duration: 1.15, ease: 'power2.out' }, 0.42)
      .to({}, { duration: 0.03 }, 1.57);
    return cues(t, [[0.0, 'thud', { g: 0.75, f: 78 }], [0.0, 'air', { g: 0.1, d: 1.3 }], [0.42, 'thud', { g: 0.45, f: 70 }]]);
  },
  thinking(finite) {
    reset();
    const amp = 110, on = { duration: 0.32, ease: 'power2.out', onUpdate: up }, off = { duration: 0.55, ease: 'power2.inOut', onUpdate: up };
    const t = gsap.timeline({ repeat: finite ? 2 : -1 })
      .to(state, { dt: amp, ...on }, 0).to(state, { dt: 0, ...off }, 0.32)
      .to(state, { db: amp, ...on }, 1.2).to(state, { db: 0, ...off }, 1.52)
      .to({}, { duration: 0.33 }, 2.07);
    return cues(t, [[0.0, 'tock', { g: 0.3, f: 560 }], [1.2, 'tock', { g: 0.26, f: 470 }]]);
  },
  sheen(finite) {
    reset();
    finalsD().forEach((d, i) => SC[i].setAttribute('d', d));
    gsap.set(el.sheen, { opacity: 1 });
    pivot(TR.spin, CEN);
    const far = 5200;
    const from = { x: CEN[0] - V[0] * far, y: CEN[1] - V[1] * far }, to = { x: CEN[0] + V[0] * far, y: CEN[1] + V[1] * far };
    const t = gsap.timeline({ repeat: finite ? 1 : -1, repeatDelay: 0.45 })
      .fromTo(el.sheenWide, from, { ...to, duration: 1.55, ease: 'power2.inOut' }, 0)
      .fromTo(el.sheenThin, from, { ...to, duration: 1.3, ease: 'power3.inOut' }, 0.22)
      .to(TR.spin, { s: 1.02, duration: 0.78, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
    return cues(t, [[0.15, 'shimmer', { g: 0.06, d: 1.2 }], [0.2, 'swish', { d: 1.3, g: 0.08, f0: 2000, f1: 6000 }]]);
  },
  confirm() {
    reset();
    const s = state.s;
    pivot(TR.spin, CEN);
    const t = gsap.timeline()
      .to(TR.spin, { s: 0.93, duration: 0.11, ease: 'power2.in' }, 0.05)
      .to(state, kTo(s + 120, { duration: 0.11, ease: 'power2.in' }), 0.05)
      .to(TR.spin, { s: 1, duration: 0.9, ease: 'elastic.out(1, 0.35)' }, 0.16)
      .to(state, kTo(s, { duration: 0.9, ease: 'elastic.out(1, 0.35)' }), 0.16)
      .to({}, { duration: 0.4 });
    return cues(t, [[0.15, 'thud', { g: 0.4, f: 120 }], [0.17, 'chime', { g: 0.2, notes: [1046.5, 1567.98], d: 1.1 }]]);
  },
  hover(finite) {
    reset();
    const t = gsap.timeline({ repeat: finite ? 1 : -1 });
    hoverMoves().forEach(([tr, v]) => t.to(tr, { x: v[0] * 70, y: v[1] * 70, duration: 0.45, ease: 'back.out(2)' }, 0.1).to(tr, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' }, 1.25));
    t.to({}, { duration: 0.65 }, 1.75);
    return cues(t, [[0.1, 'tick', { g: 0.12, f: 2000 }], [1.25, 'tick', { g: 0.08, f: 1500 }]]);
  },
  family() {
    reset();
    const v = state.s === LOGO.versions.b ? 'b' : 'a', start = state.logo;
    const order = [start, start === 'ccs' ? state.lastFrontier : 'ccs', start];   // always a pair: Platform and one Frontier, there and back
    // every mark's finished parts, moved so its centre sits on the current mark's centre; same units, so the same scale
    const shapes = order.map((k) => { const L = LOGOS[k], dx = CEN[0] - L.CEN[0], dy = CEN[1] - L.CEN[1]; return L.finals(v).map((d) => shiftD(d, dx, dy)); });
    const cols = order.map(coloursFor);
    PARTS.forEach((p) => { TR[p].o = 0; });
    el.morph.style.display = '';
    MP.forEach((m, i) => { m.setAttribute('d', shapes[0][i]); m.setAttribute('fill', fillOf(cols[0], FILLS[i])); });
    pivot(TR.spin, CEN);
    const t = gsap.timeline(), cl = [], morph = 1.3, hold = 1.0;
    let at = 0.4;
    for (let j = 0; j < order.length - 1; j++) {
      const lerps = shapes[j].map((d, i) => morphLerp(d, shapes[j + 1][i]));
      MP.forEach((m, i) => {
        const pr = { t: 0 };
        t.to(pr, { t: 1, duration: morph, ease: 'power3.inOut', onUpdate: () => m.setAttribute('d', lerps[i](pr.t)) }, at + i * 0.06);
        t.to(m, { attr: { fill: fillOf(cols[j + 1], FILLS[i]) }, duration: morph * 0.85, ease: 'power1.inOut' }, at + i * 0.06 + 0.1);
      });
      t.to(TR.spin, { s: 0.95, duration: morph / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, at);
      const nm = LOGOS[order[j + 1]].name;
      t.call(() => { if (!state.exporting) $('roCw').textContent = nm; }, null, at + morph / 2);
      cl.push([at, 'swish', { d: 1.1, g: 0.3 }], [at + morph + 0.2, 'chime', { g: 0.17 }]);
      at += morph + 0.24 + hold;
    }
    // back on the starting mark: hand over to the rig, which is identical at rest
    t.set(PARTS.map((p) => TR[p]), { o: 1 }, at - hold + 0.1);
    t.set(el.morph, { display: 'none' }, at - hold + 0.1);
    t.call(() => { if (!state.exporting) $('roCw').textContent = label(state.cw); }, null, at - hold + 0.1);
    t.to({}, { duration: 0.1 }, at - 0.1);
    return cues(t, cl);
  },
  colourways() {
    reset();
    const grp = CW_GROUPS.find((g) => g.keys.includes(state.cw) && g.name !== 'Core'), names = (grp ? grp.keys : Object.keys(sets())).filter((k) => sets()[k]), start = Math.max(0, names.indexOf(state.cw));
    const seq = [...names.slice(start + 1), ...names.slice(0, start + 1)];
    const bx = boxes();
    PARTS.forEach((p, i) => pivot(TR[p], [bx[i].cx, bx[i].cy]));
    const t = gsap.timeline(), cl = []; let at = 0.2;
    seq.forEach((name, k) => {
      const c = colours(name);
      t.call(() => { state.cw = name; if (!state.exporting) { markChips(); $('roCw').textContent = label(name); } }, null, at);
      FILLS.forEach((id, i) => t.to(el[id], { attr: { fill: fillOf(c, id) }, duration: 0.5, ease: 'power2.inOut' }, at + i * 0.07));
      PARTS.forEach((p, i) => t.to(TR[p], { s: 1.035, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1 }, at + i * 0.07));
      cl.push([at, 'pop', { g: 0.2, f: 440 * Math.pow(2, (k % 5) * 2 / 12) }]);
      at += 1.4;
    });
    t.to({}, { duration: 0.2 });
    return cues(t, cl);
  },
};
// the hover motion: the panels move out along their bars and the Cs move out from the centre, 70 units each
const shiftD = (d, dx, dy) => { let i = 0; return d.replace(/-?\d*\.?\d+(?:e-?\d+)?/g, (n) => (i++ % 2 === 0 ? +n + dx : +n + dy).toFixed(2)); };
function coloursFor(key) {      // a mark's colours on the current ground and crescent: the chosen colourway for the current mark, its own for the others
  const L = LOGOS[key], sets = state.ground === 'for-dark' ? L.sets.dark : state.tone === 'lighter' ? L.sets.lightC : L.sets.light;
  return (key === state.logo && sets[state.cw]) || sets[L.firstCw];
}
function hoverMoves() { const P = LOGO.push; return [[TR.p1w, P.p1], [TR.p3w, P.p3], [TR.c1w, P.c1], [TR.c2w, P.c2]]; }

function caption(id) {
  const i = INFO.find((x) => x.id === id);
  $('npName').textContent = i.name; $('npKicker').textContent = `${i.group === 'Openers' ? 'Opener or closer' : i.group}, ${i.time}`; $('npDesc').textContent = i.desc;
  $('exScene').textContent = `Current scene: ${i.name}`;
}
function play(name, opts = {}) {
  if (state.exporting) return;
  const reelStep = opts.reelStep;
  if (!opts.keep) stopScene();
  const tileName = reelStep !== undefined ? 'reel' : name;
  state.scene = tileName; state.last = tileName; state.reel = reelStep !== undefined;
  document.querySelectorAll('.tile').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.scene === tileName)));
  if (!state.reel) caption(name); else { caption('reel'); $('npKicker').textContent = `Reel, ${reelStep + 1} of ${REEL.length}: ${INFO.find((x) => x.id === name).name}`; }
  const bar = document.querySelector(`.tile[data-scene="${tileName}"] .bar`);
  tl = SCENES[name](state.reel);
  tl.eventCallback('onUpdate', () => {
    const ro = $('roT'); if (ro) ro.textContent = tl.time().toFixed(2);
    if (bar) bar.style.transform = `scaleX(${state.reel ? (reelStep + tl.totalProgress()) / REEL.length : tl.progress()})`;
  });
  tl.eventCallback('onComplete', () => {
    if (state.reel) {
      const next = reelStep + 1;
      if (next < REEL.length) play(REEL[next], { reelStep: next, keep: true });
      else if (state.loop) pending = gsap.delayedCall(0.5, () => play(REEL[0], { reelStep: 0, keep: true }));
    } else if (state.loop) pending = gsap.delayedCall(0.6, () => play(name, { keep: true }));
  });
}
const startScene = (name) => (name === 'reel' ? play(REEL[0], { reelStep: 0 }) : play(name));

// ---------- tiles ----------
for (const i of INFO) {
  const b = document.createElement('button');
  b.className = 'tile'; b.dataset.scene = i.id; b.setAttribute('aria-pressed', 'false'); b.title = i.desc;
  b.innerHTML = `<span class="name">${i.name}</span><span class="meta">${i.time}</span><span class="bar"></span>`;
  b.addEventListener('click', () => startScene(i.id));
  document.querySelector(`.tiles[data-group="${i.group}"]`).appendChild(b);
}

// ---------- controls ----------
const press = (id, on) => $(id).setAttribute('aria-pressed', String(on));
$('k').addEventListener('input', (e) => { if (state.exporting) return; if (state.scene) { stopScene(); reset(state.k); } setK(+e.target.value); });
function setVersion(v) {
  if (state.exporting) return;
  state.s = LOGO.versions[v]; press('vA', v === 'a'); press('vB', v === 'b');
  const was = state.scene; stopScene(); reset(state.k);
  gsap.to(state, kTo(state.s, { duration: 0.9, ease: 'expo.inOut', onComplete: () => { if (was) startScene(was); } }));
}
$('vA').addEventListener('click', () => setVersion('a'));
$('vB').addEventListener('click', () => setVersion('b'));
// switch logos: rebuild the stage for the new logo, keep the look where it applies, and carry on with the same scene
function setLogo(id, restart = true) {
  if (state.exporting || !LOGOS[id]) return;
  const was = state.scene; stopScene();
  state.logo = id; LOGO = LOGOS[id]; CEN = LOGO.CEN;
  if (id !== 'ccs') state.lastFrontier = id;
  if (state.s !== LOGO.versions.a && state.s !== LOGO.versions.b) state.s = LOGO.versions.a;
  buildRig();
  press('lgC', id === 'ccs'); press('lgF', id === 'frontier');
  if (!sets()[state.cw]) state.cw = LOGO.firstCw;
  refreshLook(false); reset();
  if (restart && was) startScene(was);
}
function setPalette(p) {
  if (!SFX_SETS[p]) return;
  SFX = SFX_SETS[p]; state.palette = p; press('sndClean', p === 'clean'); press('sndWarm', p === 'warm');
  if (AC) { try { LIVE.disconnect(); } catch (err) { /* already gone */ } LIVE = bus(AC); if (MEDIA && MEDIA.ok) { LIVE.comp.disconnect(); LIVE.comp.connect(MEDIA.dest); } }
  if (state.sound) sfx('chime', { g: 0.2 });
}
$('sndClean').addEventListener('click', () => setPalette('clean'));
$('sndWarm').addEventListener('click', () => setPalette('warm'));
$('lgC').addEventListener('click', () => setLogo('ccs'));
$('lgF').addEventListener('click', () => setLogo('frontier'));
function refreshLook(restart = true) {
  if (!sets()[state.cw]) state.cw = LOGO.firstCw;
  const dark = state.ground === 'for-dark';
  $('stage').dataset.ground = state.ground; paintStage();
  press('gL', !dark); press('gD', dark);
  $('tD').disabled = dark; $('tL').disabled = dark;
  press('tD', !dark && state.tone === 'darker'); press('tL', dark || state.tone === 'lighter');
  $('toneNote').textContent = dark ? 'On the dark ground the crescent is always the lightest part.' : '';
  renderChips(); $('roCw').textContent = label(state.cw);
  if (!restart) return;
  if (state.scene) startScene(state.scene); else paint(colours(), 0.6, 0.05);
}
$('gL').addEventListener('click', () => { if (state.exporting) return; state.ground = 'for-light'; refreshLook(); });
$('gD').addEventListener('click', () => { if (state.exporting) return; state.ground = 'for-dark'; refreshLook(); });
$('tD').addEventListener('click', () => { if (state.exporting) return; state.tone = 'darker'; refreshLook(); });
$('tL').addEventListener('click', () => { if (state.exporting) return; state.tone = 'lighter'; refreshLook(); });
document.querySelectorAll('[data-speed]').forEach((b) => b.addEventListener('click', () => {
  gsap.globalTimeline.timeScale(+b.dataset.speed);
  document.querySelectorAll('[data-speed]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
}));
$('replay').addEventListener('click', () => startScene(state.scene || state.last || 'construct'));
$('loop').addEventListener('click', (e) => { state.loop = !state.loop; press('loop', state.loop); e.currentTarget.textContent = `Loop: ${state.loop ? 'on' : 'off'}`; });
$('stop').addEventListener('click', () => { if (state.exporting) return; stopScene(); reset(); });
// Sound has to be unlocked inside the click itself: create and resume the context and play a silent sample synchronously,
// with no await before them, or some browsers and embedded viewers keep it suspended. iPhone and iPad mute web audio on the
// silent switch unless the page asks for a playback session.
function soundNote(text) { $('soundNote').textContent = text; }
function unlockAudio() {
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (err) { /* not supported */ }
  if (!AC) { const Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) return false; AC = new Ctx(); LIVE = bus(AC); }
  // older iPhone and iPad software mutes web audio on the silent switch but not a media player, so there the sound goes out through one
  const appleTouch = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (!MEDIA && appleTouch && !navigator.audioSession && AC.createMediaStreamDestination) {
    try {
      const dest = AC.createMediaStreamDestination(), a = new Audio(); a.srcObject = dest.stream; a.setAttribute('playsinline', '');
      MEDIA = { dest, a, ok: null };
      const pr = a.play();                                                  // inside the click, so the browser counts it as asked for
      if (pr && pr.then) pr.then(() => { MEDIA.ok = true; LIVE.comp.disconnect(); LIVE.comp.connect(dest); }, (err) => { MEDIA.ok = false; MEDIA.err = err && err.name; });
    } catch (err) { MEDIA = { ok: false, err: err.name }; }
  }
  try { AC.resume(); } catch (err) { /* reported below */ }
  try { const s = AC.createBufferSource(); s.buffer = AC.createBuffer(1, 1, AC.sampleRate); s.connect(AC.destination); s.start(0); } catch (err) { /* reported below */ }
  return true;
}
$('sound').addEventListener('click', () => {
  const btn = $('sound');
  state.sound = !state.sound;
  if (state.sound && !unlockAudio()) { state.sound = false; soundNote('This browser cannot play generated sound.'); }
  press('sound', state.sound); btn.textContent = state.sound ? 'Sound on' : 'Turn sound on'; 
  if (!state.sound) { soundNote(''); return; }
  soundNote('');
  sfx('pop', { g: 0.25 });
  setTimeout(() => {
    if (!state.sound || !AC) return;
    if (AC.state === 'running') soundNote('Sound is on: you should have heard a soft pop just now, and every scene now plays its own sounds. Heard nothing? Check this browser tab is not muted, the volume is up, and on a phone the silent switch is off.');
    else soundNote(`This view is holding the sound back (the browser reports the audio as ${AC.state}). Press the button again; if it stays silent, open the page from your computer in Edge or Chrome, or use an export with sound.`);
  }, 700);
});
// a context the system interrupted (a call, the screen locking) resumes on the next tap anywhere
document.addEventListener('pointerdown', () => { if (state.sound && AC && AC.state !== 'running') { try { AC.resume(); } catch (err) { /* stays quiet */ } } }, true);

// hover on the stage when nothing is playing
$('stage').addEventListener('pointerenter', () => { if (state.scene || state.exporting) return; state.hovering = true; hoverMoves().forEach(([tr, v]) => gsap.to(tr, { x: v[0] * 70, y: v[1] * 70, duration: 0.45, ease: 'back.out(2)' })); sfx('tick', { g: 0.12, f: 2000 }); });
$('stage').addEventListener('pointerleave', () => { if (!state.hovering) return; state.hovering = false; if (state.scene || state.exporting) return; hoverMoves().forEach(([tr]) => gsap.to(tr, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' })); sfx('tick', { g: 0.08, f: 1500 }); });

// ---------- export: frame-exact rendering of any scene to MP4 (with or without sound) or GIF ----------
const ex = { format: 'mp4', frame: 'square', sound: true };
function dims(o) { const gif = o.format === 'gif'; return o.frame === 'wide' ? { w: gif ? 960 : 1920, h: gif ? 540 : 1080, fps: gif ? 25 : 60 } : { w: gif ? 600 : 1080, h: gif ? 600 : 1080, fps: gif ? 25 : 60 }; }
function syncExportUI() {
  press('fMp4', ex.format === 'mp4'); press('fGif', ex.format === 'gif');
  press('frSq', ex.frame === 'square'); press('frWide', ex.frame === 'wide');
  press('soOn', ex.sound && ex.format === 'mp4'); press('soOff', !ex.sound || ex.format === 'gif');
  $('soOn').disabled = ex.format === 'gif'; $('soOff').disabled = ex.format === 'gif';
  const d = dims(ex); $('exSize').textContent = `${d.w} × ${d.h}, ${d.fps} fps${ex.format === 'gif' ? ', GIF has no sound' : ''}`;
}
$('fMp4').addEventListener('click', () => { ex.format = 'mp4'; syncExportUI(); });
$('fGif').addEventListener('click', () => { ex.format = 'gif'; syncExportUI(); });
$('frSq').addEventListener('click', () => { ex.frame = 'square'; syncExportUI(); });
$('frWide').addEventListener('click', () => { ex.frame = 'wide'; syncExportUI(); });
$('soOn').addEventListener('click', () => { ex.sound = true; syncExportUI(); });
$('soOff').addEventListener('click', () => { ex.sound = false; syncExportUI(); });

// one scene's length: loops give one seamless cycle, everything else plays once (the reel plays its loops a few times)
function sceneLength(t, name, finite) { return (LOOPS.has(name) && !finite) ? t.duration() + t.repeatDelay() : t.totalDuration(); }
function sceneCues(t, len) {
  const out = [], list = (t.data && t.data.cues) || [], cyc = t.duration() + t.repeatDelay(), reps = t.repeat() < 0 ? Math.ceil(len / cyc) : t.repeat() + 1;
  for (let i = 0; i < reps; i++) for (const [at, type, p] of list) { const tt = at + i * cyc; if (tt < len - 0.02) out.push([tt, type, p]); }
  return out;
}
async function frameDrawer(w, h) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  const side = Math.min(w, h), x0 = (w - side) / 2, y0 = (h - side) / 2;
  const draw = async () => {
    const c = svg.cloneNode(true); c.setAttribute('xmlns', NS); c.setAttribute('width', side); c.setAttribute('height', side); c.removeAttribute('style');
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(c)], { type: 'image/svg+xml' }));
    const img = new Image(); img.src = url; await img.decode(); URL.revokeObjectURL(url);
    ctx.fillStyle = groundFill(ctx, w, h); ctx.fillRect(0, 0, w, h); ctx.drawImage(img, x0, y0, side, side);
  };
  return { cv, ctx, draw };
}
// RGB to BT.709 limited-range I420, the colour every video player assumes; letting the encoder convert left the range unflagged and players stretched it
function toI420(px, w, h) {
  const out = new Uint8Array(w * h * 3 / 2), cb0 = w * h, cr0 = cb0 + (w * h) / 4, cw = w / 2;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = (y * w + x) * 4; out[y * w + x] = Math.round(16 + (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) * 219 / 255); }
  for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
    let r = 0, g = 0, b = 0;
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) { const i = ((y + dy) * w + x + dx) * 4; r += px[i]; g += px[i + 1]; b += px[i + 2]; }
    r /= 4; g /= 4; b /= 4;
    const yy = 0.2126 * r + 0.7152 * g + 0.0722 * b, j = (y / 2) * cw + x / 2;
    out[cb0 + j] = Math.max(0, Math.min(255, Math.round(128 + ((b - yy) / 1.8556) * 224 / 255)));
    out[cr0 + j] = Math.max(0, Math.min(255, Math.round(128 + ((r - yy) / 1.5748) * 224 / 255)));
  }
  return out;
}
async function renderAudio(list, len) {
  const sr = 48000, oc = new OfflineAudioContext(2, Math.max(1, Math.ceil(len * sr)), sr), out = bus(oc);
  for (const [t, type, p] of list) SFX[type](oc, out, t, p || {});
  return oc.startRendering();
}
// exportScene({ scene, format: 'mp4'|'gif', frame: 'square'|'wide', sound: bool }) -> { blob, name, seconds, frames }
async function exportScene(opts, progress = () => {}) {
  const o = { scene: state.last || 'construct', format: 'mp4', frame: 'square', sound: true, ...opts };
  const { w, h, fps } = dims(o);
  const list = o.scene === 'reel' ? REEL : [o.scene], finite = o.scene === 'reel';
  const cw0 = state.cw;
  stopScene(); state.exporting = true;
  const prevScale = gsap.globalTimeline.timeScale(); gsap.globalTimeline.timeScale(1);
  try {
    // plan: build each scene once to measure it and collect its cues
    const plan = []; let total = 0;
    for (const name of list) { state.cw = cw0; const t = SCENES[name](finite); const len = sceneLength(t, name, finite); plan.push({ name, len, cues: sceneCues(t, len).map(([tt, ty, p]) => [tt + total, ty, p]) }); t.kill(); total += len; }
    state.cw = cw0;
    const frames = Math.round(total * fps);
    const fr = await frameDrawer(w, h);
    let mux = null, venc = null, gif = null, lib = null, audioCodec = null;
    if (o.format === 'mp4') {
      const M = await import('https://cdn.jsdelivr.net/npm/mp4-muxer@5.1.3/+esm');
      if (o.sound) audioCodec = (await AudioEncoder.isConfigSupported({ codec: 'mp4a.40.2', sampleRate: 48000, numberOfChannels: 2, bitrate: 192000 })).supported ? 'aac' : 'opus';
      mux = new M.Muxer({ target: new M.ArrayBufferTarget(), video: { codec: 'avc', width: w, height: h, frameRate: fps }, audio: o.sound ? { codec: audioCodec, numberOfChannels: 2, sampleRate: 48000 } : undefined, fastStart: 'in-memory' });
      let codec = 'avc1.64002A'; if (!(await VideoEncoder.isConfigSupported({ codec, width: w, height: h, framerate: fps })).supported) codec = 'avc1.4d002a';
      let encErr = null;
      venc = new VideoEncoder({ output: (c, m) => mux.addVideoChunk(c, m), error: (e) => { encErr = e; } });
      venc.configure({ codec, width: w, height: h, bitrate: w > 1080 ? 12e6 : 9e6, framerate: fps });
      venc.failed = () => encErr;
      if (o.sound) {
        progress('Rendering sound');
        const buf = await renderAudio(plan.flatMap((p) => p.cues), total);
        let aErr = null;
        const aenc = new AudioEncoder({ output: (c, m) => mux.addAudioChunk(c, m), error: (e) => { aErr = e; } });
        aenc.configure({ codec: audioCodec === 'aac' ? 'mp4a.40.2' : 'opus', sampleRate: 48000, numberOfChannels: 2, bitrate: 192000 });
        const L = buf.getChannelData(0), Rr = buf.getChannelData(1), step = 1024;
        for (let i = 0; i < buf.length; i += step) {
          const n = Math.min(step, buf.length - i), data = new Float32Array(n * 2); data.set(L.subarray(i, i + n), 0); data.set(Rr.subarray(i, i + n), n);
          const ad = new AudioData({ format: 'f32-planar', sampleRate: 48000, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round(i / 48000 * 1e6), data });
          aenc.encode(ad); ad.close();
        }
        await aenc.flush();
        if (aErr) throw aErr;
      }
    } else {
      lib = await import('https://cdn.jsdelivr.net/npm/gifenc@1.0.3/+esm');
      gif = lib.GIFEncoder();
    }
    // frames: each scene is seeked frame by frame, so nothing depends on how fast the machine is
    let f = 0, start = 0;
    for (const p of plan) {
      state.cw = cw0;
      const t = SCENES[p.name](finite); t.pause(0);
      const n = Math.round((start + p.len) * fps) - f;
      for (let i = 0; i < n; i++, f++) {
        t.totalTime(Math.min(p.len, (f / fps) - start), false);
        setK(state.k); renderTR();
        await fr.draw();
        if (venc) {
          if (venc.failed()) throw venc.failed();
          const vf = new VideoFrame(toI420(fr.ctx.getImageData(0, 0, w, h).data, w, h), { format: 'I420', codedWidth: w, codedHeight: h, timestamp: Math.round(f * 1e6 / fps), duration: Math.round(1e6 / fps), colorSpace: { primaries: 'bt709', transfer: 'bt709', matrix: 'bt709', fullRange: false } });
          venc.encode(vf, { keyFrame: f % (fps * 2) === 0 }); vf.close();
          if (venc.encodeQueueSize > 8) await new Promise((r) => venc.addEventListener('dequeue', r, { once: true }));
        } else {
          const { data } = fr.ctx.getImageData(0, 0, w, h);
          const palette = lib.quantize(data, 256), index = lib.applyPalette(data, palette);
          gif.writeFrame(index, w, h, { palette, delay: Math.round(1000 / fps) });
        }
        if (f % 10 === 0) progress(`Frame ${f} of ${frames}`);
      }
      t.kill(); start += p.len;
    }
    let blob;
    if (venc) { await venc.flush(); if (venc.failed()) throw venc.failed(); mux.finalize(); blob = new Blob([mux.target.buffer], { type: 'video/mp4' }); }
    else { gif.finish(); blob = new Blob([gif.bytes()], { type: 'image/gif' }); }
    const look = `${state.ground === 'for-dark' ? 'dark-ground' : `light-ground-${state.tone}-crescent`}--${cw0}--version-${state.s === LOGO.versions.b ? 'b' : 'a'}`;
    const name = `${LOGO.id}-motion--${o.scene}--${o.frame}-${w}x${h}--${look}${o.format === 'mp4' ? (o.sound ? `--sound-${state.palette}` : '--silent') : ''}.${o.format}`;
    return { blob, name, seconds: +total.toFixed(2), frames, audioCodec };
  } finally {
    state.cw = cw0; state.exporting = false; gsap.globalTimeline.timeScale(prevScale); reset(); markChips(); $('roCw').textContent = label(state.cw);
  }
}
$('export').addEventListener('click', async () => {
  const btn = $('export'), st = $('exStatus');
  btn.disabled = true;
  try {
    const r = await exportScene({ ...ex, scene: state.last || 'construct' }, (m) => { st.textContent = m; });
    const size = `${(r.blob.size / 1e6).toFixed(1)} MB, ${r.seconds} s`;
    // in the claude.ai viewer, saves go through the downloads capability, which asks the viewer to confirm; opened locally, a plain download link works
    const dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
    if (dl) {
      st.textContent = `Ready (${size}). Confirm the save to keep it.`;
      try { await dl.save({ filename: r.name, data: r.blob }); st.textContent = `Saved (${size}).`; }
      catch (err) { st.textContent = err && err.code === 'declined' ? 'Not saved.' : err && err.code === 'rate_limited' ? 'A save prompt is already open. Try again in a moment.' : `Could not save here (${err && err.code ? err.code : 'unavailable'}). Open the page from your computer instead.`; }
    } else {
      const a = document.createElement('a'); a.href = URL.createObjectURL(r.blob); a.download = r.name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 60000);
      st.textContent = `Saved (${size}).`;
    }
  } catch (e) {
    st.textContent = `Export failed: ${e.message}. Use Edge or Chrome.`;
  } finally { btn.disabled = false; }
});

// ---------- start ----------
window.CCSMotion = {
  exportScene, INFO, REEL,
  look({ logo = 'ccs', ground = 'for-light', tone = 'darker', colourway, version = 'a', palette = 'clean' } = {}) { stopScene(); setPalette(palette); if (logo !== state.logo) setLogo(logo, false); state.ground = ground; state.tone = tone; state.cw = colourway || LOGO.firstCw; state.s = LOGO.versions[version]; press('vA', version === 'a'); press('vB', version === 'b'); refreshLook(false); reset(); },
};
buildRig();
renderChips();
syncExportUI();
reset();
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
caption('construct'); state.last = 'construct';
if (!reduce && !/[?&]noplay/.test(location.search)) pending = gsap.delayedCall(1.6, () => { const i = REEL.indexOf('turn'); play(REEL[i], { reelStep: i }); });

  }
  function find() {
    var host = document.getElementById('ccs-motion-host');
    if (!host || host.getAttribute('data-ccs-mounted') || !window.gsap) return;
    host.setAttribute('data-ccs-mounted', '1');
    host.innerHTML = MARKUP;
    run();
  }
  new MutationObserver(find).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', find);
  find();
})();

// ---------- construction readout toggle ----------
(function () {
  var stage = document.getElementById('stage'), k = document.getElementById('k');
  if (!stage || !k) return;
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'btn btn-sm con-toggle'; b.setAttribute('aria-pressed', 'false'); b.textContent = 'Show construction';
  stage.insertAdjacentElement('afterend', b);
  var pinned = false, sliding = false;
  var sync = function () { stage.classList.toggle('show-con', pinned || sliding); };
  b.addEventListener('click', function () { pinned = !pinned; b.setAttribute('aria-pressed', String(pinned)); b.textContent = pinned ? 'Hide construction' : 'Show construction'; sync(); });
  k.addEventListener('input', function () { sliding = true; sync(); });
  k.addEventListener('change', function () { sliding = false; sync(); });
  k.addEventListener('blur', function () { sliding = false; sync(); });
})();
