import type {RootStore} from '@src/stores'
import {Button, Icon, ThemeSwitch} from '@ui'
import {observer} from 'mobx-react'
import {MenuButton} from './MenuButton'
// import ThemeSwitch from 'shared-components/ThemeSwitch'

export const MainSideMenu = observer(({rootStore}: {rootStore: RootStore}) => {
  const {uiStore} = rootStore
  const {mainSideMenu} = uiStore
  const {hide, withCloseBtn} = uiStore.media.screenMin3x
    ? {hide: () => {}, withCloseBtn: false}
    : {hide: uiStore.mainSideMenu.hide, withCloseBtn: true}
  const overlayClasses = `msm-overlay ${mainSideMenu.dialogClassName}`

  return (
    <>
      {mainSideMenu.state !== 'hidden' && (
        <div className={overlayClasses} onClick={mainSideMenu.hide} />
      )}
      <div className={mainSideMenu.visible ? 'msm--expanded' : 'main-side-menu'}>
        <div className="msm-scroll scrollbar-discreet-y">
          <div className="msm-layout">
            <MenuButton icon="home" label="Start" onClick={hide} to="/public/home" />

            <MenuButton
              icon="settings"
              label="App Settings"
              onClick={hide}
              to="/public/app-settings"
            />
            <MenuButton icon="faq" label="FAQ" onClick={hide} to="/public/faq" />
            {process.env.NODE_ENV !== 'production' && (
              <MenuButton
                icon="ui-framework"
                label="UI framework"
                onClick={hide}
                to="/public/ui-framework"
              />
            )}
          </div>

          <div className="msm__footer">
            <ThemeSwitch />
            {withCloseBtn && (
              <Button variant="icon" onClick={hide}>
                <Icon name="cross" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
})
