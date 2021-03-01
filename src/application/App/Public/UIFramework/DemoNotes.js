import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Note, Input} from 'ui-framework'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export function DemoNotes({vm}) {
  return (
    <div className="panel--simple">
      <div className="bg-alternative padded-1">
        <h3 className="space-0">Notes</h3>
      </div>
      <div className="padded-1">
        <Note
          variant="default"
          className="space-bottom-1"
          withBackground={vm.inputNoteWithBackground}
        >
          <p>variant = "default"</p>
        </Note>
        <Note
          variant="green"
          className="space-bottom-1"
          withBackground={vm.inputNoteWithBackground}
        >
          <p>variant = "green"</p>
        </Note>
        <Note variant="blue" className="space-bottom-1" withBackground={vm.inputNoteWithBackground}>
          <p>variant = "blue"</p>
        </Note>
        <Note variant="red" className="space-bottom-1" withBackground={vm.inputNoteWithBackground}>
          <p>variant = "red"</p>
        </Note>
        <Note
          variant="orange"
          className="space-bottom-1"
          withBackground={vm.inputNoteWithBackground}
        >
          <p>variant = "orange"</p>
        </Note>
      </div>
      <div className="bg-alternative padded-1">
        <div className="flex-row-center">
          <div className="space-right-2">
            <Input
              id="inputNoteWithBackground"
              type="checkbox"
              value={vm.inputNoteWithBackground}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputNoteWithBackground"
            />
            <label className="label space-left-1" htmlFor="inputNoteWithBackground">
              withBackground
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

DemoNotes.propTypes = {
  vm: PropTypes.shape({
    inputNoteWithBackground: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  }),
}

export default observer(DemoNotes)
