import * as mobx from 'mobx'
import {validators} from 'app-lib'
import UserProfile from './UserProfile'
import withVM from 'bard-instruments/lib/react-mobx/withVM'

const {observable, action, computed} = mobx

class UserProfileVM {
  @observable userName = ''
  @observable password = ''
  @observable.ref error = null

  @computed get isValidDetails () {
    return (
      validators.isValidCommonName(this.userName)
    )
  }

  @computed get canSubmitDelete () {
    return validators.isValidCommonName(this.password)
  }

  @action.bound set (prop, value) {
    this[prop] = value
  }

  @action.bound submit (event) {
    event.preventDefault()
    const changes = {name: this.userName}
    this.user.updateData(changes)
  }

  @action.bound askDeleteProfile () {
    if (window.confirm(`${this.user.name}, your account and all its data will be deleted. Are you sure?`)) {
      this.rootStore.signout()
      // Delete profile
      // this.coreStore.profilesStore.deleteProfile(this.originalProfile.id)
    }
  }

  constructor ({rootStore}) {
    const {coreStore} = rootStore
    this.user = coreStore.session.user
    this.rootStore = rootStore
    this.coreStore = rootStore.coreStore
    this.userName = this.user.name
  }
}

export default withVM(UserProfile, UserProfileVM)
