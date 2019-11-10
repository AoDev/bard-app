import PropTypes from 'prop-types'
import React from 'react'
import Loader from '../Loader'

const loaderPlacement = {
  position: 'absolute',
  left: '50%',
  marginLeft: '-20px',
}

const loader = <div style={loaderPlacement}><Loader/></div>

/**
 * Extended Button component
 *
 * __Extras compared to normal html button:__
 *
 * * You can pass a isLoading attribute to replace the text by a loader.
 * * By default it is of type "button" where html has no default value.
 */
export default class Button extends React.Component {
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
      // We call preventDefault with disabledMock because it would submit forms with type="submit"
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
      active, area, children, className, disabled, disabledMock, focusOnMount, isLoading, onClick,
      onClickEmit, preventDefault, ripple, round, scrollToOnMount, square, variant, ...otherProps
    } = this.props

    const variantClass = 'btn-' + variant
    const areaClass = area === 'small' ? 'btn-small' : 'btn'

    let cssClasses = `${areaClass} ${variantClass} ${className}`
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
      </button>
    )
  }
}

Button.propTypes = {
  /**
   * Change appearance of the button
   */
  variant: PropTypes.oneOf([
    'default', 'link', 'navlink', 'danger', 'neutral', 'cta', 'cta-red',
    'theader', 'menu', 'invisible', 'cta-green'
  ]),
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
  area: PropTypes.oneOf(['normal', 'small']).isRequired,
  focusOnMount: PropTypes.bool.isRequired,
  scrollToOnMount: PropTypes.bool.isRequired,
  ripple: PropTypes.bool.isRequired,
  square: PropTypes.bool.isRequired,
  round: PropTypes.bool.isRequired,
  disabledMock: PropTypes.bool.isRequired,
}

Button.defaultProps = {
  type: 'button',
  className: '',
  variant: 'default',
  isLoading: false,
  disabled: false,
  disabledMock: false,
  onClickEmit: 'event',
  preventDefault: false,
  focusOnMount: false,
  scrollToOnMount: false,
  area: 'normal',
  ripple: false,
  square: false,
  round: false,
}
