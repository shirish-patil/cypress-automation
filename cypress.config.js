const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild')

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config)
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  )
  return config
}

module.exports = defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents,
    baseUrl: 'https://www.naukri.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 60000,
    pageLoadTimeout: 60000,
    env: {
      TZ: 'Asia/Kolkata'
    },
    // Filter out unnecessary network requests
    requestTimeout: 10000,
    responseTimeout: 10000,
    chromeWebSecurity: false,
    // Hide specific network requests from the command log
    requestFilter: (request) => {
      const urlsToFilter = [
        '/cloudgateway-mynaukri/resman-aggregator-services',
        '/cloudgateway-ccs/inventory-management-services',
        '/cloudgateway-nc-js/nc-services',
        '/cloudgateway-mynaukri/notification-center-services',
        '/cloudgateway-chatbot/chatbot-services',
        'webhooks.naukri.com/botapi'
      ];
      return !urlsToFilter.some(url => request.url.includes(url));
    }
  }
})
