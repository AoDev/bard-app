import * as mobx from 'mobx'
const {observable, action} = mobx

/**
 * Model for the user
 */
export default class UserModel {
  @observable id = ''
  @observable name = ''

  @action.bound set (prop, value) {
    this[prop] = value
  }

  @action.bound assign (props) {
    Object.assign(this, props)
  }

  @action.bound async updateData (updatedUserData) {
    // await some external API to update
    // Note: possibility to use observable patterns for automatic updates
    this.assign(updatedUserData)
  }

  constructor (userData) {
    this.assign(userData)
  }
}
