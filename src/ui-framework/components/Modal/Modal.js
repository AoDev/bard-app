import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Portal} from 'react-portal'

export function Modal (props) {
  const className = props.className ? `modal ${props.className}` : 'modal'

  if (!props.modalVM.visible) {
    return null
  }

  return (
    <Portal>
      <div className="modal-overlay">
        <div className={className}>
          {props.withCloseButton &&
            <button type="button" className="btn btn-cta modal-close-btn" onClick={props.modalVM.hide}>
              Done
            </button>
          }
          {props.children}
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
  children: PropTypes.node,
  className: PropTypes.string,
}

Modal.defaultProps = {
  withCloseButton: true,
}

export default observer(Modal)
