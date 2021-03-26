import React from 'react'
import {observer} from 'mobx-react'
import {Button, Input, Icon} from 'ui-framework'

/**
 * @typedef {import('./UIFrameworkVM').default} UIFrameworkVM
 */

const btnVariants = [
  'neutral',
  'green',
  'blue',
  'red',
  'plain-neutral',
  'plain-green',
  'plain-blue',
  'plain-red',
  'link',
]

/**
 * @param {{vm: UIFrameworkVM}} props
 */
export function DemoButtons({vm}) {
  return (
    <section className="panel--simple">
      <div className="panel__header">
        <h3 className="margin-0">Buttons</h3>
      </div>
      <div className="grid-fluid-colmin12em md-padded-2">
        {btnVariants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            active={vm.inputButtonActive}
            isLoading={vm.inputButtonIsLoading}
            disabled={vm.inputButtonDisabled}
            focused={vm.inputButtonFocused}
            caretRight={vm.inputButtonCaretRight}
            caretRightEnd={vm.inputButtonCaretRightEnd}
          >
            {vm.inputButtonIcon && <Icon name="#star" size={24} className="margin-right-1" />}
            {variant}
          </Button>
        ))}
      </div>
      <div className="bg-alternative md-padded-2">
        <div className="grid-fluid-colmin10em">
          <div>
            <Input
              id="inputButtonIsLoading"
              type="checkbox"
              value={vm.inputButtonIsLoading}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputButtonIsLoading"
            />
            <label className="label margin-left-1" htmlFor="inputButtonIsLoading">
              isLoading
            </label>
          </div>
          <div>
            <Input
              id="inputButtonDisabled"
              type="checkbox"
              value={vm.inputButtonDisabled}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputButtonDisabled"
            />
            <label className="label margin-left-1" htmlFor="inputButtonDisabled">
              disabled
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
            <label className="label margin-left-1" htmlFor="inputButtonActive">
              active
            </label>
          </div>
          <div>
            <Input
              id="inputButtonFocused"
              type="checkbox"
              value={vm.inputButtonFocused}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputButtonFocused"
            />
            <label className="label margin-left-1" htmlFor="inputButtonFocused">
              focused/hover
            </label>
          </div>

          <div>
            <Input
              id="inputButtonCaretRight"
              type="checkbox"
              value={vm.inputButtonCaretRight}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputButtonCaretRight"
            />
            <label className="label margin-left-1" htmlFor="inputButtonCaretRight">
              caretRight
            </label>
          </div>
          <div>
            <Input
              id="inputButtonCaretRightEnd"
              type="checkbox"
              value={vm.inputButtonCaretRightEnd}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputButtonCaretRightEnd"
            />
            <label className="label margin-left-1" htmlFor="inputButtonCaretRightEnd">
              caretRightEnd
            </label>
          </div>

          <div>
            <Input
              id="inputButtonIcon"
              type="checkbox"
              value={vm.inputButtonIcon}
              onChange={vm.toggle}
              onChangeEmit="name-value"
              name="inputButtonIcon"
            />
            <label className="label margin-left-1" htmlFor="inputButtonIcon">
              Demo with icon
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}

export default observer(DemoButtons)
