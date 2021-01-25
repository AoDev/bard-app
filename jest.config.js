const path = require('path')

module.exports = {
  moduleNameMapper: {},
  clearMocks: true,
  noStackTrace: true,
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  setupFilesAfterEnv: [path.join('<rootDir>', 'test-setup.js')],
  testEnvironment: 'node',
  verbose: true, // Set to false to see console log during tests.
}
