import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default function Loader (props) {
  const {label, className} = props

  const extraClass = classNames('loader', {
    'loader-sm': props.small,
    'loader-white': props.white,
    'loader-inline': props.inline,
    [className]: true,
  })

  return (
    <div className={extraClass}>
      <div className="loader-bar-wrapper">
        <div className="loader-bar loader-bar-1"/>
        <div className="loader-bar loader-bar-2"/>
        <div className="loader-bar loader-bar-3"/>
        <div className="loader-bar loader-bar-4"/>
        <div className="loader-bar loader-bar-5"/>
      </div>
      {label &&
        <p className="loader-label">{label}</p>
      }
    </div>
  )
}

Loader.propTypes = {
  /**
   * Text displayed below the loader animation.
   */
  label: PropTypes.string,
  /**
   * Display a smaller version of the loader.
   */
  small: PropTypes.bool,
  /**
   * The loader is white instead of black.
   */
  white: PropTypes.bool,
  /**
   * Remove the default label.
   */
  noLabel: PropTypes.bool
}

Loader.defaultProps = {
  className: ''
}
