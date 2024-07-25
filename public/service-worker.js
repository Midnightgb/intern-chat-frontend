// public/service-worker.js

const CACHE_NAME = 'intern-chat-cache-v1';
const API_CACHE_NAME = 'intern-chat-api-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/images/logo-white-abai.png',
  '/images/placeholder-user.png',
  '/favicon.ico',
  // Añade aquí otras rutas de recursos estáticos
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(networkFirstThenCache(event.request));
  } else {
    event.respondWith(cacheFirst(event.request));
  }
});

async function networkFirstThenCache(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(API_CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('No hay datos disponibles offline', { status: 404 });
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}