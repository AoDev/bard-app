import * as mobx from 'mobx'

/**
 * Settings for the application
 */
export default class SettingsStore {
  /**
   * @type {'light'|'dark'}
   */
  theme = 'light'

  switchTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
  }

  toJS() {
    return {
      theme: this.theme,
    }
  }

  set(prop, value) {
    this[prop] = value
  }

  assign(props) {
    Object.assign(this, props)
  }

  constructor() {
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
