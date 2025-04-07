import 'virtual:svg-icons-register'
import './index.less'
import {Router, html5HistoryPlugin, windowTitlePlugin} from 'bard-router'
import {Provider} from 'mobx-react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {getRoutes} from './routes'
import {RootStore} from './stores/RootStore'

const router = new Router()
const rootStore = new RootStore(router)
router.routes = getRoutes()
html5HistoryPlugin.register(router)
windowTitlePlugin.register(router, window, {prefix: 'App - ', defaultTitle: 'App'})
router.on('afterNav', () => document.querySelector('.main-content')?.scrollTo(0, 0))

rootStore.init()

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider rootStore={rootStore} uiStore={rootStore.uiStore} router={router}>
    <App />
  </Provider>
)

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.rootStore = rootStore
}
