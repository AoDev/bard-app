import PropTypes from 'prop-types'
import React from 'react'
import Loader from '../Loader'
import Icon from '../Icon'
import ButtonBasic from '../ButtonBasic'

/**
 * @typedef {Object} buttonProps
 * @property {boolean} disabled
 * @property {boolean} disabledMock
 */

const loaderPlacement = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginLeft: '-20px',
  marginTop: '-10px',
}

const loader = (
  <div style={loaderPlacement}>
    <Loader />
  </div>
)
const iconCaretRight = (
  <span className="space-left-1ch">
    <Icon name="#caret-right" size={14} top={-2} />
  </span>
)
const iconCaretRightEnd = (
  <span className="space-left-1ch float-right">
    <Icon name="#caret-right" size={14} top={-2} />
  </span>
)

/**
 * Extended Button component
 *
 * __Extras compared to normal html button:__
 *
 * * You can pass a isLoading attribute to replace the text by a loader.
 * * Has variant for styling
 * * Can add caret icons easily
 */
export function Button(props) {
  const {
    active,
    children,
    className,
    disabled,
    isLoading,
    round,
    square,
    variant,
    block,
    disabledMock,
    caretRight,
    caretRightEnd,
    ...otherProps
  } = props

  const variantClass = variant ? 'btn--' + variant : ''

  let cssClasses = `${variantClass} ${className}`
  block && (cssClasses += ' block')
  round && (cssClasses += ' btn-round')
  square && (cssClasses += ' btn-square')
  active && (cssClasses += ' active')
  ;(disabled || disabledMock) && (cssClasses += ' disabled')
  isLoading && (cssClasses += ' btn-loading')

  return (
    <ButtonBasic
      {...otherProps}
      className={cssClasses}
      disabled={disabled || isLoading || disabledMock}
    >
      {isLoading && loader}
      {children}
      {caretRight && iconCaretRight}
      {caretRightEnd && iconCaretRightEnd}
    </ButtonBasic>
  )
}

Button.propTypes = {
  /**
   * Change appearance of the button
   */
  variant: PropTypes.string,
  /**
   * CSS classes for the button (see below).
   */
  className: PropTypes.string,
  /**
   * Replace the button text by a loader.
   */
  isLoading: PropTypes.bool,
  /**
   * Disables the button.
   */
  disabled: PropTypes.bool,
  /**
   * Child nodes of the button (text / image)
   */
  children: PropTypes.node,
  /**
   * Html type of button (button | submit)
   */
  active: PropTypes.bool,
  block: PropTypes.bool.isRequired,
  caretRight: PropTypes.bool.isRequired,
  caretRightEnd: PropTypes.bool.isRequired,
  disabledMock: PropTypes.bool.isRequired,
  name: PropTypes.string,
  round: PropTypes.bool.isRequired,
  square: PropTypes.bool.isRequired,
}

Button.defaultProps = {
  block: false,
  caretRight: false,
  caretRightEnd: false,
  className: '',
  disabledMock: false,
  isLoading: false,
  round: false,
  square: false,
}

export default React.memo(Button)
