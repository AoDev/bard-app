import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export function DemoTables({vm}) {
  return (
    <div className="panel--simple">
      <div className="bg-alternative padded-1">
        <h3 className="space-0">Tables</h3>
      </div>
      <div className="padded-1">
        <table className="table">
          <thead>
            <tr>
              <th className="t__head txt-left">Header 1</th>
              <th className="t__head txt-left">Header 2</th>
              <th className="t__head txt-left">Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1 1</td>
              <td>Cell 1 2</td>
              <td>Cell 1 3</td>
            </tr>
            <tr>
              <td>Cell 2 1</td>
              <td>Cell 2 2</td>
              <td>Cell 2 3</td>
            </tr>
            <tr>
              <td>Cell 3 1</td>
              <td>Cell 3 2</td>
              <td>Cell 3 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

DemoTables.propTypes = {
  vm: PropTypes.shape({}),
}

export default observer(DemoTables)
