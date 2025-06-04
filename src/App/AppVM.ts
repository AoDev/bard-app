import {setMethod} from '@lib/mobx/store.helpers'
import type {RootStore} from '@src/stores/RootStore'
import {makeAutoObservable} from 'mobx'

export class AppVM {
  rootStore: RootStore
  set = setMethod<AppVM>(this)

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore
    makeAutoObservable(this, {rootStore: false}, {autoBind: true, deep: false})
  }
}
