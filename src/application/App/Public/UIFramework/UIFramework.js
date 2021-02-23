import PropTypes from 'prop-types'
import React from 'react'
import DemoModals from './DemoModals'
import {Button, Icon, Input, Switch} from 'ui-framework'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export default function UIFramework({vm}) {
  const {settings, demoFormVM} = vm

  return (
    <div className="padded-1">
      <div className="padded-h-1 space-bottom-2 flex-row-center">
        <h2>UI Framework</h2>
        <Button
          square
          className="space-left-1 padded-0"
          variant="neutral"
          onClick={settings.switchTheme}
        >
          <Icon name={settings.theme === 'light' ? '#sun' : '#moon'} small />
        </Button>
      </div>
      <div className="r-grid-fluid-colmin24em space-bottom-2">
        <div className="panel--simple">
          <div className="bg-alternative padded-1">
            <h3 className="space-0">Modals</h3>
          </div>
          <DemoModals vm={vm} />
        </div>
        <div className="panel--simple">
          <div className="bg-alternative padded-1">
            <h3 className="space-0">Buttons</h3>
          </div>
          <div className="padded-1">
            <div className="grid-fluid-colmin8em">
              <Button
                variant="neutral"
                active={vm.inputButtonActive}
                isLoading={vm.inputButtonIsLoading}
                disabled={vm.inputButtonDisabled}
              >
                neutral
              </Button>
              <Button
                variant="green"
                active={vm.inputButtonActive}
                isLoading={vm.inputButtonIsLoading}
                disabled={vm.inputButtonDisabled}
              >
                green
              </Button>
              <Button
                variant="blue"
                active={vm.inputButtonActive}
                isLoading={vm.inputButtonIsLoading}
                disabled={vm.inputButtonDisabled}
              >
                blue
              </Button>
              <Button
                variant="red"
                active={vm.inputButtonActive}
                isLoading={vm.inputButtonIsLoading}
                disabled={vm.inputButtonDisabled}
              >
                red
              </Button>
              <Button
                variant="plain-neutral"
                active={vm.inputButtonActive}
                isLoading={vm.inputButtonIsLoading}
                disabled={vm.inputButtonDisabled}
              >
                plain-neutral
              </Button>
              <Button
                variant="plain-blue"
                active={vm.inputButtonActive}
                isLoading={vm.inputButtonIsLoading}
                disabled={vm.inputButtonDisabled}
              >
                plain-blue
              </Button>
              <Button
                variant="plain-green"
                active={vm.inputButtonActive}
                isLoading={vm.inputButtonIsLoading}
                disabled={vm.inputButtonDisabled}
              >
                plain-green
              </Button>
              <Button
                variant="plain-red"
                active={vm.inputButtonActive}
                isLoading={vm.inputButtonIsLoading}
                disabled={vm.inputButtonDisabled}
              >
                plain-red
              </Button>
              <Button
                variant="link"
                active={vm.inputButtonActive}
                isLoading={vm.inputButtonIsLoading}
                disabled={vm.inputButtonDisabled}
              >
                link
              </Button>
            </div>
          </div>
          <div className="bg-alternative padded-1 flex-row-center">
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
                Loading
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
                Disabled
              </label>
            </div>
            <div>
              <Input
                id="inputButtonActive"
                type="checkbox"
                value={vm.inputButtonActive}
                onChange={vm.toggle}
                onChangeEmit="name-value"
                name="inputButtonActive"
              />
              <label className="label space-left-1" htmlFor="inputButtonActive">
                Active
              </label>
            </div>
          </div>
        </div>

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

        <div className="panel--simple">
          <div className="bg-alternative padded-1">
            <h3 className="space-0">Forms</h3>
          </div>
          <div className="padded-1">
            <div className="space-bottom-1">
              <label className="label space-right-1" htmlFor="my-input">
                My Input
              </label>
              <Input id="my-input" />
            </div>

            <div className="space-bottom-1">
              <label className="label space-right-1" htmlFor="my-discreet-input">
                My Discreet Input
              </label>
              <Input id="my-discreet-input" discreet />
            </div>

            <div className="input-group">
              <label className="label space-right-1" htmlFor="inputSwitch">
                Some flag
              </label>
              <Switch
                id="inputSwitch"
                name="inputSwitch"
                value={demoFormVM.inputSwitch}
                onChange={demoFormVM.set}
                onChangeEmit="name-value"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UIFramework.propTypes = {
  vm: PropTypes.shape({
    settings: PropTypes.shape({
      switchTheme: PropTypes.any,
      theme: PropTypes.string,
    }),
  }),
}
