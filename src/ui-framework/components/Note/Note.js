import PropTypes from 'prop-types'
import React from 'react'

/**
 * @param {{variant: 'red'|'green'|'blue'|'orange'|'default', withBackground: boolean, className: string}} props
 */
export default function Note(props) {
  const cssClasses = `note-${props.variant}${props.withBackground ? '--with-bg' : ''} ${
    props.className
  } txt-read`
  return <div className={cssClasses}>{props.children}</div>
}

Note.propTypes = {
  variant: PropTypes.oneOf(['red', 'green', 'blue', 'orange', 'default']),
  children: PropTypes.node,
  className: PropTypes.string,
  withBackground: PropTypes.bool.isRequired,
}

Note.defaultProps = {
  className: '',
  variant: 'default',
  withBackground: false,
}
