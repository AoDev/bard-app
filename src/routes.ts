import type {IRouteConfig, Router} from 'bard-router'

export interface IRoute extends IRouteConfig {
  headerTitle?: string
}

export function planWindowTitle(params: Router['params']) {
  const {coinSymbol} = params
  return typeof coinSymbol === 'string' ? `Plan ${coinSymbol}` : 'Plan'
}

export function getRoutes() {
  const routes: Readonly<Record<string, IRoute>> = {
    '/': {
      intercept(request) {
        return request.route === '/' ? {...request, route: '/public/home'} : request
      },
    },
    '/public': {},
    '/public/ui-framework': {windowTitlePlugin: 'UI Framework'},
    '/public/app-settings': {windowTitlePlugin: 'App settings'},
    '/public/faq': {windowTitlePlugin: 'FAQ'},
  }
  return routes
}
