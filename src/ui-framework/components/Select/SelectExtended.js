import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'
import Icon from '../Icon'
import classNames from 'classnames'

/**
 * The Select is an extended version of a select that is more flexible regarding
 * the options it receives and what it emits on change.
 */
export default class Select extends React.Component {
  constructor (props) {
    super(props)
    this.onSelect = this.onSelect.bind(this)
  }

  static expectedProps = [
    'objectLabelKey',
    'objectIdKey',
    'activable',
    'itemSelected',
    'items',
    'onChangeEmit',
  ]

  /**
   * Call the onChange handler with different arguments, depending on the
   * emit option.
   * It will also take care of converting strings to number when necessary
   * because assigning a number to a select option value is always a string.
   */
  onSelect (event) {
    var {name, value} = event.target
    const {items, onChange, preventDefault, onChangeEmit, objectIdKey} = this.props
    const firstOption = items[0]
    const optionsAreObjects = typeof firstOption === 'object'
    const shouldParse = typeof (optionsAreObjects ? firstOption[objectIdKey] : firstOption) === 'number'

    if (shouldParse) {
      value = parseInt(value, 10)
    }

    if (preventDefault) {
      event.preventDefault()
    }

    switch (onChangeEmit) {
      case 'event': onChange(event); break
      case 'item': onChange(_.find(items, {[objectIdKey]: value}), event); break
      case 'value': onChange(value, event); break
      case 'name-value': onChange(name, value, event)
    }
  }

  render () {
    const {objectIdKey, objectLabelKey, itemSelected, items} = this.props
    const {optionalLabel, disabled, id, required, validationState} = this.props
    const outerLabel = this.props.label
    const optionsAreObjects = typeof items[0] === 'object'
    const optionSelectedIsObject = typeof itemSelected === 'object'

    const otherProps = _.omit(this.props, Select.expectedProps)

    let hasError = false
    let hasSuccess = false

    if (validationState) {
      hasError = validationState === 'error'
      hasSuccess = validationState === 'success'
    }

    var optionSelectedLabel
    var optionSelectedValue

    if (itemSelected) {
      if (optionSelectedIsObject) {
        optionSelectedLabel = itemSelected[objectLabelKey]
        optionSelectedValue = itemSelected[objectIdKey]
      }
      else if (optionsAreObjects) {
        const option = _.find(items, {[objectIdKey]: itemSelected})
        optionSelectedLabel = option[objectLabelKey]
        optionSelectedValue = option[objectIdKey]
      }
      else {
        optionSelectedLabel = itemSelected
        optionSelectedValue = itemSelected
      }
    }
    else {
      optionSelectedLabel = optionalLabel
      optionSelectedValue = ''
    }

    const wrapperCSS = classNames({
      'form-group select': true,
      'select-activable': this.props.activable,
      active: !!itemSelected,
      'validation-success': hasSuccess,
      'validation-error': hasError,
      disabled
    })

    return (
      <div className={wrapperCSS} style={{width: this.props.width}}>
        {outerLabel && id
          ? <label htmlFor={id} className="select-outer-label label-minimal">
            {outerLabel}{required ? <span className="select-required-asterisk"> *</span> : null}
          </label>
          : null
        }
        <div className="select-inner">
          <select
            id={id}
            className="form-control"
            value={optionSelectedValue}
            onChange={this.onSelect}
            disabled={disabled}
            required={required}
            {...otherProps}>
            {optionalLabel && (<option value="">{optionalLabel}</option>)}
            {items.map(option => {
              const id = optionsAreObjects ? option[objectIdKey] : option
              return <option key={id} value={id}>{optionsAreObjects ? option[objectLabelKey] : option}</option>
            })}
          </select>
          <span className="select-label">
            <span className="select-label-text text-ellipsis space-right-1-ch">{optionSelectedLabel}</span>
            <Icon name="#icon-caret-down" width={12} height={17} className="select-label-caret"/>
          </span>
        </div>
        {(hasError && this.props.errorMessage) && (
          <div>
            <Icon name="#icon-cross" small type="danger" inline/>
            <span className="input-minimal-error-message"> {this.props.errorMessage}</span>
          </div>
        )}
      </div>
    )
  }
}

Select.defaultProps = {
  width: '100%',
  onChangeEmit: 'event'
}

Select.propTypes = {
  /**
   * ID of the select element.
   */
  id: PropTypes.string,
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
  onChangeEmit: PropTypes.oneOf(['event', 'item', 'value', 'name-value']),
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
   * Width of the select as a valid CSS value (eg. '150px' or '100%'). Default is 100%.
   * Be sure to provide a number when using a unitless value (150 as a number is fine, but '150' as a string is invalid).
   */
  width: PropTypes.node,
  /**
   * Controls whether the select appears as 'active' when a non-valueless option is chosen.
   */
  activable: PropTypes.bool,
  /**
   * Disables the control.
   */
  disabled: PropTypes.bool,
  /**
   * Makes the element required. If there's a label, it will be marked with an *.
   */
  required: PropTypes.bool,
  /**
   * Style the input based on a validation response.
   */
  validationState: PropTypes.oneOf(['error', 'success']),
  /**
   * Validation error message - only used if validationState is set to 'error'.
   */
  errorMessage: PropTypes.string,
  /**
   * Indicate if you want to prevent the default browser event handling.
   */
  preventDefault: PropTypes.bool,
}
