const { defineConfig } = require("cypress");
require("../API/load-env");

module.exports = defineConfig({
  env: {
    EBAC_API_USERNAME: process.env.EBAC_API_USERNAME,
    EBAC_API_PASSWORD: process.env.EBAC_API_PASSWORD,
  },
  e2e: {
    baseUrl: "http://lojaebac.ebaconline.art.br/",
    specPattern: "UI/cypress/e2e/**/*.cy.js",
    supportFile: "UI/cypress/support/e2e.js",
    fixturesFolder: "UI/cypress/fixtures",
  },
});
