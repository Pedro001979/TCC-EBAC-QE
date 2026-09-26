class LoginPage {
  visitar() {
    cy.visit("minha-conta");
  }

  preencherUsuario(usuario) {
    cy.get("#username").type(usuario);
  }

  preencherSenha(senha) {
    cy.get("#password").type(senha, { log: false });
  }

  submeter() {
    cy.get(".woocommerce-form > .button").click();
  }

  fazerLogin(usuario, senha) {
    this.preencherUsuario(usuario);
    this.preencherSenha(senha);
    this.submeter();
  }

  validarLoginRealizado() {
    cy.get(".page-title").should("exist").and("be.visible");
  }

  validarPermaneceNaPaginaDeLogin() {
    cy.url().should("include", "minha-conta");
  }

  validarMensagemDeErro(mensagem) {
    cy.get(".woocommerce-error").should("exist").and("contain.text", mensagem);
  }

  validarErroApresentado() {
    cy.get(".woocommerce-error, .woocommerce-NoticeGroup, [role='alert']")
      .should("exist");
  }

  validarUsuarioVazio() {
    cy.get("#username").should("have.value", "");
  }

  validarSenhaVazia() {
    cy.get("#password").should("have.value", "");
  }
}

export default new LoginPage();
