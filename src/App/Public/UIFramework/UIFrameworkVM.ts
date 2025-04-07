import * as store from '@lib/mobx/store.helpers'
import {zoomTransition} from '@src/config/dialogConfig'
import type {RootStore} from '@src/stores'
import type {DialogVM, IconName} from '@ui'
import * as mobx from 'mobx'

class DemoFormVM {
  set: store.SetMethod<DemoFormVM>

  inputSwitch = false
  inputSelect = 1
  inputSelectOptions = [1, 2, 3, 4, 5]
  select2 = undefined
  selectOptions2 = [
    {id: 1, label: 'one', invalidLabel: true},
    {id: 2, label: 'two', invalidLabel: true},
  ]

  constructor() {
    this.set = store.setMethod<DemoFormVM>(this)

    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}

export class UIFrameworkVM {
  set: store.SetMethod<UIFrameworkVM>
  toggle: store.ToggleMethod<UIFrameworkVM>

  userHasConfirmedModal: null | boolean = null
  demoFormVM = new DemoFormVM()

  inputButtonIsLoading = false
  inputButtonDisabled = false
  inputButtonActive = false
  inputButtonFocused = false
  inputButtonCaretRightEnd = false
  inputButtonCaretRight = false
  inputNoteWithBackground = false
  iModalFullscreen = false
  iModalWidth: '1x' | '2x' | '3x' = '2x'
  inputModalWithCloseButton = true
  inputHideOnOverlayClick = true
  inputTableNarrow = false
  inputButtonIcon = false
  inputButtonRound = false
  inputButtonNarrow = false
  iIconBgColor = 'var(--color-green-aim)'
  iIconBgPadding = 5
  iIconColor = 'var(--color-txt-inverse)'
  iIconName: IconName = 'caret-right'
  iIconSearch = ''
  iIconSize = 24
  iBtnSelected: 'one' | 'two' = 'one'
  rootStore: RootStore
  testModal: DialogVM
  iSection: 'modals' | 'buttons' | 'forms' | 'icons' | 'typography' | 'tables' | 'notes' | 'links' =
    'buttons'

  confirmUserAction(hasConfirmed: boolean) {
    this.userHasConfirmedModal = hasConfirmed
    setTimeout(() => {
      this.set('userHasConfirmedModal', null)
    }, 2000)
  }

  destroyVM() {
    this.rootStore.uiStore.dialogs.remove([this.testModal])
  }

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore
    this.set = store.setMethod<UIFrameworkVM>(this)
    this.toggle = store.toggleMethod<UIFrameworkVM>(this)

    mobx.makeAutoObservable(this, {rootStore: false}, {deep: false, autoBind: true})
    this.testModal = this.rootStore.uiStore.dialogs.create({
      id: 'test-modal',
      transition: zoomTransition,
    })
  }
}
