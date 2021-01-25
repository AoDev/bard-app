import * as mobx from 'mobx'
import {storage} from 'app-services'
import validators from 'app-lib/validators'

const {assert} = validators

/**
 * Manage the retrieval and persistance of app settings.
 */
export default class SettingsDataStore {
  /**
   * @returns {Promise} settings
   */
  getSettings() {
    return storage.get('app.settings', {})
  }

  /**
   * @param {Object} settings
   * @returns {Promise}
   */
  saveSettings(settings) {
    assert.isObject(settings)
    return storage.save('app.settings', settings)
  }

  /**
   * Setup automatic persistence
   */
  async init() {
    const storedSettings = await this.getSettings()
    this.settingsStore.assign(storedSettings)

    /**
     * Auto save app settings on every change.
     */
    this.stopAutoSaveSettings = mobx.reaction(
      () => {
        // "We enumerate which props/setting need to be sync so mobx observe them."
        const {someFlag, someOtherFlag} = this.settingsStore
        return {someFlag, someOtherFlag}
      },
      (settings) => this.saveSettings(settings),
      {name: 'autoSaveSettings', delay: 200}
    )
  }

  destroy() {
    this.stopAutoSaveSettings()
  }

  constructor(settingsStore) {
    this.settingsStore = settingsStore
    this.init()
  }
}
