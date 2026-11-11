/* ============================================================================
   chrome.js — Header, Mega-menu (full-screen), Footer + Language switcher
   (window.Chrome)
   ========================================================================== */
(function () {
  'use strict';
  var H = window.H, esc = H.esc, t = H.t, L = H.L, D = window.CIMI_DATA;
  var NAV_MAIN = ['projekte', 'materialet', 'partneret', 'terren', 'galeri', 'lokacioni'];
  var NAV_ALL = H.ROUTES;
  var LOGO = 'assets/branding/logo/logo-full.png';
  var MAPS = 'https://maps.app.goo.gl/Mya1HP1UUDJu8RuZ9';
  var CTA_MQ = '(min-width:1280px)';
  /* Foto që shfaqet në menu kur kalon mbi secilën faqe (desktop) */
  var PREVIEW = {
    ballina: 'assets/gallery/gallery-09.jpg', projekte: 'assets/projects/qtx-05.jpg', materialet: 'assets/gallery/gallery-02.jpg',
    partneret: 'assets/gallery/gallery-08.jpg', terren: 'assets/field-work/field-04.jpg', galeri: 'assets/gallery/gallery-01.jpg',
    lokacioni: 'assets/gallery/gallery-10.jpg', kontakti: 'assets/gallery/gallery-05.jpg'
  };

  function href(route) { return '#/' + (route === 'ballina' ? '' : route); }
  function pad(n) { return ('0' + n).slice(-2); }
  function chevron() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>'; }
  function globe() { return '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>'; }
  var ARROW_LG = '<svg class="ml-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var ARROW_UR = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  var root = document.documentElement;
  var header = document.getElementById('site-header');
  var menu = document.getElementById('mobile-drawer');
  var footer = document.getElementById('site-footer');
  var isOpen = false, lastFocus = null, lockTimer = null, savedY = 0, bodyLocked = false;

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
          '<a href="#/kontakti" class="btn btn-primary btn-sm header-cta" data-route="kontakti" style="display:none" data-desktop-cta>' + esc(t('nav.kontakti')) + '</a>' +
          '<button type="button" class="menu-toggle" data-menu-toggle aria-expanded="' + isOpen + '" aria-controls="mobile-drawer" aria-label="' + esc(t(isOpen ? 'menu.close' : 'menu.open')) + '">' +
            '<span class="mt-label" aria-hidden="true"><span>' + esc(t('menu.open')) + '</span><span>' + esc(t('menu.close')) + '</span></span>' +
            '<span class="mt-icon" aria-hidden="true"><i></i><i></i></span>' +
          '</button>' +
        '</div>' +
      '</div>';
    syncCta();
    bindHeader();
  }
  function syncCta() { var cta = header.querySelector('[data-desktop-cta]'); if (cta) cta.style.display = window.matchMedia(CTA_MQ).matches ? 'inline-flex' : 'none'; }

  function bindHeader() {
    var toggle = header.querySelector('[data-lang-toggle]');
    var sw = header.querySelector('[data-lang-switch]');
    toggle.addEventListener('click', function (e) { e.stopPropagation(); sw.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', sw.classList.contains('is-open')); });
    header.querySelectorAll('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () { window.I18N.set(b.dataset.lang); sw.classList.remove('is-open'); });
    });
    header.querySelector('[data-menu-toggle]').addEventListener('click', function () { if (isOpen) closeMenu(); else openMenu(); });
  }

  document.addEventListener('click', function (e) {
    var sw = header.querySelector('[data-lang-switch]');
    if (sw && sw.classList.contains('is-open') && !sw.contains(e.target)) sw.classList.remove('is-open');
  });

  function onScroll() { if (window.scrollY > 36) header.classList.add('is-scrolled'); else header.classList.remove('is-scrolled'); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', syncCta);

  /* ---------- MEGA MENU ---------- */
  function buildMenu() {
    var lang = window.I18N.lang;
    var links = NAV_ALL.map(function (r, i) {
      return '<a href="' + href(r) + '" class="mega-link" data-route="' + r + '" data-menu-close style="--i:' + i + '">' +
        '<span class="ml-no">' + pad(i + 1) + '</span>' +
        '<span class="ml-mask"><span class="ml-label">' + esc(t('nav.' + r)) + '</span></span>' +
        '<span class="ml-here">' + esc(t('menu.here')) + '</span>' + ARROW_LG + '</a>';
    }).join('');
    var previews = NAV_ALL.map(function (r) {
      return '<img src="' + PREVIEW[r] + '" alt="" data-preview="' + r + '" data-ph="wide" loading="lazy" decoding="async">';
    }).join('');
    var cats = D.CATEGORIES.map(function (c, i) {
      return '<li><a href="#/materialet" data-menu-close><span class="mc-no">' + pad(i + 1) + '</span><span class="mc-name">' + esc(L(c.name)) + '</span><span class="mc-count">' + L(c.items).length + '</span></a></li>';
    }).join('');
    var langBtns = window.I18N.langs.map(function (l) {
      return '<button type="button" data-lang="' + l.code + '" class="' + (l.code === lang ? 'is-active' : '') + '" aria-label="' + esc(l.label) + '">' + l.flag + '</button>';
    }).join('');

    menu.innerHTML =
      '<div class="mega-shutters" aria-hidden="true"><span style="--s:0"></span><span style="--s:1"></span><span style="--s:2"></span><span style="--s:3"></span></div>' +
      '<div class="mega-bg" aria-hidden="true"><span class="mega-bignum" data-bignum>01</span></div>' +
      '<div class="mega-scroll" data-mega-scroll>' +
        '<div class="container-x mega-inner">' +
          '<div class="mega-grid">' +
            '<nav class="mega-nav" aria-label="Menu"><p class="mega-label">' + esc(t('menu.nav')) + '</p>' + links + '</nav>' +
            '<div class="mega-side">' +
              '<figure class="mega-preview" aria-hidden="true">' + previews + '<figcaption class="mp-cap"><span class="mp-dot"></span><span data-preview-cap></span></figcaption></figure>' +
              '<div class="mega-cols">' +
                '<div class="mega-block"><p class="mega-label">' + esc(t('menu.cats')) + '</p><ul class="mega-cats">' + cats + '</ul></div>' +
                '<div class="mega-block">' +
                  '<p class="mega-label">' + esc(t('menu.contact')) + '</p>' +
                  '<a href="tel:' + H.CONTACT.tel + '" class="mega-tel">' + H.CONTACT.telDisplay + '</a>' +
                  '<a href="mailto:' + H.CONTACT.email + '" class="mega-mail">' + H.CONTACT.email + '</a>' +
                  '<span class="mega-addr">' + H.CONTACT.address + '</span>' +
                  '<a href="' + MAPS + '" target="_blank" rel="noopener" class="mega-maps">' + esc(t('menu.maps')) + ARROW_UR + '</a>' +
                  '<div class="mega-actions">' +
                    '<div class="mega-lang" role="group" aria-label="' + esc(t('menu.lang')) + '">' + langBtns + '</div>' +
                    '<a href="#/kontakti" class="btn btn-primary btn-sm mega-cta" data-route="kontakti" data-menu-close>' + esc(t('cta.nakontakto')) + H.ARROW + '</a>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="mega-bottom"><span>© ' + new Date().getFullYear() + ' <b>Cimi Group SA</b></span><span>' + esc(t('menu.tagline')) + '</span><span>42.4001° N · 20.5373° E</span></div>' +
        '</div>' +
      '</div>';
    setActive(window.Router && window.Router.current ? window.Router.current : 'ballina');
    showPreview(currentRoute());
  }

  function currentRoute() { return (window.Router && window.Router.current) || 'ballina'; }
  function showPreview(route) {
    var idx = NAV_ALL.indexOf(route); if (idx < 0) return;
    menu.querySelectorAll('[data-preview]').forEach(function (im) { im.classList.toggle('is-on', im.dataset.preview === route); });
    var cap = menu.querySelector('[data-preview-cap]'); if (cap) cap.textContent = t('nav.' + route);
    var big = menu.querySelector('[data-bignum]'); if (big) big.textContent = pad(idx + 1);
  }

  /* Delegim — lidhet një herë, mbijeton ri-ndërtimet e menusë */
  menu.addEventListener('click', function (e) {
    var lb = e.target.closest('[data-lang]');
    if (lb) { window.I18N.set(lb.dataset.lang); return; }
    if (e.target.closest('[data-menu-close]')) closeMenu();
  });
  menu.addEventListener('mouseover', function (e) { var a = e.target.closest('.mega-link'); if (a) showPreview(a.dataset.route); });
  menu.addEventListener('focusin', function (e) { var a = e.target.closest('.mega-link'); if (a) showPreview(a.dataset.route); });
  menu.addEventListener('mouseleave', function () { showPreview(currentRoute()); });

  /* Bllokimi i scroll-it: overflow menjëherë; body:fixed (për iOS) vetëm pasi grilat
     e kanë mbuluar ekranin — kështu asnjë "kërcim" nuk shihet. */
  function lock() {
    var sb = window.innerWidth - root.clientWidth;
    root.classList.add('drawer-lock', 'menu-open');
    if (sb > 0) { document.body.style.paddingRight = sb + 'px'; header.style.paddingRight = sb + 'px'; }
    clearTimeout(lockTimer);
    lockTimer = setTimeout(function () {
      if (!isOpen || bodyLocked) return;
      savedY = window.scrollY;
      document.body.style.position = 'fixed'; document.body.style.top = -savedY + 'px'; document.body.style.width = '100%';
      bodyLocked = true;
    }, 900);
  }
  function unlock() {
    clearTimeout(lockTimer);
    root.classList.remove('drawer-lock', 'menu-open');
    document.body.style.paddingRight = ''; header.style.paddingRight = '';
    if (bodyLocked) {
      document.body.style.position = ''; document.body.style.top = ''; document.body.style.width = '';
      window.scrollTo(0, savedY); bodyLocked = false;
    }
  }
  function syncToggle() {
    var b = header.querySelector('[data-menu-toggle]'); if (!b) return;
    b.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    b.setAttribute('aria-label', t(isOpen ? 'menu.close' : 'menu.open'));
  }
  function openMenu() {
    if (isOpen) return;
    isOpen = true; lastFocus = document.activeElement;
    var sw = header.querySelector('[data-lang-switch]'); if (sw) sw.classList.remove('is-open');
    lock();
    var sc = menu.querySelector('[data-mega-scroll]'); if (sc) sc.scrollTop = 0;
    showPreview(currentRoute());
    menu.setAttribute('aria-hidden', 'false');
    menu.classList.add('is-open');
    syncToggle();
  }
  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    unlock();
    syncToggle();
    if (lastFocus && lastFocus.focus && !menu.contains(lastFocus)) { try { lastFocus.focus({ preventScroll: true }); } catch (e) { /* noop */ } }
  }

  /* Tastiera: Escape mbyll; Tab qëndron brenda menusë */
  document.addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'Escape') { closeMenu(); var b = header.querySelector('[data-menu-toggle]'); if (b) b.focus(); return; }
    if (e.key !== 'Tab') return;
    var f = [header.querySelector('[data-menu-toggle]')].concat(Array.prototype.slice.call(menu.querySelectorAll('a[href], button')));
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

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
    document.querySelectorAll('.mega-link').forEach(function (l) {
      var on = l.dataset.route === route;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
    });
  }

  window.Chrome = {
    build: function () { buildHeader(); buildMenu(); buildFooter(); onScroll(); },
    setActive: setActive,
    closeDrawer: closeMenu,
    openMenu: openMenu
  };
})();
