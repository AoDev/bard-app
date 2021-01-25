import {action, observable, makeObservable} from 'mobx'

export default class BaseStore {
  pending = false

  /**
   * @type {Error}
   */
  error = null

  /**
   * Update one property
   * @param {string} prop property name
   * @param {*} value
   */
  set(prop, value) {
    this[prop] = value
  }

  /**
   * update properties from key-value object
   * @param {Object.<string, *>} props updates
   */
  assign(props) {
    Object.assign(this, props)
  }

  /**
   * Helper to handle common async operations.
   * Eg:
   ```js
   return this.request(async () => await api.getSomething())
   ```
   * @template T
   * @param {() => Promise<T>} handler actual request to do for session / user
   * @returns {Promise<T|true>}
   */
  async request(handler) {
    this.assign({pending: true, error: null})
    try {
      const result = await handler()
      return result || true
    } catch (err) {
      this.set('error', err)
      console.log(err.name, err.message)
      return false
    } finally {
      this.set('pending', false)
    }
  }

  constructor() {
    makeObservable(this, {
      assign: action.bound,
      error: observable.ref,
      pending: observable,
      request: action.bound,
      set: action.bound,
    })
  }
}
