import * as mobx from 'mobx'
import authApi from 'app-lib/authApi'
import UserModel from './UserModel'

/**
 * Model for the session, authentication state, etc
 */
export default class SessionStore {
  isAuthenticating = false
  signedIn = false
  error = null

  set(prop, value) {
    this[prop] = value
  }

  assign(props) {
    Object.assign(this, props)
  }

  /**
   * Call some service to authenticate
   * @param {*} credentials
   */
  async authenticate(credentials) {
    this.assign({isAuthenticating: true, error: null})
    try {
      const userData = await authApi.authenticate(credentials)
      this.set('signedIn', true)
      this.user.assign(userData)
      return true
    } catch (err) {
      this.set('error', err)
      return false
    } finally {
      this.set('isAuthenticating', false)
    }
  }

  /**
   * Call some service to logout
   */
  async signout() {
    this.assign({isAuthenticating: true, error: null})
    try {
      await authApi.signout()
      this.set('signedIn', false)
      return true
    } catch (err) {
      this.set('error', err)
      return false
    } finally {
      this.set('isAuthenticating', false)
    }
  }

  constructor() {
    this.user = new UserModel()
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
