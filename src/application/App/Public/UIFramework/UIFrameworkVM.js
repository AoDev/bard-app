import * as mobx from 'mobx'
import viewModels from 'shared-components/viewModels'

/**
 * @typedef {import('../../../stores/RootStore').default} RootStore
 */

class DemoFormVM {
  inputSwitch = false

  set(prop, value) {
    this[prop] = value
  }

  constructor() {
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}

export default class UIFrameworkVM {
  /**
   * @type {boolean|null}
   */
  userHasConfirmedModal = null
  demoFormVM = new DemoFormVM()
  testModal = new viewModels.DialogVM({id: 'test-modal'})
  testModalWithTransition = new viewModels.DialogVM({
    id: 'test-modal-transition',
    transitionDelay: 200,
  })

  testConfirmDialog = new viewModels.ConfirmDialogVM({
    id: 'test-confirm',
    onConfirm: () => this.confirmUserAction(true),
    onCancel: () => this.confirmUserAction(false),
  })

  inputButtonIsLoading = false
  inputButtonDisabled = false
  inputButtonActive = false
  inputSmallModal = false
  inputModalWithCloseButton = true

  set(prop, value) {
    this[prop] = value
  }

  toggle(prop) {
    this[prop] = !this[prop]
  }

  /**
   * @param {boolean} hasConfirmed
   */
  confirmUserAction(hasConfirmed) {
    this.userHasConfirmedModal = hasConfirmed
    setTimeout(() => {
      this.set('userHasConfirmedModal', null)
    }, 2000)
  }

  /**
   * @param {{rootStore: RootStore}} param0
   */
  constructor({rootStore}) {
    this.rootStore = rootStore
    this.router = rootStore.router
    this.uiStore = rootStore.uiStore
    this.settings = rootStore.settings
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
