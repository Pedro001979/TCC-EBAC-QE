/// <reference types="cypress" />
import produtosPage from '../support/page_objects/produtos.page'
import { fakerPT_BR as faker } from '@faker-js/faker';


describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  //Como cliente 
        //Quero acessar a Loja EBAC 
        //Para fazer um pedido de 4 produtos 
        //Fazendo a escolha dos produtos
        //Adicionando ao carrinho
        //Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        //Primeiro fazer o login
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('exist')

        //Entrar na pagina de produtos 1
        cy.get('#primary-menu > .menu-item-629 > a').click()

        //Deve escolher o produto 1 e adicionar o produto ao carrinho
        produtosPage.buscarProduto('Aether Gym Pant')
        produtosPage.addProdutoCarrinho(33, 'Blue', 1)
        cy.get('.woocommerce-message').should('exist')

        //Deve escolher o produto 2 e adicionar o produto ao carrinho
        produtosPage.buscarProduto('Abominable Hoodie')
        produtosPage.addProdutoCarrinho('XL', 'Green', 1)
        cy.get('.woocommerce-message').should('exist')

        //Deve escolher o produto 3 e adicionar o produto ao carrinho
        produtosPage.buscarProduto('Ajax Full-Zip Sweatshirt')
        produtosPage.addProdutoCarrinho('XS', 'Blue', 1)
        cy.get('.woocommerce-message').should('exist')

        //Deve escolher o produto 4 e adicionar o produto ao carrinho
        produtosPage.buscarProduto('Atlas Fitness Tank')
        produtosPage.addProdutoCarrinho('S', 'Blue', 1)
        cy.get('.woocommerce-message').should('exist')

        cy.get('.woocommerce-message > .button').click()

        cy.get('.checkout-button').click()

        var firstName = faker.person.firstName();
        var lastName = faker.person.lastName();
        var address1 = faker.location.streetAddress();
        var address2 = faker.location.secondaryAddress();
        var city = faker.location.city();
        var state = faker.location.state();
        var postcode = faker.location.zipCode('#####-###');
        var phone = faker.phone.number('(##) #####-####');
        cy.checkout(firstName, lastName, address1, address2, city, state, postcode, phone)

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

    });


})
