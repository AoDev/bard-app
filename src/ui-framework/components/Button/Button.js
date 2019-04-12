import PropTypes from 'prop-types'
import React from 'react'
import Loader from '../Loader'
import classNames from 'classnames'
import _ from 'lodash'

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
   */
  onClick (event) {
    const {onClick, preventDefault, onClickEmit, name, value} = this.props
    if (!onClick) {
      return
    }

    if (preventDefault) {
      event.preventDefault()
    }

    switch (onClickEmit) {
      case 'event': onClick(event); break
      case 'value': onClick(value, event); break
      case 'name-value': onClick(name, value, event)
    }
  }

  render () {
    const otherProps = _.omit(this.props, Button.expectedProps)
    const variantClass = 'btn-' + this.props.variant
    const areaClass = this.props.area === 'small' ? 'btn-small' : 'btn'
    const additionalClass = this.props.className

    const btnClassName = classNames(`${areaClass} ${variantClass} ${additionalClass}`, {
      active: this.props.active,
      ripple: this.props.ripple,
      disabled: this.props.isLoading || this.props.disabled,
      'btn-loading': this.props.isLoading,
    })

    return (
      <button {...otherProps}
        ref={this.btnRef}
        onClick={this.onClick}
        className={btnClassName}
        disabled={this.props.disabled || this.props.isLoading}>
        {this.props.isLoading && loader}
        {this.props.children}
      </button>
    )
  }
}

/**
 * Mainly used to extract any other props passed by the user
 * @type {Array}
 */
Button.expectedProps = [
  'active',
  'area',
  'disabled',
  'focusOnMount',
  'isLoading',
  'onClick',
  'onClickEmit',
  'preventDefault',
  'ripple',
  'scrollToOnMount',
  'variant',
]

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
}

Button.defaultProps = {
  type: 'button',
  className: '',
  variant: 'default',
  isLoading: false,
  disabled: false,
  onClickEmit: 'event',
  preventDefault: false,
  focusOnMount: false,
  scrollToOnMount: false,
  area: 'normal',
  ripple: false,
}
