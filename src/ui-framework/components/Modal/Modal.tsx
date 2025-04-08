import {observer} from 'mobx-react'
import type {ReactNode} from 'react'
import {createPortal} from 'react-dom'
import type {DialogVM} from '../..'
import {Button, type ButtonVariant} from '../Button'

export interface IModalProps {
  btnVariant?: ButtonVariant
  cancelText?: string
  children: ReactNode
  className?: string
  closeText?: string
  confirmText?: string
  fullscreen?: boolean
  height?: React.CSSProperties['height']
  modalVM: DialogVM
  right?: boolean
  scrollable?: boolean
  variant?: 'white'
  width?: '1x' | '2x' | '3x' | '4x'
  withCloseButton?: boolean
}

/**
 * Modal component
 * @example
 * <Modal modalVM={modalVM} withCloseButton width="2x">
 *   <div>
 *     Modal content
 *   </div>
 * </Modal>
 */
export const Modal = observer((props: IModalProps) => {
  const {
    modalVM,
    className = '',
    btnVariant = 'link',
    right = false,
    scrollable = true,
    withCloseButton = false,
    width = '3x',
    fullscreen,
  } = props

  if (!modalVM.visible) {
    return null
  }

  const widthClass = fullscreen ? 'modal--fullscreen' : `modal--${width}`
  const cssClasses = `${widthClass} ${right ? 'modal--right' : ''} ${modalVM.dialogClassName} ${className}`
  const overlayClasses = fullscreen
    ? 'modal-overlay--invisible'
    : modalVM.state === 'showing' || modalVM.state === 'visible'
      ? 'modal-overlay fade-in'
      : 'modal-overlay fade-out'

  const style = props.height
    ? typeof props.height === 'number'
      ? {height: `${props.height}px`, top: `calc(45% - ${props.height}px / 2)`}
      : {height: props.height}
    : {}

  return createPortal(
    <>
      <div className={cssClasses} style={style}>
        <div className="flex-col height-100p">
          <div className={`flex-fill ${scrollable ? 'scrollbar-discreet-y' : ''}`}>
            {props.children}
          </div>
          {!modalVM.isConfirmDialog && withCloseButton && (
            <div className="flex-col-end pad-05">
              <div className="flex-row-center">
                <Button className="modal__btn" variant={btnVariant} onClick={modalVM.hide}>
                  {props.closeText || 'Done'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={overlayClasses} onClick={modalVM.onOverlayClick} />
    </>,
    document.body
  )
})
