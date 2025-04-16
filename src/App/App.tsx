import {ErrorBoundary} from '@src/lib/react'
import {observer} from 'mobx-react'
import {AppHandledError} from './AppHandledError'
import {AppUnexpectedError} from './AppUnexpectedError'
import type {AppVM} from './AppVM'
import {Header} from './Header'
import {MainSideMenu} from './MainSideMenu'
import {Private} from './Private'
import {Public} from './Public'

export const App = observer(({vm}: {vm: AppVM}) => {
  return (
    <ErrorBoundary
      onError={vm.rootStore.setErrorFromReactBoundary}
      fallback={() => <AppUnexpectedError rootStore={vm.rootStore} />}
    >
      <div className="app">
        <Header rootStore={vm.rootStore} />
        <div className="main-content">
          <Public />
          <Private />
        </div>
      </div>
      <MainSideMenu rootStore={vm.rootStore} />
      <AppHandledError rootStore={vm.rootStore} />
      <AppUnexpectedError rootStore={vm.rootStore} />
    </ErrorBoundary>
  )
})
