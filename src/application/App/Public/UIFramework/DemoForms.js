import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Input, InputBasic, Switch, Select} from 'ui-framework'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export function DemoForms({vm}) {
  const {demoFormVM} = vm

  return (
    <section className="panel--simple">
      <div className="panel__header">
        <h3 className="margin-0">Forms</h3>
      </div>
      <div className="md-padded-2">
        <div className="margin-bottom-1">
          <label className="label margin-right-1" htmlFor="my-input">
            My Input
          </label>
          <Input id="my-input" placeholder="placeholder" />
        </div>

        <div className="margin-bottom-1">
          <label className="label margin-right-1" htmlFor="my-discreet-input">
            My Discreet Input
          </label>
          <Input id="my-discreet-input" discreet placeholder="placeholder" />
        </div>

        <div className="margin-bottom-1">
          <label className="label margin-right-1" htmlFor="inputSwitch">
            Switch
          </label>
          <Switch
            id="inputSwitch"
            name="inputSwitch"
            value={demoFormVM.inputSwitch}
            onChange={demoFormVM.set}
            onChangeEmit="name-value"
          />
        </div>

        <div className="margin-bottom-1">
          <label className="label margin-right-1" htmlFor="inputSelect">
            Select
          </label>
          <Select
            className="select"
            id="inputSelect"
            items={demoFormVM.inputSelectOptions}
            onChange={demoFormVM.set}
            onChangeEmit="name-value"
            name="inputSelect"
            value={demoFormVM.inputSelect}
          />
        </div>

        <div className="margin-bottom-1">
          <InputBasic type="range" className="input-range" min="1" max="10" />
        </div>
      </div>
    </section>
  )
}

DemoForms.propTypes = {
  vm: PropTypes.shape({}),
}

export default observer(DemoForms)
