import {Button, type ButtonVariant, Icon, Input, InputX} from '@ui'
import {observer} from 'mobx-react'
import type {UIFrameworkVM} from './UIFrameworkVM'

const btnVariants: ButtonVariant[] = [
  'blue',
  'discreet',
  'green',
  'invisible',
  'link',
  'menu',
  'neutral',
  'red',
  'tab',
  'text',
  'theader',
]

export const DemoButtons = observer(({vm}: {vm: UIFrameworkVM}) => {
  return (
    <div className="grid">
      <section className="panel--simple" id="section-buttons">
        <div className="pad-default">
          <div className="panel__header margin-bottom-2">
            <h3 className="h3">Buttons</h3>
          </div>
          <div className="grid grid-colmin12em">
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
                round={vm.inputButtonRound}
                narrow={vm.inputButtonNarrow}
              >
                {vm.inputButtonIcon && <Icon name="star" size={24} className="margin-right-1" />}
                {variant}
              </Button>
            ))}
            <Button
              variant="icon"
              active={vm.inputButtonActive}
              isLoading={vm.inputButtonIsLoading}
              disabled={vm.inputButtonDisabled}
              focused={vm.inputButtonFocused}
            >
              <Icon name="star" size={20} />
            </Button>
          </div>
        </div>
        <hr className="margin-1" />
        <div className="pad-default">
          <div className="grid grid-colmin10em">
            <div>
              <Input
                id="inputButtonIsLoading"
                type="checkbox"
                value={vm.inputButtonIsLoading}
                onChangeNameValue={vm.toggle}
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
                onChangeNameValue={vm.toggle}
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
                onChangeNameValue={vm.toggle}
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
                onChangeNameValue={vm.toggle}
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
                onChangeNameValue={vm.toggle}
                name="inputButtonCaretRight"
              />
              <label className="label margin-left-1" htmlFor="inputButtonCaretRight">
                caretRight
              </label>
            </div>

            <div>
              <label>
                <InputX type="checkbox" vm={vm} name="inputButtonCaretRightEnd" />
                <span className="label margin-left-1">caretRightEnd</span>{' '}
              </label>
            </div>

            <div>
              <label>
                <InputX type="checkbox" vm={vm} name="inputButtonIcon" />
                <span className="label margin-left-1">with icon</span>{' '}
              </label>
            </div>

            <div>
              <label>
                <InputX type="checkbox" vm={vm} name="inputButtonRound" />
                <span className="label margin-left-1">round</span>{' '}
              </label>
            </div>

            <div>
              <label>
                <InputX type="checkbox" vm={vm} name="inputButtonNarrow" />
                <span className="label margin-left-1">narrow</span>{' '}
              </label>
            </div>
          </div>
        </div>
      </section>
      <section className="panel--simple pad-default">
        <div className="panel__header margin-bottom-2">
          <h3 className="margin-0">Buttons extras</h3>
        </div>
        <div className="grid-2-col-2x">
          <div style={{width: 'fit-content'}}>
            <div className="btn--sticked-horizontal">
              <Button
                variant={vm.iBtnSelected === 'one' ? 'green' : 'discreet'}
                onClickNameValue={vm.set}
                name="iBtnSelected"
                value="one"
              >
                Option 1
              </Button>
              <Button
                variant={vm.iBtnSelected === 'two' ? 'green' : 'discreet'}
                onClickNameValue={vm.set}
                name="iBtnSelected"
                value="two"
              >
                Option 2
              </Button>
            </div>
          </div>
          <pre>
            {`
<div className="btn--sticked-horizontal">
  <Button variant={…? : 'green' : 'discreet'}>
    Option 1
  </Button>

  <Button variant={…? : 'green' : 'discreet'}>
    Option 2
  </Button>
</div>
            `}
          </pre>
        </div>
      </section>
    </div>
  )
})
