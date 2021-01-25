import * as mobx from 'mobx'
/**
 * @typedef {import ('./UIStore').default} UIStore
 */

/**
 * @param {UIStore} uiStore
 */
function register(uiStore) {
  mobx.autorun(
    () => {
      const htmlBody = window.document.querySelector('html')
      let bodyClass = ''
      if (uiStore.settingsDialog.visible) {
        bodyClass += 'dimensions-locked'
      }
      htmlBody.setAttribute('class', bodyClass)
      htmlBody.setAttribute('theme', uiStore.theme)
    },
    {name: 'autoUpdateBodyClass'}
  )
}

export default {
  register,
}
