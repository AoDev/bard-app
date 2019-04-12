import PropTypes from 'prop-types'
import React from 'react'

export default function ExternalLink (props) {
  const {children, ...otherProps} = props
  return (
    <a {...otherProps} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

ExternalLink.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
}
