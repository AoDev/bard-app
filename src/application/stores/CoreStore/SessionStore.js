import * as mobx from 'mobx'
import authApi from 'app-lib/authApi'
import UserModel from './UserModel'

const {observable, action} = mobx

/**
 * Model for the session, authentication state, etc
 */
export default class SessionStore {
  @observable isAuthenticating = false
  @observable signedIn = false
  @observable.ref error = null

  @action.bound set (prop, value) {
    this[prop] = value
  }

  @action.bound assign (props) {
    Object.assign(this, props)
  }

  /**
   * Call some service to authenticate
   * @param {*} credentials
   */
  @action.bound async authenticate (credentials) {
    this.assign({isAuthenticating: true, error: null})
    try {
      const userData = await authApi.authenticate(credentials)
      this.set('signedIn', true)
      this.user.assign(userData)
      return true
    }
    catch (err) {
      this.set('error', err)
      return false
    }
    finally {
      this.set('isAuthenticating', false)
    }
  }

  /**
   * Call some service to logout
   */
  @action.bound async signout () {
    this.assign({isAuthenticating: true, error: null})
    try {
      await authApi.signout()
      this.set('signedIn', false)
      return true
    }
    catch (err) {
      this.set('error', err)
      return false
    }
    finally {
      this.set('isAuthenticating', false)
    }
  }

  constructor () {
    this.user = new UserModel()
  }
}
