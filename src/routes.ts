import type {IRouteConfig} from 'bard-router'
import type {RootStore} from './stores/RootStore'

export interface IRoute extends IRouteConfig {
  headerTitle?: string
}

function createRoutes<T>(routes: Record<keyof T, IRoute>): Record<keyof T, IRoute> {
  return routes
}

// Useful for type safety when referencing routes but optional
export const RoutePath = {
  appSettings: '/public/app-settings',
  faq: '/public/faq',
  privateHome: '/private/home',
  publicHome: '/public/home',
  root: '/',
  signIn: '/public/sign-in',
  signOut: '/public/sign-out',
  uiFramework: '/public/ui-framework',
} as const

export function getRoutes(rootStore: RootStore) {
  return createRoutes({
    [RoutePath.root]: {
      intercept(request) {
        return request.route === '/' ? {...request, route: RoutePath.publicHome} : request
      },
    },
    [RoutePath.signIn]: {
      intercept(request) {
        const {user} = rootStore
        return user.signedIn ? {route: RoutePath.privateHome} : request
      },
    },
    [RoutePath.uiFramework]: {windowTitlePlugin: 'UI Framework'},
    [RoutePath.appSettings]: {windowTitlePlugin: 'App settings'},
    [RoutePath.faq]: {windowTitlePlugin: 'FAQ'},
    '/private': {
      intercept(request) {
        const {user} = rootStore
        return user.signedIn ? request : {route: RoutePath.signIn}
      },
    },
  })
}
