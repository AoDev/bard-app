import {Input} from '@ui'
import {observer} from 'mobx-react'
import type {UIFrameworkVM} from './UIFrameworkVM'

export const DemoTables = observer(({vm}: {vm: UIFrameworkVM}) => {
  return (
    <div className="panel--simple flex-col">
      <div className="panel__header pad-default">
        <h3 className="margin-0">Tables</h3>
      </div>
      <div className="pad-default">
        <table className={vm.inputTableNarrow ? 'table--narrow' : 'table'}>
          <thead>
            <tr>
              <th className="table__head txt-left">table__head 1</th>
              <th className="table__head txt-left">table__head 2</th>
              <th className="table__head txt-left">table__head 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1 1</td>
              <td>Cell 1 2</td>
              <td>Cell 1 3</td>
            </tr>
            <tr className="bg-red-soft">
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
      <hr className="margin-1" />
      <div className="pad-default flex-col-end">
        <div className="flex-row-center">
          <div className="margin-right-2">
            <Input
              id="inputTableNarrow"
              type="checkbox"
              value={vm.inputTableNarrow}
              onChangeNameValue={vm.toggle}
              name="inputTableNarrow"
            />
            <label className="label margin-left-1" htmlFor="inputTableNarrow">
              --narrow
            </label>
          </div>
        </div>
      </div>
    </div>
  )
})
