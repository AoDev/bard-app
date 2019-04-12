import sleep from 'bard-instruments/lib/async/sleep'

/**
 * For demo purposes
 * TODO: replace by true auth service
 */
async function authenticate (credentials) {
  await sleep(1000)
  // Toggle this for testing
  // throw new Error('Signin failed')
  return {
    id: 'xyz',
    name: 'Doe',
  }
}

/**
 * For demo purposes
 * TODO: replace by true auth service
 */
async function signout () {
  await sleep(1000)
  // Toggle this for testing
  // throw new Error('Signout failed')
  return true
}

export default {
  authenticate,
  signout,
}
