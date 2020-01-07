importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

const CACHE_NAME = "cache_fooapp";
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/standings.html', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/css/materialize.css', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/my_own.css', revision: '1' },
  { url: '/images/arrow_back-24px.svg', revision: '1' },
  { url: '/images/BL.png', revision: '1' },
  { url: '/images/delete-24px.svg', revision: '1' },
  { url: '/images/E_logo_192.png', revision: '1' },
  { url: '/images/E_logo_512.png', revision: '1' },
  { url: '/images/ER.png', revision: '1' },
  { url: '/images/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
  { url: '/images/football.jpg', revision: '1' },
  { url: '/images/L1.png', revision: '1' },
  { url: '/images/PD.jpg', revision: '1' },
  { url: '/images/PL.png', revision: '1' },
  { url: '/images/save-24px.svg', revision: '1' },
  { url: '/images/UCL.png', revision: '1' },
  { url: '/js/api-standings.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/jquery-3.4.1.min.js', revision: '1' },
  { url: '/js/materialize.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/serv-reg.js', revision: '1' }
], {
ignoreUrlParametersMatching: [/.*/]
});

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-football-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

 
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push Notification';
  }
  var options = {
    body: body,
    icon: 'images/E_logo.png',
    vibrate: [100, 50, 100],
    data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});