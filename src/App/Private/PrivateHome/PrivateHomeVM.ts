import {assignMethod, setMethod} from '@lib/mobx/store.helpers'
import type {RootStore} from '@src/stores'
import {makeAutoObservable} from 'mobx'

export class PrivateHomeVM {
  rootStore: RootStore
  set = setMethod<PrivateHomeVM>(this)
  assign = assignMethod<PrivateHomeVM>(this)

  destroyVM() {
    // cleanup
  }

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore

    makeAutoObservable(this, {rootStore: false}, {autoBind: true, deep: false})
  }
}
