import {Button, Icon} from '@ui'
import {observer} from 'mobx-react'
import type {RootStore} from 'src/stores'

export const Header = observer(({rootStore}: {rootStore: RootStore}) => {
  const {uiStore} = rootStore
  const {screenMin3x} = uiStore.media
  const menuBtn = (
    <Button variant="icon" onClick={uiStore.mainSideMenu.toggle}>
      <Icon name="menubars" size={26} bgPadding={4} />
    </Button>
  )

  return (
    <div className="main-header">
      <div className="main-header__content">
        {screenMin3x ? menuBtn : <div className="flex-col-center">{menuBtn}</div>}
      </div>
    </div>
  )
})
