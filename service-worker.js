/* ============================================================================
   service-worker.js — Cimi Group SA PWA
   Strategji:
   - Navigim (HTML): network-first → fallback te offline.html
   - Asete statike (CSS/JS/imazhe/fonts): stale-while-revalidate
   - Kalon pa ndërhyrje: kërkesat cross-origin (fonts CDN, harta)
   ========================================================================== */
const VERSION = 'cimi-v2.0.0';
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const PRECACHE = [
  './',
  './index.html',
  './offline.html',
  './css/styles.css',
  './js/i18n.js',
  './js/helpers.js',
  './js/data.js',
  './js/materials-art.js',
  './js/chrome.js',
  './js/views.js',
  './js/interactions.js',
  './js/router.js',
  './js/pwa.js',
  './js/app.js',
  './manifest.json',
  './assets/branding/logo/logo-full.png',
  './assets/branding/placeholder-wide.svg',
  './assets/branding/placeholder-portrait.svg',
  './assets/branding/placeholder-square.svg',
  './assets/brands/brand-placeholder.svg',
  './assets/icons/icon-192.png',
  './assets/icons/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Kalo pa ndërhyrje kërkesat cross-origin (Google Fonts, OpenStreetMap etj.)
  if (url.origin !== self.location.origin) return;

  // Navigim → network-first me fallback offline
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./offline.html')))
    );
    return;
  }

  // Asete → stale-while-revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
