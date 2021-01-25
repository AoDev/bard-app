import * as mobx from 'mobx'

/**
 * Model for the user
 */
export default class UserModel {
  id = ''
  name = ''

  set(prop, value) {
    this[prop] = value
  }

  assign(props) {
    Object.assign(this, props)
  }

  async updateData(updatedUserData) {
    // await some external API to update
    // Note: possibility to use observable patterns for automatic updates
    this.assign(updatedUserData)
  }

  constructor(userData) {
    this.assign(userData)
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
