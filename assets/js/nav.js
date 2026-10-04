(function () {
  var nav = document.getElementById('nav'), btn = document.getElementById('ddBtn'), scrim = document.getElementById('ddScrim'), menuBtn = document.getElementById('menuBtn');
  if (!nav) return;
  var hoverT = null, fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function setDD(o) {
    nav.classList.toggle('dd-open', o); if (scrim) scrim.classList.toggle('on', o);
    if (btn) btn.setAttribute('aria-expanded', o ? 'true' : 'false');
  }
  if (btn) {
    btn.addEventListener('click', function (e) { e.stopPropagation(); setDD(!nav.classList.contains('dd-open')); });
    if (fine) {
      var zone = [btn, document.getElementById('ddPanel')];
      zone.forEach(function (z) {
        z.addEventListener('mouseenter', function () { clearTimeout(hoverT); hoverT = setTimeout(function () { setDD(true); }, 90); });
        z.addEventListener('mouseleave', function () { clearTimeout(hoverT); hoverT = setTimeout(function () { setDD(false); }, 220); });
      });
    }
  }
  if (scrim) scrim.addEventListener('click', function () { setDD(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setDD(false); nav.classList.remove('open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); } });
  document.querySelectorAll('#ddPanel a, #navMenu a').forEach(function (a) {
    a.addEventListener('click', function () { setDD(false); nav.classList.remove('open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); });
  });
  if (menuBtn) menuBtn.addEventListener('click', function () { var o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o ? 'true' : 'false'); });
})();
