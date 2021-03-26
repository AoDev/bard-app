import PropTypes from 'prop-types'
import React from 'react'

/**
 * @param {{variant: 'red'|'green'|'blue'|'orange'|'neutral', withBackground: boolean, className: string}} props
 */
export default function Note(props) {
  const cssClasses = `note note--${props.variant}${props.withBackground ? '--with-bg' : ''} ${
    props.className
  } txt-read`
  return <div className={cssClasses}>{props.children}</div>
}

Note.propTypes = {
  variant: PropTypes.oneOf(['red', 'green', 'blue', 'orange', 'neutral']),
  children: PropTypes.node,
  className: PropTypes.string,
  withBackground: PropTypes.bool.isRequired,
}

Note.defaultProps = {
  variant: 'neutral',
  withBackground: false,
}
