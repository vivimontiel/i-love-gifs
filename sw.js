// Your Service Worker. You can use its instance with the keyword `self`
// Example: self.addEventListener(...)

const appShellCacheName = 'app-shell-v1';
const appShellFilesToCache = [
    // TODO: 2a - Declare files and URLs to cache at Service Worker installation
    'assets/css/desktop.css',
    'assets/css/fonts.css',
    'assets/css/mobile.css',
    'assets/css/normalize.css',
    'assets/css/shell.css',
];

const appCaches = [
    appShellCacheName,
];

// TODO: 2b - On install, add app shell files to cache
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(appShellCacheName)
        .then((cache) => {
            console.log(cache);
            return cache.addAll(appShellFilesToCache);
        })
    );
}); 


// TODO: 2c - On activation, remove obsolete caches
self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.filter(function(cacheName) {
        // Return true if you want to remove this cache,
        // but remember that caches are shared across
        // the whole origin
            }).map(function(cacheName) {
                return caches.delete(cacheName);
            }));
    }));
});

// TODO: 2d - On intercepted fetch, use the strategy of your choice to respond to requests
self.addEventListener('fetch', function(event) {
    console.log('Gestion de l\'évènement de fetch pour', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('Réponse trouvée en cache:', response);
          return response;
        }
        console.log('Pas de réponse trouvée en cache. Sur le point de la récupérer via le réseau...');
        return fetch(event.request).then(function(response) {
          console.log('La réponse du réseau est:', response);
          return response;
        }).catch(function(error) {
          console.error('Récupération échouée:', error);
          throw error;
        });
      })
    );
  });





