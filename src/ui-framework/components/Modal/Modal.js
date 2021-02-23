import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import Button from '../Button'
import {Portal} from 'react-portal'

/**
 * @typedef {import ('../../../application/shared-components/viewModels/ConfirmDialogVM').default} ConfirmDialogVM
 * @typedef {import ('../../../application/shared-components/viewModels/DialogVM').default} DialogVM
 */

/**
 * @typedef {Object} modalProps
 * @property {boolean} withCloseButton
 * @property {ConfirmDialogVM|DialogVM} modalVM
 * @property {string} cancelText
 * @property {string} btnVariant
 * @property {object} children
 * @property {string} className
 * @property {string} closeText
 * @property {string} confirmText
 * @property {boolean} canCancel
 * @property {boolean} small
 */

/**
 * @param {modalProps} props
 */
export function Modal(props) {
  const {modalVM} = props
  let modalClasses = props.small ? 'modal--small' : 'modal'
  modalClasses += modalVM.state === 'showing' || modalVM.state === 'visible' ? ' zoomIn' : ''
  modalClasses += modalVM.state === 'hiding' ? ' zoomOut' : ''

  if (props.className) {
    modalClasses += props.className
  }

  if (!modalVM.visible) {
    return null
  }

  const {isConfirmDialog} = modalVM
  const btnWrapperCss = props.btnVariant === 'link' ? 'flex-col-end' : 'flex-col-end padded-1'
  const hideByOverlayClick =
    (isConfirmDialog && modalVM.canCancel) || !isConfirmDialog ? modalVM.hide : null

  return (
    <Portal>
      <div className="modal-overlay" onClick={hideByOverlayClick}>
        <div className={modalClasses}>
          <div className="flex-col height-100p">
            <div className="scroll-y">{props.children}</div>
            {!isConfirmDialog && props.withCloseButton && (
              <div className={btnWrapperCss}>
                <div className="flex-row-center">
                  <Button className="modal__btn" variant={props.btnVariant} onClick={modalVM.hide}>
                    {props.closeText}
                  </Button>
                </div>
              </div>
            )}
            {isConfirmDialog && (
              <div className={btnWrapperCss}>
                <div className="flex-row-center">
                  {modalVM.canCancel && (
                    <Button
                      className="modal__btn"
                      variant={props.btnVariant}
                      onClick={modalVM.cancel}
                    >
                      {props.cancelText}
                    </Button>
                  )}

                  {modalVM.canConfirm && (
                    <Button
                      className="modal__btn"
                      variant={props.btnVariant}
                      onClick={modalVM.confirm}
                    >
                      {props.confirmText}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  )
}

Modal.propTypes = {
  withCloseButton: PropTypes.bool.isRequired,
  modalVM: PropTypes.shape({
    hide: PropTypes.func,
    show: PropTypes.func,
    visible: PropTypes.bool.isRequired,
    canConfirm: PropTypes.bool,
    canCancel: PropTypes.bool,
    toggle: PropTypes.func,
  }).isRequired,
  cancelText: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  closeText: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  canCancel: PropTypes.bool.isRequired,
  small: PropTypes.bool.isRequired,
  btnVariant: PropTypes.string.isRequired,
}

Modal.defaultProps = {
  btnVariant: 'link',
  closeText: 'Done',
  withCloseButton: true,
  small: false,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  canCancel: true,
}

export default observer(Modal)
