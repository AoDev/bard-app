import {Input, InputBasic, Select, Switch, TextArea} from '@ui'
import {observer} from 'mobx-react'
import type {UIFrameworkVM} from './UIFrameworkVM'

export const DemoForms = observer(({vm}: {vm: UIFrameworkVM}) => {
  const {demoFormVM} = vm

  return (
    <section className="panel--simple pad-default" id="section-forms">
      <div className="panel__header">
        <h3 className="h3">Forms</h3>
      </div>
      <div className="grid gap-2">
        <div>
          <label className="label margin-right-1" htmlFor="my-input">
            My Input
          </label>
          <Input id="my-input" placeholder="placeholder" />
        </div>

        <div>
          <label className="label margin-right-1" htmlFor="my-input-fit-content">
            Input that fits content
          </label>
          <Input id="my-input-fit-content" fitContent placeholder="placeholder" />
        </div>

        <div>
          <label className="label margin-right-1" htmlFor="inputSwitch">
            Switch
          </label>
          <Switch
            id="inputSwitch"
            name="inputSwitch"
            value={demoFormVM.inputSwitch}
            onChangeNameValue={demoFormVM.set}
          />
        </div>

        <div>
          <span className="label margin-right-1">Select</span>

          <div className="grid grid-2-col">
            <div>
              <h4 className="h4">Simple</h4>
              <Select
                className="select"
                id="inputSelect"
                options={demoFormVM.inputSelectOptions}
                onChangeNameValue={demoFormVM.set}
                name="inputSelect"
                value={demoFormVM.inputSelect}
              />
            </div>

            <div>
              <h4 className="h4">With objects</h4>
              <Select
                className="select"
                options={demoFormVM.selectOptions2}
                valueKey="id"
                labelKey="label"
                optionalLabel="none"
                onChangeNameValue={demoFormVM.set}
                name="select2"
                value={demoFormVM.select2}
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="label">Slider</h4>
          <div className="grid grid-2-col">
            <div>
              <InputBasic type="range" className="input-range" min="1" max="10" />
            </div>
            <pre>
              {`
          <InputBasic
            type="range"
            className="input-range"
            min="1" max="10" />
            `}
            </pre>
          </div>
        </div>
        <div>
          <pre>{'<TextArea />'}</pre>
          <TextArea placeholder="some content" />
        </div>
      </div>
    </section>
  )
})
