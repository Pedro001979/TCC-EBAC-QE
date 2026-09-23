Cypress.Commands.add("login", (usuario, senha) => {
  cy.get("#username").type(usuario);
  cy.get("#password").type(senha, { log: false });
  cy.get(".woocommerce-form > .button").click();
});

Cypress.Commands.add(
  "checkout",
  (
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    postcode,
    phone
  ) => {
    cy.get("#billing_first_name").clear().type(firstName);
    cy.get("#billing_last_name").clear().type(lastName);
    cy.get('[name="billing_address_1"]').clear().type(address1);
    cy.get('[name="billing_address_2"]').clear().type(address2);
    cy.get('[name="billing_city"]').clear().type(city);
    cy.get("#select2-billing_state-container").click().type(state + "{enter}");
    cy.get('[name="billing_postcode"]').clear().type(postcode);
    cy.get('[name="billing_phone"]').clear().type(phone);
    cy.get('[name="terms"]').check();
    cy.get('[name="woocommerce_checkout_place_order"]').click();
    cy.wait(8000);
  }
);
