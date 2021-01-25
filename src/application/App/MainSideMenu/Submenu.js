import PropTypes from 'prop-types'
import React from 'react'

export default function Submenu({visible, children}) {
  return (
    <div className={`msm__submenu--${visible ? 'open' : 'close'}`}>
      <div className="msm__submenu-content">{children}</div>
    </div>
  )
}

Submenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node,
}
