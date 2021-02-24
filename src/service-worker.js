/**
 * Service worker template
 */
import {precacheAndRoute, createHandlerBoundToURL} from 'workbox-precaching'
import {clientsClaim, skipWaiting} from 'workbox-core'
import {registerRoute, NavigationRoute} from 'workbox-routing'
import {CacheFirst} from 'workbox-strategies'
import {ExpirationPlugin} from 'workbox-expiration'

clientsClaim()
precacheAndRoute(self.__WB_MANIFEST)

// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting()
  }
})

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
