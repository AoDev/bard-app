import * as store from '@lib/mobx/store.helpers'
import type {RootStore} from '@src/stores'
import {makeAutoObservable} from 'mobx'

export class PrivateHomeVM {
  rootStore: RootStore
  set: store.SetMethod<PrivateHomeVM>
  assign: store.AssignMethod<PrivateHomeVM>

  destroyVM() {
    // cleanup
  }

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore
    this.set = store.setMethod<PrivateHomeVM>(this)
    this.assign = store.assignMethod<PrivateHomeVM>(this)
    makeAutoObservable(this, {rootStore: false}, {autoBind: true, deep: false})
  }
}
