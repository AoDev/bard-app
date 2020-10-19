/**
 * @typedef {import('../../../stores/RootStore.js').default} RootStore
 */

export default class AppSettingsVM {
  /**
   * @param {{rootStore: RootStore}} props
   */
  constructor ({rootStore}) {
    this.settings = rootStore.coreStore.settings
  }
}
