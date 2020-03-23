import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import Button from '../Button'
import {Portal} from 'react-portal'

/**
 * @typedef {Object} modalProps
 * @property {boolean} withCloseButton
 * @property {object} modalVM
 * @property {string} cancelText
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
export function Modal (props) {
  let modalClasses = props.small ? 'modal--small' : 'modal'
  modalClasses += ' zoomIn'
  if (props.className) {
    modalClasses += props.className
  }

  if (!props.modalVM.visible) {
    return null
  }

  const {isConfirmDialog} = props.modalVM

  return (
    <Portal>
      <div className="modal-overlay">
        <div className={modalClasses}>
          <div className="flex-col height-100p">
            <div>
              {props.children}
            </div>
            {!isConfirmDialog && props.withCloseButton &&
              <div className="flex-col-end">
                <div className="flex-row-center">
                  <Button className="modal__btn" variant="link" onClick={props.modalVM.hide}>
                    {props.closeText}
                  </Button>
                </div>
              </div>
            }
            {isConfirmDialog &&
              <div className="flex-col-end">
                <div className="flex-row-center">
                  {props.modalVM.canCancel &&
                    <Button className="modal__btn" variant="link" onClick={props.modalVM.cancel}>
                      {props.cancelText}
                    </Button>
                  }

                  <Button className="modal__btn" variant="link" onClick={props.modalVM.confirm}>
                    {props.confirmText}
                  </Button>
                </div>
              </div>
            }
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
    toggleVisibility: PropTypes.func,
  }).isRequired,
  cancelText: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  closeText: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  canCancel: PropTypes.bool.isRequired,
  small: PropTypes.bool.isRequired,
}

Modal.defaultProps = {
  closeText: 'Done',
  withCloseButton: true,
  small: false,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  canCancel: true,
}

export default observer(Modal)
