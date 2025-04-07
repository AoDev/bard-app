import {Input, Note} from '@ui'
import {observer} from 'mobx-react'
import type {NoteVariant} from 'src/ui-framework/components/Note/Note'
import type {UIFrameworkVM} from './UIFrameworkVM'

const notesVariants: NoteVariant[] = ['red', 'green', 'blue', 'orange', 'neutral']

export const DemoNotes = observer(({vm}: {vm: UIFrameworkVM}) => {
  return (
    <section className="panel--simple pad-default">
      <div className="panel__header">
        <h3 className="h3">Notes</h3>
      </div>

      {notesVariants.map((variant) => (
        <Note
          key={variant}
          variant={variant}
          withBackground={vm.inputNoteWithBackground}
          className="margin-bottom-1"
        >
          variant = "{variant}"
        </Note>
      ))}

      <div className="bg-alternative pad-default">
        <div className="flex-row-center">
          <div className="margin-right-2">
            <Input
              id="inputNoteWithBackground"
              type="checkbox"
              value={vm.inputNoteWithBackground}
              onChangeNameValue={vm.toggle}
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
})
