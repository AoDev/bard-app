import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

/**
 * The Select is an extended version of a select that is more flexible regarding
 * the options it receives and what it emits on change.
 */
export default class Select extends React.Component {
  constructor (props) {
    super(props)
    this.onSelect = this.onSelect.bind(this)
  }

  /**
   * Call the onChange handler with different arguments, depending on the
   * emit option.
   * It will also take care of converting strings to number when necessary
   * because assigning a number to a select option value is always a string.
   */
  onSelect (event) {
    var {name, value} = event.target
    const {items, onChange, preventDefault, onChangeEmit, objectIdKey, optionalLabel} = this.props
    const firstOption = items[0]
    const optionsAreObjects = typeof firstOption === 'object'
    const shouldParse = typeof (optionsAreObjects ? firstOption[objectIdKey] : firstOption) === 'number'
    const isOptionalLabel = event.target.selectedOptions[0].innerText === optionalLabel

    if (shouldParse) {
      value = parseInt(value, 10)
    }
    else if (isOptionalLabel) {
      value = undefined
    }

    if (preventDefault) {
      event.preventDefault()
    }

    switch (onChangeEmit) {
      case 'event': onChange(event); break
      case 'item': onChange(_.find(items, {[objectIdKey]: value}), event); break
      case 'value': onChange(value, event); break
      case 'name-value': onChange(name, value, event); break
      case 'nameItem': onChange(name, _.find(items, {[objectIdKey]: value}), event); break
    }
  }

  getOptionSelectedValue (props, optionsAreObjects) {
    const {objectIdKey, itemSelected, items} = props
    const optionSelectedIsObject = typeof itemSelected === 'object'

    let optionSelectedValue = ''

    if (itemSelected) {
      if (optionSelectedIsObject) {
        optionSelectedValue = itemSelected[objectIdKey]
      }
      else if (optionsAreObjects) {
        const option = _.find(items, {[objectIdKey]: itemSelected})
        if (option) {
          // In case the item ID selected is actually NOT present in the list, prevents a crash.
          optionSelectedValue = option[objectIdKey]
        }
      }
      else {
        optionSelectedValue = itemSelected
      }
    }

    return optionSelectedValue
  }

  render () {
    const {
      items, itemSelected, objectIdKey, objectLabelKey,
      onChange, onChangeEmit, optionalLabel, ...otherProps
    } = this.props
    const optionsAreObjects = typeof items[0] === 'object'

    return (
      <select
        value={this.getOptionSelectedValue(this.props, optionsAreObjects)}
        onChange={this.onSelect}
        {...otherProps}>
        {optionalLabel && (<option value="">{optionalLabel}</option>)}
        {items.map(option => {
          const id = optionsAreObjects ? option[objectIdKey] : option
          return <option key={id} value={id}>{optionsAreObjects ? option[objectLabelKey] : option}</option>
        })}
      </select>
    )
  }
}

Select.defaultProps = {
  width: '100%',
  onChangeEmit: 'event',
  items: [],
}

Select.propTypes = {
  /**
   * Adds a regular label above the select. Inline labels are not currently supported.
   */
  label: PropTypes.string,
  /**
   * Item currently selected
   */
  itemSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /**
   * An optional 'placeholder' option (like 'Choose an option!'). It can be used instead of or alongside with a normal `label`.
   * Since it has no value, it's possible for the user to not select anything, or unselect the active option. This option will only
   * be selected by default if no `initialValue` is present.
   */
  optionalLabel: PropTypes.string,
  /**
   * Handler to fire when an option is chosen.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Choose what the argument of the onChange callback will be.
   */
  onChangeEmit: PropTypes.oneOf(['event', 'item', 'value', 'name-value', 'nameItem']),
  /**
   * An array of option objects to display. See 'objectIdKey' and 'objectLabelKey' props.
   */
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string])).isRequired,
  /**
   * Key name for the name of the options.
   */
  objectLabelKey (props, propName, componentName) {
    const firstOption = props.items && props.items[0]
    const optionsAreObjects = typeof firstOption === 'object'

    if (optionsAreObjects && !_.isString(props[propName])) {
      return new Error(`
        Invalid prop ${propName} supplied to ${componentName}.
        Expected a string when items are objects.
      `)
    }
  },
  /**
   * Key name for the value of the options.
   */
  objectIdKey (props, propName, componentName) {
    const firstOption = props.items && props.items[0]
    const optionsAreObjects = typeof firstOption === 'object'

    if (optionsAreObjects && !_.isString(props[propName])) {
      return new Error(`
        Invalid prop ${propName} supplied to ${componentName}.
        Expected a string when items are objects.
      `)
    }
  },
  /**
   * Initial value of the `select` (the default option's value). Has to be the value of one of the options you passed in.
   */
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * Disables the control.
   */
  disabled: PropTypes.bool,
  /**
   * Indicate if you want to prevent the default browser event handling.
   */
  preventDefault: PropTypes.bool,
}
