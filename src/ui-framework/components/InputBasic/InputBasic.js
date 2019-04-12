import PropTypes from 'prop-types'
import React, {Component} from 'react'
import _ from 'lodash'

/**
 * Extended input field
 *
 * Behaves like a normal html input field but decorated with behaviours
 * like auto select content when focused, etc.
 */
export default class InputBasic extends Component {
  constructor (props) {
    super(props)
    this.inputRef = this.inputRef.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    if (this.props.focusOnMount) {
      this.inputField.focus()
    }
    if (this.props.scrollToOnMount) {
      this.inputField.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  /**
   * Handle the native onChange event.
   */
  onChange (event) {
    var value = event.target.value
    const {type, onChange} = this.props

    if (type === 'number' || type === 'range' || _.isNumber(this.props.value)) {
      if (value.length > 0) {
        let convertedValue = Number(value)
        if (!isNaN(convertedValue)) {
          value = convertedValue
        }
      }
    }
    else if (type === 'checkbox') {
      value = event.target.checked
    }

    switch (this.props.onChangeEmit) {
      case 'event': onChange(event); break
      case 'value': onChange(value, event); break
      case 'name-value': onChange(event.target.name, value, event)
    }
  }

  selectContent (event) {
    event.target.select()
  }

  inputRef (input) {
    this.inputField = input
  }

  render () {
    const otherProps = _.omit(this.props, InputBasic.expectedProps)

    if (this.props.selectOnFocus) {
      otherProps.onFocus = this.selectContent
    }

    if (this.props.type === 'checkbox') {
      otherProps.checked = this.props.value
    }

    return (
      <input {...otherProps}
        ref={this.inputRef}
        onChange={this.props.onChange ? this.onChange : null}/>
    )
  }
}

InputBasic.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  /**
   * Callback for the on change event.
   */
  onChange: PropTypes.func,
  /**
   * Will focus the input when it is mounted. Can be used to improve UX.
   */
  focusOnMount: PropTypes.bool,
  /**
   * Will scroll the viewport to the element when it is mounted
   */
  scrollToOnMount: PropTypes.bool,
  /**
   * Select the content automatically when the field is focused
   */
  selectOnFocus: PropTypes.bool,
  /**
   * Choose what the argument of the onChange callback will be.
   * - event: DOM event; like a normal input. onChange(event)
   * - value: onChange(event.target.value, event);
   * - name-value: onChange(event.target.name, event.target.value, event);
   */
  onChangeEmit: PropTypes.oneOf(['event', 'value', 'name-value']),
  /**
   * Valid html input type except checkbox
   */
  type: PropTypes.oneOf(['email', 'text', 'password', 'tel', 'number', 'textarea', 'checkbox', 'range']),
}

InputBasic.expectedProps = [
  'focusOnMount',
  'scrollToOnMount',
  'onChange',
  'onChangeEmit',
  'selectOnFocus',
]

InputBasic.defaultProps = {
  focusOnMount: false,
  scrollToOnMount: false,
  selectOnFocus: false,
  onChangeEmit: 'event',
  type: 'text'
}