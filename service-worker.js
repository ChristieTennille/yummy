const CACHE_NAME = 'Recipeapp-Yummy';
const FILES_TO_CACHE = [
    '/Yummy/',
    '/Yummy/index.html',
    '/Yummy/style.css',
    '/Yummy/app.js',
    '/Yummy/manifest.json',
    '/Yummy/icons/icon-128.png',
    '/Yummy/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});