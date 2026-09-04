/* ============================================================================
   interactions.js — Lightbox, Project overlay, Filtra, Formë, Reveal, Harta
   (delegim global + afterRender për çdo pamje)   window.FX
   ========================================================================== */
(function () {
  'use strict';
  var H = window.H, esc = H.esc, L = H.L, t = H.t, PH = H.PH, D = window.CIMI_DATA;

  /* ------------------------- LIGHTBOX ------------------------- */
  var lb = document.querySelector('[data-lightbox]');
  var lbImg = lb.querySelector('[data-lb-img]');
  var lbCap = lb.querySelector('[data-lb-caption]');
  var lbCounter = lb.querySelector('[data-lb-counter]');
  var items = [], index = 0, lastFocus = null;

  function show(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    var it = items[index];
    lbImg.src = it.src; lbImg.alt = it.caption || '';
    lbImg.onerror = function () { lbImg.onerror = null; lbImg.src = PH[it.ratio] || PH.wide; };
    lbCap.textContent = it.caption || '';
    lbCounter.textContent = items.length > 1 ? (index + 1) + ' / ' + items.length : '';
    lb.querySelectorAll('.lb-nav').forEach(function (n) { n.style.display = items.length > 1 ? '' : 'none'; });
  }
  function openLB(list, i) {
    if (!list || !list.length) return;
    items = list; lastFocus = document.activeElement; lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add('is-open'); });
    document.body.classList.add('no-scroll'); show(i || 0);
    lb.querySelector('[data-lb-close]').focus();
  }
  function closeLB() {
    lb.classList.remove('is-open'); document.body.classList.remove('no-scroll');
    setTimeout(function () { lb.hidden = true; lbImg.src = ''; }, 260);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  lb.querySelector('[data-lb-close]').addEventListener('click', closeLB);
  lb.querySelector('[data-lb-prev]').addEventListener('click', function () { show(index - 1); });
  lb.querySelector('[data-lb-next]').addEventListener('click', function () { show(index + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLB(); });
  (function () { var sx = 0, sy = 0;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1)); }, { passive: true });
  })();

  /* ------------------------- PROJECT OVERLAY ------------------------- */
  var ov = document.querySelector('[data-project-overlay]');
  var ovContent = ov.querySelector('[data-project-content]');
  var ovFocus = null;
  function renderProject(p) {
    var meta = [];
    if (L(p.category)) meta.push('<span><b>' + esc(t('project.kategoria')) + '</b> ' + esc(L(p.category)) + '</span>');
    if (L(p.location)) meta.push('<span><b>' + esc(t('project.lokacioni')) + '</b> ' + esc(L(p.location)) + '</span>');
    if (p.year) meta.push('<span><b>' + esc(t('project.viti')) + '</b> ' + esc(p.year) + '</span>');
    var mats = (L(p.materials) && L(p.materials).length) ? '<p class="panel-section-label">' + esc(t('project.materialet')) + '</p><div class="panel-materials">' + L(p.materials).map(function (m) { return '<span class="panel-chip">' + esc(m) + '</span>'; }).join('') + '</div>' : '';
    var gal = (p.gallery && p.gallery.length) ? '<p class="panel-section-label">' + esc(t('project.galeria')) + '</p><div class="panel-gallery" data-panel-gallery>' + p.gallery.map(function (g) { return H.img(g, L(p.title), 'wide'); }).join('') + '</div>' : '';
    var vids = (p.videos && p.videos.length) ? '<div class="panel-videos" data-panel-videos hidden><p class="panel-section-label">' + esc(t('project.video')) + '</p><div class="panel-video-grid">' + p.videos.map(function (v) { return '<video class="panel-video" controls preload="metadata" playsinline data-panel-video><source src="' + esc(v) + '" type="video/mp4"></video>'; }).join('') + '</div></div>' : '';
    ovContent.innerHTML = '<div class="panel-hero">' + H.img(p.image, L(p.title), p.ratio) + '</div><div class="panel-body"><span class="panel-cat">' + esc(L(p.category)) + '</span><h2 class="panel-title">' + esc(L(p.title)) + '</h2>' + (meta.length ? '<div class="panel-meta">' + meta.join('') + '</div>' : '') + '<p class="panel-desc">' + esc(L(p.description) || L(p.excerpt)) + '</p>' + mats + vids + gal + '</div>';
  }
  // Shfaq seksionin e videos vetëm nëse të paktën një video ngarkohet (përndryshe qëndron i fshehur)
  function pruneVideos() {
    var box = ovContent.querySelector('[data-panel-videos]'); if (!box) return;
    var vids = Array.prototype.slice.call(box.querySelectorAll('[data-panel-video]'));
    var remaining = vids.length;
    vids.forEach(function (v) {
      v.addEventListener('loadeddata', function () { box.hidden = false; });
      v.addEventListener('error', function () { v.style.display = 'none'; if (--remaining <= 0) box.hidden = true; });
      var s = v.querySelector('source'); if (s) s.addEventListener('error', function () { v.style.display = 'none'; if (--remaining <= 0) box.hidden = true; });
    });
  }
  function openProject(p) {
    ovFocus = document.activeElement; renderProject(p); pruneVideos(); ov.hidden = false;
    requestAnimationFrame(function () { ov.classList.add('is-open'); }); document.body.classList.add('no-scroll');
    setTimeout(function () { var c = ov.querySelector('[data-project-close]'); if (c) c.focus(); }, 60);
  }
  function closeProject() {
    ov.classList.remove('is-open'); document.body.classList.remove('no-scroll');
    setTimeout(function () { ov.hidden = true; ovContent.innerHTML = ''; }, 420);
    if (ovFocus && ovFocus.focus) ovFocus.focus();
  }
  ov.querySelectorAll('[data-project-close]').forEach(function (el) { el.addEventListener('click', closeProject); });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!lb.hidden) { closeLB(); return; }
    if (!ov.hidden && ov.classList.contains('is-open')) closeProject();
  });

  /* ------------------------- GLOBAL DELEGATION ------------------------- */
  document.addEventListener('click', function (e) {
    // project card
    var pc = e.target.closest('[data-project-id]');
    if (pc) { var p = D.PROJECTS.filter(function (x) { return x.id === pc.dataset.projectId; })[0]; if (p) openProject(p); return; }
    // gallery filter
    var gf = e.target.closest('.gallery-filter');
    if (gf) {
      var wrap = gf.closest('[data-gallery-filters]');
      wrap.querySelectorAll('.gallery-filter').forEach(function (b) { b.classList.toggle('is-active', b === gf); });
      var cat = gf.dataset.filter, grid = document.querySelector('[data-gallery]');
      if (grid) grid.querySelectorAll('.gallery-item').forEach(function (it) { it.classList.toggle('is-hidden', !(cat === 'all' || it.dataset.cat === cat)); });
      return;
    }
    // gallery item
    var gi = e.target.closest('.gallery-item');
    if (gi) {
      var grid2 = gi.closest('[data-gallery]');
      var visible = Array.prototype.filter.call(grid2.querySelectorAll('.gallery-item'), function (el) { return !el.classList.contains('is-hidden'); });
      var list = visible.map(function (el) { var g = D.GALLERY[+el.dataset.galleryIndex]; return { src: g.image, caption: L(g.caption), ratio: g.ratio }; });
      openLB(list, visible.indexOf(gi)); return;
    }
    // field item
    var fi = e.target.closest('.field-item');
    if (fi) { var fl = D.FIELD.map(function (f) { return { src: f.image, caption: L(f.caption), ratio: f.ratio }; }); openLB(fl, +fi.dataset.fieldIndex); return; }
    // panel gallery image
    var pg = e.target.closest('[data-panel-gallery] img');
    if (pg) { var imgs = Array.prototype.slice.call(pg.closest('[data-panel-gallery]').querySelectorAll('img')); openLB(imgs.map(function (im) { return { src: im.currentSrc || im.src, caption: im.alt, ratio: 'wide' }; }), imgs.indexOf(pg)); return; }
  });
  // field keyboard
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('field-item')) {
      e.preventDefault(); var fi = document.activeElement; var fl = D.FIELD.map(function (f) { return { src: f.image, caption: L(f.caption), ratio: f.ratio }; }); openLB(fl, +fi.dataset.fieldIndex);
    }
  });

  /* ------------------------- CONTACT FORM ------------------------- */
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('[data-contact-form]'); if (!form) return;
    e.preventDefault();
    var f = form.elements, note = form.querySelector('[data-cf-note]');
    var emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var v = { emri: f.emri.value.trim(), mbiemri: f.mbiemri.value.trim(), telefoni: f.telefoni.value.trim(), email: f.email.value.trim(), lloji: f.lloji.value, mesazhi: f.mesazhi.value.trim() };
    var ok = true;
    [[f.emri, !v.emri], [f.mbiemri, !v.mbiemri], [f.email, !emailOK.test(v.email)], [f.mesazhi, !v.mesazhi]].forEach(function (p) { p[0].classList.toggle('is-invalid', p[1]); if (p[1]) ok = false; });
    if (!ok) { note.textContent = t('form.err'); note.classList.add('is-error'); var fb = form.querySelector('.is-invalid'); if (fb) fb.focus(); return; }
    var subject = 'Kërkesë e re — ' + v.emri + ' ' + v.mbiemri + (v.lloji ? ' · ' + v.lloji : '');
    var body = [v.emri + ' ' + v.mbiemri, v.telefoni ? 'Tel: ' + v.telefoni : null, 'Email: ' + v.email, v.lloji ? (t('form.lloji') + ': ' + v.lloji) : null, '', v.mesazhi].filter(function (l) { return l !== null; }).join('\n');
    note.classList.remove('is-error'); note.textContent = t('form.sending');
    window.location.href = 'mailto:' + H.CONTACT.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    var def = t('form.note'); setTimeout(function () { note.textContent = def; }, 4000);
  });
  document.addEventListener('input', function (e) { if (e.target.classList && e.target.classList.contains('is-invalid')) e.target.classList.remove('is-invalid'); });

  /* ------------------------- IMAGE FALLBACK ------------------------- */
  document.addEventListener('error', function (e) {
    var el = e.target; if (!(el instanceof HTMLImageElement) || el.dataset.fallbackApplied) return;
    if (el.hasAttribute('data-hero')) { el.dataset.fallbackApplied = '1'; el.style.display = 'none'; return; } // shfaqet arti i gjeneruar
    var kind = el.dataset.ph; if (!kind || !PH[kind]) return;
    el.dataset.fallbackApplied = '1'; el.classList.add('is-loaded'); el.src = PH[kind];
  }, true);
  document.addEventListener('load', function (e) { var el = e.target; if (el instanceof HTMLImageElement && el.hasAttribute('data-ph')) el.classList.add('is-loaded'); }, true);
  function markImages() {
    document.querySelectorAll('img[data-ph]').forEach(function (im) {
      if (im.complete && im.naturalWidth > 0) im.classList.add('is-loaded');
      else if (im.complete && im.naturalWidth === 0 && !im.dataset.fallbackApplied) { var k = im.dataset.ph; if (PH[k]) { im.dataset.fallbackApplied = '1'; im.classList.add('is-loaded'); im.src = PH[k]; } }
    });
  }

  /* ------------------------- REVEAL ------------------------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = (!reduce && 'IntersectionObserver' in window) ? new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); obs.unobserve(en.target); } });
  }, { rootMargin: '0px 0px 0px 0px', threshold: 0.01 }) : null;
  function observeReveals() {
    var els = document.querySelectorAll('[data-reveal]:not(.is-visible), .reveal-stagger:not(.is-visible)');
    if (!io) { els.forEach(function (el) { el.classList.add('is-visible'); }); return; }
    var vh = window.innerHeight || 800;
    els.forEach(function (el) {
      // Shfaq menjëherë çka është brenda ekranit (pa vonesë/ngecje); vëzhgo pjesën tjetër.
      if (el.getBoundingClientRect().top < vh * 0.96) el.classList.add('is-visible');
      else io.observe(el);
    });
  }

  /* ------------------------- MAP ------------------------- */
  function initMap() {
    var box = document.querySelector('[data-map]'); if (!box || !box.dataset.mapSrc || box.querySelector('iframe')) return;
    var probe = new Image(), done = false;
    var to = setTimeout(function () { done = true; }, 4500);
    probe.onload = function () { if (done) return; done = true; clearTimeout(to);
      var f = document.createElement('iframe'); f.title = 'Ratkoc, Kosovë'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
      f.addEventListener('load', function () { f.classList.add('is-loaded'); }); f.src = box.dataset.mapSrc; box.appendChild(f);
    };
    probe.onerror = function () { done = true; clearTimeout(to); };
    probe.src = 'https://www.openstreetmap.org/favicon.ico?_=' + Date.now();
  }

  /* ------------------------- FAB ------------------------- */
  var fab = document.querySelector('[data-fab]');
  var fabObs = null;
  function initFab(route) {
    if (!fab) return;
    var lbl = fab.querySelector('[data-fab-label]'); if (lbl) lbl.textContent = t('cta.telefono');
    if (fabObs) { fabObs.disconnect(); fabObs = null; }
    if (route === 'ballina') {
      fab.classList.remove('is-visible');
      var heroEl = document.querySelector('.hero');
      if (heroEl && 'IntersectionObserver' in window) { fabObs = new IntersectionObserver(function (en) { en.forEach(function (x) { fab.classList.toggle('is-visible', !x.isIntersecting); }); }, { threshold: .1 }); fabObs.observe(heroEl); }
    } else { fab.classList.add('is-visible'); }
  }

  /* ------------------------- SCROLL TO TOP ------------------------- */
  var toTop = document.querySelector('[data-scroll-top]');
  if (toTop) {
    var onScrollTop = function () { toTop.classList.toggle('is-visible', window.scrollY > 480); };
    window.addEventListener('scroll', onScrollTop, { passive: true });
    onScrollTop();
    toTop.addEventListener('click', function () {
      var behavior = reduce ? 'auto' : 'smooth';
      try { window.scrollTo({ top: 0, left: 0, behavior: behavior }); } catch (e) { window.scrollTo(0, 0); }
    });
  }

  window.FX = {
    afterRender: function (route) { markImages(); observeReveals(); initMap(); initFab(route); if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 480); },
    closeProject: closeProject
  };
})();
