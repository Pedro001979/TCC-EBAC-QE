/// <reference types="cypress" />

import loginPage from "../support/page_objects/login.page";
import produtosPage from "../support/page_objects/produtos.page";
import { fakerPT_BR as faker } from "@faker-js/faker";

describe("Fluxo de pedido - EBAC Shop", () => {
  beforeEach(() => {
    loginPage.visitar();
    cy.fixture("perfil").then(({ usuario, senha }) => {
      loginPage.fazerLogin(usuario, senha);
    });
    loginPage.validarLoginRealizado();
    produtosPage.limparCarrinho();
  });

  it("Fluxo completo de compra", () => {
    produtosPage.navegarParaProdutos();
    produtosPage.adicionarProduto("Aether Gym Pant", 33, "Blue", 1);
    produtosPage.adicionarProduto("Abominable Hoodie", "XL", "Red", 1);
    produtosPage.adicionarProduto("Ajax Full-Zip Sweatshirt", "XS", "Blue", 1);
    produtosPage.adicionarProduto("Atlas Fitness Tank", "XL", "Blue", 1);
    produtosPage.abrirCheckout();

    cy.checkout(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.location.streetAddress(),
      faker.location.secondaryAddress(),
      faker.location.city(),
      faker.location.state(),
      faker.location.zipCode("#####-###"),
      faker.phone.number("(##) #####-####")
    );

    produtosPage.validarPedidoRecebido();
  });

  it("CT-009 - Não permite adicionar mais de 10 unidades do mesmo produto", () => {
    produtosPage.navegarParaProdutos();
    produtosPage.buscarProduto("Aether Gym Pant");
    produtosPage.addProdutoCarrinho(33, "Blue", 11);
    produtosPage.abrirCarrinho();

    produtosPage.validarLimiteDeItens(10);
  });

  it("CT-010 - Não permite que o subtotal ultrapasse R$ 990,00", () => {
    produtosPage.navegarParaProdutos();

    [
      ["Aether Gym Pant", 33, "Blue"],
      ["Abominable Hoodie", "XL", "Red"],
      ["Ajax Full-Zip Sweatshirt", "XS", "Blue"],
      ["Atlas Fitness Tank", "XL", "Blue"],
    ].forEach(([nome, tamanho, cor]) => {
      produtosPage.buscarProduto(nome);
      produtosPage.addProdutoCarrinho(tamanho, cor, 10);
    });

    produtosPage.abrirCarrinho();
    produtosPage.validarSubtotalAte(990);
  });

  it("CT-011 - Concede desconto de 10% para subtotal entre R$ 200,00 e R$ 600,00", () => {
    produtosPage.navegarParaProdutos();
    produtosPage.adicionarProduto("Aether Gym Pant", 33, "Blue", 2);
    produtosPage.adicionarProduto("Abominable Hoodie", "XL", "Red", 2);
    produtosPage.adicionarProduto("Ajax Full-Zip Sweatshirt", "XS", "Blue", 2);
    produtosPage.adicionarProduto("Atlas Fitness Tank", "XL", "Blue", 2);
    produtosPage.abrirCarrinho();

    produtosPage.validarDescontoPercentual(10, 200, 600);
  });

  it("CT-012 - Concede desconto de 15% para subtotal acima de R$ 600,00", () => {
    produtosPage.navegarParaProdutos();
    produtosPage.adicionarProduto("Aether Gym Pant", 33, "Blue", 3);
    produtosPage.adicionarProduto("Abominable Hoodie", "XL", "Red", 3);
    produtosPage.adicionarProduto("Ajax Full-Zip Sweatshirt", "XS", "Blue", 3);
    produtosPage.adicionarProduto("Atlas Fitness Tank", "XL", "Blue", 3);
    produtosPage.abrirCarrinho();

    produtosPage.validarDescontoPercentual(15, 600, 990);
  });
});
