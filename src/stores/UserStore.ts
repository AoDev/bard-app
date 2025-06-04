import {assignMethod, setMethod} from '@lib/mobx/store.helpers'
import {sleep} from '@src/lib/async'
import {makeAutoObservable} from 'mobx'

export class UserStore {
  set = setMethod<UserStore>(this)
  assign = assignMethod<UserStore>(this)
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
    makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
