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

  it("CT-005 - Deve realizar login utilizando fixture", () => {
    cy.fixture("perfil").then((dados) => {
      cy.login(dados.usuario, dados.senha);
    });
    cy.get(".page-title").should("exist");
  });

  it("CT-005 - Deve realizar login utilizando os elementos diretamente", () => {
    cy.fixture("perfil").then((dados) => {
      cy.get("#username").type(dados.usuario);
      cy.get("#password").type(dados.senha, { log: false });
      cy.get(".woocommerce-form > .button").click();
      cy.get(".page-title").should("exist");
    });
  });
});
