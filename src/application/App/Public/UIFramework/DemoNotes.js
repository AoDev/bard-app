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
    <section className="panel--simple">
      <div className="panel__header">
        <h3 className="margin-0">Notes</h3>
      </div>
      <div className="md-padded-2">
        <Note
          variant="neutral"
          className="margin-bottom-1"
          withBackground={vm.inputNoteWithBackground}
        >
          variant = "neutral"
        </Note>
        <Note
          variant="green"
          className="margin-bottom-1"
          withBackground={vm.inputNoteWithBackground}
        >
          variant = "green"
        </Note>
        <Note
          variant="blue"
          className="margin-bottom-1"
          withBackground={vm.inputNoteWithBackground}
        >
          variant = "blue"
        </Note>
        <Note variant="red" className="margin-bottom-1" withBackground={vm.inputNoteWithBackground}>
          variant = "red"
        </Note>
        <Note
          variant="orange"
          className="margin-bottom-1"
          withBackground={vm.inputNoteWithBackground}
        >
          variant = "orange"
        </Note>
      </div>
      <div className="bg-alternative md-padded-2">
        <div className="flex-row-center">
          <div className="margin-right-2">
            <Input
              id="inputNoteWithBackground"
              type="checkbox"
              value={vm.inputNoteWithBackground}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputNoteWithBackground"
            />
            <label className="label margin-left-1" htmlFor="inputNoteWithBackground">
              withBackground
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}

DemoNotes.propTypes = {
  vm: PropTypes.shape({
    inputNoteWithBackground: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  }),
}

export default observer(DemoNotes)
