import type {RootStore} from '@src/stores'
import {makeAutoObservable} from 'mobx'

export class SignInVM {
  rootStore: RootStore

  async submitSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.rootStore.signIn()
  }

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore
    makeAutoObservable(this, {rootStore: false}, {autoBind: true, deep: false})
  }
}
