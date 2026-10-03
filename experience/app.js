/* =========================================================
   KINGDREAM — moteur de l'expérience
   Le scroll pilote tout : un seul produit évolue
   onde IA → icône → application → web → entreprise.
   ========================================================= */
(() => {
'use strict';

/* ---------------------------------------------------------
   CONFIGURATION — vos vidéos
   Déposez vos fichiers dans experience/videos/ avec ces noms
   (ou changez les chemins). Tant qu'un fichier est absent,
   une démo animée du projet est affichée à la place.
   --------------------------------------------------------- */
const VIDEOS = [
  { title: 'Maison Olivier', kind: 'Site restaurant · réservation', site: 'olivier',
    desktop: 'videos/projet-1-desktop.mp4', mobile: 'videos/projet-1-mobile.mp4', poster: '' },
  { title: 'Batir.pro', kind: 'Site entreprise BTP · devis', site: 'batir',
    desktop: 'videos/projet-2-desktop.mp4', mobile: 'videos/projet-2-mobile.mp4', poster: '' },
  { title: 'Atelier Nacre', kind: 'Institut beauté · prise de RDV', site: 'nacre',
    desktop: 'videos/projet-3-desktop.mp4', mobile: 'videos/projet-3-mobile.mp4', poster: '' },
];

/* Réalisations */
const PROJECTS = [
  { id: 'olivier', name: 'Maison Olivier', cat: 'Restaurant gastronomique', url: 'maison-olivier.fr',
    desc: 'Une identité chaleureuse, une carte mise en scène et un parcours pensé pour donner envie de réserver.',
    type: 'Site vitrine + réservation', deliv: 'Identité · menu · galerie',
    accent: '#e8c27a', bg: '#100c08', glow: 'rgba(232,194,122,.45)' },
  { id: 'batir', name: 'Batir.pro', cat: 'Entreprise BTP', url: 'batir-pro.fr',
    desc: 'Des chantiers exigeants, une équipe locale et une approche claire, du premier devis à la livraison.',
    type: 'Site entreprise + devis', deliv: 'Preuves · réalisations · devis',
    accent: '#ffb21a', bg: '#0d0c09', glow: 'rgba(255,178,26,.4)' },
  { id: 'nacre', name: 'Atelier Nacre', cat: 'Institut beauté & bien-être', url: 'atelier-nacre.fr',
    desc: 'Une expérience douce et premium qui présente les soins, l’expertise et la réservation en quelques secondes.',
    type: 'Site + prise de RDV', deliv: 'Image de marque · soins · tarifs',
    accent: '#f0b3ad', bg: '#120a0c', glow: 'rgba(240,179,173,.4)' },
  { id: 'volt', name: 'Volt 24/7', cat: 'Électricien · dépannage', url: 'volt-urgence.fr',
    desc: 'Un site direct et rassurant qui transforme une urgence ou un projet de travaux en appel immédiat.',
    type: 'Site de conversion', deliv: 'Urgence · services · appel direct',
    accent: '#ffe14d', bg: '#070b18', glow: 'rgba(255,225,77,.35)' },
  { id: 'morel', name: 'Lucas Morel', cat: 'Photographe · mode & campagnes', url: 'lucas-morel.photo',
    desc: 'Un portfolio éditorial qui laisse les images parler, avec une navigation minimaliste et une forte direction artistique.',
    type: 'Portfolio éditorial', deliv: 'Galerie · éditorial · DA',
    accent: '#e6e6e6', bg: '#080808', glow: 'rgba(255,255,255,.22)' },
];

const MINI = {
  olivier: `<div class="mini-site ms-olivier"><div class="ms-nav"><span class="ms-logo">MAISON OLIVIER</span><nav><span>La carte</span><span>Notre histoire</span><span>Galerie</span></nav><span class="ms-btn">RÉSERVER</span></div><div class="ms-hero"><div><p class="ms-k">Restaurant • Cuisine contemporaine</p><h4>Le goût<br>du vrai.</h4><p>Une carte de saison, des produits d'exception et une table où l'on prend le temps.</p></div><div class="ms-img"><div class="ms-tag"><small>MENU DU SOIR</small><b>48 €</b></div></div></div><div class="ms-row"><div></div><div></div><div></div></div></div>`,
  batir: `<div class="mini-site ms-batir"><div class="ms-nav"><span class="ms-logo">BATIR<span>.PRO</span></span><nav><span>Réalisations</span><span>Expertise</span><span>À propos</span></nav><span class="ms-btn">DEVIS GRATUIT</span></div><div class="ms-hero"><div><p class="ms-k">Construction • Rénovation</p><h4>Construire<br>pour durer.</h4><p>Une équipe locale, des chantiers maîtrisés, un interlocuteur unique.</p><div class="ms-stats"><div><b>25+</b><span>ans d'expérience</span></div><div><b>180</b><span>projets livrés</span></div><div><b>4.9</b><span>avis clients</span></div></div></div><div class="ms-img"></div></div><div class="ms-row"><div></div><div></div><div></div></div></div>`,
  nacre: `<div class="mini-site ms-nacre"><div class="ms-nav"><span class="ms-logo">Atelier Nacre</span><nav><span>Soins</span><span>Le studio</span><span>Tarifs</span></nav><span class="ms-btn">PRENDRE RDV</span></div><div class="ms-hero"><div><p class="ms-k">Institut • Beauté & bien-être</p><h4>Votre moment<br>de beauté.</h4><p>Des soins sur mesure dans un cocon pensé pour vous.</p></div><div class="ms-img"></div></div><div class="ms-row"><div></div><div></div><div></div></div></div>`,
  volt: `<div class="mini-site ms-volt"><div class="ms-nav"><span class="ms-logo">VOLT <span>24/7</span></span><nav><span>Services</span><span>Installations</span><span>Entreprise</span></nav><span class="ms-btn">06 12 34 56 78</span></div><div class="ms-hero"><div><p class="ms-k">Électricien • Dépannage & installation</p><h4>L'électricité<br><span>sans stress.</span></h4><p>Intervention 24 h/24 · 7 j/7. Un appel, on arrive.</p></div><div class="ms-img">⚡</div></div><div class="ms-row"><div></div><div></div><div></div></div></div>`,
  morel: `<div class="mini-site ms-morel"><div class="ms-nav"><span class="ms-logo">LUCAS MOREL</span><nav><span>Portfolio</span><span>Éditorial</span><span>À propos</span></nav><span class="ms-btn">CONTACT</span></div><div class="ms-hero"><div><p class="ms-k">Photographe • Mode / Campagnes</p><h4>Images<br>qui restent.</h4><p>Paris · Lyon · International</p></div><div class="ms-img"></div></div><div class="ms-row"><div></div><div></div><div></div></div></div>`,
};
const MINI_M = id => {
  const p = PROJECTS.find(x => x.id === id);
  const big = { olivier: 'Le goût<br>du vrai.', batir: 'Construire<br>pour durer.', nacre: 'Votre moment<br>de beauté.', volt: 'L’électricité<br>sans stress.', morel: 'Images<br>qui restent.' }[id];
  return `<div class="mini-m ms-${id}"><span class="mm-logo">${p.name}</span><div class="ms-img"></div><h5>${big}</h5><span class="ms-btn">Découvrir</span></div>`;
};

/* ---------------------------------------------------------
   utilitaires
   --------------------------------------------------------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const range = (v, a, b) => clamp((v - a) / (b - a));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const TAU = Math.PI * 2;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

let vw = innerWidth, vh = innerHeight, mob = vw < 860;
const mouse = { x: vw / 2, y: vh / 2, nx: 0, ny: 0, sx: 0, sy: 0 };
addEventListener('pointermove', e => {
  mouse.x = e.clientX; mouse.y = e.clientY;
  mouse.nx = e.clientX / vw * 2 - 1; mouse.ny = e.clientY / vh * 2 - 1;
}, { passive: true });

/* =========================================================
   1. LE PARCOURS
   ========================================================= */
const journey = $('#journey'), sticky = $('#sticky'), device = $('#device'), screenEl = $('#screen');
const base = $('#base'), hero = $('#hero'), hint = $('#scrollHint'), rail = $('#rail');
const caps = $$('.cap'), railItems = $$('#rail li'), sats = $$('.sat');
const scrs = ['.scr-icon', '.scr-app', '.scr-web', '.scr-dash'].map(s => {
  const el = $(s); return { el, dw: +el.dataset.w, dh: +el.dataset.h };
});
const links = $('#links');
const dash = $('.dash');

/* fenêtres des légendes (en progression 0→1 du parcours) */
const CAPS = [[.07, .18], [.18, .31], [.31, .52], [.52, .72], [.72, 1.02]];

let KEYS = [], SATPOS = [];
function buildKeys() {
  vw = innerWidth; vh = innerHeight; mob = vw < 860;
  const cx0 = vw / 2, cy0 = mob ? vh * .46 : vh * .5;
  const cx = mob ? vw / 2 : vw * .62;
  const cy = mob ? vh * .41 : vh * .52;
  const orb = mob ? Math.min(vw * .78, 340) : Math.min(vh * .62, 520);
  const ic = mob ? 116 : 150;
  const phH = mob ? Math.min(vh * .5, 540) : Math.min(vh * .74, 660), phW = phH * .485;
  const lpW = mob ? vw * .9 : Math.min(vw * .55, 1000), lpH = lpW * .625;
  const dsW = mob ? vw * .9 : Math.min(vw * .47, 860), dsH = dsW * .61;
  const lpCy = cy - (mob ? 0 : 10);
  const S = (a, b, c, d) => [a, b, c, d];
  KEYS = [
    { p: 0,    cx: cx0, cy: cy0, w: orb, h: orb, r: orb / 2, bw: 0, dev: 0, orb: 1, s: S(0,0,0,0), base: 0, sat: 0 },
    { p: .085, cx, cy, w: orb * .82, h: orb * .82, r: orb * .41, bw: 0, dev: 0, orb: 1, s: S(0,0,0,0), base: 0, sat: 0 },
    { p: .16,  cx, cy, w: ic * 1.5, h: ic * 1.5, r: ic * .55, bw: 0, dev: 0, orb: .8, s: S(0,0,0,0), base: 0, sat: 0 },
    { p: .205, cx, cy, w: ic, h: ic, r: ic * .23, bw: 0, dev: 1, orb: .25, s: S(1,0,0,0), base: 0, sat: 0 },
    { p: .27,  cx, cy, w: ic, h: ic, r: ic * .23, bw: 0, dev: 1, orb: .25, s: S(1,0,0,0), base: 0, sat: 0 },
    { p: .36,  cx, cy, w: phW, h: phH, r: phW * .17, bw: mob ? 7 : 10, dev: 1, orb: .1, s: S(0,1,0,0), base: 0, sat: 0 },
    { p: .49,  cx, cy, w: phW, h: phH, r: phW * .17, bw: mob ? 7 : 10, dev: 1, orb: .1, s: S(0,1,0,0), base: 0, sat: 0 },
    { p: .58,  cx, cy: lpCy, w: lpW, h: lpH, r: 14, bw: mob ? 6 : 12, dev: 1, orb: .08, s: S(0,0,1,0), base: 1, sat: 0 },
    { p: .69,  cx, cy: lpCy, w: lpW, h: lpH, r: 14, bw: mob ? 6 : 12, dev: 1, orb: .08, s: S(0,0,1,0), base: 1, sat: 0 },
    { p: .79,  cx, cy, w: dsW, h: dsH, r: 20, bw: 1, dev: 1, orb: .12, s: S(0,0,0,1), base: 0, sat: 1 },
    { p: 1,    cx, cy, w: dsW, h: dsH, r: 20, bw: 1, dev: 1, orb: .12, s: S(0,0,0,1), base: 0, sat: 1 },
  ];
  SATPOS = mob
    ? [[-.62, -1.55], [.02, -1.78], [.64, -1.55], [-.62, 1.55], [.02, 1.78], [.64, 1.55]]
    : [[-1.1, -.98], [1.06, -.96], [1.2, .02], [-1.12, .8], [1.06, .94], [.02, -1.3]];
}

function sample(P) {
  let i = 0;
  while (i < KEYS.length - 2 && P > KEYS[i + 1].p) i++;
  const a = KEYS[i], b = KEYS[i + 1];
  const t = ease(range(P, a.p, b.p));
  const o = {};
  for (const k in a) {
    if (k === 's') o.s = a.s.map((v, j) => lerp(v, b.s[j], t));
    else o[k] = lerp(a[k], b[k], t);
  }
  return o;
}

let P = 0, Pt = 0, vel = 0, lastY = scrollY;
let G = null; // géométrie courante (pour le canvas)
let stickyTop = 0, journeyOn = true;

function updateJourney() {
  const r = journey.getBoundingClientRect();
  journeyOn = r.top < vh && r.bottom > 0;
  Pt = clamp(-r.top / (r.height - vh));
  P = reduce ? Pt : P + (Pt - P) * .12;
  if (Math.abs(Pt - P) < .00005) P = Pt;
  stickyTop = sticky.getBoundingClientRect().top;
  if (!journeyOn) return;

  const g = G = sample(P);

  /* hero */
  const h = range(P, .012, .07);
  hero.style.opacity = 1 - h;
  hero.style.transform = `translateY(calc(-50% - ${h * 90}px)) scale(${1 - h * .06})`;
  hero.style.filter = h > 0 ? `blur(${h * 10}px)` : '';
  hero.style.visibility = h >= 1 ? 'hidden' : '';
  hint.style.opacity = 1 - range(P, 0, .025);

  /* produit : légère rotation 3D au pointeur */
  const tilt = g.s[1] + g.s[2] + g.s[3];
  const ry = mouse.sx * 7 * tilt, rx = -mouse.sy * 5 * tilt;
  device.style.width = g.w + 'px';
  device.style.height = g.h + 'px';
  device.style.borderRadius = g.r + 'px';
  device.style.opacity = g.dev;
  device.style.transform = `translate3d(${g.cx - g.w / 2}px,${g.cy - g.h / 2}px,0) perspective(1400px) rotateY(${ry}deg) rotateX(${rx}deg)`;
  const bw = g.bw, iw = g.w - bw * 2, ih = g.h - bw * 2;
  screenEl.style.cssText = `left:${bw}px;top:${bw}px;width:${iw}px;height:${ih}px;border-radius:${Math.max(g.r - bw * .9, 2)}px`;
  let live = false;
  scrs.forEach((s, i) => {
    const op = g.s[i];
    const fit = i === 0 ? Math.max(iw / s.dw, ih / s.dh) : Math.min(iw / s.dw, ih / s.dh);
    s.el.style.opacity = op;
    s.el.style.visibility = op < .01 ? 'hidden' : '';
    s.el.style.transform = `translate(-50%,-50%) scale(${fit})`;
    const on = op > .95;
    s.el.classList.toggle('is-live', on);
    if (on && i > 0) live = true;
  });
  device.classList.toggle('is-live', live);
  dash.classList.toggle('is-play', g.s[3] > .5);
  if (g.s[3] > .5) startDash(); else stopDash();

  /* socle de l'ordinateur */
  base.style.opacity = g.base;
  base.style.width = g.w * 1.16 + 'px';
  base.style.transform = `translate3d(${g.cx - g.w * .58}px,${g.cy + g.h / 2 - 2}px,0) scaleX(${lerp(.9, 1, g.base)})`;

  /* modules entreprise */
  let paths = '';
  sats.forEach((el, i) => {
    const k = ease(range(g.sat, i * .08, i * .08 + .55));
    const [ux, uy] = SATPOS[i];
    const x = g.cx + ux * g.w / 2, y = g.cy + uy * g.h / 2;
    el.style.opacity = k;
    el.style.transform = `translate3d(calc(${x}px - 50%),calc(${y + (1 - k) * 30}px - 50%),0) scale(${lerp(.85, 1, k)})`;
    if (k > .02) {
      const mx = lerp(g.cx, x, .5) + uy * 20, my = lerp(g.cy, y, .5) - ux * 20;
      paths += `<path d="M${g.cx} ${g.cy} Q${mx} ${my} ${x} ${y}" style="opacity:${k * .9}"/>`;
    }
  });
  links.innerHTML = paths ? LINK_DEFS + paths : '';

  /* légendes */
  let stage = -1;
  caps.forEach((c, i) => {
    const [a, b] = CAPS[i];
    const inn = range(P, a, a + .026), out = i === caps.length - 1 ? 1 : 1 - range(P, b - .022, b);
    const op = inn * out;
    c.style.opacity = op;
    c.style.transform = (mob ? '' : 'translateY(-50%) ') + `translateY(${(1 - inn) * 40 - (1 - out) * 40}px)`;
    c.classList.toggle('is-live', op > .5);
    if (P >= a && P < b) stage = i;
  });
  rail.classList.toggle('is-on', P > .06 && P < .995);
  railItems.forEach((li, i) => {
    li.classList.toggle('is-on', i === stage);
    li.classList.toggle('is-done', i < stage);
  });
}
const LINK_DEFS = '<defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#38e1ff"/><stop offset="1" stop-color="#8b5cff"/></linearGradient></defs>';

/* ----- application mobile interactive ----- */
(function app() {
  const views = $$('.app-view'), tabs = $$('.tab');
  const show = v => {
    views.forEach(x => x.classList.toggle('is-on', x.dataset.view === v));
    tabs.forEach(x => x.classList.toggle('is-on', x.dataset.tab === v));
    if (v === 'club') $('#ringFg').style.strokeDashoffset = 314 * (1 - .74);
    else $('#ringFg').style.strokeDashoffset = 314;
  };
  tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.tab)));
  const single = sel => $$(sel).forEach(b => b.addEventListener('click', () => {
    $$(sel).forEach(x => x.classList.remove('is-on')); b.classList.add('is-on');
  }));
  single('.chip'); single('.date'); single('.slot:not(.is-off)');
  $$('.add').forEach(b => b.addEventListener('click', () => b.classList.toggle('is-added')));
  let covers = 2;
  $$('.stepper button').forEach(b => b.addEventListener('click', () => {
    covers = clamp(covers + +b.dataset.step, 1, 12); $('#covers').textContent = covers;
  }));
  const toast = $('#toast');
  $('#bookBtn').addEventListener('click', () => {
    const d = $('.date.is-on'), s = $('.slot.is-on');
    const day = { VEN: 'Vendredi', SAM: 'Samedi', DIM: 'Dimanche', MAR: 'Mardi' }[d.querySelector('small').textContent];
    $('.app-card h4').textContent = `${day} · ${s.textContent}`;
    $('.app-card p').textContent = `Maison Olivier · ${covers} personne${covers > 1 ? 's' : ''}`;
    toast.classList.add('is-on');
    setTimeout(() => { toast.classList.remove('is-on'); show('home'); }, 1400);
  });
})();

/* ----- plan de salle (web) ----- */
(function tables() {
  const wrap = $('#tables');
  const st = ['', 'busy', 'res', 'busy', '', 'busy', 'res', 'busy', 'busy', '', 'res', 'busy', 'busy', 'res', '', 'busy', 'busy', ''];
  st.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = 'tbl ' + s + (i % 4 === 1 ? ' round' : '');
    b.textContent = 'T' + (i + 1);
    b.addEventListener('click', () => {
      const order = ['', 'res', 'busy'];
      const cur = order.find(o => o && b.classList.contains(o)) || '';
      b.classList.remove('res', 'busy');
      const nx = order[(order.indexOf(cur) + 1) % 3];
      if (nx) b.classList.add(nx);
    });
    wrap.appendChild(b);
  });
})();

/* ----- dashboard vivant ----- */
let dashTimer = 0, dashStep = 0, dashCounted = false;
const flowLis = $$('.flow-steps li');
function startDash() {
  if (dashTimer) return;
  if (!dashCounted) {
    dashCounted = true;
    $$('[data-count]').forEach(el => {
      const end = +el.dataset.count, suf = el.textContent.includes('€') ? ' €' : '', t0 = performance.now();
      const tick = now => {
        const k = ease(clamp((now - t0) / 1600));
        el.textContent = Math.round(end * k).toLocaleString('fr-FR') + suf;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  dashTimer = setInterval(() => {
    flowLis.forEach((li, i) => li.classList.toggle('is-hot', i <= dashStep));
    dashStep = (dashStep + 1) % (flowLis.length + 1);
  }, 650);
}
function stopDash() { if (dashTimer) { clearInterval(dashTimer); dashTimer = 0; } }

/* =========================================================
   CANVAS — l'onde IA, l'aura du produit, la constellation
   ========================================================= */
const cv = $('#fx'), ctx = cv.getContext('2d');
let dpr = 1, stars = [], orbDots = [];
function sizeCanvas() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = vw * dpr; cv.height = vh * dpr;
  const n = Math.round(clamp(vw * vh / 16000, 40, 110));
  stars = Array.from({ length: n }, () => ({
    x: Math.random() * vw, y: Math.random() * vh, z: .2 + Math.random() * .8,
    vx: (Math.random() - .5) * .08, vy: (Math.random() - .5) * .08,
  }));
  orbDots = Array.from({ length: 70 }, () => ({
    a: Math.random() * TAU, b: Math.acos(Math.random() * 2 - 1), s: (.15 + Math.random() * .5) * (Math.random() < .5 ? -1 : 1),
  }));
}

/* point + normale sur un rectangle arrondi (un cercle si r = w/2 = h/2) */
function rr(u, a, b, r) {
  r = Math.min(r, a, b);
  const ex = 2 * (a - r), ey = 2 * (b - r), q = Math.PI * r / 2;
  const L = 2 * ex + 2 * ey + 4 * q;
  let d = (((u % 1) + 1) % 1) * L;
  const arc = (cx, cy, a0) => { const t = a0 + d / r; return [cx + Math.cos(t) * r, cy + Math.sin(t) * r, Math.cos(t), Math.sin(t)]; };
  if (d < ex / 2) return [d, -b, 0, -1]; d -= ex / 2;
  if (d < q) return arc(a - r, -b + r, -Math.PI / 2); d -= q;
  if (d < ey) return [a, -b + r + d, 1, 0]; d -= ey;
  if (d < q) return arc(a - r, b - r, 0); d -= q;
  if (d < ex) return [a - r - d, b, 0, 1]; d -= ex;
  if (d < q) return arc(-a + r, b - r, Math.PI / 2); d -= q;
  if (d < ey) return [-a, b - r - d, -1, 0]; d -= ey;
  if (d < q) return arc(-a + r, -b + r, Math.PI); d -= q;
  return [-a + r + d, -b, 0, -1];
}

const RIB = [
  [56, 225, 255], [31, 107, 255], [139, 92, 255], [120, 240, 255], [200, 220, 255],
];
function drawShape(g, alpha, t, boost) {
  // g : {cx, cy, w, h, r, orb}
  const a = g.w / 2, b = g.h / 2, R = Math.min(a, b);
  const orb = g.orb;
  const mx = mouse.sx * 16 * orb, my = mouse.sy * 16 * orb;
  const cx = g.cx + mx, cy = g.cy + my;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';

  // cœur lumineux
  if (orb > .02) {
    const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.7);
    gr.addColorStop(0, `rgba(80,160,255,${.32 * orb * alpha})`);
    gr.addColorStop(.45, `rgba(60,90,255,${.12 * orb * alpha})`);
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr;
    ctx.fillRect(cx - R * 1.8, cy - R * 1.8, R * 3.6, R * 3.6);

    // particules en orbite (sphère neuronale)
    for (const p of orbDots) {
      p.a += p.s * .004;
      const x = Math.sin(p.b) * Math.cos(p.a + t * .1), z = Math.sin(p.b) * Math.sin(p.a + t * .1), y = Math.cos(p.b);
      const k = (z + 1.4) / 2.4;
      ctx.fillStyle = `rgba(170,215,255,${.75 * k * orb * alpha})`;
      ctx.beginPath(); ctx.arc(cx + x * R * .82, cy + y * R * .82, 1.3 * k + .3, 0, TAU); ctx.fill();
    }

    // onde « voix » qui traverse le cœur
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();
      const W = R * 1.5;
      for (let i = 0; i <= 80; i++) {
        const u = i / 80, x = cx - W / 2 + u * W;
        const env = Math.pow(Math.sin(Math.PI * u), 2);
        const y = cy + Math.sin(u * TAU * (2 + j * .6) + t * (2.2 + j * .5)) * R * .22 * env * (1 + boost * 2) * (j === 1 ? -.7 : 1);
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      const c = RIB[j];
      ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${.55 * orb * alpha})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
  }

  // rubans qui épousent la forme du produit
  const amp = lerp(4, R * .14, orb) * (1 + boost * 3) + mouseNear(cx, cy, R) * 10;
  const M = Math.round(clamp((a + b) * .9, 120, 360));
  for (let j = 0; j < RIB.length; j++) {
    const f1 = 3 + j, f2 = 5 + j * 2, sp = (j % 2 ? 1 : -1) * (.03 + j * .006);
    ctx.beginPath();
    for (let i = 0; i <= M; i++) {
      const u = i / M;
      const [px, py, nx, ny] = rr(u + t * sp, a, b, g.r);
      const d = amp * (Math.sin(u * TAU * f1 + t * (1 + j * .3) + j) * .6 + Math.sin(u * TAU * f2 - t * (.8 + j * .2) + j * 2) * .4)
        * (.55 + .45 * Math.sin(t * .7 + j)) + (j - 2) * lerp(1.5, R * .03, orb);
      const x = cx + px + nx * d, y = cy + py + ny * d;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.closePath();
    const c = RIB[j];
    ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${.07 * alpha})`;
    ctx.lineWidth = 7; ctx.stroke();
    ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${(j === 4 ? .35 : .65) * alpha})`;
    ctx.lineWidth = j === 4 ? .8 : 1.3; ctx.stroke();
  }
  ctx.restore();
}
function mouseNear(x, y, R) {
  const d = Math.hypot(mouse.x - x, mouse.y - y);
  return clamp(1 - (d - R) / 260);
}

function drawStars(t) {
  const sy = scrollY;
  ctx.save();
  for (const s of stars) {
    s.x += s.vx; s.y += s.vy;
    if (s.x < -20) s.x = vw + 20; if (s.x > vw + 20) s.x = -20;
    s._x = s.x + mouse.sx * 20 * s.z;
    s._y = ((s.y - sy * .08 * s.z) % vh + vh) % vh + mouse.sy * 20 * s.z;
  }
  ctx.lineWidth = .6;
  for (let i = 0; i < stars.length; i++) {
    const a = stars[i];
    for (let j = i + 1; j < stars.length; j++) {
      const b = stars[j], dx = a._x - b._x, dy = a._y - b._y, d2 = dx * dx + dy * dy;
      if (d2 < 15000) {
        ctx.strokeStyle = `rgba(110,160,255,${(1 - d2 / 15000) * .1})`;
        ctx.beginPath(); ctx.moveTo(a._x, a._y); ctx.lineTo(b._x, b._y); ctx.stroke();
      }
    }
    ctx.fillStyle = `rgba(190,215,255,${.25 + a.z * .45})`;
    ctx.fillRect(a._x, a._y, a.z * 1.6, a.z * 1.6);
  }
  ctx.restore();
}

/* =========================================================
   3. VIDÉOS
   ========================================================= */
const vSec = $('#videos'), vStage = $('#vstage'), vLaptop = $('.v-laptop'), vPhoneEl = $('.v-phone');
const vScreen = $('#vScreen'), vPhone = $('#vPhone'), vList = $('#vlist'), vBadge = $('#vBadge');
let vIdx = 0, vTimer = 0, vInView = false;
const V_DUR = 8000;

VIDEOS.forEach((v, i) => {
  const li = document.createElement('li');
  li.innerHTML = `<button style="--dur:${V_DUR}ms"><small>0${i + 1}</small><b>${v.title}</b><em>${v.kind}</em><span class="vprog"><i></i></span></button>`;
  li.firstChild.addEventListener('click', () => { setVideo(i); restartVTimer(); });
  vList.appendChild(li);
});

function mediaInto(box, src, fallback, poster) {
  box.innerHTML = fallback;
  if (!src) return;
  const vid = document.createElement('video');
  Object.assign(vid, { muted: true, loop: true, playsInline: true, autoplay: true, preload: 'auto' });
  vid.setAttribute('muted', ''); vid.setAttribute('playsinline', '');
  if (poster) vid.poster = poster;
  vid.addEventListener('loadeddata', () => { box.innerHTML = ''; box.appendChild(vid); vid.play().catch(() => {}); box.dataset.real = '1'; }, { once: true });
  vid.addEventListener('error', () => { box.dataset.real = ''; }, { once: true });
  box.dataset.real = '';
  vid.src = src;
}
function setVideo(i) {
  vIdx = i;
  const v = VIDEOS[i], p = PROJECTS.find(x => x.id === v.site) || PROJECTS[0];
  $$('button', vList).forEach((b, j) => {
    b.classList.remove('is-on'); void b.offsetWidth; // relance la barre
    if (j === i) b.classList.add('is-on');
  });
  mediaInto(vScreen, v.desktop, `<div class="vdemo">${MINI[v.site] || ''}</div><div class="v-overlay-play"><span>▶</span></div>`, v.poster);
  mediaInto(vPhone, v.mobile, `<div class="vdemo-phone" style="--pbg:linear-gradient(160deg,${p.accent},${p.bg})"><span class="vp-play">▶</span><b>${v.title}</b><small>${v.kind}</small></div>`);
  fitMini(vScreen);
  vBadge.textContent = '';
  setTimeout(() => { vBadge.textContent = vScreen.dataset.real ? '● Démo réelle' : 'Aperçu · vidéo à intégrer'; }, 900);
}
function restartVTimer() {
  clearInterval(vTimer);
  if (vInView) vTimer = setInterval(() => setVideo((vIdx + 1) % VIDEOS.length), V_DUR);
}
vScreen.addEventListener('click', openLightbox);
$('#vPlay').addEventListener('click', openLightbox);

const lb = $('#lightbox'), lbInner = $('#lbInner');
function openLightbox() {
  const v = VIDEOS[vIdx];
  lbInner.innerHTML = `<div class="lb-empty"><b>${v.title}</b><p>La vidéo de présentation de ce projet s'affichera ici.</p><code>experience/${v.desktop}</code></div>`;
  const vid = document.createElement('video');
  Object.assign(vid, { controls: true, autoplay: true, playsInline: true });
  vid.addEventListener('loadeddata', () => { lbInner.innerHTML = ''; lbInner.appendChild(vid); }, { once: true });
  vid.src = v.desktop;
  lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
}
function closeLightbox() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); lbInner.innerHTML = ''; }
$('#lbClose').addEventListener('click', closeLightbox);
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

new IntersectionObserver(([e]) => {
  vInView = e.isIntersecting;
  if (vInView && !vScreen.childElementCount) setVideo(0);
  restartVTimer();
}, { threshold: .25 }).observe(vSec);

function updateVideos() {
  const r = vSec.getBoundingClientRect();
  if (r.top > vh || r.bottom < 0) return;
  const p = clamp((vh - r.top) / (vh * 1.1));
  const k = ease(p);
  vLaptop.style.transform = `rotateX(${(1 - k) * 32 + mouse.sy * 3}deg) rotateY(${mouse.sx * -4}deg) scale(${lerp(.84, 1, k)})`;
  vPhoneEl.style.transform = `translate3d(0,${(1 - k) * 160}px,0) rotate(${(1 - k) * 8}deg)`;
}

/* =========================================================
   4. PORTFOLIO
   ========================================================= */
const pf = $('#portfolio'), pfSticky = $('.pf-sticky'), pfTrack = $('#pfTrack'), pfBar = $('#pfBar'), pfNow = $('#pfNow');
$('#pfTotal').textContent = String(PROJECTS.length).padStart(2, '0');
PROJECTS.forEach((p, i) => {
  const s = document.createElement('article');
  s.className = 'pf-slide';
  s.style.setProperty('--accent', p.accent);
  s.style.setProperty('--glow', p.glow);
  s.innerHTML = `
    <span class="pf-bgnum">0${i + 1}</span>
    <div class="pf-info">
      <p class="pf-cat">${p.cat}</p>
      <h3 class="pf-name">${p.name}</h3>
      <p class="pf-desc">${p.desc}</p>
      <div class="pf-meta"><div><small>Projet</small><span>${p.type}</span></div><div><small>Livrables</small><span>${p.deliv}</span></div></div>
    </div>
    <div class="pf-visual">
      <div class="pf-browser">
        <div class="web-bar"><i></i><i></i><i></i><span class="web-url">🔒 ${p.url}</span></div>
        <div class="pf-view">${MINI[p.id]}</div>
      </div>
      <div class="pf-phone"><div>${MINI_M(p.id)}</div></div>
    </div>`;
  pfTrack.appendChild(s);
});
const pfSlides = $$('.pf-slide');
let pfIdx = -1;
function updatePortfolio() {
  const r = pf.getBoundingClientRect();
  if (r.top > vh || r.bottom < 0) return;
  const n = PROJECTS.length;
  const p = clamp(-r.top / (r.height - vh));
  // petites pauses sur chaque projet
  const raw = p * (n - 1), i0 = Math.floor(raw), f = raw - i0;
  const held = i0 + ease(range(f, .2, .8));
  pfTrack.style.transform = `translate3d(${-held * vw}px,0,0)`;
  pfBar.style.width = (p * 100) + '%';
  pfSlides.forEach((s, i) => {
    const d = i - held;
    const vis = s.querySelector('.pf-visual'), info = s.querySelector('.pf-info');
    vis.style.transform = `translate3d(${d * vw * .25}px,0,0)`;
    info.style.transform = `translate3d(${d * vw * .08}px,0,0)`;
    info.style.opacity = 1 - Math.min(Math.abs(d) * 1.4, 1);
  });
  const idx = Math.round(held);
  if (idx !== pfIdx) {
    pfIdx = idx;
    pfNow.textContent = String(idx + 1).padStart(2, '0');
    pfSticky.style.backgroundColor = PROJECTS[idx].bg;
  }
}

function fitMini(scope = document) {
  $$('.pf-view, .vdemo', scope).forEach(v => {
    const m = v.querySelector('.mini-site');
    if (m) m.style.transform = `scale(${v.clientWidth / 1100})`;
  });
}

/* =========================================================
   5. MANIFESTE
   ========================================================= */
const fin = $('#finale'), fls = $$('.fl'), fBrand = $('#finaleBrand'), fLines = $('.finale-lines');
let finG = null;
function updateFinale() {
  const r = fin.getBoundingClientRect();
  finG = null;
  if (r.top > vh || r.bottom < 0) return;
  const p = clamp(-r.top / (r.height - vh));
  fls.forEach((el, i) => {
    const a = .04 + i * .17;
    const k = ease(range(p, a, a + .13));
    el.style.opacity = k;
    el.style.transform = `translate3d(0,${(1 - k) * 60}px,0) scale(${lerp(1.12, 1, k)})`;
    el.style.filter = k < 1 ? `blur(${(1 - k) * 14}px)` : '';
  });
  const out = ease(range(p, .6, .72));
  fLines.style.opacity = 1 - out;
  fLines.style.transform = `translateY(-50%) scale(${1 + out * .25})`;
  fLines.style.filter = out > 0 ? `blur(${out * 12}px)` : '';
  const br = ease(range(p, .68, .84));
  fBrand.style.opacity = br;
  fBrand.style.transform = `translate3d(0,${(1 - br) * 50}px,0) scale(${lerp(.9, 1, br)})`;
  fBrand.style.pointerEvents = br > .6 ? 'auto' : 'none';
  // l'onde revient : la boucle est bouclée
  const top = Math.max(0, r.top) + Math.min(0, r.bottom - vh);
  const R = Math.min(vw, vh) * lerp(.22, .36, br);
  const s = range(p, 0, .12) * (1 - range(p, .97, 1));
  finG = { cx: vw / 2, cy: vh / 2 + top, w: R * 2, h: R * 2, r: R, orb: 1, alpha: s * lerp(.55, .85, br) };
}

/* =========================================================
   SERVICES — la ligne au centre de l'écran s'ouvre
   ========================================================= */
const svcRows = $$('.svc-row');
function updateServices() {
  let best = null, bd = 1e9;
  svcRows.forEach(row => {
    const r = row.getBoundingClientRect();
    const d = Math.abs(r.top + r.height / 2 - vh * .5);
    if (r.bottom > 0 && r.top < vh && d < bd) { bd = d; best = row; }
  });
  svcRows.forEach(row => row.classList.toggle('is-open', row === best && bd < vh * .3));
}

/* =========================================================
   NAV, reveal, formulaire
   ========================================================= */
const nav = $('#nav'), navLinks = $$('.nav-links a');
const navSecs = ['journey', 'services', 'videos', 'portfolio', 'contact'].map(id => document.getElementById(id));
function updateNav() {
  nav.classList.toggle('is-solid', scrollY > 40);
  let cur = 0;
  navSecs.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * .4) cur = i; });
  navLinks.forEach((a, i) => a.classList.toggle('is-on', i === cur));
}
const burger = $('#burger'), menu = $('#mobileMenu');
burger.addEventListener('click', () => {
  const o = menu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', o);
});
$$('a', menu).forEach(a => a.addEventListener('click', () => { menu.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }));

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));

$$('#ptypes button').forEach(b => b.addEventListener('click', () => b.classList.toggle('is-on')));
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, types = $$('#ptypes .is-on').map(b => b.textContent).join(', ') || 'À définir';
  const body = `Bonjour KingDream,\n\nProjet : ${types}\n\n${f.msg.value}\n\n${f.name.value}\n${f.email.value}`;
  location.href = `mailto:contact@kingdream.fr?subject=${encodeURIComponent('Nouveau projet — ' + f.name.value)}&body=${encodeURIComponent(body)}`;
});
$('#year').textContent = new Date().getFullYear();

/* =========================================================
   BOUCLE
   ========================================================= */
let t0 = performance.now();
function loop(now) {
  const t = reduce ? 0 : (now - t0) / 1000;
  mouse.sx += (mouse.nx - mouse.sx) * .06;
  mouse.sy += (mouse.ny - mouse.sy) * .06;
  const y = scrollY;
  vel += (Math.abs(y - lastY) / vh - vel) * .1; lastY = y;
  const boost = reduce ? 0 : clamp(vel * 8, 0, 1);

  updateJourney();
  updateVideos();
  updatePortfolio();
  updateFinale();

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, vw, vh);
  drawStars(t);
  if (journeyOn && G) {
    const g = { ...G, cy: G.cy + stickyTop };
    drawShape(g, lerp(.55, 1, G.orb) * lerp(1, .6, 1 - range(P, .012, .07)), t, boost);
  }
  if (finG && finG.alpha > .01) drawShape(finG, finG.alpha, t, boost);

  requestAnimationFrame(loop);
}

let rz;
function onResize() {
  buildKeys(); sizeCanvas(); fitMini();
}
addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(onResize, 120); });
addEventListener('scroll', () => { updateNav(); updateServices(); }, { passive: true });

buildKeys(); sizeCanvas(); fitMini(); updateNav(); updateServices();
requestAnimationFrame(loop);
if (document.fonts) document.fonts.ready.then(() => fitMini());
})();
