class ProdutosPage {
  visitarUrl() {
    cy.visit("produtos");
  }

  buscarProduto(nomeProduto) {
    cy.get('[name="s"]').eq(1).type(nomeProduto);
    cy.get(".button-search").eq(1).click();
  }

  buscarProdutoLista(nomeProduto) {
    cy.get(".products > .row").contains(nomeProduto).click();
  }

  visitarProduto(nomeProduto) {
    const urlFormatada = nomeProduto.replace(/ /g, "-");
    cy.visit(`produtos/${urlFormatada}`);
  }

  addProdutoCarrinho(tamanho, cor, quantidade) {
    cy.get(".button-variable-item-" + tamanho).click();
    cy.get(".button-variable-item-" + cor).click();
    cy.get(".input-text").clear().type(quantidade);
    cy.get(".single_add_to_cart_button").click();
  }

  navegarParaProdutos() {
    cy.get("#primary-menu > .menu-item-629 > a").click();
  }

  limparCarrinho() {
    cy.visit("carrinho");

    const removerItens = () => {
      cy.get("body").then(($body) => {
        const quantidadeItens = $body.find(".cart_item").length;

        if (quantidadeItens) {
          cy.get(".product-remove a").first().click();
          cy.get(".cart_item").should("have.length", quantidadeItens - 1);
          cy.then(removerItens);
        }
      });
    };

    removerItens();
  }

  adicionarProduto(nomeProduto, tamanho, cor, quantidade) {
    this.buscarProduto(nomeProduto);
    this.addProdutoCarrinho(tamanho, cor, quantidade);
    cy.get(".woocommerce-message").should("exist");
  }

  abrirCheckout() {
    this.abrirCarrinho();
    cy.get(".checkout-button").click();
  }

  abrirCarrinho() {
    cy.get("body").then(($body) => {
      if ($body.find(".woocommerce-message > .button").length) {
        cy.get(".woocommerce-message > .button").click();
      } else {
        cy.visit("carrinho");
      }
    });
  }

  validarLimiteDeItens(limite) {
    cy.get("body").then(($body) => {
      const itens = $body.find(".cart_item .quantity");

      if (itens.length) {
        const camposQuantidade = $body.find(".cart_item input.qty:visible");
        expect(camposQuantidade.length, "campos de quantidade visíveis").to.be.greaterThan(0);

        cy.get(".cart_item input.qty:visible").each(($quantidade) => {
          const valor = Number($quantidade.val());
          const produto = $quantidade
            .closest(".cart_item")
            .find(".product-name")
            .text()
            .trim();

          expect(Number.isFinite(valor), `quantidade válida para ${produto}`).to.be.true;
          expect(valor, `quantidade de ${produto} (máximo: ${limite})`).to.be.at.most(limite);
        });
      } else {
        expect($body.find(".cart-empty, .woocommerce-error").length).to.be.greaterThan(0);
      }
    });
  }

  validarQuantidadeNoCarrinho(quantidadeEsperada) {
    cy.get(".cart_item input.qty:visible")
      .should("have.length.greaterThan", 0)
      .first()
      .should("have.value", String(quantidadeEsperada));
  }

  validarSubtotalAte(valorMaximo) {
    this.obterValorMonetario(".cart-subtotal .amount").then((subtotal) => {
      expect(subtotal).to.be.at.most(valorMaximo);
    });
  }

  validarDescontoPercentual(percentual, valorMinimo, valorMaximo) {
    this.obterValorMonetario(".cart-subtotal .amount").then((subtotal) => {
      expect(subtotal).to.be.within(valorMinimo, valorMaximo);

      this.obterValorMonetario(".cart-discount .amount").then((desconto) => {
        expect(desconto / subtotal).to.be.closeTo(percentual / 100, 0.015);
      });
    });
  }

  obterValorMonetario(seletor) {
    return cy.get(seletor).last().invoke("text").then((texto) => {
      const valor = texto.replace(/[^\d,.\-]/g, "").trim();
      const separadorDecimal = Math.max(valor.lastIndexOf(","), valor.lastIndexOf("."));
      const parteInteira = valor.slice(0, separadorDecimal).replace(/[,.]/g, "");
      const parteDecimal = valor.slice(separadorDecimal + 1);
      return Math.abs(Number(`${parteInteira}.${parteDecimal}`));
    });
  }

  validarPedidoRecebido() {
    cy.get(".woocommerce-notice").should(
      "contain",
      "Obrigado. Seu pedido foi recebido."
    );
  }
}

export default new ProdutosPage();
