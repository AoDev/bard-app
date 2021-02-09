import serviceWorkerManager from './serviceWorkerManager'
import {configure} from 'mobx'
import React from 'react'
import reactDom from 'react-dom'
import App from './App'
import RootStore from './stores/RootStore'
import {Provider} from 'mobx-react'
import routes from './routes'
// import mobxSpyLogger from 'mobx-spy-logger'
// mobxSpyLogger.start()

configure({
  // useProxies: 'never',
  enforceActions: 'always',
  // computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  // observableRequiresReaction: true,
  // disableErrorBoundaries: true
})

const rootStore = new RootStore({routes})
rootStore.init()
const {uiStore, router} = rootStore

serviceWorkerManager.run(uiStore)

// AppContainer is a necessary wrapper component for HMR
const render = (Component) => {
  reactDom.render(
    <Provider rootStore={rootStore} router={router} uiStore={uiStore}>
      <Component />
    </Provider>,
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

if (process.env.NODE_ENV === 'development' || localStorage.getItem('devExposeStore')) {
  window.rootStore = rootStore
}

export default {
  rootStore,
}
