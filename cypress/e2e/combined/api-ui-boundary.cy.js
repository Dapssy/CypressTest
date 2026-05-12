describe('API/UI boundary validation', () => {
  it('created API user should not exist in SauceDemo UI', () => {
    const fakeUser = {
      name: `user-${Date.now()}`,
      job: 'QA Engineer'
    }

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/users`,
      headers: {
        'x-api-key': Cypress.env('apiKey')
      },
      body: fakeUser
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq(fakeUser.name)
    })

    cy.visit('/')
    cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    cy.get('[data-test="inventory-item-name"]')
      .should('not.contain', fakeUser.name)
  })
})
