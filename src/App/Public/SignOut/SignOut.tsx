import {Loader} from '@ui'
import {memo} from 'react'

export const SignOut = memo(() => {
  return (
    <div className="center-optimal">
      <div className="txt-center">
        <Loader label="Signing out" />
      </div>
    </div>
  )
})
