import React from 'react'
import reactDom from 'react-dom'
import * as mobx from 'mobx'
import App from './App'
import RootStore from './stores/RootStore'
import {Provider} from 'mobx-react'
import {AppContainer} from 'react-hot-loader'
import routes from './routes'
// import mobxSpyLogger from 'mobx-spy-logger'
// mobxSpyLogger.start()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

mobx.configure({enforceActions: true})

const rootStore = new RootStore({routes})
rootStore.init()
const {coreStore, uiStore, router} = rootStore

// @see https://github.com/gaearon/react-hot-loader/issues/462#issuecomment-273666754
delete AppContainer.prototype.unstable_handleError

// AppContainer is a necessary wrapper component for HMR
const render = (Component) => {
  reactDom.render(
    <AppContainer>
      <Provider coreStore={coreStore} router={router} rootStore={rootStore} uiStore={uiStore}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}

if (process.env.NODE_ENV === 'development') {
  window.rootStore = rootStore
  window.coreStore = coreStore
}

export default {
  coreStore
}
