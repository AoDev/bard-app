import * as mobx from 'mobx'
import Dialog from './Dialog'

const {action, observable} = mobx

export default class ConfirmDialog extends Dialog {
  isConfirmDialog = true
  @observable canCancel = true
  @observable canConfirm = true
  @observable.ref onConfirm = null
  @observable.ref onCancel = null

  @action.bound assign (props) {
    Object.assign(this, props)
  }

  @action.bound cancel () {
    if (this.onCancel) {
      this.onCancel()
    }
    this.hide()
  }

  @action.bound confirm () {
    if (this.onConfirm) {
      this.onConfirm()
    }
    this.hide()
  }

  /**
   * @param {{id: String, visible: Boolean, onConfirm: function, onCancel: function, canCancel: boolean}} props
   */
  constructor (props = {}) {
    super(props)
    Object.assign(this, props)
  }
}
