import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Input, Switch, Select} from 'ui-framework'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export function DemoForms({vm}) {
  const {demoFormVM} = vm

  return (
    <div className="panel--simple">
      <div className="bg-alternative padded-1">
        <h3 className="space-0">Forms</h3>
      </div>
      <div className="padded-1">
        <div className="space-bottom-1">
          <label className="label space-right-1" htmlFor="my-input">
            My Input
          </label>
          <Input id="my-input" placeHolder="placeHolder" />
        </div>

        <div className="space-bottom-1">
          <label className="label space-right-1" htmlFor="my-discreet-input">
            My Discreet Input
          </label>
          <Input id="my-discreet-input" discreet placeHolder="placeHolder" />
        </div>

        <div className="space-bottom-1">
          <label className="label space-right-1" htmlFor="inputSwitch">
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

        <div className="space-bottom-1">
          <label className="label space-right-1" htmlFor="inputSelect">
            Select
          </label>
          <Select
            id="inputSelect"
            items={demoFormVM.inputSelectOptions}
            onChange={demoFormVM.set}
            onChangeEmit="name-value"
            name="inputSelect"
            value={demoFormVM.inputSelect}
          />
        </div>
      </div>
    </div>
  )
}

DemoForms.propTypes = {
  vm: PropTypes.shape({}),
}

export default observer(DemoForms)
