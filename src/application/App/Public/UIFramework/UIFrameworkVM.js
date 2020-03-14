import * as mobx from 'mobx'
import viewModels from 'shared-components/viewModels'

/**
 * @typedef {import('../../../stores/RootStore').default} RootStore
 */

const {observable, action, computed} = mobx

export default class UIFrameworkVM {
  @observable something = ''
  testModal = new viewModels.Dialog({id: 'test-modal'})
  testConfirmDialog = new viewModels.ConfirmDialog({
    id: 'test-confirm',
    onConfirm: () => window.alert('you confirmed'),
    onCancel: () => window.alert('you canceled'),
  })

  @computed get formattedData () {
    return ''
  }

  @action.bound set (prop, value) {
    this[prop] = value
  }

  @action.bound assign (props) {
    Object.assign(this, props)
  }

  /**
   * @param {{rootStore: RootStore}} param0
   */
  constructor ({rootStore}) {
    this.coreStore = rootStore.coreStore
    this.router = rootStore.router
    this.uiStore = rootStore.uiStore
  }
}
