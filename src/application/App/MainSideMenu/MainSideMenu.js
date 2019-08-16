import PropTypes from 'prop-types'
import React from 'react'
import {inject, observer} from 'mobx-react'
import {Icon} from 'ui-framework'
import Link from 'shared-components/Link'
import Submenu from './Submenu'
import {appLogo} from 'app-images'

export function MainSideMenu (props) {
  const {rootStore} = props
  const {uiStore, router, coreStore} = rootStore
  const {session} = coreStore
  const {mainSideMenu, handleMainMenuClick} = uiStore
  const onUserProfile = router.route.startsWith('/private/user-profile')

  return (
    <React.Fragment>
      {mainSideMenu.visible &&
        <div className="msm-overlay animated fadeIn" onClick={mainSideMenu.hide}/>
      }
      <div className={mainSideMenu.visible ? 'msm--expanded' : 'main-side-menu'}>
        <div className="height-100p scrollbar-discreet-y">
          <div className="flex-col">
            <div className="msm__header flex-row-center">
              <img src={appLogo} height="32" width="32"/>
              <div className="space-left-1 txt-black txt-15 txt-italic">Bard</div>
            </div>
            {session.signedIn && <React.Fragment>
              <Link autoActive id="link-menu-dashboard" to="/private/dashboards" className="btn btn-msm btn-block space-bottom-1" onClick={handleMainMenuClick}>
                <Icon top={6} color="#666" name="#dashboard"/><span className="space-left-1">Dashboards</span>
              </Link>
            </React.Fragment>}
            {!session.signedIn &&
              <Link
                onClick={handleMainMenuClick}
                autoActive
                id="link-menu-my-cryptos"
                to="/public/signin"
                className="btn btn-msm btn-block space-bottom-1">
                <Icon top={6} color="#666" name="#dashboard"/><span className="space-left-1">Dashboard</span>
              </Link>
            }
            {session.signedIn &&
              <div className="space-bottom-1">
                <Link
                  onClick={handleMainMenuClick}
                  autoActive
                  id="link-menu-profile"
                  to="/private/user-profile"
                  className="btn btn-msm btn-block">
                  <Icon top={6} color="#666" name="#menu-profile"/><span className="space-left-1">User profile</span>
                </Link>

                <Submenu visible={onUserProfile}>
                  <Link
                    onClick={handleMainMenuClick}
                    autoActive
                    to="/private/signout"
                    className="btn btn-menu btn-block txt-left">
                    <Icon
                      name="#logout"
                      size={20}
                      className="space-right-1"/> Sign out
                  </Link>
                </Submenu>
              </div>
            }

            <Link autoActive id="link-menu-cytoscape" to="/public/cytoscape" className="btn btn-msm btn-block space-bottom-1" onClick={handleMainMenuClick}>
              <Icon top={6} color="#666" name="#menu-settings"/><span className="space-left-1">Cytoscape</span>
            </Link>

            <Link autoActive id="link-menu-settings" to="/public/app-settings" className="btn btn-msm btn-block space-bottom-1" onClick={handleMainMenuClick}>
              <Icon top={6} color="#666" name="#menu-settings"/><span className="space-left-1">App Settings</span>
            </Link>

            <Link autoActive id="link-menu-faq" to="/public/faq" className="btn btn-msm btn-block space-bottom-1" onClick={handleMainMenuClick}>
              <Icon top={6} color="#666" name="#faq"/><span className="space-left-1">FAQ</span>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default inject('rootStore')(observer(MainSideMenu))

MainSideMenu.propTypes = {
  rootStore: PropTypes.shape({
    uiStore: PropTypes.shape({
      mainSideMenu: PropTypes.shape({
        visible: PropTypes.bool.isRequired,
        hide: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
