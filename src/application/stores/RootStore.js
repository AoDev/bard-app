import * as mobx from 'mobx'
import CoreStore from './CoreStore'
import MobxRouter from 'bard-router/src/mobx/MobxRouter'
import html5HistoryPlugin from 'bard-router/src/plugins/html5HistoryPlugin'
import windowTitlePlugin from 'bard-router/src/plugins/windowTitlePlugin'
import vmPlugin from 'bard-router/src/plugins/vmPlugin'
import scrollPlugin from 'bard-router/src/plugins/scrollPlugin'
import UIStore from './UIStore'

const {action, observable} = mobx

export default class RootStore {
  @observable.ref unexpectedError = null

  @action.bound set (prop, value) {
    this[prop] = value
  }

  /**
   * Setup any boot logic.
   */
  async init () {
    // Listen for uncaught errors.
    // One from "normal" exceptions and another for promises.
    window.addEventListener('error', ({error}) => {
      this.set('unexpectedError', error)
      this.uiStore.unexpectedErrorDialog.show()
    })

    window.addEventListener('unhandledrejection', ({reason}) => {
      this.set('unexpectedError', reason)
      this.uiStore.unexpectedErrorDialog.show()
    })
  }

  /**
   * Proxy method to signout programmatically.
   */
  signout () {
    return this.router.goTo({route: '/private/signout'})
  }

  /**
   * @param {Object} options
   * @param {Object} options.routes - routes hooks for the router
   */
  constructor (options = {}) {
    this.coreStore = new CoreStore()
    this.router = new MobxRouter({
      routes: options.routes,
      app: {
        rootStore: this,
        coreStore: this.coreStore,
      },
      routeNotFound: '/not-found',
    })
    scrollPlugin.register(this.router, window)
    // Title plugin should be registered before any history plugin
    windowTitlePlugin.register(this.router, {
      defaultTitle: 'Bard',
      prefix: 'Bard - ',
    })
    const {vmTree} = vmPlugin.register(this.router)
    this.vmTree = vmTree
    html5HistoryPlugin.register(this.router)
    // this.router.goTo({route: '/public'})
    this.uiStore = new UIStore(this)
  }
}
