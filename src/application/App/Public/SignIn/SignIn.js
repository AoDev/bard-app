import PropTypes from 'prop-types'
import React from 'react'
import AlreadySignedIn from './AlreadySignedIn'
import {Button, Input, Icon} from 'ui-framework'

export default function SignIn(props) {
  const {vm} = props

  if (vm.session.signedIn) {
    return <AlreadySignedIn />
  }

  return (
    <div className="md-max-width-24em center-block md-space-top-2">
      <div className="md-panel-group">
        <div className="bg-darken padded-1">
          <h3 className="h-header flex-row-center space-0">
            <Icon name="#user" size={28} className="flex-no-shrink" />
            <span className="space-left-1">Sign in</span>
          </h3>
        </div>
        <div className="lg-padded-2">
          <form onSubmit={vm.submit}>
            <div className="flex-row-center space-bottom-1">
              <label className="label width-8em" htmlFor="user-name">
                Username
              </label>
              <Input
                discreet
                focusOnMount
                className="flex-fill"
                id="user-name"
                placeholder="Doe"
                value={vm.name}
                name="name"
                onChange={vm.set}
                onChangeEmit="name-value"
              />
            </div>

            <div className="flex-row-center space-bottom-2">
              <label className="label width-8em" htmlFor="user-password">
                Password
              </label>
              <Input
                discreet
                type="password"
                className="flex-fill"
                id="user-password"
                placeholder="***"
                name="password"
                value={vm.password}
                onChange={vm.set}
                onChangeEmit="name-value"
              />
            </div>
            <Button
              type="submit"
              className="btn-block"
              disabledMock={!vm.isValid}
              isLoading={vm.session.isAuthenticating}
              variant="cta"
            >
              Start <span className="float-right">❯</span>
            </Button>
          </form>
        </div>
        <div className="bg-darken padded-1">
          <div className="txt-center txt-italic">* Use any password, this is a demo.</div>
        </div>
      </div>
    </div>
  )
}

SignIn.propTypes = {
  vm: PropTypes.shape({
    isValid: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    session: PropTypes.shape({
      isAuthenticating: PropTypes.bool.isRequired,
      signedIn: PropTypes.bool.isRequired,
    }).isRequired,
    set: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
  }).isRequired,
}
