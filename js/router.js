/* ============================================================================
   router.js — Router me hash + tranzicione (window.Router)
   ========================================================================== */
(function () {
  'use strict';
  var H = window.H, t = H.t;
  var viewEl = document.getElementById('app-view');
  var current = null;

  function parse() {
    var h = (location.hash || '').replace(/^#\/?/, '').split('?')[0].split('/')[0];
    if (!h) return 'ballina';
    return H.ROUTES.indexOf(h) >= 0 ? h : 'ballina';
  }

  function setTitle(route) {
    document.title = route === 'ballina'
      ? 'Cimi Group SA | Materiale Ndërtimore & Zgjidhje Profesionale'
      : t('nav.' + route) + ' · Cimi Group SA';
  }

  function render(route, opts) {
    opts = opts || {};
    if (window.FX && !document.querySelector('[data-project-overlay]').hidden) window.FX.closeProject();
    var builder = window.Views[route] || window.Views.ballina;
    viewEl.innerHTML = '<div class="view">' + builder() + '</div>';
    if (!opts.keepScroll) { try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); } catch (e) { window.scrollTo(0, 0); } }
    if (window.Chrome) window.Chrome.setActive(route);
    setTitle(route);
    if (window.FX) window.FX.afterRender(route);
    current = route;
  }

  function onHashChange() {
    var route = parse();
    if (route === current) return; // asnjë ri-render nëse jemi tashmë këtu (pa ngecje)
    render(route);
  }

  window.Router = {
    init: function () { render(parse()); window.addEventListener('hashchange', onHashChange); },
    rerender: function () { render(current || parse(), { keepScroll: true }); },
    get current() { return current; }
  };
})();
