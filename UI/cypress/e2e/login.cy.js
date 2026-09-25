/// <reference types="cypress" />

let dadosLogin;

describe("US-0002 - Login na plataforma", () => {
  before(() => {
    cy.fixture("perfil").then((perfil) => {
      dadosLogin = perfil;
    });
  });

  beforeEach(() => {
    cy.visit("minha-conta");
  });

  it("CT-005 - Deve realizar login com credenciais válidas", () => {
    cy.login(dadosLogin.usuario, dadosLogin.senha);

    cy.get(".page-title").should("exist");
  });

  it("CT-006 - Deve impedir login com senha inválida", () => {
    cy.login(dadosLogin.usuario, "SenhaInvalida123");

    cy.get("body").then(($body) => {
      cy.log("===== TEXTO DA PÁGINA =====");
      cy.log($body.text());

      cy.log("===== ELEMENTOS DE ERRO =====");

      $body.find(
        ".woocommerce-error, .woocommerce-message, .woocommerce-NoticeGroup, [role='alert']"
      ).each((index, element) => {
        cy.log(
          `ERRO ${index + 1}: ${Cypress.$(element).text().trim()}`
        );
      });
    });
  });

  it("CT-007 - Deve impedir login sem informar o usuário", () => {
    cy.get("#password").type(dadosLogin.senha, { log: false });

    cy.get("#username").then(($input) => {
      cy.log(`required: ${$input.prop("required")}`);
      cy.log(`value: "${$input.val()}"`);
    });

    cy.get(".woocommerce-form > .button").click();

    cy.url().should("include", "minha-conta");
  });

  it("CT-008 - Deve impedir login sem informar a senha", () => {
    cy.get("#username").type(dadosLogin.usuario);

    cy.get("#password").then(($input) => {
      cy.log(`required: ${$input.prop("required")}`);
      cy.log(`value: "${$input.val()}"`);
    });

    cy.get(".woocommerce-form > .button").click();

    cy.url().should("include", "minha-conta");
  });
});