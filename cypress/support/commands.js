import LoginPage from '../pages/LoginPage'

Cypress.Commands.add('login', (username, password) => {
  LoginPage.login(username, password)
})

Cypress.Commands.add('addItemToCart', (itemName) => {
  cy.contains('[data-test="inventory-item-name"]', itemName)
    .parents('[data-test="inventory-item"]')
    .find('button')
    .click()
})

Cypress.Commands.add('openCart', () => {
  cy.get('[data-test="shopping-cart-link"]').click()
})