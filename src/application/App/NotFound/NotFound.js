import React from 'react'
import {observer} from 'mobx-react'
import {Note} from 'ui-framework'
import Link from 'shared-components/Link'

export function NotFound (props) {
  return (
    <div className="max-width-24em center-block space-top-2">
      <div className="md-panel-group">
        <div className="bg-white padded-1">
          <h1>Not found</h1>
          <Note variant="orange" withBackground>
            <p>Oops, we could not find what you were looking for.</p>
          </Note>
        </div>
        <div className="bg-gray padded-1">
          <Link className="btn btn-block btn-cta txt-center" to="/">
            Go back home <span className="float-right">❯</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default observer(NotFound)
