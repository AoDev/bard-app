import * as mobx from 'mobx'
import cn from 'classnames'

function register (uiStore) {
  mobx.autorun(
    () => {
      const htmlBody = window.document.querySelector('html')
      const bodyClass = cn('bg-with-gradient', {
        'dimensions-locked': uiStore.settingsDialog.visible,
        'bg-light': !uiStore.rootStore.router.route.startsWith('/public'),
      })

      htmlBody.setAttribute('class', bodyClass)
      htmlBody.setAttribute('theme', uiStore.theme)
    },
    {name: 'autoUpdateBodyClass'}
  )
}

export default {
  register
}
