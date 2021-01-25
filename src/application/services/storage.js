import * as localforage from 'localforage'

const store = localforage.createInstance({
  name: 'local-store',
})

/**
 * Uses indexedDB as store
 */
const localStore = {
  /**
   * Get value from store
   * @param {String} key identifies the value
   * @param {*} defaultValue
   * @returns {Promise}
   */
  get(key, defaultValue) {
    return store.getItem(key).then((value) => (value === null ? defaultValue : value))
  },

  /**
   * Save item to store
   * @param {String} key identifies the value
   * @param {*} value
   * @returns {Promise}
   */
  save(key, value) {
    return store.setItem(key, value)
  },

  /**
   * Delete item from store
   * @param {String} key identifies the value
   * @returns {Promise}
   */
  delete(key) {
    return store.removeItem(key)
  },
}

export default localStore
