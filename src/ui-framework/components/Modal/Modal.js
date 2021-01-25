import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import Button from '../Button'
import {Portal} from 'react-portal'

/**
 * @typedef {import ('../../../application/shared-components/viewModels/ConfirmDialog').default} ConfirmDialog
 * @typedef {import ('../../../application/shared-components/viewModels/Dialog').default} Dialog
 */

/**
 * @typedef {Object} modalProps
 * @property {boolean} withCloseButton
 * @property {ConfirmDialog|Dialog} modalVM
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
  let modalClasses = props.small ? 'modal--small' : 'modal'
  modalClasses += ' zoomIn'
  if (props.className) {
    modalClasses += props.className
  }

  if (!props.modalVM.visible) {
    return null
  }

  const {isConfirmDialog} = props.modalVM
  const btnWrapperCss = props.btnVariant === 'link' ? 'flex-col-end' : 'flex-col-end padded-1'

  return (
    <Portal>
      <div className="modal-overlay">
        <div className={modalClasses}>
          <div className="flex-col height-100p">
            <div className="scroll-y">{props.children}</div>
            {!isConfirmDialog && props.withCloseButton && (
              <div className={btnWrapperCss}>
                <div className="flex-row-center">
                  <Button
                    className="modal__btn"
                    variant={props.btnVariant}
                    onClick={props.modalVM.hide}
                  >
                    {props.closeText}
                  </Button>
                </div>
              </div>
            )}
            {isConfirmDialog && (
              <div className={btnWrapperCss}>
                <div className="flex-row-center">
                  {props.modalVM.canCancel && (
                    <Button
                      className="modal__btn"
                      variant={props.btnVariant}
                      onClick={props.modalVM.cancel}
                    >
                      {props.cancelText}
                    </Button>
                  )}

                  {props.modalVM.canConfirm && (
                    <Button
                      className="modal__btn"
                      variant={props.btnVariant}
                      onClick={props.modalVM.confirm}
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
    toggleVisibility: PropTypes.func,
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
