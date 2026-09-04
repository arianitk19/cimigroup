/* ============================================================================
   pwa.js — Service Worker + Install prompt
   ========================================================================== */
(function () {
  'use strict';
  if ('serviceWorker' in navigator) {
    var refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return; refreshing = true; window.location.reload();
    });
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('service-worker.js').then(function (reg) {
        reg.addEventListener('updatefound', function () {
          var nw = reg.installing;
          if (nw) nw.addEventListener('statechange', function () { if (nw.state === 'installed' && navigator.serviceWorker.controller) nw.postMessage && reg.waiting && reg.waiting.postMessage({ type: 'SKIP_WAITING' }); });
        });
      }).catch(function (e) { console.warn('[PWA]', e); });
    });
  }

  var deferred = null, btn = null;
  function label() { return (window.I18N ? window.I18N.t('cta.pwa') : 'Instalo aplikacionin'); }
  function make() {
    if (btn) return;
    btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'pwa-install'; btn.setAttribute('aria-label', label());
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M8 11l4 4 4-4M5 20h14"/></svg><span data-pwa-label>' + label() + '</span><span class="pwa-install__x" aria-hidden="true">×</span>';
    document.body.appendChild(btn);
    btn.addEventListener('click', function (e) {
      if (e.target.classList.contains('pwa-install__x')) { hide(); return; }
      if (!deferred) return; deferred.prompt();
      deferred.userChoice.finally(function () { deferred = null; hide(); });
    });
    if (window.I18N) window.I18N.onChange(function () { var l = btn.querySelector('[data-pwa-label]'); if (l) l.textContent = label(); });
  }
  function show() { make(); requestAnimationFrame(function () { btn.classList.add('is-visible'); }); }
  function hide() { if (btn) btn.classList.remove('is-visible'); }

  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; setTimeout(show, 2800); });
  window.addEventListener('appinstalled', function () { deferred = null; hide(); });
})();
