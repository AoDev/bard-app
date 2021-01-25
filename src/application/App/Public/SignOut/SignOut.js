import PropTypes from 'prop-types'
import React from 'react'
import {observer} from 'mobx-react'
import {Loader} from 'ui-framework'

export function SignOut(props) {
  const {sessionStore} = props
  return (
    <div className="max-width-24em block-center space-top-2">
      <div className="txt-center">
        {sessionStore.isAuthenticating && <Loader white label="Signing out" />}
        {sessionStore.error && (
          <p>Failed to close your session. Please, close the app and report this issue.</p>
        )}
      </div>
    </div>
  )
}

SignOut.propTypes = {
  sessionStore: PropTypes.shape({
    isAuthenticating: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
  }).isRequired,
}

export default observer(SignOut)
