import PropTypes from 'prop-types'
import React from 'react'
import Loader from '../Loader'
import Icon from '../Icon'

/**
 * @typedef {Object} buttonProps
 * @property {boolean} disabled
 * @property {boolean} disabledMock
 */

const loaderPlacement = {
  position: 'absolute',
  left: '50%',
  marginLeft: '-20px',
}

const loader = <div style={loaderPlacement}><Loader/></div>
const iconCaretRight = <span className="space-left-1ch"><Icon name="#caret-right" size={14} top={-2}/></span>
const iconCaretRightEnd = <span className="space-left-1ch float-right"><Icon name="#caret-right" size={14} top={-2}/></span>

/**
 * Extended Button component
 *
 * __Extras compared to normal html button:__
 *
 * * You can pass a isLoading attribute to replace the text by a loader.
 * * By default it is of type "button" where html has no default value.
 */
export default class Button extends React.Component {
  /**
   * @param {buttonProps} props
   */
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.btnRef = this.btnRef.bind(this)
  }

  componentDidMount () {
    if (this.props.focusOnMount) {
      this.btnElement.focus()
    }
    if (this.props.scrollToOnMount) {
      this.btnElement.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  btnRef (btnElement) {
    this.btnElement = btnElement
  }

  /**
   * Call the onChange handler with different arguments, depending on the
   * emit option.
   * It will also take care of converting strings to number when necessary
   * because assigning a number to a select option value is always a string.
   * @param {Event} event
   */
  onClick (event) {
    const {onClick, preventDefault, disabledMock, value} = this.props
    if (preventDefault || disabledMock) {
      // disabled mock is to prevent Safari Mobile from doing zoomish gesture
      // for type="submit" button, it is a form event and preventDefault must be called.
      event.preventDefault()
    }

    if (!onClick || disabledMock) {
      return false
    }

    switch (this.props.onClickEmit) {
      case 'event': onClick(event); break
      case 'value': onClick(value, event); break
      case 'name-value': onClick(this.props.name, value, event)
    }
  }

  render () {
    const {
      active, children, className, disabled, disabledMock, focusOnMount, isLoading, onClick,
      onClickEmit, preventDefault, ripple, round, scrollToOnMount, square, variant,
      block, caretRight, caretRightEnd, ...otherProps
    } = this.props

    const variantClass = variant ? 'btn--' + variant : ''

    let cssClasses = `${variantClass} ${className}`
    block && (cssClasses += ' block')
    round && (cssClasses += ' btn-round')
    square && (cssClasses += ' btn-square')
    active && (cssClasses += ' active')
    ripple && (cssClasses += ' ripple')
    ;(isLoading || disabled || disabledMock) && (cssClasses += ' disabled')
    isLoading && (cssClasses += ' btn-loading')

    return (
      <button {...otherProps}
        ref={this.btnRef}
        onClick={this.onClick}
        className={cssClasses}
        disabled={disabled || isLoading}>
        {isLoading && loader}
        {children}
        {caretRight && iconCaretRight}
        {caretRightEnd && iconCaretRightEnd}
      </button>
    )
  }
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
  type: PropTypes.string,
  onClick: PropTypes.func,
  preventDefault: PropTypes.bool.isRequired,
  onClickEmit: PropTypes.oneOf(['event', 'value', 'name-value']).isRequired,
  name: PropTypes.string,
  value: PropTypes.any, // eslint-disable-line
  active: PropTypes.bool,
  focusOnMount: PropTypes.bool.isRequired,
  scrollToOnMount: PropTypes.bool.isRequired,
  ripple: PropTypes.bool.isRequired,
  square: PropTypes.bool.isRequired,
  round: PropTypes.bool.isRequired,
  disabledMock: PropTypes.bool.isRequired,
  block: PropTypes.bool.isRequired,
  caretRight: PropTypes.bool.isRequired,
  caretRightEnd: PropTypes.bool.isRequired,
}

Button.defaultProps = {
  className: '',
  disabled: false,
  disabledMock: false,
  focusOnMount: false,
  isLoading: false,
  onClickEmit: 'event',
  preventDefault: false,
  ripple: false,
  round: false,
  block: false,
  scrollToOnMount: false,
  square: false,
  type: 'button',
  caretRight: false,
  caretRightEnd: false,
}
