import PropTypes from 'prop-types'
import React from 'react'
import {observer, inject} from 'mobx-react'
import {Button, Icon} from 'ui-framework'

export function Header(props) {
  const {rootStore} = props
  const {uiStore, router} = rootStore
  const showBackBtn = router.route === '/public/reset-password'
  const showMenuBtn = !showBackBtn

  return (
    <div className="main-header">
      <div className="main-header__content">
        {showMenuBtn && (
          <Button
            className="margin-right-1 main-header__btn"
            variant="invisible"
            onClick={uiStore.mainSideMenu.toggle}
          >
            <Icon name="#menubars" color={uiStore.colors['color-font-default']} bgPadding={6} />
          </Button>
        )}

        {showBackBtn && (
          <Button className="main-header__btn" variant="invisible" onClick={router.goBack}>
            <Icon name="#arrow-left" color={uiStore.colors['color-font-default']} bgPadding={6} />
          </Button>
        )}
      </div>
    </div>
  )
}

export default inject('rootStore')(observer(Header))

Header.propTypes = {
  rootStore: PropTypes.shape({
    uiStore: PropTypes.shape({
      hideMainNavMenu: PropTypes.func.isRequired,
      toggleProp: PropTypes.func.isRequired,
      mainSideMenu: PropTypes.shape({
        toggle: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
