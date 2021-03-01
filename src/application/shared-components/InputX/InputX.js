import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Input} from 'ui-framework'

/**
 * @param {{set: (prop: string, value: *) => *}, name: string} props
 */
export function InputX({vm, name, label, id, ...otherProps}) {
  const inputId = id || vm.id + '-' + name
  return (
    <React.Fragment>
      {label && (
        <label htmlFor={inputId} className="label margin-right-1">
          {label}
        </label>
      )}
      <Input
        id={inputId}
        name={name}
        value={vm[name]}
        onChange={vm.set}
        onChangeEmit="name-value"
        {...otherProps}
        discreet
      />
    </React.Fragment>
  )
}

export default observer(InputX)

InputX.propTypes = {
  vm: PropTypes.shape({}),
}
