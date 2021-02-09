import {Workbox, messageSW} from 'workbox-window'
/**
 * @typedef {import ('./stores/UIStore/UIStore.js').default} UIStore
 */

/**
 * @param {UIStore} uiStore
 */
async function run(uiStore) {
  if ('serviceWorker' in navigator) {
    // const {Workbox, messageSW} = await import('workbox-window')
    const wb = new Workbox('/service-worker.js')
    let registration

    const showSkipWaitingPrompt = (event) => {
      uiStore.appUpdateDialog.set('onConfirm', () => {
        wb.addEventListener('controlling', () => {
          window.location.reload()
        })
        if (registration && registration.waiting) {
          messageSW(registration.waiting, {type: 'SKIP_WAITING'})
        }
      })
    }

    wb.addEventListener('activated', (event) => {
      if (!event.isUpdate) {
        console.log('First time service worker activation.')
      }
    })

    wb.addEventListener('waiting', (event) => {
      console.log(
        "A new service worker is available, but can't activate until all tabs running the current version have fully unloaded."
      )
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
