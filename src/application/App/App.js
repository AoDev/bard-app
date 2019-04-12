import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import loadable from '@loadable/component'
import {Modal} from 'ui-framework'
import ErrorBoundary from 'shared-components/ErrorBoundary'
import Route from 'shared-components/Route'
import UnexpectedError from './UnexpectedError'
import Header from './Header'
import NotFound from './NotFound'
import MainSideMenu from './MainSideMenu'
import Public from './Public'
const Private = loadable(() => import(/* webpackChunkName: "private" */'./Private'))
setTimeout(() => Private.prefetch(), 1000)

export function App (props) {
  const {uiStore, rootStore} = props

  return (
    <ErrorBoundary rootStore={rootStore}>
      <div className="height-100p">
        <Header/>
        <MainSideMenu/>
        <div className="main-content">
          <Route path="/not-found" Component={NotFound}/>
          <Route path="/public" Component={Public}/>
          <Route path="/private" Component={Private}/>
        </div>
        <Modal modalVM={uiStore.unexpectedErrorDialog}>
          <UnexpectedError rootStore={rootStore}/>
        </Modal>
      </div>
    </ErrorBoundary>
  )
}

export default inject('rootStore', 'coreStore', 'uiStore')(observer(App))

App.propTypes = {
  rootStore: PropTypes.object.isRequired,
  coreStore: PropTypes.shape({
    appIsLoading: PropTypes.bool.isRequired,
    onboardingIsVisible: PropTypes.bool.isRequired,
  }).isRequired,
  uiStore: PropTypes.object.isRequired,
}