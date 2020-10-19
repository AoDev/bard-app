import * as mobx from 'mobx'
import viewModels from 'shared-components/viewModels'
import ObservableViewport from './ObservableViewport'
import bodyElementPlugin from './bodyElementPlugin'
import MainSideMenuVM from '../../App/MainSideMenu/MainSideMenuVM'

/**
 * @typedef {import ('../RootStore').default} RootStore
 */

const {computed, action} = mobx

export default class UIStore {
  static colors = {
    light: {
      'blue-aim': '#009ddb',
      'blue-vivid': '#00b7ff',
      'color-font-default': '#192d44',
      'gray-aim': '#65727b',
      'gray-dark': '#7e8995',
      'gray-darker': '#505d62',
      'gray-darkest': '#233241',
      'gray-light': '#d4d8dc',
      'gray-lighter': '#e9edf1',
      'gray-lightest': '#f5f5f5',
      'gray-mid': '#aab1b9',
      'green-aim': '#13aa6b',
      'green-vivid': '#51ac00',
      'orange-aim': '#ff7a07',
      'red-aim': '#d90146',
      'red-vivid': '#ff020a',
      brand: '#4e0fa6',
      'brand-green': '#13aa6b',
      'brand-red': '#ff3278',
      green: '#0a0',
      teal: '#009daa',
    },
    dark: {
      'blue-aim': '#009ddb',
      'blue-vivid': '#00b7ff',
      'color-font-default': '#ffffff',
      'gray-aim': '#aab1b9',
      'gray-dark': '#7e8995',
      'gray-darker': '#505d62',
      'gray-darkest': '#233241',
      'gray-light': '#d4d8dc',
      'gray-lighter': '#e9edf1',
      'gray-lightest': '#f5f5f5',
      'gray-mid': '#aab1b9',
      'green-aim': '#16c179',
      'green-vivid': '#51ac00',
      'orange-aim': '#ff7a07',
      'red-aim': '#d90146',
      'red-vivid': '#ff020a',
      brand: '#4e0fa6',
      'brand-green': '#13aa6b',
      'brand-red': '#ff3278',
      green: '#0a0',
      teal: '#009daa',
    },
  }

  /**
   * @type {MainSideMenuVM}
   */
  mainSideMenuVM = null
  mainSideMenu = new viewModels.Dialog({id: 'main-side-menu'})
  settingsDialog = new viewModels.Dialog({id: 'settingsDialog'})
  unexpectedErrorDialog = new viewModels.Dialog({id: 'appUnexpectedError'})
  viewPort = new ObservableViewport()

  /**
   * @type {'dark'|'light'}
   */
  @computed get theme () {
    return this.coreStore.settings.theme
  }

  @computed get colors () {
    return UIStore.colors[this.theme]
  }

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

  /**
   * @param {RootStore} rootStore
   */
  constructor (rootStore) {
    this.coreStore = rootStore.coreStore
    this.router = rootStore.router
    this.rootStore = rootStore
    this.mainSideMenuVM = new MainSideMenuVM({rootStore})
    bodyElementPlugin.register(this)
  }
}
