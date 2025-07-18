import {Route} from 'bard-router'
import {lazy, memo} from 'react'
import AppSettings from './AppSettings'
import {Faq} from './Faq'
import {Home} from './Home'
import SignIn from './SignIn'
import {SignOut} from './SignOut'

const UIFramework = lazy(() => import('./UIFramework'))

export const Public = memo(() => {
  return (
    <>
      <Route path="/public/home" Component={Home} />
      <Route path="/public/app-settings" Component={AppSettings} />
      <Route path="/public/faq" Component={Faq} />
      <Route path="/public/ui-framework" Component={UIFramework} />
      <Route path="/public/sign-in" Component={SignIn} />
      <Route path="/public/sign-out" Component={SignOut} />
    </>
  )
})
