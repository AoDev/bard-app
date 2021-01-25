import PropTypes from 'prop-types'
import React from 'react'

export default function Dashboard(props) {
  const {vm} = props

  return (
    <div className="r-grid-fluid-colmin24em md-padded-1">
      {vm.widgets.map((widget) => {
        return (
          <div key={widget.id} className="md-panel-group flex-col pos-rel">
            <div className="bg-darken padded-1">
              <h3 className="space-0 h-header">{widget.title}</h3>
            </div>
            <div className="padded-1 flex-fill">
              <p>{widget.content}</p>
            </div>
          </div>
        )
      })}
      <div className="md-panel-group flex-col pos-rel">
        <div className="bg-darken padded-1">
          <h3 className="space-0 h-header">Super heroes</h3>
        </div>
        <div className="padded-1">
          <table className="table">
            <thead>
              <tr>
                <th className="t__head txt-left">Name</th>
                <th className="t__head txt-left">Super power</th>
              </tr>
            </thead>
            <tbody>
              {vm.superHeroes.map((hero) => {
                return (
                  <tr
                    key={hero.id}
                    className={vm.highlightedHeroId === hero.id ? 'table__row--highlighted' : null}
                  >
                    <td className="txt-left">{hero.name}</td>
                    <td className="txt-left">{hero.power}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  vm: PropTypes.shape({
    highlightedHeroId: PropTypes.string.isRequired,
    superHeroes: PropTypes.array.isRequired,
    widgets: PropTypes.array.isRequired,
  }).isRequired,
}
