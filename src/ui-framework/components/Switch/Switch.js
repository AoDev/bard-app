import PropTypes from 'prop-types'
import React from 'react'
import RcSwitch from 'rc-switch'

/**
 * A switch component that you can use instead of a checkbox.
 * Note: the switch is animated but it doesn't work in the styleguide docs.
 */
export default class Switch extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  /**
   * Handle the native onChange event.
   */
  onChange (newValue) {
    const onChange = this.props.onChange

    switch (this.props.onChangeEmit) {
      case 'value': onChange(newValue, event); break
      case 'name-value': onChange(this.props.name, newValue, event)
    }
  }

  render () {
    const {value, onChangeEmit, ...otherProps} = this.props
    return (
      <RcSwitch
        {...otherProps}
        onChange={this.onChange}
        checked={value}/>
    )
  }
}

Switch.propTypes = {
  /**
   * Optional name attribute. Useful with onChangeEmit = name-value.
   */
  name: PropTypes.string,
  /**
   * Callback function to fire when the switch is clicked
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Choose what the argument of the onChange callback will be.
   * - value: onChange(event.target.value, event);
   * - name-value: onChange(event.target.name, event.target.value, event);
   */
  onChangeEmit: PropTypes.oneOf(['value', 'name-value']),
  /**
   * Switch value
   */
  value: PropTypes.bool.isRequired,
  /**
   * Disable the switch
   */
  disabled: PropTypes.bool,
  checkedChildren: PropTypes.node,
  unCheckedChildren: PropTypes.node,
}

Switch.defaultProps = {
  disabled: false,
  checkedChildren: 'on',
  unCheckedChildren: 'off',
}
