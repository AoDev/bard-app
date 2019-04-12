import React from 'react'
import {observer} from 'mobx-react'
import {Note} from 'ui-framework'
import Link from 'shared-components/Link'

export function NotFound (props) {
  return (
    <div className="max-width-24em block-center space-top-2">
      <div className="r-panel lg-padded-2">
        <h1>Not found</h1>
        <Note variant="orange" withBackground>
          <p>Oops, we could not find what you were looking for.</p>
        </Note>
        <Link className="btn btn-block btn-cta space-top-2" to="/">
          Go back home <span className="float-right">❯</span>
        </Link>
      </div>
    </div>
  )
}

export default observer(NotFound)
