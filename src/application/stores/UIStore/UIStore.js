import * as mobx from 'mobx'
import viewModels from 'shared-components/viewModels'
import ObservableViewport from './ObservableViewport'
// import bodyElementPlugin from './bodyElementPlugin'

const {computed, action} = mobx

export default class UIStore {
  mainSideMenu = new viewModels.Dialog({id: 'main-side-menu'})
  settingsDialog = new viewModels.Dialog({id: 'settingsDialog'})
  unexpectedErrorDialog = new viewModels.Dialog({id: 'appUnexpectedError'})
  viewPort = new ObservableViewport()

  @computed get headerTitle () {
    const {route} = this.router

    if (route.startsWith('/public/app-settings')) {
      return 'App settings'
    }

    if (route.endsWith('faq')) {
      return 'FAQ'
    }
    return 'Bard'
  }

  @computed get screenSize () {
    const {width} = this.viewPort.size
    return {
      sm: width <= 720,
      mdMinus: width <= 960,
      md: width > 720 && width <= 960,
      lg: width > 960,
      mdPlus: width > 720,
    }
  }

  @action.bound set (prop, value) {
    this[prop] = value
  }

  @action.bound toggleProp (prop) {
    this[prop] = !this[prop]
  }

  @action.bound handleMainMenuClick () {
    this.mainSideMenu.hide()
  }

  constructor (rootStore) {
    this.coreStore = rootStore.coreStore
    this.router = rootStore.router
    this.rootStore = rootStore
    // bodyElementPlugin.register(this)
  }
}
