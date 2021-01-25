import * as mobx from 'mobx'
import {validators} from 'app-lib'

/**
 * @typedef {import ('../../../stores/RootStore.js').default} RootStore
 */

/**
 * UI Model for the login form
 */
export default class SignInVM {
  name = ''
  password = ''

  get isValid() {
    return validators.isValidCommonName(this.password)
  }

  set(prop, value) {
    this[prop] = value
  }

  /**
   * Check that the pass is ok and the redirect to dashboards
   */
  async submit(event) {
    event.preventDefault()

    const signedIn = await this.rootStore.startSession({password: this.password})
    if (signedIn) {
      this.router.goTo({route: '/private/dashboards'})
    } else {
      window.alert(`Authentication failed ${this.session.error.message}`)
    }
  }

  /**
   * New profile form model
   * @param {{rootStore: RootStore}} arg
   */
  constructor({rootStore}) {
    this.rootStore = rootStore
    this.session = rootStore.session
    this.router = rootStore.router
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
