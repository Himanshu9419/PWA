self.importScripts('data/games.js');

// cache name
var cacheName = 'js13kPWA-v1';

// files to be cached
var appShellFiles = [
  '/PWA/',
  '/PWA/index.html',
  '/PWA/app.js',
  '/PWA/style.css',
//   '/pwa-examples/js13kpwa/fonts/graduate.eot',
//   '/pwa-examples/js13kpwa/fonts/graduate.ttf',
//   '/pwa-examples/js13kpwa/fonts/graduate.woff',
//   '/pwa-examples/js13kpwa/favicon.ico',
//   '/pwa-examples/js13kpwa/img/js13kgames.png',
//   '/pwa-examples/js13kpwa/img/bg.png',
//   '/pwa-examples/js13kpwa/icons/icon-32.png',
//   '/pwa-examples/js13kpwa/icons/icon-64.png',
//   '/pwa-examples/js13kpwa/icons/icon-96.png',
//   '/pwa-examples/js13kpwa/icons/icon-128.png',
//   '/pwa-examples/js13kpwa/icons/icon-168.png',
//   '/pwa-examples/js13kpwa/icons/icon-192.png',
//   '/pwa-examples/js13kpwa/icons/icon-256.png',
//   '/pwa-examples/js13kpwa/icons/icon-512.png'
];
var gamesImages = [];
for(var i=0; i<games.length; i++) {
  gamesImages.push('https://raw.githubusercontent.com/mdn/pwa-examples/master/js13kpwa/data/img/'+games[i].slug+'.jpg?raw=true');
}
var contentToCache = appShellFiles.concat(gamesImages);

//code to cache file on install
self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentToCache);
      })
    );
  });


// code to fetch content from cache if its there
self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(r) {
        console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then(function(response) {
          return caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });


  // new cache name
newCacheName = 'js13kPWA-v2';
// update cache 
contentToCache.push('https://raw.githubusercontent.com/mdn/pwa-examples/master/js13kpwa/icons/icon-32.png');
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(newCacheName).then(function(cache) {
      return cache.addAll(contentToCache);
    })
  );
});

//activate ie clearing old cache and making new one to come to picture
self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
          if(cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });
