/* ============================================================================
   chrome.js — Header, Drawer, Footer + Language switcher + menu (window.Chrome)
   ========================================================================== */
(function () {
  'use strict';
  var H = window.H, esc = H.esc, t = H.t;
  var NAV_MAIN = ['projekte', 'materialet', 'partneret', 'terren', 'galeri', 'lokacioni'];
  var NAV_ALL = H.ROUTES;
  var LOGO = 'assets/branding/logo/logo-full.png';

  function href(route) { return '#/' + (route === 'ballina' ? '' : route); }
  function chevron() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>'; }
  function globe() { return '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>'; }

  var header = document.getElementById('site-header');
  var drawer = document.getElementById('mobile-drawer');
  var backdrop = document.querySelector('[data-drawer-backdrop]');
  var footer = document.getElementById('site-footer');
  var scrollY = 0;

  /* ---------- HEADER ---------- */
  function buildHeader() {
    var lang = window.I18N.lang;
    var nav = NAV_MAIN.map(function (r) {
      return '<a href="' + href(r) + '" class="nav-link" data-route="' + r + '">' + esc(t('nav.' + r)) + '</a>';
    }).join('');
    var langOpts = window.I18N.langs.map(function (l) {
      return '<button type="button" class="lang-option' + (l.code === lang ? ' is-active' : '') + '" data-lang="' + l.code + '"><span class="lang-flag">' + l.flag + '</span>' + esc(l.label) + '</button>';
    }).join('');
    var curr = window.I18N.langs.filter(function (l) { return l.code === lang; })[0];
    header.innerHTML =
      '<div class="container-x">' +
        '<a href="#/" class="brand" data-route="ballina" aria-label="Cimi Group SA"><img src="' + LOGO + '" alt="Cimi Group SA" class="brand-logo"></a>' +
        '<nav class="main-nav" aria-label="Navigimi kryesor">' + nav + '</nav>' +
        '<div class="header-actions">' +
          '<div class="lang-switch" data-lang-switch>' +
            '<button type="button" class="lang-btn" data-lang-toggle aria-haspopup="true" aria-expanded="false">' + globe() + '<span>' + curr.flag + '</span>' + chevron() + '</button>' +
            '<div class="lang-menu" role="menu">' + langOpts + '</div>' +
          '</div>' +
          '<a href="#/kontakti" class="btn btn-primary btn-sm" data-route="kontakti" style="display:none" data-desktop-cta>' + esc(t('nav.kontakti')) + '</a>' +
          '<button type="button" class="menu-toggle" data-menu-open aria-label="' + esc(t('nav.kontakti')) + '" aria-expanded="false" aria-controls="mobile-drawer"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>';
    // desktop CTA visible only ≥1080 via CSS-friendly toggle
    var cta = header.querySelector('[data-desktop-cta]');
    if (window.matchMedia('(min-width:1080px)').matches) cta.style.display = 'inline-flex';
    bindHeader();
  }

  function bindHeader() {
    var toggle = header.querySelector('[data-lang-toggle]');
    var sw = header.querySelector('[data-lang-switch]');
    toggle.addEventListener('click', function (e) { e.stopPropagation(); sw.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', sw.classList.contains('is-open')); });
    header.querySelectorAll('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () { window.I18N.set(b.dataset.lang); sw.classList.remove('is-open'); });
    });
    header.querySelector('[data-menu-open]').addEventListener('click', openDrawer);
  }

  document.addEventListener('click', function (e) {
    var sw = header.querySelector('[data-lang-switch]');
    if (sw && sw.classList.contains('is-open') && !sw.contains(e.target)) sw.classList.remove('is-open');
  });

  function onScroll() { if (window.scrollY > 36) header.classList.add('is-scrolled'); else header.classList.remove('is-scrolled'); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { var cta = header.querySelector('[data-desktop-cta]'); if (cta) cta.style.display = window.matchMedia('(min-width:1080px)').matches ? 'inline-flex' : 'none'; });

  /* ---------- DRAWER ---------- */
  function buildDrawer() {
    var lang = window.I18N.lang;
    var links = NAV_ALL.map(function (r, i) {
      var n = ('0' + (i + 1)).slice(-2);
      return '<a href="' + href(r) + '" class="drawer-link" data-route="' + r + '" data-menu-close><span class="dl-no">' + n + '</span>' + esc(t('nav.' + r)) + '</a>';
    }).join('');
    var langBtns = window.I18N.langs.map(function (l) {
      return '<button type="button" data-lang="' + l.code + '" class="' + (l.code === lang ? 'is-active' : '') + '">' + l.flag + '</button>';
    }).join('');
    drawer.innerHTML =
      '<div class="drawer-top"><img src="' + LOGO + '" alt="Cimi Group SA" class="drawer-logo"><button type="button" class="drawer-close" data-menu-close aria-label="Mbyll"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<nav class="drawer-nav" aria-label="Menu">' + links + '</nav>' +
      '<div class="drawer-lang">' + langBtns + '</div>' +
      '<div class="drawer-foot"><a href="tel:' + H.CONTACT.tel + '" class="drawer-contact">' + H.CONTACT.telDisplay + '</a><a href="mailto:' + H.CONTACT.email + '" class="drawer-contact drawer-contact--muted">' + H.CONTACT.email + '</a></div>';
    drawer.querySelectorAll('[data-menu-close]').forEach(function (el) { el.addEventListener('click', closeDrawer); });
    drawer.querySelectorAll('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { window.I18N.set(b.dataset.lang); }); });
  }

  function lockScroll() { scrollY = window.scrollY; document.body.style.top = '-' + scrollY + 'px'; document.body.style.position = 'fixed'; document.body.style.width = '100%'; document.body.classList.add('no-scroll'); }
  function unlockScroll() { document.body.classList.remove('no-scroll'); document.body.style.position = ''; document.body.style.top = ''; document.body.style.width = ''; window.scrollTo(0, scrollY); }
  function openDrawer() {
    backdrop.hidden = false; requestAnimationFrame(function () { backdrop.classList.add('is-open'); });
    drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); lockScroll();
  }
  function closeDrawer() {
    drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('is-open'); setTimeout(function () { backdrop.hidden = true; }, 400); unlockScroll();
  }
  backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer(); });

  /* ---------- FOOTER ---------- */
  function buildFooter() {
    var navLinks = NAV_ALL.map(function (r) { return '<a href="' + href(r) + '" data-route="' + r + '">' + esc(t('nav.' + r)) + '</a>'; }).join('');
    footer.innerHTML =
      '<div class="container-x footer-grid">' +
        '<div class="footer-brand"><img src="' + LOGO + '" alt="Cimi Group SA" class="footer-logo"><p class="footer-desc">' + esc(t('footer.desc')) + '</p></div>' +
        '<nav class="footer-nav" aria-label="Footer"><span class="footer-nav-title">' + esc(t('footer.menu')) + '</span>' + navLinks + '</nav>' +
        '<div class="footer-contact"><span class="footer-nav-title">' + esc(t('footer.kontakti')) + '</span><a href="tel:' + H.CONTACT.tel + '">' + H.CONTACT.telDisplay + '</a><a href="mailto:' + H.CONTACT.email + '">' + H.CONTACT.email + '</a><span class="footer-addr">' + H.CONTACT.address + '</span></div>' +
      '</div>' +
      '<div class="footer-bottom"><div class="container-x footer-bottom-inner"><span>© ' + new Date().getFullYear() + ' Cimi Group SA. ' + esc(t('footer.rights')) + '</span><a href="#/" class="footer-top" data-route="ballina">↑ ' + esc(t('nav.ballina')) + '</a></div></div>';
  }

  function setActive(route) {
    document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.toggle('is-active', l.dataset.route === route); });
    document.querySelectorAll('.drawer-link').forEach(function (l) { l.classList.toggle('is-active', l.dataset.route === route); });
  }

  window.Chrome = {
    build: function () { buildHeader(); buildDrawer(); buildFooter(); onScroll(); },
    setActive: setActive,
    closeDrawer: closeDrawer
  };
})();
