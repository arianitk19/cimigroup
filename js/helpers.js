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
  /* Shtegu i logos së një marke. Shumica janë .svg; përjashtimet listohen këtu. */
  var LOGO_EXT = { creaton: 'png' };
  function brandSlug(n) { return String(n).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function brandLogo(n) { var s = brandSlug(n); return 'assets/brands/' + s + '.' + (LOGO_EXT[s] || 'svg'); }
  var ARROW = '<svg class="btn-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  window.H = { PH: PH, esc: esc, L: L, t: t, img: img, ARROW: ARROW, brandLogo: brandLogo,
    CONTACT: { tel: '044425968', telDisplay: '044 425 968', telIntl: '+383 44 425 968', wa: '38344425968', email: 'besim.hoti@hotmail.com', address: 'Rruga Visar Hoti, Ratkoc, Kosovë' },
    WA_ICON: '<svg class="i-wa" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 1.8a8 8 0 1 1-4.1 14.9l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4Z"/><path d="M8.9 7.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3l-1.800-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1.100-.4-2.100-1.300-.8-.7-1.300-1.500-1.400-1.800-.2-.3 0-.4.1-.5l.4-.5c.1-.1.2-.3.3-.5.1-.2 0-.3 0-.5l-.8-1.900Z"/></svg>',
    waLink: function (text) { return 'https://wa.me/38344425968' + (text ? '?text=' + encodeURIComponent(text) : ''); },
    ROUTES: ['ballina', 'dyqani', 'projekte', 'materialet', 'partneret', 'terren', 'galeri', 'lokacioni', 'kontakti']
  };
})();
