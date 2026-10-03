/* =========================================================
   KINGDREAM — moteur de l'expérience (v2)
   Le scroll pilote tout : une même forme évolue
   onde → icône → application → web → entreprise.
   ========================================================= */
(() => {
'use strict';

/* ---------------------------------------------------------
   CONFIGURATION : vos vidéos
   Déposez vos fichiers dans experience/videos/ avec ces noms
   (ou changez les chemins). Tant qu'un fichier est absent,
   une démo animée du projet s'affiche à la place.
   --------------------------------------------------------- */
const VIDEOS = [
  { title: 'Maison Olivier', kind: 'Site restaurant et réservation', site: 'olivier',
    desktop: 'videos/projet-1-desktop.mp4', mobile: 'videos/projet-1-mobile.mp4', poster: '' },
  { title: 'Batir.pro', kind: 'Site entreprise BTP et devis', site: 'batir',
    desktop: 'videos/projet-2-desktop.mp4', mobile: 'videos/projet-2-mobile.mp4', poster: '' },
  { title: 'Atelier Nacre', kind: 'Institut beauté et prise de RDV', site: 'nacre',
    desktop: 'videos/projet-3-desktop.mp4', mobile: 'videos/projet-3-mobile.mp4', poster: '' },
];

/* Réalisations : couleurs de fond et de texte propres à chaque projet */
const PROJECTS = [
  { id: 'olivier', name: 'Maison Olivier', cat: 'Restaurant gastronomique', url: 'maison-olivier.fr',
    desc: 'Une identité chaleureuse, une carte mise en scène et un parcours pensé pour donner envie de réserver.',
    type: 'Site vitrine et réservation', deliv: 'Identité, menu, galerie', bg: '#EDE6DA', fg: '#2A2118' },
  { id: 'batir', name: 'Batir.pro', cat: 'Entreprise BTP', url: 'batir-pro.fr',
    desc: 'Des chantiers exigeants, une équipe locale et une approche claire, du premier devis à la livraison.',
    type: 'Site entreprise et devis', deliv: 'Preuves, réalisations, devis', bg: '#EFEADF', fg: '#17181C' },
  { id: 'nacre', name: 'Atelier Nacre', cat: 'Institut beauté et bien-être', url: 'atelier-nacre.fr',
    desc: 'Une expérience douce et premium qui présente les soins, l’expertise et la réservation en quelques secondes.',
    type: 'Site et prise de rendez-vous', deliv: 'Image de marque, soins, tarifs', bg: '#F4E8E4', fg: '#4A2F32' },
  { id: 'volt', name: 'Volt 24/7', cat: 'Électricien, dépannage', url: 'volt-urgence.fr',
    desc: 'Un site direct et rassurant qui transforme une urgence ou un projet de travaux en appel immédiat.',
    type: 'Site de conversion', deliv: 'Urgence, services, appel direct', bg: '#F2EFDC', fg: '#16150F' },
  { id: 'morel', name: 'Lucas Morel', cat: 'Photographe mode et campagnes', url: 'lucas-morel.photo',
    desc: 'Un portfolio éditorial qui laisse les images parler, avec une navigation minimaliste et une forte direction artistique.',
    type: 'Portfolio éditorial', deliv: 'Galerie, éditorial, direction artistique', bg: '#E9E9E6', fg: '#111111' },
];

const MINI = {
  olivier: `<div class="mini-site ms-olivier"><div class="ms-nav"><span class="ms-logo">MAISON OLIVIER</span><nav><span>La carte</span><span>Notre histoire</span><span>Galerie</span></nav><span class="ms-btn">RÉSERVER</span></div><div class="ms-hero"><div><p class="ms-k">Restaurant • Cuisine contemporaine</p><h4>Le goût<br>du vrai.</h4><p>Une carte de saison, des produits d'exception et une table où l'on prend le temps.</p></div><div class="ms-img"><div class="ms-tag"><small>MENU DU SOIR</small><b>48 €</b></div></div></div><div class="ms-row"><div></div><div></div><div></div></div></div>`,
  batir: `<div class="mini-site ms-batir"><div class="ms-nav"><span class="ms-logo">BATIR<span>.PRO</span></span><nav><span>Réalisations</span><span>Expertise</span><span>À propos</span></nav><span class="ms-btn">DEVIS GRATUIT</span></div><div class="ms-hero"><div><p class="ms-k">Construction • Rénovation</p><h4>Construire<br>pour durer.</h4><p>Une équipe locale, des chantiers maîtrisés, un interlocuteur unique.</p><div class="ms-stats"><div><b>25+</b><span>ans d'expérience</span></div><div><b>180</b><span>projets livrés</span></div><div><b>4.9</b><span>avis clients</span></div></div></div><div class="ms-img"></div></div><div class="ms-row"><div></div><div></div><div></div></div></div>`,
  nacre: `<div class="mini-site ms-nacre"><div class="ms-nav"><span class="ms-logo">Atelier Nacre</span><nav><span>Soins</span><span>Le studio</span><span>Tarifs</span></nav><span class="ms-btn">PRENDRE RDV</span></div><div class="ms-hero"><div><p class="ms-k">Institut • Beauté & bien-être</p><h4>Votre moment<br>de beauté.</h4><p>Des soins sur mesure dans un cocon pensé pour vous.</p></div><div class="ms-img"></div></div><div class="ms-row"><div></div><div></div><div></div></div></div>`,
  volt: `<div class="mini-site ms-volt"><div class="ms-nav"><span class="ms-logo">VOLT <span>24/7</span></span><nav><span>Services</span><span>Installations</span><span>Entreprise</span></nav><span class="ms-btn">06 12 34 56 78</span></div><div class="ms-hero"><div><p class="ms-k">Électricien • Dépannage & installation</p><h4>L'électricité<br><span>sans stress.</span></h4><p>Intervention 24 h/24, 7 j/7. Un appel, on arrive.</p></div><div class="ms-img"></div></div><div class="ms-row"><div></div><div></div><div></div></div></div>`,
  morel: `<div class="mini-site ms-morel"><div class="ms-nav"><span class="ms-logo">LUCAS MOREL</span><nav><span>Portfolio</span><span>Éditorial</span><span>À propos</span></nav><span class="ms-btn">CONTACT</span></div><div class="ms-hero"><div><p class="ms-k">Photographe • Mode / Campagnes</p><h4>Images<br>qui restent.</h4><p>Paris · Lyon · International</p></div><div class="ms-img"></div></div><div class="ms-row"><div></div><div></div><div></div></div></div>`,
};
const BIG = { olivier: 'Le goût<br>du vrai.', batir: 'Construire<br>pour durer.', nacre: 'Votre moment<br>de beauté.', volt: 'L’électricité<br>sans stress.', morel: 'Images<br>qui restent.' };
const MINI_M = id => {
  const p = PROJECTS.find(x => x.id === id);
  return `<div class="mini-m ms-${id}"><span class="mm-logo">${p.name}</span><div class="ms-img"></div><h5>${BIG[id]}</h5><span class="ms-btn">Découvrir</span></div>`;
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
const mouse = { x: -9999, y: -9999, nx: 0, ny: 0, sx: 0, sy: 0 };
addEventListener('pointermove', e => {
  mouse.x = e.clientX; mouse.y = e.clientY;
  mouse.nx = e.clientX / vw * 2 - 1; mouse.ny = e.clientY / vh * 2 - 1;
}, { passive: true });

/* =========================================================
   1. LE PARCOURS
   ========================================================= */
const journey = $('#journey'), sticky = $('#sticky'), device = $('#device'), screenEl = $('#screen');
const base = $('#base'), hero = $('#hero'), progress = $('#progress'), progressBar = $('#progressBar');
const caps = $$('.cap'), progLabels = $$('#progress span'), sats = $$('.sat');
const scrs = ['.scr-icon', '.scr-app', '.scr-web', '.scr-dash'].map(s => {
  const el = $(s); return { el, dw: +el.dataset.w, dh: +el.dataset.h };
});
const links = $('#links');
const dash = $('.dash');

const CAPS = [[.075, .18], [.18, .31], [.31, .52], [.52, .72], [.72, 1.02]];

let KEYS = [], SATPOS = [];
function buildKeys() {
  vw = innerWidth; vh = innerHeight; mob = vw < 860;
  const hx = mob ? vw / 2 : vw * .71, hy = mob ? vh * .37 : vh * .6;
  const hd = mob ? Math.min(vw * .58, vh * .29) : Math.min(vh * .56, vw * .34, 500);
  const cx = mob ? vw / 2 : vw * .62;
  const cy = mob ? vh * .4 : vh * .5;
  const orb = mob ? Math.min(vw * .62, vh * .34) : Math.min(vh * .5, 440);
  const ic = mob ? 112 : 148;
  const phH = mob ? Math.min(vh * .46, 520) : Math.min(vh * .74, 660), phW = phH * .485;
  const lpW = mob ? vw * .9 : Math.min(vw * .55, 1000), lpH = lpW * .625;
  const dsW = mob ? vw * .9 : Math.min(vw * .46, 840), dsH = dsW * .61;
  const S = (a, b, c, d) => [a, b, c, d];
  KEYS = [
    { p: 0,    cx: hx, cy: hy, w: hd, h: hd, r: hd / 2, bw: 0, dev: 0, orb: 1, blob: 1, s: S(0,0,0,0), base: 0, sat: 0 },
    { p: .085, cx, cy, w: orb, h: orb, r: orb / 2, bw: 0, dev: 0, orb: 1, blob: 1, s: S(0,0,0,0), base: 0, sat: 0 },
    { p: .16,  cx, cy, w: ic * 1.35, h: ic * 1.35, r: ic * .5, bw: 0, dev: 0, orb: .55, blob: 1, s: S(0,0,0,0), base: 0, sat: 0 },
    { p: .205, cx, cy, w: ic, h: ic, r: ic * .23, bw: 0, dev: 1, orb: 0, blob: 1, s: S(1,0,0,0), base: 0, sat: 0 },
    { p: .27,  cx, cy, w: ic, h: ic, r: ic * .23, bw: 0, dev: 1, orb: 0, blob: 1, s: S(1,0,0,0), base: 0, sat: 0 },
    { p: .36,  cx, cy, w: phW, h: phH, r: phW * .17, bw: mob ? 7 : 10, dev: 1, orb: 0, blob: 0, s: S(0,1,0,0), base: 0, sat: 0 },
    { p: .49,  cx, cy, w: phW, h: phH, r: phW * .17, bw: mob ? 7 : 10, dev: 1, orb: 0, blob: 0, s: S(0,1,0,0), base: 0, sat: 0 },
    { p: .58,  cx, cy: cy - (mob ? 0 : 8), w: lpW, h: lpH, r: 14, bw: mob ? 6 : 12, dev: 1, orb: 0, blob: 0, s: S(0,0,1,0), base: 1, sat: 0 },
    { p: .69,  cx, cy: cy - (mob ? 0 : 8), w: lpW, h: lpH, r: 14, bw: mob ? 6 : 12, dev: 1, orb: 0, blob: 0, s: S(0,0,1,0), base: 1, sat: 0 },
    { p: .79,  cx, cy, w: dsW, h: dsH, r: 16, bw: 0, dev: 1, orb: 0, blob: 0, s: S(0,0,0,1), base: 0, sat: 1 },
    { p: 1,    cx, cy, w: dsW, h: dsH, r: 16, bw: 0, dev: 1, orb: 0, blob: 0, s: S(0,0,0,1), base: 0, sat: 1 },
  ];
  SATPOS = mob
    ? [[-.6, -1.55], [.04, -1.82], [.64, -1.55], [-.6, 1.5], [.04, 1.76], [.64, 1.5]]
    : [[-1.08, -1.2], [1.06, -1.04], [1.2, .02], [-1.12, 1.06], [1.06, .98], [.02, -1.36]];
}

function sample(P) {
  let i = 0;
  while (i < KEYS.length - 2 && P > KEYS[i + 1].p) i++;
  const a = KEYS[i], b = KEYS[i + 1];
  const t = ease(range(P, a.p, b.p));
  const o = {};
  for (const k in a) o[k] = k === 's' ? a.s.map((v, j) => lerp(v, b.s[j], t)) : lerp(a[k], b[k], t);
  return o;
}

let P = 0, vel = 0, lastY = scrollY;
let G = null, stickyTop = 0, journeyOn = true;

function updateJourney() {
  const r = journey.getBoundingClientRect();
  journeyOn = r.top < vh && r.bottom > 0;
  const Pt = clamp(-r.top / (r.height - vh));
  P = reduce ? Pt : P + (Pt - P) * .12;
  if (Math.abs(Pt - P) < .00005) P = Pt;
  stickyTop = sticky.getBoundingClientRect().top;
  if (!journeyOn) return;
  const g = G = sample(P);

  /* hero */
  const h = range(P, .01, .065);
  hero.style.opacity = 1 - h;
  hero.style.transform = `translate3d(0,${-h * 70}px,0)`;
  hero.style.visibility = h >= 1 ? 'hidden' : '';

  /* produit */
  const tilt = g.s[1] + g.s[2] + g.s[3];
  const ry = mouse.sx * 6 * tilt, rx = -mouse.sy * 4 * tilt;
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
  g.s[3] > .5 ? startDash() : stopDash();

  base.style.opacity = g.base;
  base.style.width = g.w * 1.16 + 'px';
  base.style.transform = `translate3d(${g.cx - g.w * .58}px,${g.cy + g.h / 2 - 2}px,0) scaleX(${lerp(.9, 1, g.base)})`;

  let paths = '';
  sats.forEach((el, i) => {
    const k = ease(range(g.sat, i * .08, i * .08 + .55));
    const [ux, uy] = SATPOS[i];
    const x = g.cx + ux * g.w / 2, y = g.cy + uy * g.h / 2;
    el.style.opacity = k;
    el.style.transform = `translate3d(calc(${x}px - 50%),calc(${y + (1 - k) * 24}px - 50%),0)`;
    if (k > .02) {
      const mx = lerp(g.cx, x, .5) + uy * 18, my = lerp(g.cy, y, .5) - ux * 18;
      paths += `<path d="M${g.cx} ${g.cy} Q${mx} ${my} ${x} ${y}" style="opacity:${k * .8}"/>`;
    }
  });
  links.innerHTML = paths;

  let stage = -1;
  caps.forEach((c, i) => {
    const [a, b] = CAPS[i];
    const inn = range(P, a, a + .026), out = i === caps.length - 1 ? 1 : 1 - range(P, b - .022, b);
    const op = inn * out;
    c.style.opacity = op;
    c.style.visibility = op < .01 ? 'hidden' : 'visible';
    c.style.transform = (mob ? '' : 'translateY(-50%) ') + `translateY(${(1 - inn) * 36 - (1 - out) * 36}px)`;
    c.classList.toggle('is-live', op > .5);
    if (P >= a && P < b) stage = i;
  });
  progress.classList.toggle('is-on', P > .06 && P < .995);
  progressBar.style.width = (range(P, .075, .95) * 100) + '%';
  progLabels.forEach((s, i) => s.classList.toggle('is-on', i <= stage));
}

/* ----- application interactive ----- */
(function app() {
  const views = $$('.app-view'), tabs = $$('.tab'), ring = $('#ringFg');
  const show = v => {
    views.forEach(x => x.classList.toggle('is-on', x.dataset.view === v));
    tabs.forEach(x => x.classList.toggle('is-on', x.dataset.tab === v));
    ring.style.strokeDashoffset = v === 'club' ? 314 * (1 - .74) : 314;
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

/* ----- plan de salle ----- */
(function tables() {
  const wrap = $('#tables');
  const st = ['', 'busy', 'res', 'busy', '', 'busy', 'res', 'busy', 'busy', '', 'res', 'busy', 'busy', 'res', '', 'busy', 'busy', ''];
  const order = ['', 'res', 'busy'];
  st.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = 'tbl ' + s + (i % 4 === 1 ? ' round' : '');
    b.textContent = 'T' + (i + 1);
    b.addEventListener('click', () => {
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
      const end = +el.dataset.count, suf = el.dataset.suf || '', t0 = performance.now();
      const tick = now => {
        const k = ease(clamp((now - t0) / 1500));
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
   CANVAS : la forme liquide (l'onde)
   ========================================================= */
const cv = $('#fx'), ctx = cv.getContext('2d');
const cv2 = $('#fx2'), ctx2 = cv2.getContext('2d');
let dpr = 1;
function sizeCanvas() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  for (const c of [cv, cv2]) { c.width = vw * dpr; c.height = vh * dpr; }
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

function blobPath(c, g, t, amp) {
  const a = g.w / 2, b = g.h / 2;
  const mdx = mouse.x - g.cx, mdy = mouse.y - g.cy, md = Math.hypot(mdx, mdy) || 1;
  const pull = clamp(1 - (md - Math.min(a, b)) / 320) * 26 * g.orb;
  const M = 150;
  c.beginPath();
  for (let i = 0; i <= M; i++) {
    const u = i / M;
    const [px, py, nx, ny] = rr(u, a, b, g.r);
    let d = amp * (Math.sin(u * TAU * 2 + t * .9) * .5 + Math.sin(u * TAU * 3 - t * 1.3 + 1) * .3 + Math.sin(u * TAU * 5 + t * 1.7 + 2) * .2);
    const dot = (nx * mdx + ny * mdy) / md;
    if (dot > 0) d += Math.pow(dot, 4) * pull;
    const x = g.cx + px + nx * d, y = g.cy + py + ny * d;
    i ? c.lineTo(x, y) : c.moveTo(x, y);
  }
  c.closePath();
}

function drawBlob(c, g, alpha, t, boost) {
  if (alpha < .01) return;
  const R = Math.min(g.w, g.h) / 2;
  const amp = R * .09 * g.orb * (1 + boost * 1.6);
  c.save();
  c.globalAlpha = alpha;

  // ondes qui se propagent autour
  if (g.orb > .05) {
    for (let k = 0; k < 3; k++) {
      const ph = ((t * .32 + k / 3) % 1);
      c.beginPath();
      c.arc(g.cx, g.cy, R * (1.04 + ph * .6), 0, TAU);
      c.strokeStyle = `rgba(169,130,47,${(1 - ph) * .35 * g.orb})`;
      c.lineWidth = 1.5;
      c.stroke();
    }
  }

  // la forme pleine, avec son ombre portée
  blobPath(c, g, t, amp);
  const gr = c.createLinearGradient(g.cx - R, g.cy - R, g.cx + R, g.cy + R);
  gr.addColorStop(0, '#EDD293');
  gr.addColorStop(.55, '#C9A24D');
  gr.addColorStop(1, '#94701F');
  c.fillStyle = gr;
  c.shadowColor = 'rgba(150,112,35,.32)';
  c.shadowBlur = 70 * (R / 200);
  c.shadowOffsetY = 34 * (R / 200);
  c.fill();
  c.shadowColor = 'transparent';

  // l'onde « voix » à l'intérieur
  if (g.orb > .02) {
    c.save();
    c.clip();
    const W = R * 1.5;
    for (let j = 0; j < 3; j++) {
      c.beginPath();
      for (let i = 0; i <= 90; i++) {
        const u = i / 90, x = g.cx - W / 2 + u * W;
        const env = Math.pow(Math.sin(Math.PI * u), 2);
        const y = g.cy + Math.sin(u * TAU * (1.6 + j * .5) + t * (2 + j * .6)) * R * .2 * env * (1 + boost) * (j === 1 ? -.75 : 1 - j * .2);
        i ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.strokeStyle = `rgba(255,255,255,${(j === 0 ? .95 : .5) * g.orb})`;
      c.lineWidth = j === 0 ? 2.6 : 1.4;
      c.lineCap = 'round';
      c.stroke();
    }
    c.restore();
  }
  c.restore();
}

/* =========================================================
   3. VIDÉOS
   ========================================================= */
const vSec = $('#videos'), vLaptop = $('.v-laptop'), vPhoneEl = $('.v-phone');
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
  box.dataset.real = '';
  if (!src) return;
  const vid = document.createElement('video');
  vid.muted = true; vid.loop = true; vid.playsInline = true; vid.autoplay = true; vid.preload = 'auto';
  vid.setAttribute('muted', ''); vid.setAttribute('playsinline', '');
  if (poster) vid.poster = poster;
  vid.addEventListener('loadeddata', () => { box.innerHTML = ''; box.appendChild(vid); vid.play().catch(() => {}); box.dataset.real = '1'; }, { once: true });
  vid.src = src;
}
function setVideo(i) {
  vIdx = i;
  const v = VIDEOS[i];
  $$('button', vList).forEach((b, j) => {
    b.classList.remove('is-on'); void b.offsetWidth;
    if (j === i) b.classList.add('is-on');
  });
  mediaInto(vScreen, v.desktop, `<div class="vdemo">${MINI[v.site] || ''}</div><div class="v-play"><span>Regarder la démo</span></div>`, v.poster);
  mediaInto(vPhone, v.mobile, `<div class="vdemo-phone">${MINI_M(v.site)}</div>`);
  fitMini(vScreen);
  vBadge.textContent = '';
  setTimeout(() => { vBadge.textContent = vScreen.dataset.real ? '' : 'Aperçu animé · vidéo à intégrer'; }, 900);
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
  vid.controls = true; vid.autoplay = true; vid.playsInline = true;
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
}, { threshold: .2 }).observe(vSec);

function updateVideos() {
  const r = vSec.getBoundingClientRect();
  if (r.top > vh || r.bottom < 0) return;
  const k = ease(clamp((vh - r.top) / (vh * .9)));
  vLaptop.style.transform = `rotateX(${(1 - k) * 26}deg) scale(${lerp(.88, 1, k)})`;
  vPhoneEl.style.transform = `translate3d(0,${(1 - k) * 140}px,0)`;
}

/* =========================================================
   4. PORTFOLIO
   ========================================================= */
const pf = $('#portfolio'), pfSticky = $('#pfSticky'), pfTrack = $('#pfTrack'), pfBar = $('#pfBar'), pfNow = $('#pfNow');
$('#pfTotal').textContent = PROJECTS.length;
PROJECTS.forEach(p => {
  const s = document.createElement('article');
  s.className = 'pf-slide';
  s.innerHTML = `
    <div class="pf-info">
      <p class="pf-cat">${p.cat}</p>
      <h3 class="pf-name">${p.name}</h3>
      <p class="pf-desc">${p.desc}</p>
      <div class="pf-meta"><div><small>Projet</small><span>${p.type}</span></div><div><small>Livrables</small><span>${p.deliv}</span></div></div>
    </div>
    <div class="pf-visual">
      <div class="pf-browser">
        <div class="web-bar"><i></i><i></i><i></i><span class="web-url">${p.url}</span></div>
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
  const raw = p * (n - 1), i0 = Math.min(Math.floor(raw), n - 2), f = raw - i0;
  const held = i0 + ease(range(f, .25, .8));
  pfTrack.style.transform = `translate3d(${-held * vw}px,0,0)`;
  pfBar.style.width = (p * 100) + '%';
  pfSlides.forEach((s, i) => {
    const d = i - held;
    s.querySelector('.pf-visual').style.transform = `translate3d(${d * vw * .22}px,0,0)`;
    const info = s.querySelector('.pf-info');
    info.style.transform = `translate3d(${d * vw * .06}px,0,0)`;
    info.style.opacity = 1 - Math.min(Math.abs(d) * 1.5, 1);
  });
  const idx = Math.round(held);
  if (idx !== pfIdx) {
    pfIdx = idx;
    pfNow.textContent = idx + 1;
    pfSticky.style.backgroundColor = PROJECTS[idx].bg;
    pfSticky.style.color = PROJECTS[idx].fg;
  }
}

function fitMini(scope = document) {
  $$('.pf-view, .vdemo', scope).forEach(v => {
    const m = v.querySelector('.mini-site');
    if (m) m.style.transform = `scale(${v.clientWidth / 1100})`;
  });
}

/* =========================================================
   7. FIN DU PARCOURS
   ========================================================= */
const fin = $('#finale'), fls = $$('.fl'), fBrand = $('#finaleBrand'), fLines = $('#finaleLines');
let finG = null;
function updateFinale() {
  const r = fin.getBoundingClientRect();
  finG = null;
  if (r.top > vh || r.bottom < 0) return;
  const p = clamp(-r.top / (r.height - vh));
  fls.forEach((el, i) => {
    const a = .03 + i * .16;
    const k = ease(range(p, a, a + .12));
    el.style.opacity = k;
    el.style.transform = `translate3d(0,${(1 - k) * 70}px,0)`;
  });
  const out = ease(range(p, .58, .7));
  fLines.style.opacity = 1 - out;
  fLines.style.transform = `translateY(calc(-50% - ${out * 80}px))`;
  const br = ease(range(p, .66, .82));
  fBrand.style.opacity = br;
  fBrand.style.transform = `translate3d(0,${(1 - br) * 60}px,0)`;
  fBrand.style.pointerEvents = br > .6 ? 'auto' : 'none';
  // la forme revient : la boucle est bouclée
  const R = Math.min(vw, vh) * lerp(.14, .2, br);
  finG = { cx: vw / 2, cy: lerp(vh * .5, vh * .5 - Math.min(vh * .36, 300), br), w: R * 2, h: R * 2, r: R, orb: 1,
    alpha: range(p, 0, .1) * lerp(.22, 1, br) };
  if (br > 0) { const s = lerp(1, .38, br); finG.w *= s; finG.h *= s; finG.r *= s; }
}

/* =========================================================
   SERVICES, NAV, FORMULAIRE
   ========================================================= */
const svcRows = $$('.svc-row');
function updateServices() {
  let best = null, bd = 1e9;
  svcRows.forEach(row => {
    const r = row.getBoundingClientRect();
    const d = Math.abs(r.top + r.height / 2 - vh * .5);
    if (r.bottom > 0 && r.top < vh && d < bd) { bd = d; best = row; }
  });
  svcRows.forEach(row => row.classList.toggle('is-open', row === best && bd < vh * .25));
}

const nav = $('#nav'), navLinks = $$('.nav-links a'), stickyCta = $('#stickyCta'), contact = $('#contact');
const navSecs = navLinks.map(a => $(a.getAttribute('href')));
function updateNav() {
  nav.classList.toggle('is-solid', scrollY > 40);
  let cur = -1;
  navSecs.forEach((s, i) => { const r = s.getBoundingClientRect(); if (r.top < vh * .4 && r.bottom > vh * .4) cur = i; });
  navLinks.forEach((a, i) => a.classList.toggle('is-on', i === cur));
  const cr = contact.getBoundingClientRect();
  stickyCta.classList.toggle('is-on', journey.getBoundingClientRect().bottom < vh * .5 && cr.top > vh * .6);
}
const burger = $('#burger'), menu = $('#mobileMenu');
burger.addEventListener('click', () => {
  const o = menu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', o);
});
$$('a', menu).forEach(a => a.addEventListener('click', () => { menu.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }));

/* choix du formulaire */
$$('.choices').forEach(group => {
  const multi = group.hasAttribute('data-multi');
  $$('button', group).forEach(b => b.addEventListener('click', () => {
    if (multi) b.classList.toggle('is-on');
    else { $$('button', group).forEach(x => x.classList.remove('is-on')); b.classList.add('is-on'); }
  }));
});
/* un lien « Je veux une application » présélectionne le bon type */
$$('[data-type]').forEach(a => a.addEventListener('click', () => {
  $$('#ptypes button').forEach(b => b.classList.toggle('is-on', b.textContent === a.dataset.type));
}));

const form = $('#form'), formError = $('#formError'), formNote = $('#formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  const req = [form.name, form.email, form.msg];
  let ok = true;
  req.forEach(f => {
    const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle('is-bad', bad);
    if (bad) ok = false;
  });
  formError.hidden = ok;
  if (!ok) return;
  const pick = id => $$(`#${id} .is-on`).map(b => b.textContent).join(', ') || 'Non précisé';
  const body = [
    'Bonjour KingDream,', '',
    `Projet : ${pick('ptypes')}`, `Budget : ${pick('pbudget')}`, `Démarrage : ${pick('pdelay')}`, '',
    form.msg.value, '',
    form.name.value, form.email.value, form.tel.value,
  ].join('\n');
  location.href = `mailto:contact@kingdream.fr?subject=${encodeURIComponent('Nouveau projet · ' + form.name.value)}&body=${encodeURIComponent(body)}`;
  formNote.textContent = 'Votre messagerie s’ouvre avec la demande prête. Vous pouvez aussi nous appeler au 06 27 20 55 97.';
});
$('#year').textContent = new Date().getFullYear();

/* =========================================================
   BOUCLE
   ========================================================= */
const t0 = performance.now();
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
  if (journeyOn && G && G.blob > .01) drawBlob(ctx, { ...G, cy: G.cy + stickyTop }, G.blob, t, boost);

  if (finG) {
    ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx2.clearRect(0, 0, vw, vh);
    drawBlob(ctx2, finG, finG.alpha, t, boost);
  }
  requestAnimationFrame(loop);
}

let rz;
addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { buildKeys(); sizeCanvas(); fitMini(); }, 120); });
addEventListener('scroll', () => { updateNav(); updateServices(); }, { passive: true });

buildKeys(); sizeCanvas(); fitMini(); updateNav(); updateServices();
requestAnimationFrame(loop);
if (document.fonts) document.fonts.ready.then(() => fitMini());
})();
