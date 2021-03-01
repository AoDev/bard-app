import React from 'react'
import {observer} from 'mobx-react'
import {Loader} from 'ui-framework'

export function SignOut() {
  return (
    <div className="max-width-24em center-block margin-top-2">
      <div className="txt-center">
        <Loader label="Signing out" />
      </div>
    </div>
  )
}

export default observer(SignOut)
