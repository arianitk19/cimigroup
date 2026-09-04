/* ============================================================================
   helpers.js — Ndihmësit e përbashkët (window.H)
   ========================================================================== */
(function () {
  'use strict';
  var PH = {
    wide: 'assets/branding/placeholder-wide.svg',
    portrait: 'assets/branding/placeholder-portrait.svg',
    square: 'assets/branding/placeholder-square.svg',
    brand: 'assets/brands/brand-placeholder.svg'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Zgjedh gjuhën aktuale nga një fushë {sq,fr,de}
  function L(field) {
    if (field == null) return '';
    if (typeof field === 'string') return field;
    var lang = window.I18N ? window.I18N.lang : 'sq';
    return field[lang] != null ? field[lang] : field.sq;
  }
  function t(key) { return window.I18N ? window.I18N.t(key) : key; }

  function img(src, alt, ratio, extra) {
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" data-ph="' + esc(ratio || 'wide') + '" loading="lazy" decoding="async"' + (extra || '') + '>';
  }
  var ARROW = '<svg class="btn-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  window.H = { PH: PH, esc: esc, L: L, t: t, img: img, ARROW: ARROW,
    CONTACT: { tel: '044425968', telDisplay: '044 425 968', email: 'besim.hoti@hotmail.com', address: 'Rruga Visar Hoti, Ratkoc, Kosovë' },
    ROUTES: ['ballina', 'projekte', 'materialet', 'partneret', 'terren', 'galeri', 'lokacioni', 'kontakti']
  };
})();
