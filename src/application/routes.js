import SignInVM from './App/Public/SignIn/SignInVM'
import DashboardVM from './App/Private/Dashboard/DashboardVM'

/**
 * @param {*} router
 * @param {*} request
 */
function authCheck (router, request) {
  const {coreStore} = router.app
  if (!coreStore.session.signedIn) {
    return {route: '/public/signin'}
  }
  return request
}

const routes = {
  '/': {
    intercept (router, request) {
      if (request.route === '/') {
        request.route = '/public/signin'
      }
      return request
    }
  },
  '/public': {
    intercept (router, request) {
      if (request.route === '/public') {
        request.route = '/public/how-it-works'
      }
      return request
    }
  },
  '/public/signin': {
    windowTitlePlugin: {title: 'Start a session'},
    vmPlugin: {
      vmClass: SignInVM,
    }
  },

  '/public/app-settings': {
    windowTitlePlugin: {title: 'App settings'},
  },

  '/private': {
    intercept: authCheck,
  },

  '/private/user-profile': {},

  '/private/signout': {
    afterEnter (router) {
      setTimeout(async () => {
        // Give time for components to unmount / VM cleanup before getting out
        const {coreStore} = router.app
        await coreStore.session.signout()
        router.goTo({route: '/public/signin'})
      }, 1000)
    }
  },

  '/private/dashboards': {
    windowTitlePlugin: {title: 'Dashboards'},
    vmPlugin: {
      vmClass: DashboardVM,
    }
  },
  '/public/faq': {},
  '/not-found': {},
}

export default routes
