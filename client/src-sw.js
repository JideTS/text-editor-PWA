const { offlineFallback, warmStrategyCache, imageCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});


registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// DONE WITH (https://developer.chrome.com/docs/workbox/modules/workbox-recipes/): Implement asset caching

const cacheResources = 'static-resources';
const matchCallbackResources = ({request}) =>
  // CSS
  request.destination === 'style' ||
  // JavaScript
  request.destination === 'script' ||
  // Web Workers
  request.destination === 'worker';

registerRoute(  matchCallbackResources,
  new StaleWhileRevalidate({
    cacheResources,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }));

  const cacheImages = 'images';
  const matchCallbackImages = ({request}) => request.destination === 'image';
  const maxAgeSeconds = 30 * 24 * 60 * 60;
  const maxEntries = 60;
  
  registerRoute(
    matchCallbackImages,
    new CacheFirst({
      cacheImages,
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxEntries,
          maxAgeSeconds,
        }),
      ],
    })
  );
  
  offlineFallback();

