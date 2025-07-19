import {Button, Icon} from '@ui'
import {Link} from 'bard-router'
import {observer} from 'mobx-react'
import {themeIcons} from 'src/config/appConfig'
import {DemoButtons} from './DemoButtons'
import DemoForms from './DemoForms'
import {DemoIcons} from './DemoIcons'
import {DemoLinks} from './DemoLinks'
import {DemoModals} from './DemoModals'
import {DemoNotes} from './DemoNotes'
import {DemoTables} from './DemoTables'
import {DemoTypography} from './DemoTypography'
import {FrontendGuide} from './FrontendGuide'
import type {UIFWMenuType, UIFrameworkVM} from './UIFrameworkVM'

const UIFWMenu = observer(({vm, menu}: {vm: UIFrameworkVM; menu: UIFWMenuType}) => {
  const {sectionid, contentid} = vm.rootStore.router.params
  const isExpanded = sectionid === menu.id
  const defaultItem = menu.items[0]?.value

  return (
    <div>
      <Link
        className="btn btn--medium btn--tab width-100p justify-start"
        to={`/public/ui-framework?sectionid=${menu.id}&contentid=${defaultItem}`}
      >
        <h3 className="h3 txt-muted">{menu.label}</h3>
      </Link>

      {isExpanded && (
        <div className="panel--simple margin-top-1 overflow-hidden">
          {menu.items.map((item) => (
            <Link
              className="btn btn--menu btn--medium border-radius-0"
              active={contentid === item.value}
              key={item.value}
              to={`/public/ui-framework?sectionid=${menu.id}&contentid=${item.value}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
})

export const UIFramework = observer(({vm}: {vm: UIFrameworkVM}) => {
  const {settings} = vm.rootStore
  const {contentid} = vm.rootStore.router.params
  const contentId = String(contentid) || ''

  return (
    <div className="uifw-layout">
      <div className="scroll-y pad-bottom-2">
        <section className="pad-1">
          <div className="pad-1">
            <h3 className="heading-section margin-top-0">UI Framework</h3>
            <div className="flex-row-center gap-1">
              <span className="label">Theme</span>
              <b>{settings.theme} </b>
              <Button round className="pad-0" variant="secondary" onClick={settings.switchTheme}>
                <Icon size={20} name={themeIcons[settings.theme]} />
              </Button>
            </div>
          </div>

          <UIFWMenu vm={vm} menu={vm.menus.components} />
          <UIFWMenu vm={vm} menu={vm.menus.css} />
          <UIFWMenu vm={vm} menu={vm.menus['frontend-guide']} />
        </section>
      </div>

      <div className="height-100p scroll-y">
        {contentId === 'buttons' && <DemoButtons />}
        {contentId === 'forms' && <DemoForms />}
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
