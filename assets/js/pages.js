(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  /* ribbons, same as the homepage */
  var SV = ['Sites web', 'Applications', 'SEO', 'Audit', 'Sécurité', 'Automatisation', 'Dashboards', 'Facture électronique'];
  var bts = $$('.bt');
  bts.forEach(function (bt) {
    var items = bt.dataset.t ? Array(8).fill(bt.dataset.t) : SV;
    var html = items.map(function (t) { return '<span>' + t + '</span><i>✶</i>'; }).join('');
    bt.innerHTML = html + html + html;
  });
  if (bts.length && !reduce) {
    var drift = 0, lastY = scrollY, vel = 0;
    (function tick() {
      var dy = scrollY - lastY; lastY = scrollY; vel = vel * .9 + dy * .1;
      drift += 0.5 + Math.abs(vel) * .7;
      bts.forEach(function (bt) { var w = bt.scrollWidth / 3, d = +bt.dataset.s; var x = -((drift * d % w) + w) % w; bt.style.transform = 'translate3d(' + x + 'px,0,0)'; });
      requestAnimationFrame(tick);
    })();
  }

  /* reveal on scroll */
  if (reduce || !('IntersectionObserver' in window)) return;
  var els = $$('.stage, .sec h2, .sec .p, .prose > p, .prose > ul, .card, .checks li, .steps li, .tl, .faq, .towns, .promise > div, .cta h2, .cta p, .cta .btn');
  els.forEach(function (el) {
    var sib = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.classList.add('rv');
    if (/card|checks|steps|promise|tl/.test(el.className + ' ' + el.parentNode.className)) el.style.transitionDelay = Math.min(sib, 5) * 0.07 + 's';
  });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
