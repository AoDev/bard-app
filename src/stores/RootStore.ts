import * as store from '@lib/mobx/store.helpers'
import type {Router} from 'bard-router'
import {makeAutoObservable} from 'mobx'
import {SettingsDataStore, SettingsStore} from './Settings'
import {UIStore} from './UIStore'

type AppStatus = 'init' | 'ready'

export type HandledError = {
  title: string
  description: string
  error: Error | null
}

export class RootStore {
  set: store.SetMethod<RootStore>
  assign: store.AssignMethod<RootStore>

  settings: SettingsStore
  uiStore: UIStore
  storage: {settings: SettingsDataStore}
  /** For errors that we catch and handle, usually to display a warning to the user */
  handledError: HandledError | null = null
  /** For unexpected errors that bubbles to React boundaries, blocks the app and shows the error screen */
  unexpectedError: Error | null = null
  errorInfo: React.ErrorInfo | null = null
  appStatus: AppStatus = 'init'
  router: Router

  async init() {
    // Listen for uncaught errors
    window.addEventListener('error', ({error}) => {
      this.set('unexpectedError', error)
    })

    window.addEventListener('unhandledrejection', ({reason}) => {
      this.set('unexpectedError', reason)
    })
    await this.storage.settings.init()
    this.uiStore.init()
    this.set('appStatus', 'ready')
    return true
  }

  /** Keep track of unexpected errors that bubble to React boundaries */
  setErrorFromReactBoundary(unexpectedError: Error, errorInfo: React.ErrorInfo) {
    this.assign({unexpectedError, errorInfo})
  }

  /** Show an error that we caught to the user */
  showHandledError(handledError: HandledError) {
    this.assign({handledError})
    this.uiStore.handledErrorDialog.show()
  }

  constructor(router: Router) {
    this.set = store.setMethod<RootStore>(this)
    this.assign = store.assignMethod<RootStore>(this)

    this.settings = new SettingsStore()
    this.storage = {settings: new SettingsDataStore(this.settings)}
    this.uiStore = new UIStore(this)
    this.router = router

    makeAutoObservable(
      this,
      {settings: false, storage: false, uiStore: false, router: false},
      {deep: false, autoBind: true}
    )
  }
}
