import {DialogVM, type IDialogOptions} from '@ui'
import {makeAutoObservable} from 'mobx'

/**
 * Allows to control dialogs with the browser history and escape key
 */
export class DialogStore {
  dialogs: DialogVM[] = []

  create(opts: IDialogOptions): DialogVM {
    const dialog = new DialogVM(opts)
    this.dialogs.push(dialog)
    return dialog
  }

  remove(modalsToRemove: DialogVM[]) {
    this.dialogs = this.dialogs.filter((dialog) => !modalsToRemove.includes(dialog))
  }

  private handleBackButton() {
    const mostRecentDialog = this.dialogs.findLast(
      (dialog) => DialogVM.visibleStates.includes(dialog.state) && dialog.hideWithBackButton
    )
    mostRecentDialog?.hide()
  }

  private handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      const mostRecentDialog = this.dialogs.findLast(
        (dialog) => DialogVM.visibleStates.includes(dialog.state) && dialog.hideWithEscapeKey
      )
      mostRecentDialog?.hide()
    }
  }

  private handlePopState() {
    this.handleBackButton()
  }

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true, deep: false})

    window.addEventListener('popstate', this.handlePopState)
    window.addEventListener('keydown', this.handleEscapeKey)
  }
}
