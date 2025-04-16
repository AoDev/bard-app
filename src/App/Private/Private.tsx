import {Route} from 'bard-router'
import {memo} from 'react'
import PrivateHome from './PrivateHome'

export const Private = memo(() => {
  return <Route path="/private/home" Component={PrivateHome} />
})
