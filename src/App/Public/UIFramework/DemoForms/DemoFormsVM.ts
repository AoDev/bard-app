import {setMethod} from '@lib/mobx/store.helpers'
import * as mobx from 'mobx'

/**
 * Specific state for the form demo
 */
export class DemoFormsVM {
  set = setMethod<DemoFormsVM>(this)

  iTextControlled = 'delete me'
  iTextControlled2 = ''
  iSwitch = false
  iSelect = 1
  iSelectOptions = [1, 2, 3, 4, 5]
  iSelect2 = undefined
  iSelectOptions2 = [
    {id: 1, label: 'one', invalidLabel: true},
    {id: 2, label: 'two', invalidLabel: true},
  ]

  constructor() {
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
