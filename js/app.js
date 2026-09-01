/* ============================================================================
   app.js — Bootstrap
   ========================================================================== */
(function () {
  'use strict';
  function start() {
    window.Chrome.build();
    window.Router.init();
    window.I18N.onChange(function () {
      window.Chrome.build();
      window.Router.rerender();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
