import {setMethod} from '@lib/mobx/store.helpers'
import * as mobx from 'mobx'

/**
 * Specific state for the buttons demo
 */
export class DemoButtonsVM {
  set = setMethod<DemoButtonsVM>(this)

  iButtonIsLoading = false
  iButtonDisabled = false
  iButtonActive = false
  iButtonFocused = false
  iButtonCaretRight = false
  iButtonCaretRightEnd = false
  iButtonIcon = false
  iButtonRound = false
  iButtonNarrow = false

  iBtnSelected: 'one' | 'two' = 'one'

  constructor() {
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
