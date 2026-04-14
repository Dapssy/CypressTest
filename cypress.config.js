const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://eaapp.somee.com",   // ← correct location for URL

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
