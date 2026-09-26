/// <reference types="cypress" />

import loginPage from "../support/page_objects/login.page";

describe("US-0002 - Login na plataforma", () => {
  let dadosLogin;

  before(() => {
    cy.fixture("perfil").then((perfil) => {
      dadosLogin = perfil;
    });
  });

  beforeEach(() => {
    loginPage.visitar();
  });

  it("CT-005 - Deve realizar login com credenciais válidas", () => {
    loginPage.fazerLogin(dadosLogin.usuario, dadosLogin.senha);
    loginPage.validarLoginRealizado();
  });

  it("CT-006 - Deve impedir login com senha inválida", () => {
    loginPage.fazerLogin(dadosLogin.usuario, "SenhaInvalida123");
    loginPage.validarPermaneceNaPaginaDeLogin();
    loginPage.validarErroApresentado();
  });

  it("CT-007 - Deve impedir login sem informar o usuário", () => {
    loginPage.preencherSenha(dadosLogin.senha);
    loginPage.submeter();

    loginPage.validarPermaneceNaPaginaDeLogin();
    loginPage.validarUsuarioVazio();
    loginPage.validarMensagemDeErro("Erro: Nome de usuário é obrigatório.");
  });

  it("CT-008 - Deve impedir login sem informar a senha", () => {
    loginPage.preencherUsuario(dadosLogin.usuario);
    loginPage.submeter();

    loginPage.validarPermaneceNaPaginaDeLogin();
    loginPage.validarSenhaVazia();
    loginPage.validarMensagemDeErro("Erro: O campo da senha está vazio.");
  });
});
