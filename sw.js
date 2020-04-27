self.addEventListener('install', event => {
  self.skipWaiting()
  console.log('[ServiceWorker] Install')
})
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
})
self.addEventListener('fetch', event => {
  // console.log('[ServiceWorker] fetch', event.request)
})

self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');
  let title = 'Server Push';
  let options = {
    body: 'push TEST',
    icon: './512icon.png'
  };
  if (event.data) {
    options = event.data.json();
    title = options.title;
  }
  event.waitUntil(self.registration.showNotification(title, options));
});