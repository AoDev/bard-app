import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'

export function Dashboard (props) {
  const {vm} = props

  return (
    <div className="r-grid-fluid-colmin24em md-padded-1">
      {vm.widgets.map((widget) => {
        return (
          <div key={widget.id} className="md-panel-group flex-col pos-rel">
            <div className="bg-gray panel__header flex-row-center padded-1">
              <h3 className="space-0 h-header">
                {widget.title}
              </h3>
            </div>
            <div className="bg-white padded-1 flex-fill">
              <p>{widget.content}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

Dashboard.propTypes = {
  vm: PropTypes.shape({
  }).isRequired,
}

export default observer(Dashboard)
