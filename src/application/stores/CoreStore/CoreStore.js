import * as mobx from 'mobx'
import SessionStore from './SessionStore'
import SettingsDataStore from './SettingsDataStore'
import SettingsStore from './SettingsStore'

const {observable, action} = mobx

/**
 * The main app store, passed to the apps component via context
 */
export default class CoreStore {
  static REFRESH_FREQUENCY = 5 * 60 * 1000
  static appName = 'Bard'

  @observable appIsLoading = true

  @action.bound set (prop, value) {
    this[prop] = value
  }

  /**
   * Start a session / sign in
   */
  @action.bound async startSession (credentials) {
    const success = await this.session.authenticate(credentials)
    // boot some services / load initial store data here
    return success
  }

  /**
   * End session
   */
  @action.bound async endSession () {
    const success = await this.session.signout()
    // add any cleanup here
    return success
  }

  /**
   * Init / check: onboarding status, profiles, settings, news feeds
   * @returns {Promise{onboardingStatus: Object, profiles: Array}}
   */
  async init () {
    // load stuff
    this.set('appIsLoading', false)
  }

  /**
   * Create app model
   */
  constructor () {
    this.settings = new SettingsStore()
    this.settingsDataStore = new SettingsDataStore(this.settings)
    this.session = new SessionStore()
    this.init()
  }
}
