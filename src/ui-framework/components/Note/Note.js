import PropTypes from 'prop-types'
import React from 'react'

export default function Note (props) {
  const cssClasses = `${props.withBackground ? 'note-with-bg' : 'note'} note-${props.variant} ${props.className}`
  return (
    <div className={cssClasses}>
      {props.children}
    </div>
  )
}

Note.propTypes = {
  variant: PropTypes.oneOf(['red', 'green', 'blue', 'orange']),
  children: PropTypes.node,
  className: PropTypes.string,
  withBackground: PropTypes.bool.isRequired,
}

Note.defaultProps = {
  className: '',
  withBackground: false,
}
