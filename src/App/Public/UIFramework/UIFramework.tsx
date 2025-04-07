import {Button, Icon} from '@ui'
import {observer} from 'mobx-react'
import {themeIcons} from 'src/config/appConfig'
import type {IButtonProps} from 'src/ui-framework/components/Button/Button'
import {DemoButtons} from './DemoButtons'
import {DemoForms} from './DemoForms'
import {DemoIcons} from './DemoIcons'
import {DemoLinks} from './DemoLinks'
import {DemoModals} from './DemoModals'
import {DemoNotes} from './DemoNotes'
import {DemoTables} from './DemoTables'
import {DemoTypography} from './DemoTypography'
import type {UIFrameworkVM} from './UIFrameworkVM'

type Section = UIFrameworkVM['iSection']

const MenuButton = (props: IButtonProps<Section> & {value: Section}) => {
  const cssClass = 'block btn--msm'
  return (
    <Button variant="menu" name="iSection" className={cssClass} {...props}>
      {props.children}
    </Button>
  )
}

const menuItems: {label: string; value: Section}[] = [
  {label: 'Buttons', value: 'buttons'},
  {label: 'Forms', value: 'forms'},
  {label: 'Icons', value: 'icons'},
  {label: 'Modals', value: 'modals'},
  {label: 'Notes', value: 'notes'},
  {label: 'Typography', value: 'typography'},
  {label: 'Links', value: 'links'},
]

export const UIFramework = observer(({vm}: {vm: UIFrameworkVM}) => {
  const {settings} = vm.rootStore

  return (
    <div className="uifw-layout">
      <div>
        <section className="pad-1">
          <h3 className="heading-section">UI Framework</h3>
          <div className="flex-row-center gap-1">
            <span className="label">Theme</span>
            <b>{settings.theme} </b>
            <Button round className="pad-0" variant="discreet" onClick={settings.switchTheme}>
              <Icon size={20} name={themeIcons[settings.theme]} />
            </Button>
          </div>
        </section>
        <h3 className="h3 pad-1">Components</h3>
        {menuItems.map((item) => (
          <MenuButton
            key={item.value}
            onClickNameValue={vm.set}
            value={item.value}
            active={vm.iSection === item.value}
          >
            {item.label}
          </MenuButton>
        ))}
      </div>

      <div className="height-100p scroll-y pad-default">
        {vm.iSection === 'buttons' && <DemoButtons vm={vm} />}
        {vm.iSection === 'forms' && <DemoForms vm={vm} />}
        {vm.iSection === 'icons' && <DemoIcons vm={vm} />}
        {vm.iSection === 'modals' && <DemoModals vm={vm} />}
        {vm.iSection === 'notes' && <DemoNotes vm={vm} />}
        {vm.iSection === 'tables' && <DemoTables vm={vm} />}
        {vm.iSection === 'typography' && <DemoTypography />}
        {vm.iSection === 'links' && <DemoLinks />}
      </div>
    </div>
  )
})
