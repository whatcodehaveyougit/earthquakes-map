const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on) {
      on('file:preprocessor', cucumber());
    },
    specPattern: 'cypress/e2e/*.feature',
  },
});
