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
      <div className="md-panel-group flex-col pos-rel">
        <table className="table table--padded-1">
          <thead>
            <tr>
              <th className="t__head txt-left">Name</th>
              <th className="t__head txt-left">Super power</th>
            </tr>
          </thead>
          <tbody>
            {vm.superHeroes.map((hero) => {
              return (
                <tr key={hero.id} className={vm.highlightedHeroId === hero.id ? 'table__row--highlighted' : null}>
                  <td className="txt-left">{hero.name}</td>
                  <td className="txt-left">{hero.power}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  vm: PropTypes.shape({
  }).isRequired,
}

export default observer(Dashboard)
