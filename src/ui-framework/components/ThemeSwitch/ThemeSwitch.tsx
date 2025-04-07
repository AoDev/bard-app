import {Button, type IButtonProps, Icon} from '@ui'
import {inject, observer} from 'mobx-react'
import type {JSX} from 'react'
import {themeIcons} from 'src/config/appConfig'
import type {RootStore} from 'src/stores'

interface IProps<V> extends Omit<IButtonProps<V>, 'variant'> {
  rootStore: RootStore
}

/**
 * Button that switches the theme.
 */
function ThemeSwitchComponent<V>({rootStore, ...others}: IProps<V>) {
  return (
    <Button variant="icon" onClick={rootStore.settings.switchTheme} {...others}>
      <Icon size={20} name={themeIcons[rootStore.settings.theme]} />
    </Button>
  )
}

/**
 * Theme switcher button. Already injected with rootStore.
 * @example
 * <ThemeSwitch />
 */
export const ThemeSwitch = inject('rootStore')(observer(ThemeSwitchComponent)) as unknown as <V>(
  props: Omit<IProps<V>, 'rootStore'>
) => JSX.Element
