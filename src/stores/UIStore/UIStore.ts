import {zoomTransition} from '@src/config/dialogConfig'
import type {RootStore} from '@src/stores'
import type {DialogVM} from '@ui'
import {autorun, makeAutoObservable} from 'mobx'
import {DialogStore} from './DialogStore'
import {MediaQuery} from './MediaQuery'

export class UIStore {
  rootStore: RootStore
  media = new MediaQuery()
  dialogs = new DialogStore()
  settingsDialog: DialogVM
  handledErrorDialog: DialogVM
  mainSideMenu: DialogVM

  get theme() {
    return this.rootStore.settings.theme
  }

  init() {
    autorun(
      () => {
        const {theme} = this.rootStore.settings
        const htmlElement = window.document.querySelector('html')
        if (htmlElement && theme) {
          htmlElement.setAttribute('theme', theme)
        }
      },
      {name: 'autoUpdateBodyClass'}
    )
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.settingsDialog = this.dialogs.create({id: 'appSettings', transition: zoomTransition})
    this.mainSideMenu = this.dialogs.create({
      id: 'main-side-menu',
      transition: {
        showingClassName: 'fade-in',
        hidingClassName: 'fade-out',
        duration: 0,
      },
    })
    this.handledErrorDialog = this.dialogs.create({
      id: 'expectedError',
      transition: zoomTransition,
      onHide: () => this.rootStore.assign({handledError: null}),
    })
    makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
