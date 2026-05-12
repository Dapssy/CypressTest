const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  reporter: 'mocha-junit-reporter',

  reporterOptions: {
    mochaFile: 'reports/results-[hash].xml',
    toConsole: true
  },

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,

    env: {
      apiUrl: process.env.CYPRESS_API_URL,
      apiKey: process.env.CYPRESS_API_KEY,
      USERNAME: process.env.CYPRESS_USERNAME,
      PASSWORD: process.env.CYPRESS_PASSWORD
    },

    setupNodeEvents(on, config) {
      return config
    }
  },

  video: true,
  screenshotOnRunFailure: true
})