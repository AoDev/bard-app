import * as mobx from 'mobx'

const {observable, action} = mobx

/**
 * Settings for the application
 */
export default class SettingsStore {
  /**
   * @type {'light'|'dark'}
   */
  theme = 'light'
  someFlag = true
  someOtherFlag = false

  constructor() {
    mobx.makeObservable(this, {
      theme: observable,
      someFlag: observable,
      someOtherFlag: observable,
      set: action.bound,
      assign: action.bound,
      switchTheme: action.bound,
    })
  }

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
}
