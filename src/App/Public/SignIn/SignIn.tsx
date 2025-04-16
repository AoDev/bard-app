import {Button} from '@ui'
import {observer} from 'mobx-react'
import type {SignInVM} from './SignInVM'

export const SignIn = observer(({vm}: {vm: SignInVM}) => {
  return (
    <div className="center-optimal">
      <form className="txt-center" onSubmit={vm.submitSignIn}>
        <h3 className="h3">Private access</h3>
        <p>Authentication flow demo</p>
        <Button variant="primary" type="submit" isLoading={vm.rootStore.user.pending}>
          Sign In
        </Button>
      </form>
    </div>
  )
})
