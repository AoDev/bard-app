import * as mobx from 'mobx'
import DialogVM from './DialogVM'

const {action, observable} = mobx

export default class ConfirmDialogVM extends DialogVM {
  isConfirmDialog = true
  canCancel = true
  canConfirm = true
  onConfirm = null
  onCancel = null

  assign(props) {
    Object.assign(this, props)
  }

  cancel() {
    if (this.onCancel) {
      this.onCancel()
    }
    this.hide()
  }

  confirm() {
    if (this.onConfirm) {
      this.onConfirm()
    }
    this.hide()
  }

  /**
   * @param {{id: String, visible: Boolean, onConfirm: function, onCancel: function, canCancel: boolean}} props
   */
  constructor(props = {}) {
    super(props)

    Object.assign(this, props)
    mobx.makeObservable(this, {
      canCancel: observable,
      canConfirm: observable,
      assign: action.bound,
      cancel: action.bound,
      confirm: action.bound,
    })
  }
}
