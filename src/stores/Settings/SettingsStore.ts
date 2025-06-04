import {assignMethod, setMethod, toggleMethod} from '@lib/mobx/store.helpers'
import type {Theme} from '@src/config/appConfig'
import * as mobx from 'mobx'

export interface ISettingsStore {
  theme: Theme
}

export class SettingsStore implements ISettingsStore {
  set = setMethod<SettingsStore>(this)
  assign = assignMethod<SettingsStore>(this)
  toggle = toggleMethod<SettingsStore>(this)

  theme: Theme = 'dark'

  switchTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
  }

  constructor() {
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
