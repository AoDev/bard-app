import * as mobx from 'mobx'

const {observable, action} = mobx

/**
 * Settings for the application
 */
export default class SettingsStore {
  @observable someFlag = true
  @observable someOtherFlag = false

  @action.bound set (prop, value) {
    this[prop] = value
  }

  @action.bound assign (props) {
    Object.assign(this, props)
  }
}
