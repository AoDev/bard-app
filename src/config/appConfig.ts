import type {IconName} from '@ui'

export type Theme = 'light' | 'dark'

export const themeIcons: Record<Theme, IconName> = {light: 'sun', dark: 'moon'}
