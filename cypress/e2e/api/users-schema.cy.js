describe('ReqRes API schema validation', () => {
  
  it('validates users response schema', () => {
    cy.fixture('userSchema').then((schema) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/users?page=2`,
        headers: {
          'x-api-key': Cypress.env('apiKey')
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.jsonSchema(schema)
      })
    })
  })
})
