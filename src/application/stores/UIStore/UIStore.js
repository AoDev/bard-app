import * as mobx from 'mobx'
import viewModels from 'shared-components/viewModels'
import MediaQuery from './MediaQuery'
import ObservableViewport from './ObservableViewport'
import bodyElementPlugin from './bodyElementPlugin'
import MainSideMenuVM from '../../App/MainSideMenu/MainSideMenuVM'

/**
 * @typedef {import ('../RootStore').default} RootStore
 */

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
  mainSideMenu = new viewModels.DialogVM({id: 'main-side-menu'})
  settingsDialog = new viewModels.DialogVM({id: 'settingsDialog'})
  unexpectedErrorDialog = new viewModels.DialogVM({id: 'appUnexpectedError'})
  viewPort = new ObservableViewport()
  media = new MediaQuery()

  /**
   * @type {'dark'|'light'}
   */
  get theme() {
    return this.rootStore.settings.theme
  }

  get colors() {
    return UIStore.colors[this.theme]
  }

  get headerTitle() {
    const {route} = this.router

    if (route.startsWith('/public/app-settings')) {
      return 'App settings'
    }

    if (route.endsWith('faq')) {
      return 'FAQ'
    }
    return 'Bard'
  }

  set(prop, value) {
    this[prop] = value
  }

  toggleProp(prop) {
    this[prop] = !this[prop]
  }

  handleMainMenuClick() {
    this.mainSideMenu.hide()
  }

  /**
   * @param {RootStore} rootStore
   */
  constructor(rootStore) {
    this.rootStore = rootStore
    this.router = rootStore.router
    this.rootStore = rootStore
    this.mainSideMenuVM = new MainSideMenuVM({rootStore})
    bodyElementPlugin.register(this)
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
