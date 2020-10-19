import * as mobx from 'mobx'

const {observable, action} = mobx

/**
 * Settings for the application
 */
export default class SettingsStore {
  /**
   * @type {'light'|'dark'}
   */
  @observable theme = 'light';
  @observable someFlag = true;
  @observable someOtherFlag = false;

  switchTheme () {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
  }

  toJS () {
    return {
      theme: this.theme,
    }
  }

  @action.bound set (prop, value) {
    this[prop] = value
  }

  @action.bound assign (props) {
    Object.assign(this, props)
  }
}
