import PropTypes from 'prop-types'
import React from 'react'
import {Input, Button} from 'ui-framework'

export default function UserProfile ({vm}) {
  const {user} = vm

  return (
    <div className="r-grid-fluid-colmin24em space-bottom-2 md-padded-1">
      <form className="md-panel-group flex-col" onSubmit={vm.submit}>
        <div className="panel__header bg-gray padded-1 flex-row-center">
          <h3 className="space-0 h-header">Profile details</h3>
          <Button
            ripple
            variant="cta-green"
            className="flex-row-end"
            disabled={!vm.isValidDetails}
            type="submit">
            Save
          </Button>
        </div>

        <div className="bg-white padded-1 flex-fill">
          <input id="profile-id" type="hidden" value={user.id}/>
          <div className="flex-row-center space-bottom-2">
            <label className="label space-right-1" htmlFor="input-profile-name">
              User name
            </label>
            <Input
              discreet
              id="input-user-name"
              name="userName"
              value={vm.userName}
              onChange={vm.set}
              onChangeEmit="name-value"/>
          </div>
        </div>
      </form>

      <section className="md-panel-group flex-col">
        <div className="panel__header bg-gray padded-1 flex-row-center">
          <h3 className="space-0 h-header">
            Delete this profile
          </h3>
          <Button
            ripple
            className="flex-row-end"
            id="btn-submit-delete-profile"
            disabled={!vm.canSubmitDelete}
            variant="cta-red"
            value={user.id}
            onClick={vm.askDeleteProfile}
            onClickEmit="value">
            Delete
          </Button>
        </div>

        <div className="bg-white padded-1">

          <p className="space-top-0">All associated data will be removed as well.</p>

          <div className="flex-row-center space-bottom-2">
            <label className="label space-right-1" htmlFor="input-profile-password">Your password</label>
            <Input
              discreet
              name="password"
              type="password"
              placeholder="* * *"
              id="input-profile-password"
              value={vm.password}
              onChange={vm.set}
              onChangeEmit="name-value"/>
          </div>
        </div>
      </section>
    </div>
  )
}

UserProfile.propTypes = {
  vm: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}
