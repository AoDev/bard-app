import {Button, Icon} from '@ui'
import {observer} from 'mobx-react'
import {themeIcons} from 'src/config/appConfig'
import {DemoButtons} from './DemoButtons'
import {DemoForms} from './DemoForms'
import {DemoIcons} from './DemoIcons'
import {DemoLinks} from './DemoLinks'
import {DemoModals} from './DemoModals'
import {DemoNotes} from './DemoNotes'
import {DemoTables} from './DemoTables'
import {DemoTypography} from './DemoTypography'
import {FrontendGuide} from './FrontendGuide'
import type {UIFWMenuType, UIFrameworkVM} from './UIFrameworkVM'

const UIFWMenu = observer(({vm, menu}: {vm: UIFrameworkVM; menu: UIFWMenuType}) => {
  const {menuSection, contentId} = vm.contentSelected
  const isExpanded = menuSection === menu.id
  const defaultItem = menu.items[0]?.value

  return (
    <div>
      <Button
        className="block"
        variant="invisible"
        onClickValue={vm.goToSection}
        value={defaultItem}
      >
        <div className="flex-row-center gap-1 justify-between">
          <h3 className="h3">{menu.label}</h3>
          {!isExpanded && <Icon name="caret-down" size={16} />}
        </div>
      </Button>

      {isExpanded && (
        <div className="uifw-section-content">
          {menu.items.map((item) => (
            <Button
              key={item.value}
              variant="menu"
              className="nowrap-truncate"
              onClickValue={vm.goToSection}
              value={item.value}
              active={contentId === item.value}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
})

export const UIFramework = observer(({vm}: {vm: UIFrameworkVM}) => {
  const {settings} = vm.rootStore
  const {contentId} = vm.contentSelected

  return (
    <div className="uifw-layout">
      <div className="scroll-y pad-bottom-2">
        <section className="pad-1">
          <h3 className="heading-section margin-top-0">UI Framework</h3>
          <div className="flex-row-center gap-1">
            <span className="label">Theme</span>
            <b>{settings.theme} </b>
            <Button round className="pad-0" variant="discreet" onClick={settings.switchTheme}>
              <Icon size={20} name={themeIcons[settings.theme]} />
            </Button>
          </div>

          <UIFWMenu vm={vm} menu={vm.menus.components} />
          <UIFWMenu vm={vm} menu={vm.menus['frontend-guide']} />
        </section>
      </div>

      <div className="height-100p scroll-y">
        {contentId === 'buttons' && <DemoButtons vm={vm.demoButtonsVM} />}
        {contentId === 'forms' && <DemoForms vm={vm} />}
        {contentId === 'icons' && <DemoIcons vm={vm} />}
        {contentId === 'modals' && <DemoModals vm={vm} />}
        {contentId === 'notes' && <DemoNotes vm={vm} />}
        {contentId === 'tables' && <DemoTables vm={vm} />}
        {contentId === 'typography' && <DemoTypography />}
        {contentId === 'links' && <DemoLinks />}
        {contentId.startsWith('frontend-') && <FrontendGuide vm={vm} />}
      </div>
    </div>
  )
})
