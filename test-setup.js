const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({adapter: new Adapter()})

if (process.env.TEST_INTEGRATION) {
  /**
   * Set bigger timeout by default for integration tests because default is 5 seconds. (not enough)
   * @see https://jestjs.io/docs/en/jest-object.html#jestsettimeouttimeout
   */
  jest.setTimeout(30000)
}
