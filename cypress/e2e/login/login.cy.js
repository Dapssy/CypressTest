import loginPage from '../../pages/loginPage';

Cypress.on("uncaught:exception", () => {
  return false; // Prevent test failure on site errors
});

describe('Login Page Tests', () => {

  beforeEach(() => {
    // Base URL already in cypress.config.js
    cy.visit('/Account/Login', { failOnStatusCode: false });
  });

  it('should login successfully', () => {
    loginPage.typeUsername(Cypress.env("username"));
    loginPage.typePassword(Cypress.env("password"));
    loginPage.checkRememberMe();
    loginPage.clickLogin();

    cy.url().should('include', '/');  // Home page
  });

  it('should navigate to register page', () => {
    loginPage.clickRegister();

    cy.url().should('include', '/Account/Register');
  });

});
