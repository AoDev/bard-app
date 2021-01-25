import * as mobx from 'mobx'
import {Router} from 'bard-router'
import html5HistoryPlugin from 'bard-router/lib/plugins/html5HistoryPlugin'
import windowTitlePlugin from 'bard-router/lib/plugins/windowTitlePlugin'
import scrollPlugin from 'bard-router/lib/plugins/scrollPlugin'
import UIStore from './UIStore'
import SettingsStore, {SettingsDataStore} from './SettingsStore'
import SessionStore from './SessionStore'

export default class RootStore {
  unexpectedError = null
  appIsLoading = true

  set(prop, value) {
    this[prop] = value
  }

  /**
   * Setup any boot logic.
   */
  async init() {
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

    this.set('appIsLoading', false)
  }

  /**
   * Proxy method to signout programmatically.
   */
  signout() {
    return this.router.goTo({route: '/private/signout'})
  }

  /**
   * Start a session / sign in
   */
  async startSession(credentials) {
    const success = await this.session.authenticate(credentials)
    // boot some services / load initial store data here
    return success
  }

  /**
   * End session
   */
  async endSession() {
    const success = await this.session.signout()
    // add any cleanup here
    return success
  }

  /**
   * @param {Object} options
   * @param {Object} options.routes - routes hooks for the router
   */
  constructor(options = {}) {
    this.settings = new SettingsStore()
    this.settingsDataStore = new SettingsDataStore(this.settings)
    this.session = new SessionStore()
    this.router = new Router({
      routes: options.routes,
      app: {
        rootStore: this,
      },
      routeNotFound: '/not-found',
    })
    scrollPlugin.register(this.router, window)
    // Title plugin should be registered before any history plugin
    windowTitlePlugin.register(this.router, {
      defaultTitle: 'Bard',
      prefix: 'Bard - ',
    })
    html5HistoryPlugin.register(this.router)
    this.uiStore = new UIStore(this)
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
