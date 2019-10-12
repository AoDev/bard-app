import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

/**
 * A serie of buttons that a user can click to activate parts of the UI.
 * Usually used for filtering in lists.
 */
export default class Pills extends React.Component {
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
    var value = event.target.dataset.pill
    const {items, onChange, preventDefault, onChangeEmit, objectIdKey, name} = this.props
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
    const {items, itemSelected, objectIdKey, objectLabelKey, vertical} = this.props
    const optionsAreObjects = typeof items[0] === 'object'
    const optionSelectedIsObject = typeof itemSelected === 'object'

    var optionSelectedValue

    if (itemSelected) {
      if (optionSelectedIsObject) {
        optionSelectedValue = itemSelected[objectIdKey]
      }
      else if (optionsAreObjects) {
        const option = _.find(items, {[objectIdKey]: itemSelected})
        if (option) {
          // Option can throw an error if the option is not there
          optionSelectedValue = option[objectIdKey]
        }
      }
      else {
        optionSelectedValue = itemSelected
      }
    }
    else {
      optionSelectedValue = ''
    }

    return (
      <ul className={`nav-pills ${vertical ? 'nav-stacked' : ''}`}>
        {items.map((item) => {
          const isObject = typeof item === 'object'
          const id = isObject ? item[objectIdKey] : item
          const label = isObject ? item[objectLabelKey] : item
          const active = optionSelectedValue === id
          const cssClass = active ? 'active' : item.disabled ? 'disabled' : ''

          return (
            <li key={id} className={`nav-pill-light ${cssClass}`}>
              <a onClick={active || item.disabled ? null : this.onSelect} data-pill={id}>{label}</a>
            </li>
          )
        })}
      </ul>
    )
  }
}

Pills.propTypes = {
  /**
   * items power
   */
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
  /**
   * The active pill.
   */
  itemSelected: PropTypes.string,
  /**
   * Emit the id of pill selected when clicked.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Choose what the argument of the onChange callback will be.
   */
  onChangeEmit: PropTypes.oneOf(['event', 'item', 'value', 'name-value']).isRequired,
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
   * Display the pills vertically if true
   */
  vertical: PropTypes.bool
}

Pills.defaultProps = {
  vertical: false,
  objectIdKey: 'id',
  objectLabelKey: 'label',
  onChangeEmit: 'event',
}
