import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Button, Input} from 'ui-framework'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export function DemoButtons({vm}) {
  return (
    <div className="panel--simple">
      <div className="bg-alternative padded-1">
        <h3 className="space-0">Buttons</h3>
      </div>
      <div className="grid-fluid-colmin8em padded-1">
        <Button
          variant="neutral"
          active={vm.inputButtonActive}
          isLoading={vm.inputButtonIsLoading}
          disabled={vm.inputButtonDisabled}
          focused={vm.inputButtonFocused}
        >
          neutral
        </Button>
        <Button
          variant="green"
          active={vm.inputButtonActive}
          isLoading={vm.inputButtonIsLoading}
          disabled={vm.inputButtonDisabled}
          focused={vm.inputButtonFocused}
        >
          green
        </Button>
        <Button
          variant="blue"
          active={vm.inputButtonActive}
          isLoading={vm.inputButtonIsLoading}
          disabled={vm.inputButtonDisabled}
          focused={vm.inputButtonFocused}
        >
          blue
        </Button>
        <Button
          variant="red"
          active={vm.inputButtonActive}
          isLoading={vm.inputButtonIsLoading}
          disabled={vm.inputButtonDisabled}
          focused={vm.inputButtonFocused}
        >
          red
        </Button>
        <Button
          variant="plain-neutral"
          active={vm.inputButtonActive}
          isLoading={vm.inputButtonIsLoading}
          disabled={vm.inputButtonDisabled}
          focused={vm.inputButtonFocused}
        >
          plain-neutral
        </Button>
        <Button
          variant="plain-green"
          active={vm.inputButtonActive}
          isLoading={vm.inputButtonIsLoading}
          disabled={vm.inputButtonDisabled}
          focused={vm.inputButtonFocused}
        >
          plain-green
        </Button>
        <Button
          variant="plain-blue"
          active={vm.inputButtonActive}
          isLoading={vm.inputButtonIsLoading}
          disabled={vm.inputButtonDisabled}
          focused={vm.inputButtonFocused}
        >
          plain-blue
        </Button>
        <Button
          variant="plain-red"
          active={vm.inputButtonActive}
          isLoading={vm.inputButtonIsLoading}
          disabled={vm.inputButtonDisabled}
          focused={vm.inputButtonFocused}
        >
          plain-red
        </Button>
        <Button
          variant="link"
          active={vm.inputButtonActive}
          isLoading={vm.inputButtonIsLoading}
          disabled={vm.inputButtonDisabled}
          focused={vm.inputButtonFocused}
        >
          link
        </Button>
      </div>
      <div className="bg-alternative padded-1">
        <div className="flex-row-center space-bottom-1">
          <div className="space-right-2">
            <Input
              id="inputButtonIsLoading"
              type="checkbox"
              value={vm.inputButtonIsLoading}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputButtonIsLoading"
            />
            <label className="label space-left-1" htmlFor="inputButtonIsLoading">
              isLoading
            </label>
          </div>
          <div className="space-right-2">
            <Input
              id="inputButtonDisabled"
              type="checkbox"
              value={vm.inputButtonDisabled}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputButtonDisabled"
            />
            <label className="label space-left-1" htmlFor="inputButtonDisabled">
              disabled
            </label>
          </div>
        </div>
        <div className="flex-row-center">
          <div className="space-right-2">
            <Input
              id="inputButtonActive"
              type="checkbox"
              value={vm.inputButtonActive}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputButtonActive"
            />
            <label className="label space-left-1" htmlFor="inputButtonActive">
              active
            </label>
          </div>
          <div className="space-right-2">
            <Input
              id="inputButtonFocused"
              type="checkbox"
              value={vm.inputButtonFocused}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputButtonFocused"
            />
            <label className="label space-left-1" htmlFor="inputButtonFocused">
              focused/hover
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

DemoButtons.propTypes = {
  vm: PropTypes.shape({}),
}

export default observer(DemoButtons)
