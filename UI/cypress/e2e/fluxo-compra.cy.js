/// <reference types="cypress" />

import produtosPage from "../support/page_objects/produtos.page";
import { fakerPT_BR as faker } from "@faker-js/faker";

describe("Fluxo de pedido - EBAC Shop", () => {
  beforeEach(() => {
    cy.visit("minha-conta");
  });

  it("Fluxo completo de compra", () => {
    cy.fixture("perfil").then((dados) => {
      cy.login(dados.usuario, dados.senha);
    });

    cy.get(".page-title").should("exist");
    cy.get("#primary-menu > .menu-item-629 > a").click();

    produtosPage.buscarProduto("Aether Gym Pant");
    produtosPage.addProdutoCarrinho(33, "Blue", 1);
    cy.get(".woocommerce-message").should("exist");

    produtosPage.buscarProduto("Abominable Hoodie");
    produtosPage.addProdutoCarrinho("XL", "Green", 1);
    cy.get(".woocommerce-message").should("exist");

    produtosPage.buscarProduto("Ajax Full-Zip Sweatshirt");
    produtosPage.addProdutoCarrinho("XS", "Blue", 1);
    cy.get(".woocommerce-message").should("exist");

    produtosPage.buscarProduto("Atlas Fitness Tank");
    produtosPage.addProdutoCarrinho("S", "Blue", 1);
    cy.get(".woocommerce-message").should("exist");

    cy.get(".woocommerce-message > .button").click();
    cy.get(".checkout-button").click();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const address1 = faker.location.streetAddress();
    const address2 = faker.location.secondaryAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const postcode = faker.location.zipCode("#####-###");
    const phone = faker.phone.number("(##) #####-####");

    cy.checkout(
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      postcode,
      phone
    );

    cy.get(".woocommerce-notice").should(
      "contain",
      "Obrigado. Seu pedido foi recebido."
    );
  });
});
