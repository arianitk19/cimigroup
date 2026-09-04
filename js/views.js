/* ============================================================================
   views.js — Ndërton pamjet e çdo faqeje (window.Views)
   ========================================================================== */
(function () {
  'use strict';
  var H = window.H, esc = H.esc, L = H.L, t = H.t, img = H.img, ARROW = H.ARROW;
  var D = window.CIMI_DATA;

  function href(route) { return '#/' + (route === 'ballina' ? '' : route); }

  /* Sfond hero minimalist i gjeneruar — skenë ndërtimi (vinç + objekt) në stil blueprint */
  var HERO_ART =
    '<svg class="hero-art-svg" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">' +
      '<g fill="none" stroke="#C3CBD4" stroke-opacity="0.22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        // objekt në ndërtim (prapa, i zbehtë)
        '<path d="M1300 760 V430 h250 V760 M1300 490 h250 M1300 550 h250 M1300 610 h250 M1300 670 h250 M1370 430 V760 M1440 430 V760 M1510 430 V760"/>' +
      '</g>' +
      '<g fill="#E66C21" fill-opacity="0.5"><rect x="1318" y="500" width="18" height="24"/><rect x="1452" y="620" width="18" height="24"/><rect x="1386" y="690" width="18" height="24"/></g>' +
      '<g fill="none" stroke="#C3CBD4" stroke-opacity="0.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
        // vija toke
        '<path d="M900 768 H1600"/>' +
        // shtylla e vinçit (mast)
        '<path d="M1150 765 V226 M1172 765 V226"/>' +
        '<path d="M1150 250 L1172 284 M1172 250 L1150 284 M1150 318 L1172 352 M1172 318 L1150 352 M1150 386 L1172 420 M1172 386 L1150 420 M1150 454 L1172 488 M1172 454 L1150 488 M1150 522 L1172 556 M1172 522 L1150 556 M1150 590 L1172 624 M1172 590 L1150 624 M1150 658 L1172 692 M1172 658 L1150 692"/>' +
        // baza
        '<path d="M1150 765 L1116 795 M1172 765 L1206 795 M1108 795 H1214"/>' +
        // maja (A-frame)
        '<path d="M1161 226 L1146 150 H1176 L1161 226"/>' +
        // kabina
        '<rect x="1176" y="232" width="46" height="38" rx="3"/>' +
        // krahu kundërpeshë (majtas)
        '<path d="M1150 224 H1006 M1150 246 H1030 M1006 224 V246 M1090 224 L1070 246 M1050 224 L1030 246"/>' +
        // kundërpesha
        '<rect x="1000" y="222" width="34" height="34" rx="2"/>' +
        // krahu i punës (djathtas) — truss
        '<path d="M1172 224 H1520 M1172 246 H1502 M1520 224 L1502 246 M1230 224 L1250 246 M1290 224 L1310 246 M1350 224 L1370 246 M1410 224 L1430 246 M1470 224 L1490 246 M1250 246 L1230 224 M1310 246 L1290 224"/>' +
        // tel-mbajtëset (pendants)
        '<path d="M1161 150 L1520 224 M1161 150 L1006 224"/>' +
        // troli + litari + grep
        '<rect x="1398" y="222" width="22" height="14"/><path d="M1409 236 V548"/><path d="M1401 548 h16"/>' +
      '</g>' +
      // ngarkesa (theks portokalli)
      '<g fill="#E66C21" fill-opacity="0.85"><rect x="1391" y="548" width="36" height="30" rx="2"/></g>' +
      '<g fill="none" stroke="#E66C21" stroke-opacity="0.5" stroke-width="2"><rect x="1000" y="222" width="34" height="34" rx="2"/></g>' +
      // stivë tubash/trarësh poshtë
      '<g fill="none" stroke="#C3CBD4" stroke-opacity="0.4" stroke-width="2.2"><rect x="996" y="748" width="120" height="12" rx="6"/><rect x="1010" y="734" width="92" height="12" rx="6"/></g>' +
      '<g fill="none" stroke="#E66C21" stroke-opacity="0.5" stroke-width="2.2"><rect x="1024" y="720" width="64" height="12" rx="6"/></g>' +
    '</svg>';

  /* ------- Reusable sections ------- */
  function hero() {
    return '<section class="hero" aria-label="Ballina">' +
      '<div class="hero-media">' +
        '<div class="hero-art">' + HERO_ART + '</div>' +
        '<div class="hero-overlay"></div><div class="hero-grid"></div>' +
      '</div>' +
      '<div class="hero-corner"></div><div class="hero-stripe"></div>' +
      '<div class="container-x hero-inner">' +
        '<p class="eyebrow" data-reveal>' + esc(t('hero.eyebrow')) + '</p>' +
        '<h1 class="hero-title" data-reveal>' + esc(t('hero.t1')) + '<br><span class="text-accent">' + esc(t('hero.accent')) + '</span></h1>' +
        '<p class="hero-sub" data-reveal>' + esc(t('hero.sub')) + '</p>' +
        '<div class="hero-cta" data-reveal><a href="' + href('projekte') + '" class="btn btn-primary" data-route="projekte">' + esc(t('cta.shiko')) + ARROW + '</a>' +
        '<a href="' + href('kontakti') + '" class="btn btn-outline" data-route="kontakti">' + esc(t('cta.nakontakto')) + '</a></div>' +
      '</div>' +
      '<a href="' + href('materialet') + '" class="hero-scroll" data-route="materialet" aria-label="Zbrit"><span class="hero-scroll-line"></span></a>' +
    '</section>';
  }

  function trust() {
    var icons = [
      'M20 6L9 17l-5-5', // check
      'M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z', // shield
      'M3 21h18M6 21V9l6-4 6 4v12', // building
      'M4 5c0 8.5 6.5 15 15 15l1.5-3.5-4-1.5-1.5 2c-2.8-1.2-5.3-3.7-6.5-6.5l2-1.5-1.5-4z' // phone
    ];
    var keys = ['a', 'b', 'c', 'd'];
    return '<section class="trust"><div class="container-x trust-grid">' +
      keys.map(function (k, i) { return '<div class="trust-item" data-reveal><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="' + icons[i] + '"/></svg>' + esc(t('trust.' + k)) + '</div>'; }).join('') +
      '</div></section>';
  }

  function about() {
    return '<section class="section about"><div class="container-x about-grid">' +
      '<div><p class="eyebrow" data-reveal>' + esc(t('about.eyebrow')) + '</p><h2 class="section-title" data-reveal>' + esc(t('about.title1')) + '<br>' + esc(t('about.title2')) + '</h2></div>' +
      '<div class="about-body" data-reveal><p class="lead-p">' + esc(t('about.lead')) + '</p><p>' + esc(t('about.p2')) + '</p>' +
      '<ul class="about-points"><li>' + esc(t('about.pt1')) + '</li><li>' + esc(t('about.pt2')) + '</li><li>' + esc(t('about.pt3')) + '</li></ul></div>' +
      '</div></section>';
  }

  function materialCard(c) {
    var items = L(c.items).map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('');
    return '<article class="material-card">' +
      '<div class="material-illus">' + window.MATERIAL_ART(c.key) + '</div>' +
      '<div class="material-body"><h3 class="material-name">' + esc(L(c.name)) + '</h3><p class="material-desc">' + esc(L(c.desc)) + '</p><ul class="material-items">' + items + '</ul></div>' +
    '</article>';
  }
  function materialsSection(limit, showCta) {
    var list = limit ? D.CATEGORIES.slice(0, limit) : D.CATEGORIES;
    return '<section class="section section--alt"><div class="container-x">' +
      '<div class="section-head"><div><p class="eyebrow" data-reveal>' + esc(t('materials.eyebrow')) + '</p><h2 class="section-title" data-reveal>' + esc(t('materials.title')) + '</h2></div><p class="section-note" data-reveal>' + esc(t('materials.note')) + '</p></div>' +
      '<div class="materials-grid reveal-stagger">' + list.map(materialCard).join('') + '</div>' +
      (showCta ? '<div style="margin-top:34px" data-reveal><a href="' + href('materialet') + '" class="btn btn-ghost" data-route="materialet">' + esc(t('materials.viewAll')) + ARROW + '</a></div>' : '') +
    '</div></section>';
  }

  function processSection() {
    return '<section class="section"><div class="container-x">' +
      '<div class="section-head"><div><p class="eyebrow" data-reveal>' + esc(t('process.eyebrow')) + '</p><h2 class="section-title" data-reveal>' + esc(t('process.title')) + '</h2></div><p class="section-note" data-reveal>' + esc(t('process.note')) + '</p></div>' +
      '<ol class="process-track">' + D.PROCESS.map(function (s) {
        return '<li class="process-step" data-reveal><span class="process-no">' + esc(s.no) + '</span><div><h3>' + esc(L(s.title)) + '</h3><p>' + esc(L(s.desc)) + '</p></div></li>';
      }).join('') + '</ol>' +
    '</div></section>';
  }

  function projectCard(p) {
    var meta = [L(p.location), p.year].filter(Boolean).join(' · ');
    var isF = !!p.featured;
    var badge = isF ? '<span class="project-card__badge"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01z"/></svg>' + esc(t('projects.featured')) + '</span>' : '';
    var vidChip = (isF && p.videos && p.videos.length) ? '<span class="project-card__vidchip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>' + esc(t('projects.hasVideo')) + '</span>' : '';
    return '<button type="button" class="project-card' + (isF ? ' project-card--featured' : '') + '" data-project-id="' + esc(p.id) + '" aria-label="' + esc(L(p.title)) + '">' +
      '<div class="project-card__media">' + img(p.image, L(p.title), isF ? 'wide' : p.ratio) + badge + '</div>' +
      '<div class="project-card__body"><span class="project-card__cat">' + esc(L(p.category)) + '</span><div class="project-card__title">' + esc(L(p.title)) + '</div>' +
      (meta ? '<div class="project-card__meta">' + esc(meta) + vidChip + '</div>' : (vidChip ? '<div class="project-card__meta">' + vidChip + '</div>' : '')) +
      '<span class="project-card__view">' + esc(t('cta.shikoProjektin')) + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div></button>';
  }
  function projectsSection(limit, showCta) {
    var list = limit ? D.PROJECTS.slice(0, limit) : D.PROJECTS;
    return '<section class="section' + (showCta ? '' : '') + '"><div class="container-x">' +
      '<div class="section-head"><div><p class="eyebrow" data-reveal>' + esc(t('projects.eyebrow')) + '</p><h2 class="section-title" data-reveal>' + esc(t('projects.title')) + '</h2></div><p class="section-note" data-reveal>' + esc(t('projects.note')) + '</p></div>' +
      '<div class="projects-grid reveal-stagger">' + list.map(projectCard).join('') + '</div>' +
      (showCta ? '<div style="margin-top:34px" data-reveal><a href="' + href('projekte') + '" class="btn btn-ghost" data-route="projekte">' + esc(t('projects.viewAll')) + ARROW + '</a></div>' : '') +
    '</div></section>';
  }

  function gewissFeature() {
    return '<article class="partner-feature" data-reveal>' +
      '<div class="partner-feature-media">' + img('assets/brands/gewiss.svg', 'GEWISS', 'brand', ' class="partner-feature-logo"') + '</div>' +
      '<div class="partner-feature-body"><p class="eyebrow">' + esc(t('partners.gewissKicker')) + '</p><h3 class="partner-feature-title">GEWISS</h3><p class="partner-feature-tag">' + esc(t('partners.gewissTag')) + '</p><p>' + esc(t('partners.gewissDesc')) + '</p></div>' +
    '</article>';
  }
  function brandSlug(n) { return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function brandGroups() {
    return D.BRAND_GROUPS.map(function (grp) {
      var chips = grp.brands.map(function (b) { return '<div class="brand-chip' + (b.featured ? ' is-featured' : '') + '"><img class="brand-logo-img" src="assets/brands/' + brandSlug(b.name) + '.svg" alt="' + esc(b.name) + '" data-ph="brand" loading="lazy"></div>'; }).join('');
      return '<div class="brand-group" data-reveal>' +
        '<div class="brand-group__head"><span class="brand-group__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="' + grp.icon + '"/></svg></span>' +
        '<div><h3 class="brand-group__title">' + esc(L(grp.title)) + '</h3><p class="brand-group__sub">' + esc(L(grp.sub)) + '</p></div></div>' +
        '<div class="brand-grid reveal-stagger">' + chips + '</div></div>';
    }).join('');
  }
  function partnersSection(preview) {
    return '<section class="section"><div class="container-x">' +
      '<div class="section-head"><div><p class="eyebrow" data-reveal>' + esc(t('partners.eyebrow')) + '</p><h2 class="section-title" data-reveal>' + esc(t('partners.title')) + '</h2></div><p class="section-note" data-reveal>' + esc(t('partners.note')) + '</p></div>' +
      gewissFeature() +
      (preview
        ? '<div style="margin-top:8px" data-reveal><a href="' + href('partneret') + '" class="btn btn-ghost" data-route="partneret">' + esc(t('partners.viewAll')) + ARROW + '</a></div>'
        : brandGroups() + '<p class="brand-note" data-reveal>' + esc(t('partners.disclaimer')) + '</p>') +
    '</div></section>';
  }

  function fieldSection(showCta) {
    return '<section class="section section--alt"><div class="container-x">' +
      '<div class="section-head"><div><p class="eyebrow" data-reveal>' + esc(t('field.eyebrow')) + '</p><h2 class="section-title" data-reveal>' + esc(t('field.title')) + '</h2></div><p class="section-note" data-reveal>' + esc(t('field.note')) + '</p></div>' +
      '<div class="field-grid">' + D.FIELD.map(function (f, i) {
        return '<figure class="field-item size-' + esc(f.size) + '" data-reveal data-field-index="' + i + '" tabindex="0" role="button" aria-label="' + esc(L(f.caption)) + '">' + img(f.image, L(f.caption), f.ratio) + '<figcaption class="field-cap">' + esc(L(f.caption)) + '</figcaption></figure>';
      }).join('') + '</div>' +
      (showCta ? '<div style="margin-top:34px" data-reveal><a href="' + href('terren') + '" class="btn btn-ghost" data-route="terren">' + esc(t('field.viewAll')) + ARROW + '</a></div>' : '') +
    '</div></section>';
  }

  function gallerySection() {
    var cats = [{ id: 'all', k: 'f_all' }, { id: 'projekte', k: 'f_projekte' }, { id: 'terren', k: 'f_terren' }, { id: 'materiale', k: 'f_materiale' }, { id: 'produkte', k: 'f_produkte' }];
    var filters = cats.map(function (c, i) { return '<button type="button" class="gallery-filter' + (i === 0 ? ' is-active' : '') + '" data-filter="' + c.id + '">' + esc(t('gallery.' + c.k)) + '</button>'; }).join('');
    var items = D.GALLERY.map(function (g, i) {
      return '<button type="button" class="gallery-item" data-gallery-index="' + i + '" data-cat="' + esc(g.cat) + '" aria-label="' + esc(L(g.caption)) + '">' + img(g.image, L(g.caption), g.ratio) + '<span class="gallery-item__cap">' + esc(L(g.caption)) + '</span></button>';
    }).join('');
    return '<section class="section"><div class="container-x">' +
      '<div class="section-head"><div class="gallery-filters" data-gallery-filters role="tablist">' + filters + '</div></div>' +
      '<div class="gallery-grid" data-gallery>' + items + '</div>' +
    '</div></section>';
  }

  function locationSection() {
    var q = 'https://maps.app.goo.gl/Mya1HP1UUDJu8RuZ9';
    return '<section class="section"><div class="container-x location-grid">' +
      '<div><p class="eyebrow" data-reveal>' + esc(t('location.eyebrow')) + '</p><h2 class="section-title" data-reveal>' + esc(t('location.title')) + '</h2>' +
      '<div class="location-card" data-reveal><div class="loc-row"><span class="loc-label">' + esc(t('location.adresa')) + '</span><span class="loc-value">' + H.CONTACT.address + '</span></div>' +
      '<a class="btn btn-primary btn-block" target="_blank" rel="noopener" href="' + q + '">' + esc(t('location.maps')) + '<svg class="btn-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg></a></div>' +
      '<div class="location-help" data-reveal><h3 class="loc-help-title">' + esc(t('location.how')) + '</h3><p>' + esc(t('location.howText')) + '</p></div></div>' +
      '<div class="location-map" data-reveal data-map data-map-src="https://www.openstreetmap.org/export/embed.html?bbox=20.5323%2C42.3966%2C20.5424%2C42.4036&layer=mapnik&marker=42.4000761%2C20.5373489">' +
        '<div class="location-map-fallback"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/></svg><span>Ratkoc, Kosovë</span></div>' +
      '</div>' +
    '</div></section>';
  }

  function contactSection() {
    return '<section class="section"><div class="container-x contact-grid">' +
      '<div><p class="eyebrow" data-reveal>' + esc(t('contact.eyebrow')) + '</p><h2 class="section-title" data-reveal>' + esc(t('contact.title1')) + '<br>' + esc(t('contact.title2')) + '</h2>' +
      '<p class="contact-intro" data-reveal>' + esc(t('contact.intro')) + '</p>' +
      '<div class="contact-cards" data-reveal>' +
        '<a href="tel:' + H.CONTACT.tel + '" class="contact-card"><span class="cc-label">' + esc(t('contact.telefon')) + '</span><span class="cc-value">' + H.CONTACT.telDisplay + '</span><span class="cc-cta">' + esc(t('contact.telHint')) + '</span></a>' +
        '<a href="mailto:' + H.CONTACT.email + '" class="contact-card"><span class="cc-label">' + esc(t('contact.email')) + '</span><span class="cc-value cc-value--sm">' + H.CONTACT.email + '</span><span class="cc-cta">' + esc(t('contact.emailHint')) + '</span></a>' +
        '<div class="contact-card contact-card--static"><span class="cc-label">' + esc(t('contact.adresa')) + '</span><span class="cc-value cc-value--sm">' + H.CONTACT.address + '</span></div>' +
      '</div></div>' +
      contactForm() +
    '</div></section>';
  }
  function opt(k) { return '<option>' + esc(t('form.' + k)) + '</option>'; }
  function contactForm() {
    return '<form class="contact-form" data-contact-form novalidate>' +
      '<div class="cf-row"><div class="cf-field"><label for="cf-emri">' + esc(t('form.emri')) + '</label><input id="cf-emri" name="emri" type="text" autocomplete="given-name" required></div>' +
      '<div class="cf-field"><label for="cf-mbiemri">' + esc(t('form.mbiemri')) + '</label><input id="cf-mbiemri" name="mbiemri" type="text" autocomplete="family-name" required></div></div>' +
      '<div class="cf-row"><div class="cf-field"><label for="cf-telefoni">' + esc(t('form.telefoni')) + '</label><input id="cf-telefoni" name="telefoni" type="tel" autocomplete="tel" inputmode="tel"></div>' +
      '<div class="cf-field"><label for="cf-email">' + esc(t('form.email')) + '</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div></div>' +
      '<div class="cf-field"><label for="cf-lloji">' + esc(t('form.lloji')) + '</label><select id="cf-lloji" name="lloji"><option value="">' + esc(t('form.zgjidhni')) + '</option>' + opt('o_ndertim') + opt('o_renovim') + opt('o_furnizim') + opt('o_elektrik') + opt('o_sanitar') + opt('o_tjeter') + '</select></div>' +
      '<div class="cf-field"><label for="cf-mesazhi">' + esc(t('form.mesazhi')) + '</label><textarea id="cf-mesazhi" name="mesazhi" rows="4" required></textarea></div>' +
      '<button type="submit" class="btn btn-primary btn-block">' + esc(t('form.dergo')) + ARROW + '</button>' +
      '<p class="cf-note" data-cf-note>' + esc(t('form.note')) + '</p>' +
    '</form>';
  }

  function finalCta() {
    return '<section class="final-cta"><div class="final-corner"></div><div class="final-grid"></div><div class="container-x final-inner">' +
      '<h2 class="final-title" data-reveal>' + esc(t('final.title1')) + '<br>' + esc(t('final.title2')) + '</h2>' +
      '<p class="final-sub" data-reveal>' + esc(t('final.sub')) + '</p>' +
      '<div class="final-cta-row" data-reveal><a href="' + href('kontakti') + '" class="btn btn-primary btn-lg" data-route="kontakti">' + esc(t('cta.nakontakto')) + ARROW + '</a><a href="' + href('projekte') + '" class="btn btn-outline btn-lg" data-route="projekte">' + esc(t('cta.shiko')) + '</a></div>' +
    '</div></section>';
  }

  function pageHeader(route, eyebrowKey, introKey) {
    return '<section class="page-header"><div class="container-x">' +
      '<div class="breadcrumb"><a href="#/" data-route="ballina">' + esc(t('nav.ballina')) + '</a><span>/</span><span>' + esc(t('nav.' + route)) + '</span></div>' +
      '<p class="eyebrow" data-reveal>' + esc(t(eyebrowKey)) + '</p>' +
      '<h1 class="page-title" data-reveal>' + esc(t('nav.' + route)) + '</h1>' +
      '<p class="page-intro" data-reveal>' + esc(t(introKey)) + '</p>' +
    '</div></section>';
  }

  /* ------- VIEWS ------- */
  var Views = {
    ballina: function () { return hero() + trust() + about() + materialsSection(6, true) + processSection() + projectsSection(3, true) + partnersSection(true) + fieldSection(true) + finalCta(); },
    projekte: function () { return pageHeader('projekte', 'projects.eyebrow', 'projects.note') + projectsSection(0, false) + finalCta(); },
    materialet: function () { return pageHeader('materialet', 'materials.eyebrow', 'materials.note') + materialsSection(0, false) + processSection() + finalCta(); },
    partneret: function () { return pageHeader('partneret', 'partners.eyebrow', 'partners.note') + partnersSection(false) + finalCta(); },
    terren: function () { return pageHeader('terren', 'field.eyebrow', 'field.note') + fieldSection(false) + finalCta(); },
    galeri: function () { return pageHeader('galeri', 'gallery.eyebrow', 'gallery.note') + gallerySection(); },
    lokacioni: function () { return pageHeader('lokacioni', 'location.eyebrow', 'location.note') + locationSection() + contactSection(); },
    kontakti: function () { return pageHeader('kontakti', 'contact.eyebrow', 'contact.intro') + contactSection() + locationSection(); }
  };

  window.Views = Views;
})();
