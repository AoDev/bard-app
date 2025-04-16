import {Button, Icon} from '@ui'
import {observer} from 'mobx-react'
import type {PrivateHomeVM} from './PrivateHomeVM'

export const PrivateHome = observer(({vm}: {vm: PrivateHomeVM}) => {
  const {user, signOut: signout} = vm.rootStore
  return (
    <div className="center-optimal">
      <div className="txt-center">
        <h3 className="h3">This is the private section (demo)</h3>
        <p>You have been redirected to {'/private/home'} after signing in.</p>
        <Button variant="primary" onClick={signout} isLoading={user.pending}>
          <Icon name="signout" /> Sign Out
        </Button>
      </div>
    </div>
  )
})
