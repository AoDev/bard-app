import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import {omit} from 'lodash'

/**
 * Display an icon from our sprites.
 *
 * __How to use?__
 *
 * Provide the name of the icon prefixed by a '#'.
 *
 * The default size is 32x32.
 * Avoid random sizes. You can use the "small" prop to have a 16x16 icon.
 *
 * There are multiple options to customize the icon and its background.
 */
export default function Icon (props) {
  var {
    small, height, width, color, size, top, left, white, display,
    bgCircle, bgColor, bgPadding, verticalAlign, rendering
  } = props

  const otherProps = omit(props, Icon.expectedProps)

  size = small ? 16 : size
  height = height || size
  width = width || size
  color = white ? '#fff' : color

  var cssClasses = {
    'pos-rel': typeof top === 'number' || typeof left === 'number',
    icon: true,
    'icon-inline': display === 'inline',
    'icon-circle': bgCircle
  }

  if (props.type) {
    cssClasses[`icon-${props.type}`] = true
  }

  var wrapperStyle = {
    width: width,
    height: height,
    fontSize: 0 // needed because of character white space
  }

  if (top) {
    wrapperStyle.top = top + 'px'
  }

  if (left) {
    wrapperStyle.left = left + 'px'
  }

  if (display === 'block') {
    wrapperStyle.display = 'block'
  }

  if (verticalAlign) {
    wrapperStyle.verticalAlign = verticalAlign
  }

  if (bgColor) {
    wrapperStyle.backgroundColor = bgColor || '#a0adad'
  }

  if (typeof bgPadding !== 'undefined') {
    wrapperStyle.padding = bgPadding + 'px'
  }

  if (props.className) {
    cssClasses[props.className] = true
  }

  const renderMode = {
    [rendering]: color,
    strokeWidth: size / 32,
  }

  const style = {
    [rendering]: color,
  }

  return (
    <span style={wrapperStyle} className={classNames(cssClasses)} {...otherProps}>
      <svg width="100%" height="100%" {...renderMode} style={style} className="icon-svg">
        <use xlinkHref={props.name}/>
      </svg>
    </span>
  )
}

/**
 * Mainly used to extract any other props passed by the user
 * @type {Array}
 */
Icon.expectedProps = [
  'bgPadding',
  'bgCircle',
  'bgColor',
  'className',
  'color',
  'display',
  'height',
  'name',
  'size',
  'small',
  'top',
  'left',
  'verticalAlign',
  'white',
  'width',
  'render',
]

Icon.propTypes = {
  /**
   * The icon background becomes a circle.
   */
  bgCircle: PropTypes.bool,
  /**
   * The icon background color; valid html/hex color
   */
  bgColor: PropTypes.string,
  /**
   * A padding is created between the icon and its wrapper. (Icon size is affected)
   */
  bgPadding: PropTypes.number,
  /**
   * Any CSS class
   */
  className: PropTypes.string,
  /**
   * Color of the icon; valid html/hex color. If not provided, the icon's fill attribute is excluded.
   */
  color: PropTypes.string,
  /**
   * The icon display type; inline-block by default
   */
  display: PropTypes.string,
  /**
   * The icon height. CSS value or number.
   */
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * Name of the icon = name of the svg file
   */
  name: PropTypes.string,
  /**
   * Shorcut to set width and height to same size (square format). CSS value or number.
   */
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * Use fill or stroke mode
   */
  rendering: PropTypes.oneOf(['fill', 'stroke']),
  /**
   * 16x16 size shortcut; use in general with text
   */
  small: PropTypes.bool,
  /**
   * top offset; helper to align with text by offseting the relative position
   */
  top: PropTypes.number,
  /**
   * left offset; helper to align with text by offseting the relative position
   */
  left: PropTypes.number,
  /**
   * verticalAlign; if you need a different inline alignment (top, baseline, ...)
   */
  verticalAlign: PropTypes.string,
  /**
   * white color shortcut
   */
  white: PropTypes.bool,
  /**
   * The icon width. CSS value or number.
   */
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

Icon.defaultProps = {
  size: 32,
  display: 'inline',
  rendering: 'fill',
  color: 'currentColor',
}
