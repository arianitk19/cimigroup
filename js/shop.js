/* ============================================================================
   shop.js — Dyqani: katalogu i produkteve, kërkimi, filtrat dhe lista e ofertës
   Regjistron window.Views.dyqani dhe window.Shop.
   ========================================================================== */
(function () {
  'use strict';
  var H = window.H, esc = H.esc, L = H.L, t = H.t, D = window.CIMI_DATA;
  var P = D.PRODUCTS, C = D.CATEGORIES, PHOTOS = D.PRODUCT_PHOTOS || {};
  function photo(p) { return PHOTOS[p.id] ? 'assets/products/' + PHOTOS[p.id] : ''; }

  /* ---------- Ikonat e produkteve (64×64, vijë + theks portokalli) ----------
     .a = mbushje portokalli · .as = vijë portokalli · .h = vrimë (ngjyra e sfondit) */
  var ICONS = {
    sack: '<path d="M21 17l4-6h14l4 6"/><path d="M19 17h26l-2.2 35.2A4 4 0 0 1 38.8 56H25.2a4 4 0 0 1-4-3.8z"/><path class="a" d="M19.8 28h24.4l-.6 9.5H20.4z"/><path d="M26 44h12M28 49h8"/>',
    block: '<rect x="8" y="17" width="48" height="30" rx="2.5"/><rect x="13.5" y="23" width="10" height="18" rx="1.2"/><rect class="a" x="27" y="23" width="10" height="18" rx="1.2"/><rect x="40.5" y="23" width="10" height="18" rx="1.2"/><path d="M12 53h40" opacity=".45"/>',
    chimney: '<ellipse cx="32" cy="13" rx="11" ry="4"/><path d="M21 13v37c0 2.2 4.9 4 11 4s11-1.8 11-4V13"/><path class="as" d="M21 29c0 2.2 4.9 4 11 4s11-1.8 11-4" stroke-width="3.2"/><path d="M21 42c0 2.2 4.9 4 11 4s11-1.8 11-4" opacity=".45"/>',
    chimneyHeat: '<ellipse cx="32" cy="25" rx="10" ry="3.6"/><path d="M22 25v27c0 2 4.5 3.6 10 3.6s10-1.6 10-3.6V25"/><path class="as" d="M26 17c-2.4-3 2.4-5.4 0-9M32 17c-2.4-3 2.4-5.4 0-9M38 17c-2.4-3 2.4-5.4 0-9"/><path d="M22 39c0 2 4.5 3.6 10 3.6s10-1.6 10-3.6" opacity=".45"/>',
    rebar: '<path d="M18 8v48M30 8v48" stroke-width="5"/><path class="as" d="M42 8v48" stroke-width="5"/><path d="M14 15l8-3M14 25l8-3M14 35l8-3M14 45l8-3M26 15l8-3M26 25l8-3M26 35l8-3M26 45l8-3" stroke-width="1.4" opacity=".7"/><path d="M50 14l6 6M50 26l6 6" opacity=".35"/>',
    mesh: '<path d="M10 16h44M10 28h44M10 40h44M10 52h44M16 10v48M28 10v48M40 10v48M52 10v48"/><circle class="a" cx="28" cy="28" r="4"/><circle class="a" cx="40" cy="40" r="2.6" opacity=".7"/>',
    beam: '<path d="M14 12h36v8H37v24h13v8H14v-8h13V20H14z"/><path class="as" d="M27 20v24M37 20v24" stroke-width="2.6"/>',
    bolt: '<path d="M24 8h16l6 8-6 8H24l-6-8z"/><path d="M27 24v30h10V24"/><path class="as" d="M27 30l10 3M27 36l10 3M27 42l10 3M27 48l10 3"/>',
    anchor: '<path d="M26 9h12v6l-2 4v31l-4 6-4-6V19l-2-4z"/><path class="as" d="M28.5 25h7M28.5 31h7M28.5 37h7M28.5 43h7"/><path d="M32 4v5" opacity=".5"/>',
    tile: '<path d="M8 32c4-8 12-8 16 0s12 8 16 0 12-8 16 0v18H8z"/><path class="as" d="M8 21c4-8 12-8 16 0s12 8 16 0 12-8 16 0" stroke-width="2.6"/><path d="M16 50V38M32 50V38M48 50V38" opacity=".4"/>',
    ridge: '<path d="M6 47L32 22l26 25"/><path class="a" d="M21 32.5L32 22l11 10.5-3.4 3.3L32 28.5l-7.6 7.3z"/><path d="M14 47v8h36v-8" opacity=".45"/>',
    membrane: '<circle cx="17" cy="21" r="9"/><circle cx="17" cy="21" r="3"/><path d="M26 21h30v29H17V30"/><path class="as" d="M31 30h20M31 37h20M31 44h13" stroke-dasharray="3 4"/>',
    vent: '<rect x="8" y="23" width="48" height="19" rx="3"/><g class="a"><circle cx="16" cy="32.5" r="2"/><circle cx="24" cy="32.5" r="2"/><circle cx="32" cy="32.5" r="2"/><circle cx="40" cy="32.5" r="2"/><circle cx="48" cy="32.5" r="2"/></g><path d="M14 16c3-3 6 3 9 0s6 3 9 0 6 3 9 0 6 3 9 0" opacity=".55"/><path d="M14 50h36" opacity=".35"/>',
    clip: '<path d="M22 8v30a10 10 0 0 0 20 0V27"/><path class="as" d="M42 27h-7v11a3 3 0 0 0 6 0" stroke-width="2.6"/><path d="M16 8h12" stroke-width="3"/>',
    roll: '<path d="M14 20h34a8 12 0 0 1 0 24H14"/><ellipse cx="14" cy="32" rx="8" ry="12"/><ellipse class="a" cx="14" cy="32" rx="3.2" ry="5"/><path d="M48 44h10" opacity=".5"/>',
    board: '<path d="M8 41l24-10 24 10-24 10z"/><path d="M8 41v6l24 10 24-10v-6"/><path class="a" d="M8 28l24-10 24 10-24 10z"/><path d="M8 28v5l24 10 24-10v-5" opacity=".55"/>',
    boardXps: '<path d="M8 20l24-10 24 10-24 10z"/><path class="as" d="M8 20v7l24 10 24-10v-7" stroke-width="2.6"/><path d="M8 34v7l24 10 24-10v-7"/><path d="M8 48v4l24 10 24-10v-4" opacity=".45"/>',
    bucket: '<path d="M16 22h32l-3 31a3 3 0 0 1-3 3H22a3 3 0 0 1-3-3z"/><path d="M18 22a14 12 0 0 1 28 0"/><path class="a" d="M17.1 31h29.8l-1 10H18.1z"/>',
    ceramic: '<rect x="10" y="10" width="20" height="20" rx="1.8"/><rect class="a" x="34" y="10" width="20" height="20" rx="1.8"/><rect x="10" y="34" width="20" height="20" rx="1.8"/><rect x="34" y="34" width="20" height="20" rx="1.8"/>',
    trowel: '<path d="M10 35h36v10H10z"/><path class="as" d="M14 45v7M20 45v7M26 45v7M32 45v7M38 45v7M44 45v7"/><path d="M28 35V24a6 6 0 0 1 6-6h12"/><rect x="46" y="13" width="10" height="9" rx="2"/>',
    socket: '<rect x="11" y="11" width="42" height="42" rx="9"/><circle class="a" cx="32" cy="32" r="12.5"/><circle class="h" cx="27" cy="32" r="2.4"/><circle class="h" cx="37" cy="32" r="2.4"/>',
    conduit: '<path d="M8 39h24a7 7 0 0 0 7-7V8M8 49h24a17 17 0 0 0 17-17V8"/><path class="as" d="M14 39v10M21 39v10M28 39v10M39 16h10M39 23h10"/>',
    pipe: '<path d="M6 26h34v14H6z"/><path class="a" d="M40 21h14v24H40z"/><path d="M13 33h20" opacity=".45"/><path d="M58 24v18" opacity=".45"/>',
    faucet: '<path d="M14 18h16v8h14a8 8 0 0 1 8 8v4"/><path d="M14 12v12M8 18h6"/><path class="a" d="M52 44c-3 4-4 6-4 8a4 4 0 0 0 8 0c0-2-1-4-4-8z"/>',
    radiator: '<rect x="12" y="14" width="9" height="36" rx="3.5"/><rect x="23" y="14" width="9" height="36" rx="3.5"/><rect x="34" y="14" width="9" height="36" rx="3.5"/><rect x="45" y="14" width="9" height="36" rx="3.5"/><path class="as" d="M5 20h7M52 46h7" stroke-width="3"/><path d="M12 54h42" opacity=".4"/>',
    machine: '<path d="M8 50h48"/><circle cx="16" cy="54" r="4"/><circle cx="48" cy="54" r="4"/><path d="M22 50l10-16 10 16"/><ellipse class="a" cx="32" cy="24" rx="16" ry="11" transform="rotate(-18 32 24)"/><ellipse cx="46.5" cy="18.5" rx="3.6" ry="7.2" transform="rotate(-18 46.5 18.5)"/>',
    box: '<path d="M8 20l24-10 24 10v24L32 54 8 44z"/><path d="M8 20l24 10 24-10M32 30v24"/><path class="as" d="M20 15l24 10"/>'
  };
  function icon(key) {
    return '<svg class="pi-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[key] || ICONS.box) + '</svg>';
  }

  var I = {
    bag: '<svg class="i-bag" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 5c0 8.5 6.5 15 15 15l1.5-3.5-4-1.5-1.5 2c-2.8-1.2-5.3-3.7-6.5-6.5l2-1.5-1.5-4z"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    trash: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>'
  };
  H.BAG = I.bag;

  function pad(n) { return ('0' + n).slice(-2); }
  function slug(n) { return String(n).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function byId(id) { for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i]; return null; }
  function catOf(p) { for (var i = 0; i < C.length; i++) if (C[i].key === p.cat) return C[i]; return C[0]; }
  function hasBrandInName(p) { return p.brand && L(p.name).indexOf(p.brand) >= 0; }
  function title(p) { return p.brand && !hasBrandInName(p) ? L(p.name) + ' ' + p.brand : L(p.name); }
  function spec(p) { return p.spec ? L(p.spec) : ''; }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function route() { return window.Router ? window.Router.current : null; }
  function focusEl(el) { if (!el) return; try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }
  var BRANDS = P.reduce(function (a, p) { if (p.brand && a.indexOf(p.brand) < 0) a.push(p.brand); return a; }, []);

  /* ---------- Lista e ofertës (ruhet në pajisje) ---------- */
  var KEY = 'cimi-quote-v1';
  var quote = (function () {
    try { var v = JSON.parse(localStorage.getItem(KEY) || '{}'); return v && typeof v === 'object' ? v : {}; } catch (e) { return {}; }
  })();
  Object.keys(quote).forEach(function (id) { if (!byId(id) || !(quote[id] > 0)) delete quote[id]; });
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(quote)); } catch (e) { /* pa ruajtje */ } }
  function ids() { return Object.keys(quote).filter(byId); }
  function count() { return ids().length; }

  function sync() {
    var n = count();
    document.querySelectorAll('[data-quote-count]').forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
    document.querySelectorAll('[data-quote-toggle]').forEach(function (b) { setBtn(b, !!quote[b.dataset.quoteToggle]); });
    updateBar();
    if (panelOpen) renderPanel();
    if (detailId) syncDetail();
  }
  function btnInner(on) {
    return '<span class="pc-add-ico">' + (on ? I.check : I.plus) + '</span><span class="pc-add-txt">' + esc(t(on ? 'shop.added' : 'shop.add')) + '</span>';
  }
  function setBtn(b, on) {
    if (b.classList.contains('is-added') === on && b.firstChild) return;
    b.classList.toggle('is-added', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.innerHTML = btnInner(on);
  }

  /* ---------- Shiriti poshtë (vetëm në dyqan, kur lista ka produkte) ---------- */
  var bar = document.createElement('div');
  bar.className = 'quote-bar';
  document.body.appendChild(bar);
  function buildBar() {
    bar.innerHTML = '<div class="qb-inner"><span class="qb-ico">' + I.bag + '</span><span class="qb-text"><b data-qb-count>0</b> <span data-qb-label></span></span>' +
      '<button type="button" class="btn btn-primary btn-sm" data-quote-open>' + esc(t('shop.view')) + H.ARROW + '</button></div>';
  }
  function updateBar() {
    var n = count(), on = n > 0 && route() === 'dyqani';
    var c = bar.querySelector('[data-qb-count]'), l = bar.querySelector('[data-qb-label]');
    if (c) c.textContent = n;
    if (l) l.textContent = t(n === 1 ? 'shop.product' : 'shop.products') + ' ' + t('shop.inList');
    bar.classList.toggle('is-visible', on);
    document.body.classList.toggle('has-quote-bar', on);
  }
  function bump() { bar.classList.remove('is-bump'); void bar.offsetWidth; bar.classList.add('is-bump'); }

  /* ---------- Paneli i listës së ofertës ---------- */
  var ov = document.createElement('div');
  ov.className = 'quote-overlay';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ov);
  var panelOpen = false, panelFocus = null;

  function renderPanel() {
    var list = ids();
    var items = list.map(function (id) {
      var p = byId(id), s = spec(p);
      return '<li class="qp-item" data-qp-id="' + id + '"><span class="qp-ico">' + (photo(p) ? '<img src="' + photo(p) + '" alt="">' : icon(p.icon)) + '</span>' +
        '<div class="qp-info"><div class="qp-name">' + esc(title(p)) + '</div>' + (s ? '<div class="qp-spec">' + esc(cap(s)) + '</div>' : '') + '</div>' +
        '<div class="qp-qty" role="group" aria-label="' + esc(t('shop.qty')) + '"><button type="button" data-q-dec aria-label="−">−</button>' +
        '<input type="number" inputmode="numeric" min="1" max="9999" value="' + quote[id] + '" data-q-input aria-label="' + esc(t('shop.qty')) + '">' +
        '<button type="button" data-q-inc aria-label="+">+</button></div>' +
        '<button type="button" class="qp-rm" data-q-remove aria-label="' + esc(t('shop.remove')) + '">' + I.trash + '</button></li>';
    }).join('');
    ov.innerHTML = '<div class="quote-scrim" data-quote-close></div><aside class="quote-panel" aria-labelledby="qp-title">' +
      '<header class="qp-head"><div><p class="eyebrow">' + esc(t('shop.listEyebrow')) + '</p><h2 class="qp-title" id="qp-title">' + esc(t('shop.list')) +
        (list.length ? ' <span class="qp-count">' + list.length + '</span>' : '') + '</h2></div>' +
        '<button type="button" class="qp-x" data-quote-close aria-label="' + esc(t('menu.close')) + '">' + I.x + '</button></header>' +
      (list.length ? '<ul class="qp-list">' + items + '</ul>' : '<div class="qp-empty">' + icon('box') + '<p>' + esc(t('shop.listEmpty')) + '</p></div>') +
      '<footer class="qp-foot"><p class="qp-note">' + esc(t('shop.note')) + '</p>' +
        '<button type="button" class="btn btn-primary btn-block" data-q-send' + (list.length ? '' : ' disabled') + '>' + esc(t('shop.send')) + H.ARROW + '</button>' +
        '<div class="qp-foot-row"><a href="tel:' + H.CONTACT.tel + '" class="qp-link">' + I.phone + H.CONTACT.telDisplay + '</a>' +
        (list.length ? '<button type="button" class="qp-link" data-q-clear>' + esc(t('shop.clearList')) + '</button>' : '') + '</div>' +
      '</footer></aside>';
  }
  function openPanel() {
    if (panelOpen) return;
    panelOpen = true; panelFocus = document.activeElement;
    renderPanel();
    void ov.offsetWidth; // fillon tranzicionin nga gjendja e mbyllur
    ov.classList.add('is-open'); ov.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(function () { if (panelOpen) focusEl(ov.querySelector('.qp-x')); }, 320);
  }
  function closePanel() {
    if (!panelOpen) return;
    panelOpen = false;
    ov.classList.remove('is-open'); ov.setAttribute('aria-hidden', 'true');
    if (!detailId) document.body.classList.remove('no-scroll');
    if (panelFocus && document.body.contains(panelFocus)) focusEl(panelFocus);
  }

  /* ---------- Pamja e produktit (hapet kur klikohet një produkt) ---------- */
  var pd = document.createElement('div');
  pd.className = 'pd-overlay';
  pd.setAttribute('role', 'dialog');
  pd.setAttribute('aria-modal', 'true');
  pd.setAttribute('aria-hidden', 'true');
  document.body.appendChild(pd);
  var detailId = '', detailQty = 1, detailFocus = null;
  function pdAddInner(on) {
    return '<span class="pc-add-ico">' + (on ? I.check : I.plus) + '</span><span>' + esc(t(on ? 'shop.added' : 'shop.add')) + '</span>';
  }
  function fact(label, value) { return value ? '<div class="pd-fact"><dt>' + esc(label) + '</dt><dd>' + value + '</dd></div>' : ''; }
  function renderDetail() {
    var p = byId(detailId); if (!p) return;
    var c = catOf(p), s = spec(p), on = !!quote[p.id];
    var rel = P.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 3);
    pd.innerHTML = '<div class="pd-scrim" data-pd-close></div>' +
      '<article class="pd-sheet" tabindex="-1" aria-label="' + esc(title(p)) + '">' +
      '<button type="button" class="pd-x" data-pd-close aria-label="' + esc(t('menu.close')) + '">' + I.x + '</button>' +
      '<div class="pd-media' + (photo(p) ? ' has-photo' : '') + '">' +
        (photo(p) ? '<img class="pd-photo" src="' + photo(p) + '" alt="' + esc(title(p)) + '" decoding="async">'
                  : '<span class="pc-grid" aria-hidden="true"></span><span class="pc-icon">' + icon(p.icon) + '</span>') +
        (p.brand ? '<span class="pc-brand"><img src="' + H.brandLogo(p.brand) + '" alt="' + esc(p.brand) + '" data-ph="brand"></span>' : '') +
      '</div>' +
      '<div class="pd-info">' +
        '<span class="eyebrow">' + esc(L(c.name)) + '</span>' +
        '<h2 class="pd-title">' + esc(L(p.name)) + (p.brand && !hasBrandInName(p) ? ' <span class="pc-title-brand">' + esc(p.brand) + '</span>' : '') + '</h2>' +
        '<p class="pd-lead">' + esc(cap(s || t('shop.onRequest'))) + '</p>' +
        (c.desc ? '<p class="pd-desc">' + esc(L(c.desc)) + '</p>' : '') +
        '<dl class="pd-facts">' +
          fact(t('shop.dCat'), esc(L(c.name))) +
          fact(t('shop.dBrand'), p.brand ? esc(p.brand) : '') +
          fact(t('shop.dSpec'), s ? esc(cap(s)) : '') +
          fact(t('shop.dPrice'), esc(t('shop.dPriceVal'))) +
          fact(t('shop.dDelivery'), esc(t('shop.dDeliveryVal'))) +
        '</dl>' +
        '<div class="pd-buy">' +
          '<div class="qp-qty pd-qty" role="group" aria-label="' + esc(t('shop.qty')) + '"><button type="button" data-pd-dec aria-label="−">−</button>' +
          '<input type="number" inputmode="numeric" min="1" max="9999" value="' + detailQty + '" data-pd-input aria-label="' + esc(t('shop.qty')) + '">' +
          '<button type="button" data-pd-inc aria-label="+">+</button></div>' +
          '<button type="button" class="pd-add' + (on ? ' is-added' : '') + '" data-pd-add aria-pressed="' + on + '">' + pdAddInner(on) + '</button>' +
          '<a href="tel:' + H.CONTACT.tel + '" class="pd-call">' + I.phone + '<span>' + esc(t('shop.call')) + '</span></a>' +
        '</div>' +
        '<p class="pd-note">' + esc(t('shop.note')) + '</p>' +
        (rel.length ? '<div class="pd-rel"><h3>' + esc(t('shop.related')) + '</h3><div class="pd-rel-grid">' + rel.map(function (x) {
          return '<button type="button" class="pd-rel-item" data-pd-go="' + x.id + '">' +
            (photo(x) ? '<img src="' + photo(x) + '" alt="" loading="lazy">' : '<span class="pd-rel-ico">' + icon(x.icon) + '</span>') +
            '<span>' + esc(title(x)) + '</span></button>';
        }).join('') + '</div></div>' : '') +
      '</div></article>';
  }
  function syncDetail() {
    var b = pd.querySelector('[data-pd-add]'); if (!b) return;
    var on = !!quote[detailId];
    b.classList.toggle('is-added', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.innerHTML = pdAddInner(on);
    var f = pd.querySelector('[data-pd-input]'); if (f && on) { detailQty = quote[detailId]; f.value = detailQty; }
  }
  function openDetail(id, keepFocus) {
    if (!byId(id)) return;
    var was = !!detailId;
    if (!was && !keepFocus) detailFocus = document.activeElement;
    detailId = id; detailQty = quote[id] || 1;
    renderDetail();
    if (!was) { void pd.offsetWidth; pd.classList.add('is-open'); pd.setAttribute('aria-hidden', 'false'); document.body.classList.add('no-scroll'); }
    var sh = pd.querySelector('.pd-sheet'); if (sh) { sh.scrollTop = 0; var inf = sh.querySelector('.pd-info'); if (inf) inf.scrollTop = 0; }
    if (route() === 'dyqani') writeQuery();
    setTimeout(function () { if (detailId) focusEl(pd.querySelector('.pd-x')); }, was ? 0 : 320);
  }
  function closeDetail(silent) {
    if (!detailId) return;
    detailId = '';
    pd.classList.remove('is-open'); pd.setAttribute('aria-hidden', 'true');
    if (!panelOpen) document.body.classList.remove('no-scroll');
    if (!silent && route() === 'dyqani') writeQuery();
    if (detailFocus && document.body.contains(detailFocus)) focusEl(detailFocus);
    detailFocus = null;
  }

  /* Dërgimi: mbush formën e kontaktit me listën e produkteve */
  var prefill = null;
  function send() {
    var list = ids(); if (!list.length) return;
    var lines = list.map(function (id) {
      var p = byId(id), s = spec(p);
      return '• ' + title(p) + (s ? ' (' + s + ')' : '') + ' — ' + t('shop.qty') + ': ' + quote[id];
    });
    prefill = t('shop.msgIntro') + '\n' + lines.join('\n') + '\n\n';
    closePanel();
    location.hash = '#/kontakti';
  }
  function fillContact() {
    if (!prefill) return;
    var ta = document.getElementById('cf-mesazhi'), sel = document.getElementById('cf-lloji');
    if (!ta) return;
    ta.value = prefill; prefill = null;
    if (sel) { var want = t('form.o_furnizim'); Array.prototype.forEach.call(sel.options, function (o) { if (o.text === want) sel.value = o.value; }); }
    var form = ta.closest('form');
    setTimeout(function () {
      try { form.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { form.scrollIntoView(); }
      focusEl(document.getElementById('cf-emri'));
    }, 320);
  }

  /* ---------- Faqja e dyqanit ---------- */
  var state = { k: 'all', q: '', p: '' };
  function readQuery() {
    var qs = (location.hash.split('?')[1] || ''), k = 'all', q = '', pr = '';
    qs.split('&').forEach(function (pair) {
      var kv = pair.split('='), val = '';
      try { val = decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')); } catch (e) { val = ''; }
      if (kv[0] === 'k') k = val;
      if (kv[0] === 'q') q = val;
      if (kv[0] === 'p') pr = val;
    });
    if (k !== 'all' && !C.some(function (c) { return c.key === k; })) k = 'all';
    state.k = k; state.q = q; state.p = byId(pr) ? pr : '';
  }
  function writeQuery() {
    var parts = [];
    if (state.k !== 'all') parts.push('k=' + encodeURIComponent(state.k));
    if (state.q) parts.push('q=' + encodeURIComponent(state.q));
    if (detailId) parts.push('p=' + encodeURIComponent(detailId));
    try { history.replaceState(null, '', '#/dyqani' + (parts.length ? '?' + parts.join('&') : '')); } catch (e) { /* noop */ }
  }

  function card(p, i) {
    var c = catOf(p), s = spec(p), on = !!quote[p.id];
    var hay = norm([title(p), s, L(c.name), p.brand || ''].join(' '));
    return '<article class="product-card pc-anim" data-product="' + p.id + '" tabindex="0" role="button" aria-label="' + esc(t('shop.openP') + ': ' + title(p)) + '" data-cat="' + p.cat + '" data-search="' + esc(hay) + '" style="--d:' + (i % 16) + '">' +
      (photo(p)
        ? '<div class="pc-media has-photo"><img class="pc-photo" src="' + photo(p) + '" alt="' + esc(title(p)) + '" loading="lazy" decoding="async">'
        : '<div class="pc-media"><span class="pc-grid" aria-hidden="true"></span><span class="pc-icon">' + icon(p.icon) + '</span>') +
        (p.brand ? '<span class="pc-brand"><img src="' + H.brandLogo(p.brand) + '" alt="' + esc(p.brand) + '" data-ph="brand" loading="lazy"></span>' : '') +
        '<span class="pc-no">' + esc(t('shop.no')) + ' ' + pad(i + 1) + '</span>' +
        '<span class="pc-view" aria-hidden="true">' + esc(t('shop.openP')) + H.ARROW + '</span></div>' +
      '<div class="pc-body"><span class="pc-cat">' + esc(L(c.name)) + '</span>' +
        '<h3 class="pc-title">' + esc(L(p.name)) + (p.brand && !hasBrandInName(p) ? ' <span class="pc-title-brand">' + esc(p.brand) + '</span>' : '') + '</h3>' +
        '<p class="pc-spec' + (s ? '' : ' is-muted') + '">' + esc(cap(s || t('shop.onRequest'))) + '</p>' +
        '<div class="pc-actions">' +
          '<button type="button" class="pc-add' + (on ? ' is-added' : '') + '" data-quote-toggle="' + p.id + '" aria-pressed="' + on + '">' + btnInner(on) + '</button>' +
          '<a href="tel:' + H.CONTACT.tel + '" class="pc-call" aria-label="' + esc(t('cta.telefono')) + '">' + I.phone + '</a>' +
        '</div>' +
      '</div></article>';
  }

  function view() {
    readQuery();
    var chips = '<button type="button" class="shop-chip" data-shop-cat="all">' + esc(t('shop.all')) + '</button>' +
      C.map(function (c) {
        var n = P.filter(function (p) { return p.cat === c.key; }).length;
        return '<button type="button" class="shop-chip" data-shop-cat="' + c.key + '">' + esc(L(c.name)) + '<span>' + n + '</span></button>';
      }).join('');
    return '<section class="shop-hero"><div class="shop-hero-bg" aria-hidden="true"></div><div class="container-x shop-hero-grid">' +
        '<div><div class="breadcrumb"><a href="#/" data-route="ballina">' + esc(t('nav.ballina')) + '</a><span>/</span><span>' + esc(t('nav.dyqani')) + '</span></div>' +
          '<p class="eyebrow" data-reveal>' + esc(t('shop.eyebrow')) + '</p>' +
          '<h1 class="shop-title" data-reveal>' + esc(t('shop.title')) + '<span>.</span></h1>' +
          '<p class="shop-intro" data-reveal>' + esc(t('shop.intro')) + '</p></div>' +
        '<div class="shop-stats" data-reveal>' +
          '<div class="shop-stat"><b>' + C.length + '</b><span>' + esc(t('shop.cats')) + '</span></div>' +
          '<div class="shop-stat"><b>' + BRANDS.length + '</b><span>' + esc(t('shop.brands')) + '</span></div>' +
        '</div>' +
      '</div></section>' +
      '<section class="shop-section">' +
        '<div class="shop-toolbar"><div class="container-x shop-toolbar-inner">' +
          '<label class="shop-search">' + I.search +
            '<input type="search" data-shop-search placeholder="' + esc(t('shop.search')) + '" value="' + esc(state.q) + '" autocomplete="off" spellcheck="false" enterkeyhint="search" aria-label="' + esc(t('shop.search')) + '">' +
            '<button type="button" class="shop-search-clear" data-shop-clear aria-label="' + esc(t('shop.clear')) + '" hidden>' + I.x + '</button></label>' +
          '<div class="shop-chips" data-shop-chips role="group" aria-label="' + esc(t('materials.title')) + '">' + chips + '</div>' +
        '</div></div>' +
        '<div class="container-x shop-body">' +
          '<div class="shop-meta"><span data-shop-count></span><span class="shop-meta-note">' + esc(t('shop.note')) + '</span></div>' +
          '<div class="product-grid" data-product-grid>' + P.map(card).join('') + '</div>' +
          '<div class="shop-empty" data-shop-empty hidden>' + icon('box') + '<h3>' + esc(t('shop.empty')) + '</h3><p>' + esc(t('shop.emptyHint')) + '</p>' +
            '<button type="button" class="btn btn-ghost btn-sm" data-shop-reset>' + esc(t('shop.clear')) + '</button></div>' +
          '<p class="shop-credit">' + esc(t('shop.credit')) + ' <a href="assets/products/CREDITS.md" target="_blank" rel="noopener">Wikimedia Commons</a></p>' +
        '</div>' +
      '</section>';
  }

  function apply(animate) {
    var grid = document.querySelector('[data-product-grid]'); if (!grid) return;
    var toks = norm(state.q).split(/\s+/).filter(Boolean), shown = 0, k = 0;
    Array.prototype.forEach.call(grid.children, function (el) {
      var ok = (state.k === 'all' || el.dataset.cat === state.k) &&
        toks.every(function (tk) { return el.dataset.search.indexOf(tk) >= 0; });
      el.hidden = !ok;
      if (ok) {
        shown++;
        if (animate) { el.classList.remove('pc-anim'); el.style.setProperty('--d', Math.min(k++, 16)); void el.offsetWidth; el.classList.add('pc-anim'); }
      }
    });
    document.querySelectorAll('[data-shop-cat]').forEach(function (b) {
      var on = b.dataset.shopCat === state.k;
      b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var cnt = document.querySelector('[data-shop-count]');
    if (cnt) cnt.innerHTML = shown < P.length ? '<b>' + shown + '</b> ' + esc(t(shown === 1 ? 'shop.product' : 'shop.products')) : '';
    var em = document.querySelector('[data-shop-empty]'); if (em) em.hidden = shown > 0;
    var clr = document.querySelector('[data-shop-clear]'); if (clr) clr.hidden = !state.q;
  }
  function centerChip(smooth) {
    var wrap = document.querySelector('[data-shop-chips]'), a = wrap && wrap.querySelector('.shop-chip.is-active');
    if (!a) return;
    var left = a.offsetLeft - (wrap.clientWidth - a.offsetWidth) / 2;
    try { wrap.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'auto' }); } catch (e) { wrap.scrollLeft = left; }
  }
  function toGrid() {
    var sec = document.querySelector('.shop-section'); if (!sec) return;
    var y = sec.getBoundingClientRect().top + window.scrollY - 66;
    if (window.scrollY > y + 4) { try { window.scrollTo({ top: y, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, y); } }
  }

  /* ---------- Ngjarjet (delegim global) ---------- */
  document.addEventListener('click', function (e) {
    var b;
    if ((b = e.target.closest('[data-shop-cat]'))) { state.k = b.dataset.shopCat; writeQuery(); apply(true); centerChip(true); toGrid(); return; }
    if ((b = e.target.closest('[data-shop-clear], [data-shop-reset]'))) {
      state.q = ''; if (b.hasAttribute('data-shop-reset')) state.k = 'all';
      var inp = document.querySelector('[data-shop-search]'); if (inp) { inp.value = ''; focusEl(inp); }
      writeQuery(); apply(true); centerChip(true); return;
    }
    if ((b = e.target.closest('[data-quote-toggle]'))) {
      var id = b.dataset.quoteToggle;
      if (quote[id]) delete quote[id]; else { quote[id] = 1; bump(); }
      persist(); sync(); return;
    }
    if (e.target.closest('[data-quote-open]')) { closeDetail(); openPanel(); return; }
    if (detailId) {
      if (e.target.closest('[data-pd-close]')) { closeDetail(); return; }
      if ((b = e.target.closest('[data-pd-go]'))) { openDetail(b.dataset.pdGo); return; }
      var qf = pd.querySelector('[data-pd-input]');
      if (e.target.closest('[data-pd-inc]')) { detailQty = Math.min(9999, detailQty + 1); qf.value = detailQty; if (quote[detailId]) { quote[detailId] = detailQty; persist(); } return; }
      if (e.target.closest('[data-pd-dec]')) { detailQty = Math.max(1, detailQty - 1); qf.value = detailQty; if (quote[detailId]) { quote[detailId] = detailQty; persist(); } return; }
      if (e.target.closest('[data-pd-add]')) {
        if (quote[detailId]) delete quote[detailId]; else { quote[detailId] = detailQty; bump(); }
        persist(); sync(); return;
      }
    }
    if ((b = e.target.closest('[data-product]')) && !e.target.closest('a, button')) { openDetail(b.dataset.product); return; }
    if (!panelOpen) return;
    if (e.target.closest('[data-quote-close]')) { closePanel(); return; }
    var item = e.target.closest('[data-qp-id]');
    if (item) {
      var pid = item.dataset.qpId, field = item.querySelector('[data-q-input]');
      if (e.target.closest('[data-q-inc]')) { quote[pid] = Math.min(9999, (quote[pid] || 1) + 1); field.value = quote[pid]; persist(); return; }
      if (e.target.closest('[data-q-dec]')) { quote[pid] = Math.max(1, (quote[pid] || 1) - 1); field.value = quote[pid]; persist(); return; }
      if (e.target.closest('[data-q-remove]')) { delete quote[pid]; persist(); sync(); return; }
    }
    if (e.target.closest('[data-q-clear]')) { Object.keys(quote).forEach(function (k) { delete quote[k]; }); persist(); sync(); return; }
    if (e.target.closest('[data-q-send]')) send();
  });

  var qTimer = null;
  document.addEventListener('input', function (e) {
    if (e.target.matches('[data-shop-search]')) {
      state.q = e.target.value; apply(false);
      clearTimeout(qTimer); qTimer = setTimeout(writeQuery, 300); return;
    }
    if (e.target.matches('[data-pd-input]')) {
      var dv = Math.round(+e.target.value);
      if (dv >= 1) { detailQty = Math.min(9999, dv); if (quote[detailId]) { quote[detailId] = detailQty; persist(); } }
      return;
    }
    if (e.target.matches('[data-q-input]')) {
      var v = Math.round(+e.target.value), it = e.target.closest('[data-qp-id]');
      if (it && v >= 1) { quote[it.dataset.qpId] = Math.min(9999, v); persist(); }
    }
  });
  document.addEventListener('change', function (e) {
    if (!e.target.matches('[data-q-input]')) return;
    var it = e.target.closest('[data-qp-id]'); if (!it) return;
    var v = Math.max(1, Math.min(9999, Math.round(+e.target.value) || 1));
    e.target.value = v; quote[it.dataset.qpId] = v; persist();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panelOpen) { closePanel(); return; }
    if (e.key === 'Escape' && detailId) { closeDetail(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-product]')) { e.preventDefault(); openDetail(e.target.dataset.product); return; }
    if (e.key === 'Enter' && e.target.matches && e.target.matches('[data-shop-search]')) e.target.blur();
  });
  // Lidhje si "#/dyqani?k=kulm" ndërsa jemi tashmë në dyqan → vetëm filtro (pa ri-render)
  window.addEventListener('hashchange', function () {
    var r = (location.hash || '').replace(/^#\/?/, '').split('?')[0].split('/')[0];
    if (r === 'dyqani' && route() === 'dyqani') {
      readQuery();
      var inp = document.querySelector('[data-shop-search]'); if (inp) inp.value = state.q;
      apply(true); centerChip(true);
      if (state.p && state.p !== detailId) openDetail(state.p, true); else if (!state.p && detailId) closeDetail(true);
    } else if (detailId) closeDetail(true);
    if (panelOpen) closePanel();
  });

  window.I18N.onChange(function () { buildBar(); updateBar(); if (panelOpen) renderPanel(); if (detailId) renderDetail(); });
  buildBar();

  window.Views = window.Views || {};
  window.Views.dyqani = view;
  window.Shop = {
    count: count,
    icon: icon,
    open: openPanel,
    openProduct: openDetail,
    afterRender: function (r) {
      updateBar();
      if (r === 'dyqani') { apply(false); centerChip(false); if (state.p) openDetail(state.p, true); }
      else if (detailId) closeDetail(true);
      if (r === 'kontakti') fillContact();
    }
  };
})();
