describe('SauceDemo - Add item to cart', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('logs in and adds item to cart', () => {

    cy.intercept('GET', '**/inventory.html').as('inventory')

    cy.login(
      Cypress.env('USERNAME'),
      Cypress.env('PASSWORD')
    )

    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')

    cy.addItemToCart('Sauce Labs Backpack')

    cy.openCart()

    cy.get('[data-test="inventory-item-name"]')
      .should('contain', 'Sauce Labs Backpack')
  })
})