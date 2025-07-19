import {Input, InputBasic, InputClearButton, InputX, Select, Switch, TextArea} from '@ui'
import {observer} from 'mobx-react'
import type {DemoFormsVM} from './DemoFormsVM'

export const DemoForms = observer(({vm}: {vm: DemoFormsVM}) => {
  return (
    <section className="panel--simple pad-default" id="section-forms">
      <div className="panel__header">
        <h3 className="h3">Forms</h3>
      </div>
      <div className="grid gap-2">
        <div className="flex-row-center justify-between">
          <div className="flex-col">
            <label className="label" htmlFor="my-input">
              Input Uncontrolled
            </label>
            <Input id="my-input" placeholder="placeholder" />
          </div>
          <pre className="code">
            {`
<Input id="my-input" placeholder="placeholder" />
            `}
          </pre>
        </div>

        <div className="flex-row-center justify-between">
          <div className="flex-col">
            <label className="label" htmlFor="iTextControlled">
              Input controlled and clearable
            </label>
            <div className="input--with-clear-button">
              <Input
                onChangeNameValue={vm.set}
                name="iTextControlled"
                value={vm.iTextControlled}
                placeholder="placeholder"
              />
              <InputClearButton prop="iTextControlled" vm={vm} />
            </div>
          </div>
          <pre className="code">
            {`
<div className="input--with-clear-button">
  <Input
    onChangeNameValue={vm.set}
    name="iTextControlled"
    value={vm.iTextControlled} />
  <InputClearButton prop="iTextControlled" vm={vm} />
</div>
            `}
          </pre>
        </div>

        <div className="flex-row-center justify-between">
          <div className="flex-col">
            <label className="label" htmlFor="iTextControlled2">
              InputX - easier DX with mobx
            </label>
            <div>
              <InputX vm={vm} name="iTextControlled2" withClearBtn />
            </div>

            <p className="max-width-1x">
              InputX only requires the property name to update on the vm.
            </p>
          </div>
          <pre className="code">
            {`
<InputX vm={vm} name="iTextControlled2" withClearBtn />
            `}
          </pre>
        </div>

        <div className="flex-row-center justify-between">
          <div className="flex-col">
            <label className="label margin-right-1" htmlFor="my-input-fit-content">
              Input that fits content
            </label>
            <Input id="my-input-fit-content" fitContent placeholder="placeholder" />
          </div>
          <pre className="code">
            {`
<Input fitContent />
            `}
          </pre>
        </div>

        <div>
          <label className="label margin-right-1" htmlFor="inputSwitch">
            Switch
          </label>
          <Switch
            id="inputSwitch"
            name="inputSwitch"
            value={vm.iSwitch}
            onChangeNameValue={vm.set}
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
                options={vm.iSelectOptions}
                onChangeNameValue={vm.set}
                name="inputSelect"
                value={vm.iSelect}
              />
            </div>

            <div>
              <h4 className="h4">With objects</h4>
              <Select
                className="select"
                options={vm.iSelectOptions2}
                valueKey="id"
                labelKey="label"
                optionalLabel="none"
                onChangeNameValue={vm.set}
                name="select2"
                value={vm.iSelect2}
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
