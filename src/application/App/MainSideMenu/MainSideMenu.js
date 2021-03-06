import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Icon, Button} from 'ui-framework'
import {Link} from 'bard-router'
import {appLogo} from 'app-images'

/**
 * @typedef {import('./MainSideMenuVM').default} MainSideMenuVM
 */

/**
 * @param {{vm: MainSideMenuVM}} props
 */
export function MainSideMenu({vm}) {
  const {rootStore} = vm
  const {uiStore} = rootStore
  const {mainSideMenu, handleMainMenuClick} = uiStore
  const contentClass =
    (vm.subsectionMode ? 'msm__content--sub' : 'msm__content') + ' scrollbar-discreet-y'

  return (
    <React.Fragment>
      {mainSideMenu.visible && (
        <div className="msm-overlay animated fadeIn" onClick={vm.hideMenu} />
      )}
      <div className={mainSideMenu.visible ? 'msm--expanded' : 'main-side-menu'}>
        {vm.section === '' && (
          <div className="msm__header flex-row-center">
            <Button
              className="msm__btn-menu"
              round
              variant="invisible"
              onClick={uiStore.mainSideMenu.toggle}
            >
              <Icon name="#menubars" color={uiStore.colors['color-font-default']} bgPadding={6} />
            </Button>
            <img className="margin-right-1ch" src={appLogo} height="32" /> Bard
          </div>
        )}
        {vm.section !== '' && (
          <div className="msm__header">
            <Button
              className="msm__btn-back"
              variant="invisible"
              onClick={vm.back}
              aria-label="Back"
            >
              <div className="flex-row-center">
                <Icon
                  name="#caret-left"
                  color={uiStore.colors['color-font-default']}
                  bgPadding={8}
                />
                <span className="msm__section-title txt-11 txt-uppercase">
                  {vm.headerTitle || vm.section}
                </span>
              </div>
            </Button>
          </div>
        )}
        <div className={contentClass}>
          <div className="flex-col margin-bottom-2">
            {vm.section === '' && (
              <React.Fragment>
                {vm.session.signedIn && (
                  <React.Fragment>
                    <Link
                      autoActive
                      id="link-menu-profile"
                      to="/private/user-profile"
                      className="btn--msm msm__btn-with-info block margin-top-1"
                      onClick={handleMainMenuClick}
                    >
                      <div className="flex-row-center">
                        <Icon name="#user" />
                        <span className="margin-left-1">
                          <div className="">User profile</div>
                          <div className="msm__btn-info--red">{vm.session.user.name}</div>
                        </span>
                      </div>
                    </Link>
                  </React.Fragment>
                )}

                <Link
                  autoActive
                  id="link-menu-dashboard"
                  to="/private/dashboards"
                  className="btn--msm block margin-top-1"
                  onClick={handleMainMenuClick}
                >
                  <Icon top={6} name="#dashboard" />
                  <span className="margin-left-1">Dashboards</span>
                </Link>

                <Link
                  autoActive
                  id="link-menu-settings"
                  to="/public/app-settings"
                  className="btn--msm block margin-top-1"
                  onClick={handleMainMenuClick}
                >
                  <Icon top={6} name="#menu-settings" />
                  <span className="margin-left-1">App Settings</span>
                </Link>

                <Link
                  autoActive
                  id="link-menu-faq"
                  to="/public/faq"
                  className="btn--msm block margin-top-1"
                  onClick={handleMainMenuClick}
                >
                  <Icon top={6} name="#faq" />
                  <span className="margin-left-1">FAQ</span>
                </Link>

                {process.env.NODE_ENV !== 'production' && (
                  <Link
                    autoActive
                    id="link-menu-ui-framework"
                    to="/public/ui-framework"
                    className="btn--msm block margin-top-1"
                    onClick={handleMainMenuClick}
                  >
                    <Icon top={6} name="#ui-framework" />
                    <span className="margin-left-1">UI framework</span>
                  </Link>
                )}

                {vm.session.signedIn && (
                  <React.Fragment>
                    <Link
                      autoActive
                      id="link-menu-signout"
                      to="/private/signout"
                      className="btn--msm block margin-top-1"
                      onClick={handleMainMenuClick}
                    >
                      <Icon top={6} name="#logout2" />
                      <span className="margin-left-1">Log out</span>
                    </Link>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        </div>

        <div className={vm.section === '' ? 'msm__footer' : 'msm__footer--hidden'}>
          <span className="txt-muted">Bard app - v.{process.env.APP_VERSION}</span>
        </div>
      </div>
    </React.Fragment>
  )
}

export default observer(MainSideMenu)

MainSideMenu.propTypes = {
  vm: PropTypes.shape({
    changeSection: PropTypes.func.isRequired,
    hideMenu: PropTypes.func.isRequired,
    section: PropTypes.string.isRequired,
    session: PropTypes.shape({
      signedIn: PropTypes.bool.isRequired,
      user: PropTypes.shape({}).isRequired,
    }),
    rootStore: PropTypes.shape({
      uiStore: PropTypes.shape({
        handleMainMenuClick: PropTypes.func.isRequired,
        mainSideMenu: PropTypes.shape({
          toggle: PropTypes.func.isRequired,
          visible: PropTypes.bool.isRequired,
          hide: PropTypes.func.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }),
}
