/* global workbox */
/**
 * Service worker template
 *
 */
// workbox.core.skipWaiting() // DO not use skipWaiting when we use hash in file names for cache bust.
workbox.core.clientsClaim()
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest)

const ONE_MINUTE = 60
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR

workbox.routing.registerNavigationRoute('/index.html')

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 15 * ONE_DAY,
      }),
    ],
  })
)
