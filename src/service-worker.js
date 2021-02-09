/**
 * Service worker template
 *
 */
// workbox.core.skipWaiting() // DO not use skipWaiting when we use hash in file names for cache bust.

import {precacheAndRoute, createHandlerBoundToURL} from 'workbox-precaching'
import {clientsClaim} from 'workbox-core'
import {registerRoute, NavigationRoute} from 'workbox-routing'
import {CacheFirst} from 'workbox-strategies'
import {ExpirationPlugin} from 'workbox-expiration'

clientsClaim()
precacheAndRoute(self.__WB_MANIFEST)

const ONE_MINUTE = 60
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR

const navigationRoute = new NavigationRoute(createHandlerBoundToURL('/index.html'))

registerRoute(navigationRoute)

registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 15 * ONE_DAY,
      }),
    ],
  })
)
