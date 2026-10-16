// ===================================================================
// GUJARATI TRADER - Ultra-Fast Mobile Cache & Offline Service Worker
// Provides instant 0-second page load even on slow 2G/3G networks
// ===================================================================

const CACHE_NAME = 'gujarati-trader-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/images/official-gujarati-trader.jpg'
];

// Install: Cache critical core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Stale-While-Revalidate strategy for ultra-fast response on slow networks
self.addEventListener('fetch', (event) => {
  // Only handle GET requests for same origin or fonts/images
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip telegram links from service worker caching
  if (url.hostname.includes('t.me') || url.protocol === 'tg:') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version immediately if available
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed (offline or super slow), cached response was already returned
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
