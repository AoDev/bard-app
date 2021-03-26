import React from 'react'
import {observer} from 'mobx-react'
import {Link} from 'bard-router'

export function AlreadySignedIn() {
  return (
    <div className="md-max-width-24em center-block md-margin-top-2">
      <div className="md-panel-group bg-white shadow-1">
        <div className="padded-1 max-width-24em center-block txt-center">
          <h3 className="margin-top-0 padded-2">You have an active session</h3>
          <Link className="btn block btn-cta" to="/private/dashboards">
            Return to dashboards <span className="float-right">❯</span>
          </Link>
          <div className="margin-top-1 margin-bottom-1">or</div>
          <Link className="btn btn-default" to="/private/signout">
            Sign out
          </Link>
        </div>
      </div>
    </div>
  )
}

export default observer(AlreadySignedIn)
