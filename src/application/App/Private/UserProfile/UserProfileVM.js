import * as mobx from 'mobx'
import {validators} from 'app-lib'

/**
 * @typedef {import('../../../stores/RootStore').default} RootStore
 */

export default class UserProfileVM {
  userName = ''
  password = ''
  error = null

  get isValidDetails() {
    return validators.isValidCommonName(this.userName)
  }

  get canSubmitDelete() {
    return validators.isValidCommonName(this.password)
  }

  set(prop, value) {
    this[prop] = value
  }

  submit(event) {
    event.preventDefault()
    const changes = {name: this.userName}
    this.user.updateData(changes)
  }

  askDeleteProfile() {
    if (
      window.confirm(
        `${this.user.name}, your account and all its data will be deleted. Are you sure?`
      )
    ) {
      this.rootStore.signout()
      // Delete profile
      // this.rootStore.profilesStore.deleteProfile(this.originalProfile.id)
    }
  }

  /**
   * @param {{rootStore: RootStore}} arg
   */
  constructor({rootStore}) {
    this.user = rootStore.session.user
    this.rootStore = rootStore
    this.rootStore = rootStore
    this.userName = this.user.name
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
