import PropTypes from 'prop-types'
import React from 'react'
import DemoModals from './DemoModals'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export default function UIFramework({vm}) {
  return (
    <React.Fragment>
      <div className="padded-h-1">
        <h2>UI Framework</h2>
      </div>
      <div className="padded-1">
        <DemoModals vm={vm} />
      </div>
    </React.Fragment>
  )
}

UIFramework.propTypes = {
  vm: PropTypes.shape({}),
}
