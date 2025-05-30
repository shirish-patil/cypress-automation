const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.naukri.com',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
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
