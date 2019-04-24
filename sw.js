self.addEventListener('install', e => {
  console.log('Installing Service Worker...', e);
  // wait until the caches stuff (which must return a promise) finishes before fetching
  e.waitUntil(
    // opens a cache if it exists, otherwise creates it
    caches.open('shell').then(cache => {
      console.log('Precaching App Shell');
      cache.addAll(['/', '/index.html', '/src/js/app.js', '/src/css/app.css']);
    })
  );
});

self.addEventListener('activate', e => {
  console.log('Activating Service Worker...', e);
  // claim() ensures the sw was installed properly
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  // respondWith() overwrites the data we get back
  e.respondWith(
    caches
      .match(e.request)
      // res will be null if request doens't match any caches
      .then(res => {
        if (res != null) {
          return res;
        } else {
          return fetch(e.request);
        }
      })
  );
});
