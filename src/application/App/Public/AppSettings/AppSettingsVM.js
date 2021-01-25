import * as mobx from 'mobx'
/**
 * @typedef {import('../../../stores/RootStore.js').default} RootStore
 */

export default class AppSettingsVM {
  /**
   * @param {{rootStore: RootStore}}
   */
  constructor({rootStore}) {
    mobx.makeAutoObservable(this)
    this.settings = rootStore.settings
  }
}
