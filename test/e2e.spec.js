/**
 * e2e tests with puppeteer
 * @see https://stackoverflow.com/questions/46673666/chrome-puppeteer-close-page-on-error-event
 */
require('dotenv').config()
const puppeteer = require('puppeteer')
const assert = require('assert')

const OSX_DEFAULT_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const APP_URL = process.env.APP_URL || 'http://localhost:3000'
const TEST_PASS = 'test' // fake login credential

const configs = {
  headless: {
  },
  osx_chrome: {
    headless: false,
    slowMo: 50,
    executablePath: OSX_DEFAULT_CHROME_PATH,
    args: ['--window-size=1024,768'],
  }
}

const puppeteerConfig = configs[process.env.E2E_CONFIG]
if (!puppeteerConfig) {
  throw new Error(`Wrong e2e config. Got "${process.env.E2E_CONFIG}"`)
}

/**
 * Delay the execution of a Promise Chain
 * @param {Number} milliseconds
 */
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let browser
let page
describe('e2e', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch(puppeteerConfig)
    page = await browser.newPage()
    await page.setViewport({width: 1024, height: 768})
    await page.goto(`${APP_URL}`, {
      waitUntil: 'load'
    })
    await sleep(2000)
  })

  afterAll(() => {
    browser.close()
  })

  describe('Login', () => {
    it('should allow the user to login', async () => {
      const passInputID = '#profile-password'
      await page.type(passInputID, TEST_PASS)
      await page.click('[type="submit"]')
      await sleep(2000)
    })
  })

  describe('Dashboard', () => {
    it('should display widgets', async () => {
      await page.waitForSelector('h3')
      const titles = await page.$$eval('h3', (titles) => titles.map((title) => title.innerText))
      assert.strictEqual(titles[0].toLowerCase(), 'widget one')
      assert.strictEqual(titles[1].toLowerCase(), 'widget two')
    })
  })
})
