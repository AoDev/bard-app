/**
 * @param {BardRouter} router
 * @param {*} request
 */
function authCheck(router, request) {
  const {rootStore} = router.app
  if (!rootStore.session.signedIn) {
    return {route: '/public/signin'}
  }
  return request
}

const routes = {
  '/': {
    intercept(router, request) {
      if (request.route === '/') {
        request.route = '/public/signin'
      }
      return request
    },
  },
  '/public': {
    intercept(router, request) {
      if (request.route === '/public') {
        request.route = '/public/signin'
      }
      return request
    },
  },
  '/public/signin': {
    windowTitlePlugin: {title: 'Start'},
  },

  '/public/ui-framework': {
    windowTitlePlugin: {title: 'UI framework'},
  },

  '/public/app-settings': {
    windowTitlePlugin: {title: 'App settings'},
  },

  '/private': {
    intercept: authCheck,
  },

  '/private/user-profile': {},

  '/private/signout': {
    afterEnter(router) {
      setTimeout(async () => {
        // Give time for components to unmount / VM cleanup before getting out
        const {rootStore} = router.app
        await rootStore.session.signout()
        router.goTo({route: '/public/signin'})
      }, 1000)
    },
  },

  '/private/dashboards': {
    windowTitlePlugin: {title: 'Dashboards'},
  },
  '/public/faq': {},
  '/not-found': {},
}

export default routes
