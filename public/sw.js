// Service Worker for aggressive image caching
const CACHE_NAME = 'portfolio-images-v1';
const IMAGES_TO_CACHE = [
  '/personal/MyPic1.jpg',
  '/personal/MyPic2.jpg',
  '/personal/MyPic3.jpg',
  '/personal/MyPic4.jpg'
];

// Install event - cache all images immediately
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker installing and caching images...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📸 Caching project images...');
        return cache.addAll(IMAGES_TO_CACHE);
      })
      .catch((error) => {
        console.error('Failed to cache images:', error);
      })
  );
});

// Fetch event - serve images from cache if available
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return cached version if available
          if (response) {
            return response;
          }
          
          // If not in cache, fetch and cache it
          return fetch(event.request)
            .then((response) => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone the response
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              
              return response;
            });
        })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
