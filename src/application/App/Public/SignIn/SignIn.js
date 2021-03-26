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
    <div className="padded-1">
      <div className="margin-top-2 max-width-24em center-block panel--simple">
        <div className="padded-1 bg-alternative">
          <h3 className="flex-row-center margin-0">
            <Icon name="#user" size={28} className="flex-no-shrink" />
            <span className="margin-left-1">Sign in</span>
          </h3>
        </div>
        <div className="lg-padded-2">
          <form onSubmit={vm.submit}>
            <div className="flex-row-center margin-bottom-1">
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

            <div className="flex-row-center margin-bottom-2">
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
              caretRight
              className="block"
              disabledMock={!vm.isValid}
              isLoading={vm.session.isAuthenticating}
              variant="plain-blue"
            >
              Start
            </Button>
          </form>
        </div>
        <div className="padded-1">
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
