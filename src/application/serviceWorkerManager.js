import {Workbox, messageSW} from 'workbox-window'
/**
 * @typedef {import ('./stores/UIStore/UIStore.js').default} UIStore
 */

/**
 * @param {UIStore} uiStore
 * @see https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
 */
async function run(uiStore) {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/service-worker.js')
    let registration

    // Show app update dialog
    const showSkipWaitingPrompt = (event) => {
      const {appUpdateDialog} = uiStore
      appUpdateDialog.set('onConfirm', () => {
        wb.addEventListener('controlling', () => {
          window.location.reload()
        })
        if (registration && registration.waiting) {
          messageSW(registration.waiting, {type: 'SKIP_WAITING'})
        }
      })
      appUpdateDialog.show()
    }

    wb.addEventListener('activated', (event) => {
      if (!event.isUpdate) {
        console.log('First time service worker activation.')
      }
    })

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener('waiting', showSkipWaitingPrompt)
    wb.addEventListener('externalwaiting', showSkipWaitingPrompt)

    try {
      registration = await wb.register()
      console.log('SW registered')
    } catch (err) {
      console.log('SW registration failed', err)
    }
  }
}

export default {
  run,
}
