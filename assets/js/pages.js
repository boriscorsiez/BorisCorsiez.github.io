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
  /* ribbons run on the compositor; scrolling only speeds them up, off-screen ones are paused */
  if (bts.length && !reduce && bts[0].animate) {
    var BASE = 30, anims = [], vel = 0, lastY = scrollY, vRaf = 0;
    var build = function () {
      anims.forEach(function (a) { a.cancel(); });
      anims = bts.map(function (bt) {
        var w = bt.scrollWidth / 3, d = +bt.dataset.s;
        var kf = d > 0 ? [{ transform: 'translate3d(0,0,0)' }, { transform: 'translate3d(' + (-w) + 'px,0,0)' }] : [{ transform: 'translate3d(' + (-w) + 'px,0,0)' }, { transform: 'translate3d(0,0,0)' }];
        return bt.animate(kf, { duration: w / BASE * 1000, iterations: Infinity, easing: 'linear' });
      });
    };
    var setRate = function (r) { anims.forEach(function (a) { if (Math.abs(a.playbackRate - r) > .02) { if (a.updatePlaybackRate) a.updatePlaybackRate(r); else a.playbackRate = r; } }); };
    var velLoop = function () {
      var dy = scrollY - lastY; lastY = scrollY; vel = vel * .9 + dy * .1;
      setRate(1 + Math.abs(vel) * 1.4);
      if (Math.abs(vel) > .02 || dy) vRaf = requestAnimationFrame(velLoop); else { vRaf = 0; vel = 0; setRate(1); }
    };
    build();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    var rb; addEventListener('resize', function () { clearTimeout(rb); rb = setTimeout(build, 150); });
    addEventListener('scroll', function () { if (!vRaf) vRaf = requestAnimationFrame(velLoop); }, { passive: true });
    if ('IntersectionObserver' in window) {
      var bio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var i = bts.indexOf(e.target.querySelector('.bt'));
          e.target.classList.toggle('off', !e.isIntersecting);
          if (anims[i]) { if (e.isIntersecting) anims[i].play(); else anims[i].pause(); }
        });
      }, { rootMargin: '100px 0px' });
      bts.forEach(function (bt) { bio.observe(bt.parentNode); });
    }
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
