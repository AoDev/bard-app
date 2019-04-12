import React from 'react'
import {observer} from 'mobx-react'
import Link from 'shared-components/Link'

export function AlreadySignedIn () {
  return (
    <div className="max-width-24em panel-group center-block space-top-2">
      <div className="bg-white lg-padded-2 txt-center">
        <h3 className="space-top-0">You have an active session</h3>
        <Link className="btn btn-block btn-cta" to="/private/dashboards">
          Return to dashboards <span className="float-right">❯</span>
        </Link>
        <div className="space-top-1 space-bottom-1">or</div>
        <Link className="btn btn-default" to="/private/signout">
          Sign out
        </Link>
      </div>
    </div>
  )
}

export default observer(AlreadySignedIn)
