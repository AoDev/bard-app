import PropTypes from 'prop-types'
import React from 'react'
import {observer, inject} from 'mobx-react'
import {Button, Icon} from 'ui-framework'

export function Header (props) {
  const {rootStore} = props
  const {uiStore, router} = rootStore

  return (
    <div className="main-header">
      <div className="main-header__content">
        <Button
          className="space-right-1"
          variant="invisible"
          onClick={uiStore.mainSideMenu.toggleVisibility}>
          <Icon name="#menubars" color="#fff" bgColor="#1d6dcd" bgCircle bgPadding={6}/>
        </Button>
        <Button
          className="main-header__back-btn space-right-1"
          id="btn-header-back"
          variant="invisible"
          disabled={router.story < 2}
          onClick={router.goBack}>
          <Icon name="#arrow-left" color="#fff" bgColor="#1d6dcd" bgCircle bgPadding={6}/>
        </Button>
        <h1 className="app-title unselectable space-right-2">
          {uiStore.headerTitle}
        </h1>
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
        toggleVisibility: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
