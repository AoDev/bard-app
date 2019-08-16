import PropTypes from 'prop-types'
import React from 'react'
import {observer, inject} from 'mobx-react'
import SignIn from './SignIn'
import Faq from './Faq'
import AppSettings from './AppSettings'
import CytoscapeDemo from './CytoscapeDemo'
import Route from 'shared-components/Route'
import {Loader} from 'ui-framework'

export function Public (props) {
  const {coreStore} = props

  return (
    <React.Fragment>
      {coreStore.appIsLoading &&
        <div className="app-init-loader panel">
          <Loader label="app is loading..."/>
        </div>
      }

      <React.Fragment>
        <Route path="/public/signin" Component={SignIn}/>
        <Route path="/public/faq" Component={Faq}/>
        <Route path="/public/app-settings" Component={AppSettings}/>
        <Route path="/public/cytoscape" Component={CytoscapeDemo}/>
      </React.Fragment>
    </React.Fragment>
  )
}

export default inject(({coreStore}) => ({
  coreStore,
  profilesStore: coreStore.profilesStore
}))(observer(Public))

Public.propTypes = {
  profilesStore: PropTypes.shape({
    isLoading: PropTypes.bool.isLoading,
  }).isRequired,
}
