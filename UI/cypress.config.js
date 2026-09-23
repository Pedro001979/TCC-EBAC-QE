const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://lojaebac.ebaconline.art.br/",
    specPattern: "UI/cypress/e2e/**/*.cy.js",
    supportFile: "UI/cypress/support/e2e.js",
    fixturesFolder: "UI/cypress/fixtures",
  },
});
