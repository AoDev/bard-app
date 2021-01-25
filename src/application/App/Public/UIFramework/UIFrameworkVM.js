import * as mobx from 'mobx'
import viewModels from 'shared-components/viewModels'

/**
 * @typedef {import('../../../stores/RootStore').default} RootStore
 */

export default class UIFrameworkVM {
  /**
   * @type {boolean|null}
   */
  userHasConfirmedModal = null
  testModal = new viewModels.DialogVM({id: 'test-modal'})
  testConfirmDialog = new viewModels.ConfirmDialogVM({
    id: 'test-confirm',
    onConfirm: () => this.confirmUserAction(true),
    onCancel: () => this.confirmUserAction(false),
  })

  set(prop, value) {
    this[prop] = value
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
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
