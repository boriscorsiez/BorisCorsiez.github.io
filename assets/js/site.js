/* =========================================================================
   KingDream — interactions légères
   En-tête, menu mobile, apparitions, services « immersifs », formulaire.
   ========================================================================= */
(function () {
  "use strict";

  window.KD = true;

  var d = document;
  var root = d.documentElement;
  var body = d.body;
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var desktopQuery = window.matchMedia("(min-width: 1024px)");
  var navQuery = window.matchMedia("(min-width: 900px)");

  function reduced() { return motionQuery.matches; }
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
  function scrollBehavior() { return reduced() ? "auto" : "smooth"; }

  /* ---------- Entrée de l'accueil (après chargement de la police) ---------- */
  var fontsReady = d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 700); })]).then(function () {
    requestAnimationFrame(function () { body.classList.add("is-loaded"); });
  });

  d.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- En-tête : fond au défilement, se cache en descendant ---------- */
  var header = d.querySelector(".site-header");
  var lastY = window.scrollY;

  function updateHeader(y) {
    header.classList.toggle("is-scrolled", y > 8);
    if (root.classList.contains("is-menu-open") || header.contains(d.activeElement)) {
      header.classList.remove("is-hidden");
      lastY = y;
      return;
    }
    var dy = y - lastY;
    if (Math.abs(dy) > 6) {
      header.classList.toggle("is-hidden", dy > 0 && y > 420);
      lastY = y;
    }
  }

  /* ---------- Menu mobile ---------- */
  var menuBtn = d.querySelector(".menu-toggle");
  var menu = d.getElementById("mobile-menu");
  var menuLabel = menuBtn.querySelector(".sr-only");

  function setMenu(open) {
    root.classList.toggle("is-menu-open", open);
    root.classList.toggle("is-locked", open || anyDialogOpen());
    menuBtn.setAttribute("aria-expanded", String(open));
    menuLabel.textContent = open ? "Fermer le menu" : "Menu";
    if (open) {
      menu.removeAttribute("inert");
      header.classList.remove("is-hidden");
    } else {
      menu.setAttribute("inert", "");
    }
  }
  menuBtn.addEventListener("click", function () {
    setMenu(!root.classList.contains("is-menu-open"));
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  d.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && root.classList.contains("is-menu-open")) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  navQuery.addEventListener("change", function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---------- Lien actif dans la navigation ---------- */
  var navLinks = Array.prototype.slice.call(d.querySelectorAll(".main-nav a"));
  var navSections = navLinks.map(function (a) { return d.querySelector(a.getAttribute("href")); });

  function updateNav() {
    var line = window.innerHeight * 0.4;
    var current = -1;
    navSections.forEach(function (s, i) {
      if (!s) return;
      var r = s.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) current = i;
    });
    if (window.innerHeight + window.scrollY >= d.documentElement.scrollHeight - 4) current = navSections.length - 1;
    navLinks.forEach(function (a, i) { a.classList.toggle("is-current", i === current); });
  }

  /* ---------- Apparitions au défilement ---------- */
  var revealEls = d.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduced()) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Parallaxe légère de l'accueil ---------- */
  var depthEls = Array.prototype.slice.call(d.querySelectorAll(".hero [data-depth]"));

  function updateHero(y) {
    if (reduced() || y > window.innerHeight * 1.3) return;
    depthEls.forEach(function (el) {
      el.style.setProperty("--py", (-y * parseFloat(el.getAttribute("data-depth"))).toFixed(1) + "px");
    });
  }

  /* ---------- Services : la scène suit le service affiché (ordinateur) ---------- */
  var services = Array.prototype.slice.call(d.querySelectorAll(".service"));
  var list = d.querySelector(".services__list");
  var stageEl = d.querySelector(".stage");
  var slidesWrap = d.querySelector(".stage__slides");
  var stageButtons = Array.prototype.slice.call(d.querySelectorAll(".stage__nav button"));
  var slides = [];
  var activeService = -1;
  var stageAnchor = 0;

  function buildStage() {
    if (slides.length || !slidesWrap) return;
    services.forEach(function (service) {
      var scene = service.querySelector(".scene");
      var slide = d.createElement("div");
      slide.className = "stage__slide";
      var clone = scene.cloneNode(true);
      clone.querySelectorAll("img").forEach(function (img) {
        img.setAttribute("sizes", img.closest(".phone") ? "240px" : "640px");
      });
      slide.appendChild(clone);
      slidesWrap.appendChild(slide);
      slides.push(slide);
    });
    var progress = d.createElement("span");
    progress.className = "services__progress";
    progress.setAttribute("aria-hidden", "true");
    list.insertBefore(progress, list.firstChild);
    var current = activeService;
    activeService = -1;
    setActiveService(current < 0 ? 0 : current);
  }

  function setActiveService(i) {
    if (i === activeService || i < 0) return;
    activeService = i;
    services.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
    slides.forEach(function (s, k) {
      s.classList.toggle("is-active", k === i);
      s.classList.toggle("is-before", k < i);
    });
    stageButtons.forEach(function (b, k) { b.classList.toggle("is-active", k === i); });
  }

  // Hauteur, dans la fenêtre, du centre de la scène une fois « collée » :
  // c'est à cette hauteur que le service actif doit se trouver.
  function measureStage() {
    stageAnchor = window.innerHeight / 2;
    if (stageEl && slidesWrap && desktopQuery.matches) {
      stageAnchor = parseFloat(window.getComputedStyle(stageEl).top) + slidesWrap.offsetTop + slidesWrap.offsetHeight / 2;
    }
  }

  function updateServices() {
    if (!desktopQuery.matches || !slides.length) return;
    var best = 0;
    var bestDist = Infinity;
    var rects = services.map(function (s) { return s.getBoundingClientRect(); });
    rects.forEach(function (r, k) {
      var dist = Math.abs(r.top + r.height / 2 - stageAnchor);
      if (dist < bestDist) { bestDist = dist; best = k; }
    });
    setActiveService(best);
    var start = rects[0].top + rects[0].height / 2;
    var last = rects[rects.length - 1];
    var end = last.top + last.height / 2;
    list.style.setProperty("--progress", clamp((stageAnchor - start) / (end - start), 0, 1).toFixed(4));
  }

  function scrollToService(index) {
    var target = services[index];
    if (!target) return;
    measureStage();
    var r = target.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + r.top + r.height / 2 - stageAnchor, behavior: scrollBehavior() });
  }

  stageButtons.forEach(function (b, k) {
    b.addEventListener("click", function () { scrollToService(k); });
  });

  desktopQuery.addEventListener("change", function () {
    if (desktopQuery.matches) buildStage();
    measureStage();
    requestUpdate();
  });
  if (desktopQuery.matches) buildStage();
  measureStage();

  /* ---------- Notre objectif : les mots s'allument au défilement ---------- */
  var statement = d.querySelector("[data-words]");
  var words = [];
  if (statement && !reduced()) {
    var text = statement.textContent.trim().replace(/\s+/g, " ");
    statement.setAttribute("aria-label", text);
    statement.textContent = "";
    text.split(" ").forEach(function (w, i) {
      if (i) statement.appendChild(d.createTextNode(" "));
      var span = d.createElement("span");
      var punct = w.match(/[.,;:!?]$/);
      span.className = "w" + (/^vraiment$/i.test(w) ? " is-key" : "");
      span.setAttribute("aria-hidden", "true");
      span.textContent = punct ? w.slice(0, -1) : w;
      if (punct) {
        var mark = d.createElement("span");
        mark.className = "punct";
        mark.textContent = punct[0];
        span.appendChild(mark);
      }
      statement.appendChild(span);
      words.push(span);
    });
  }

  function updateWords() {
    if (!words.length) return;
    var r = statement.getBoundingClientRect();
    var vh = window.innerHeight;
    var start = vh * 0.9;
    var end = vh * 0.45;
    var p = clamp((start - r.top) / (start - end + r.height), 0, 1);
    var n = Math.round(p * words.length * 1.15);
    words.forEach(function (w, i) { w.classList.toggle("is-on", i < n); });
  }

  var goalPhoto = d.querySelector(".goal__photo");
  var goalImg = goalPhoto ? goalPhoto.querySelector("img") : null;

  function updateGoalPhoto() {
    if (!goalImg || reduced()) return;
    var r = goalPhoto.getBoundingClientRect();
    var vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    var p = clamp((vh - r.top) / (vh + r.height), 0, 1);
    goalImg.style.setProperty("--zoom", (1.12 - p * 0.12).toFixed(4));
  }

  /* ---------- Boucle de défilement (une mise à jour par image) ---------- */
  var ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY;
    updateHeader(y);
    updateHero(y);
    updateNav();
    updateServices();
    updateWords();
    updateGoalPhoto();
  }
  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(frame);
    }
  }
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", function () {
    measureStage();
    requestUpdate();
  });
  frame();

  /* ---------- Fenêtres (contact, informations légales) ---------- */
  var contactDialog = d.getElementById("contact-dialog");
  var legalDialog = d.getElementById("legal-dialog");
  var dialogs = [contactDialog, legalDialog];

  function anyDialogOpen() {
    return dialogs.some(function (dlg) { return dlg && dlg.open; });
  }

  function openDialog(dlg) {
    if (!dlg) return;
    if (root.classList.contains("is-menu-open")) setMenu(false);
    if (!dlg.open) {
      if (typeof dlg.showModal === "function") dlg.showModal();
      else dlg.setAttribute("open", "");
    }
    root.classList.add("is-locked");
  }

  function closeDialog(dlg) {
    if (!dlg || !dlg.open || dlg.classList.contains("is-closing")) return;
    if (reduced() || typeof dlg.close !== "function") {
      finishClose(dlg);
      return;
    }
    dlg.classList.add("is-closing");
    var timer = setTimeout(function () { finishClose(dlg); }, 400);
    dlg.addEventListener("animationend", function onEnd(e) {
      if (e.target !== dlg) return;
      dlg.removeEventListener("animationend", onEnd);
      clearTimeout(timer);
      finishClose(dlg);
    });
  }

  function finishClose(dlg) {
    dlg.classList.remove("is-closing");
    if (typeof dlg.close === "function") {
      if (dlg.open) dlg.close();
    } else {
      dlg.removeAttribute("open");
      dlg.dispatchEvent(new Event("close"));
    }
  }

  dialogs.forEach(function (dlg) {
    if (!dlg) return;
    var downOnBackdrop = false;
    dlg.addEventListener("pointerdown", function (e) { downOnBackdrop = e.target === dlg; });
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg && downOnBackdrop) closeDialog(dlg);
    });
    dlg.addEventListener("cancel", function (e) {
      e.preventDefault();
      closeDialog(dlg);
    });
    dlg.addEventListener("close", function () {
      if (!anyDialogOpen() && !root.classList.contains("is-menu-open")) root.classList.remove("is-locked");
    });
  });

  function openLegal(sectionId) {
    openDialog(legalDialog);
    var section = sectionId ? d.getElementById(sectionId) : null;
    legalDialog.scrollTop = 0;
    if (section && section.id !== "legal-mentions") {
      legalDialog.scrollTop = section.getBoundingClientRect().top - legalDialog.getBoundingClientRect().top - 12;
    }
  }

  /* ---------- Clics délégués ---------- */
  d.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-open]");
    if (opener) {
      e.preventDefault();
      if (opener.getAttribute("data-open") === "contact") openContact();
      return;
    }
    var legal = e.target.closest("[data-legal]");
    if (legal) {
      e.preventDefault();
      openLegal(legal.getAttribute("data-legal"));
      return;
    }
    var closer = e.target.closest("[data-close]");
    if (closer) {
      e.preventDefault();
      closeDialog(closer.closest("dialog"));
      return;
    }
    var serviceLink = e.target.closest('a[href^="#service-"]');
    if (serviceLink && desktopQuery.matches) {
      var index = services.indexOf(d.querySelector(serviceLink.getAttribute("href")));
      if (index > -1) {
        e.preventDefault();
        scrollToService(index);
      }
    }
  });

  /* ---------- Formulaire de contact ---------- */
  var form = d.getElementById("contact-form");
  var formView = contactDialog.querySelector(".contact-form-view");
  var successView = contactDialog.querySelector(".contact-success");
  var statusEl = form.querySelector(".form__status");
  var submitBtn = form.querySelector('[type="submit"]');
  var submitLabel = submitBtn.firstChild.textContent;

  // Même service d'envoi que l'ancien site (EmailJS), appelé directement.
  var EMAILJS = {
    url: "https://api.emailjs.com/api/v1.0/email/send",
    service: "service_hoelqns",
    template: "template_3s8lpo4",
    publicKey: "rKyne3AoYIx6m0qUs"
  };

  var rules = {
    name: function (v) { return v.trim().length > 1; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
    message: function (v) { return v.trim().length > 2; }
  };

  function setFieldState(input, valid) {
    var field = input.closest(".field");
    var error = field.querySelector(".field__error");
    field.classList.toggle("is-invalid", !valid);
    input.setAttribute("aria-invalid", String(!valid));
    if (error && error.id) {
      if (valid) input.removeAttribute("aria-describedby");
      else input.setAttribute("aria-describedby", error.id);
    }
  }

  function validate() {
    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      var valid = rules[name](input.value);
      setFieldState(input, valid);
      if (!valid && !firstInvalid) firstInvalid = input;
    });
    var consent = form.elements.consent;
    setFieldState(consent, consent.checked);
    if (!consent.checked && !firstInvalid) firstInvalid = consent;
    return firstInvalid;
  }

  form.addEventListener("input", function (e) {
    var input = e.target;
    var field = input.closest(".field");
    if (!field || !field.classList.contains("is-invalid")) return;
    if (rules[input.name]) setFieldState(input, rules[input.name](input.value));
    else if (input.name === "consent") setFieldState(input, input.checked);
  });

  function showSuccess() {
    formView.hidden = true;
    successView.hidden = false;
    successView.querySelector(".dialog__title").focus();
  }

  function openContact() {
    if (!successView.hidden) {
      successView.hidden = true;
      formView.hidden = false;
    }
    openDialog(contactDialog);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statusEl.textContent = "";
    statusEl.className = "form__status";

    var firstInvalid = validate();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    // Champ piège anti-robots : rempli = on ne transmet rien.
    if (form.elements.website.value) {
      showSuccess();
      return;
    }

    var needs = Array.prototype.slice.call(form.querySelectorAll('input[name="needs"]:checked'))
      .map(function (input) { return input.value; });
    var phone = form.elements.phone.value.trim();
    var email = form.elements.email.value.trim();
    var params = {
      from_name: form.elements.name.value.trim(),
      from_email: email,
      reply_to: email,
      phone: phone || "Non renseigné",
      project: needs.length ? needs.join(", ") : "Non précisé",
      message: form.elements.message.value.trim() + (phone ? "\n\nTéléphone : " + phone : "")
    };

    submitBtn.disabled = true;
    submitBtn.firstChild.textContent = "Envoi en cours… ";

    fetch(EMAILJS.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS.service,
        template_id: EMAILJS.template,
        user_id: EMAILJS.publicKey,
        template_params: params
      })
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.reset();
      showSuccess();
    }).catch(function () {
      statusEl.className = "form__status is-error";
      statusEl.innerHTML = "L’envoi n’a pas fonctionné. Écrivez-nous à <a href=\"mailto:contact@kingdream.fr\">contact@kingdream.fr</a> ou appelez le <a href=\"tel:+33627205597\">06&nbsp;27&nbsp;20&nbsp;55&nbsp;97</a>.";
    }).then(function () {
      submitBtn.disabled = false;
      submitBtn.firstChild.textContent = submitLabel;
    });
  });
})();
