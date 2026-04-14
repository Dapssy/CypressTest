class LoginPage {

  typeUsername(username) {
    cy.get('#UserName').type(username);
  }

  typePassword(password) {
    cy.get('#Password').type(password);
  }

  checkRememberMe() {
    cy.get('#RememberMe').check();
  }

  clickLogin() {
    cy.get('input[type="submit"]').click();
  }

  clickRegister() {
    cy.contains("Register").click();
  }
}

export default new LoginPage();
