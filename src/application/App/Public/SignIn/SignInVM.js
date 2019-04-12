import * as mobx from 'mobx'
import {validators} from 'app-lib'

const {observable, action, computed} = mobx

/**
 * UI Model for the login form
 */
export default class SignInVM {
  @observable name = ''
  @observable password = ''

  @computed get isValid () {
    return (
      validators.isValidCommonName(this.password)
    )
  }

  @action.bound set (prop, value) {
    this[prop] = value
  }

  /**
   * Check that the pass is ok and the redirect to dashboards
   */
  @action.bound async submit (event) {
    event.preventDefault()

    const signedIn = await this.coreStore.startSession({password: this.password})
    if (signedIn) {
      this.router.goTo({route: '/private/dashboards'})
    }
    else {
      window.alert(`Authentication failed ${this.session.error.message}`)
    }
  }

  /**
   * New profile form model
   * @param {Object} options
   * @param options.profilesStore
   */
  constructor (rootStore) {
    this.coreStore = rootStore.coreStore
    this.session = rootStore.coreStore.session
    this.router = rootStore.router
  }
}
