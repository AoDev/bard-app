import * as mobx from 'mobx'
import cn from 'classnames'

function register (uiStore) {
  mobx.autorun(
    () => {
      const bodyClass = cn('bg-with-gradient', {
        'dimensions-locked': uiStore.settingsDialog.visible,
        'bg-light': !uiStore.rootStore.router.route.startsWith('/public'),
      })

      window.document.querySelector('body').setAttribute('class', bodyClass)
    },
    {name: 'autoUpdateBodyClass'}
  )
}

export default {
  register
}
