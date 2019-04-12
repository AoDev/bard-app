import PropTypes from 'prop-types'
import React from 'react'
import InputBasic from '../InputBasic'

export default function Input (props) {
  const {className, discreet, ...otherProps} = props
  const extraClass = `${discreet ? 'inputfield-discreet' : 'inputfield'} ${className || ''}`
  return (
    <InputBasic className={extraClass} {...otherProps}/>
  )
}

Input.propTypes = {
  discreet: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

Input.defaultProps = {
  discreet: false
}
