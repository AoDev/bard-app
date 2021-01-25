import PropTypes from 'prop-types'
import React from 'react'
import {inject, observer} from 'mobx-react'
import {Route} from 'bard-router'
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import SignOut from './SignOut'

export function Private(props) {
  return (
    <React.Fragment>
      <Route path="/private/dashboards" Component={Dashboard} />
      <Route path="/private/signout" Component={SignOut} />
      <Route path="/private/user-profile" Component={UserProfile} />
    </React.Fragment>
  )
}

Private.propTypes = {
  uiStore: PropTypes.object,
}

export default inject(({uiStore}) => ({
  uiStore,
}))(observer(Private))
