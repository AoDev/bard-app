import * as store from '@lib/mobx/store.helpers'
import {sleep} from '@src/lib/async'
import {makeAutoObservable} from 'mobx'

export class UserStore {
  set: store.SetMethod<UserStore>
  assign: store.AssignMethod<UserStore>
  signedIn = false
  pending = false

  async signIn() {
    this.set('pending', true)
    await sleep(1000)
    this.assign({pending: false, signedIn: true})
  }

  async signOut() {
    await sleep(1000)
    this.assign({pending: false, signedIn: false})
  }

  constructor() {
    this.set = store.setMethod<UserStore>(this)
    this.assign = store.assignMethod<UserStore>(this)
    makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
