import PropTypes from 'prop-types'
import React from 'react'
import {observer, inject} from 'mobx-react'
import SignIn from './SignIn'
import Faq from './Faq'
import AppSettings from './AppSettings'
import loadable from '@loadable/component'
import {Route} from 'bard-router'
import {Loader} from 'ui-framework'

const UIFramework = loadable(() => import(/* webpackChunkName: "UIFramework" */ './UIFramework'))

export function Public(props) {
  const {rootStore} = props

  return (
    <React.Fragment>
      {rootStore.appIsLoading && (
        <div className="app-init-loader panel">
          <Loader label="app is loading..." />
        </div>
      )}

      <React.Fragment>
        <Route path="/public/signin" Component={SignIn} />
        <Route path="/public/faq" Component={Faq} />
        <Route path="/public/app-settings" Component={AppSettings} />
        <Route path="/public/ui-framework" Component={UIFramework} />
      </React.Fragment>
    </React.Fragment>
  )
}

export default inject(({rootStore}) => ({
  rootStore,
  profilesStore: rootStore.profilesStore,
}))(observer(Public))

Public.propTypes = {
  profilesStore: PropTypes.shape({
    isLoading: PropTypes.bool.isLoading,
  }).isRequired,
}
