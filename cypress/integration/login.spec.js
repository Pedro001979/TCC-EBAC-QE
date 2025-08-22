/// <reference types="cypress" />
let dadosLogin

context('Funcionalidade Login', () => {
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    // afterEach(() => {
    //     cy.screenshot()
    // });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login(dadosLogin.usuario, dadosLogin.senha)
        cy.get('.page-title').should('exist')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('exist')
    });

    it('Deve fazer login com sucesso - sem otimização', () => {
        cy.fixture('perfil').then((dadosLogin) => {
            cy.get('#username').type(dadosLogin.usuario)
            cy.get('#password').type(dadosLogin.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.page-title').should('exist')
        })
    })
})