import {Button, ButtonClipboard, type IButtonProps, Icon, InputX, buttonVariants} from '@ui'
import {observer} from 'mobx-react'
import {useRef} from 'react'
import {DemoButtonsVM} from './DemoButtonsVM'

type ButtonProperty = keyof IButtonProps<unknown> | 'focused/hover' | 'with icon'

// Define checkbox options for button properties
const buttonPropertyOptions: Array<{name: keyof DemoButtonsVM; btnProp: ButtonProperty}> = [
  {name: 'iButtonIsLoading', btnProp: 'isLoading'},
  {name: 'iButtonDisabled', btnProp: 'disabled'},
  {name: 'iButtonActive', btnProp: 'active'},
  {name: 'iButtonFocused', btnProp: 'focused/hover'},
  {name: 'iButtonCaretRight', btnProp: 'caretRight'},
  {name: 'iButtonCaretRightEnd', btnProp: 'caretRightEnd'},
  {name: 'iButtonIcon', btnProp: 'with icon'},
  {name: 'iButtonRound', btnProp: 'round'},
  {name: 'iButtonNarrow', btnProp: 'narrow'},
]

export const DemoButtons = observer(() => {
  const {current: vm} = useRef(new DemoButtonsVM())
  return (
    <div className="grid">
      <section className="panel--simple" id="section-buttons">
        <div className="pad-default">
          <div className="panel__header margin-bottom-2">
            <h3 className="h3">Buttons</h3>
          </div>
          <div className="grid grid-colmin12em">
            {buttonVariants.map((variant) => (
              <Button
                key={variant}
                variant={variant}
                active={vm.iButtonActive}
                isLoading={vm.iButtonIsLoading}
                disabled={vm.iButtonDisabled}
                focused={vm.iButtonFocused}
                caretRight={vm.iButtonCaretRight}
                caretRightEnd={vm.iButtonCaretRightEnd}
                round={vm.iButtonRound}
                narrow={vm.iButtonNarrow}
              >
                {vm.iButtonIcon && <Icon name="star" size={24} className="margin-right-1" />}
                {variant}
              </Button>
            ))}
            <Button
              variant="icon"
              active={vm.iButtonActive}
              isLoading={vm.iButtonIsLoading}
              disabled={vm.iButtonDisabled}
              focused={vm.iButtonFocused}
            >
              <Icon name="star" size={20} />
            </Button>
          </div>
        </div>
        <hr className="margin-1" />
        <div className="pad-default">
          <div className="grid grid-colmin10em">
            {buttonPropertyOptions.map(({name, btnProp}) => (
              <div key={name} className="flex-row-center gap-05">
                <InputX vm={vm} type="checkbox" name={name} />
                <label className="label" htmlFor={name}>
                  {btnProp}
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel--simple pad-default">
        <div className="panel__header margin-bottom-2">
          <h3 className="margin-0">Clipboard button</h3>
        </div>
        <div className="flex-row-center justify-between gap-2">
          <div className="flex-row-center gap-05">
            <span className="bg-body">'Hello, world!'</span>
            <ButtonClipboard text="Hello, world!" top={-1} />
          </div>
          <pre className="code">
            {`
<ButtonClipboard text="Hello, world!" />
            `}
          </pre>
        </div>
      </section>

      <section className="panel--simple pad-default">
        <div className="panel__header margin-bottom-2">
          <h3 className="margin-0">Tabs</h3>
        </div>
        <div className="grid-3-col gap-1px width--fit-content">
          <Button variant="tab" active>
            Tab 1
          </Button>
          <Button variant="tab">Long name tab 2</Button>
          <Button variant="tab">Tab 3</Button>
        </div>
        <pre className="code margin-top-2">
          {`
<div className="grid-3-col gap-1px width--fit-content">
  <Button variant="tab" active>
    Tab 1
  </Button>
  <Button variant="tab">Long name tab 2</Button>
  <Button variant="tab">Tab 3</Button>
</div>
            `}
        </pre>
      </section>

      <section className="panel--simple pad-default">
        <div className="panel__header margin-bottom-2">
          <h3 className="margin-0">Buttons extras</h3>
        </div>
        <div className="flex-row-center justify-between gap-2">
          <div style={{width: 'fit-content'}}>
            <div className="btn--sticked-horizontal">
              <Button
                variant={vm.iBtnSelected === 'one' ? 'green' : 'secondary'}
                onClickNameValue={vm.set}
                name="iBtnSelected"
                value="one"
              >
                Option 1
              </Button>
              <Button
                variant={vm.iBtnSelected === 'two' ? 'green' : 'secondary'}
                onClickNameValue={vm.set}
                name="iBtnSelected"
                value="two"
              >
                Option 2
              </Button>
            </div>
          </div>
          <pre className="code">
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
