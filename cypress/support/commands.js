// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('checkout', (firstName, lastName, country, address, city, state, postcode, phone) => {
   cy.get('#billing_first_name').clear().type(firstName)
   cy.get('#billing_last_name').clear().type(lastName)
   cy.get('#billing_city').click()
   cy.get('.select2-search__field').type(country)
   cy.get('#billing_address_1').clear().type(address)
   cy.get('#billing_city').clear().type(city)
   cy.get('#select2-billing_state-container').click()
   cy.get('.select2-search__field').type(state)
   cy.get('#billing_postcode').clear().type(postcode)
   cy.get('#billing_phone').clear().type(phone)
   cy.get('#terms').click()
   cy.get('#place_order').click()

});
