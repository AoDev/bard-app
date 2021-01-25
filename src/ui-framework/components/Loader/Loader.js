import React from 'react'
import PropTypes from 'prop-types'

export default function Loader(props) {
  const {label} = props

  let cssClasses = 'loader'
  props.small && (cssClasses += ' loader-small')
  props.white && (cssClasses += ' loader-white')
  props.inline && (cssClasses += ' loader-inline')
  props.className && (cssClasses += ' ' + props.className)

  return (
    <div className={cssClasses}>
      <div className="loader-bar-wrapper">
        <div className="loader-bar loader-bar-1" />
        <div className="loader-bar loader-bar-2" />
        <div className="loader-bar loader-bar-3" />
        <div className="loader-bar loader-bar-4" />
        <div className="loader-bar loader-bar-5" />
      </div>
      {label && <p className="loader-label">{label}</p>}
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
  noLabel: PropTypes.bool,
}

Loader.defaultProps = {
  className: '',
}
