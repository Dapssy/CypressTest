// cypress/e2e/employeeList.cy.js

import loginPage from '../../pages/loginPage';
import employeeListPage from '../../pages/employeeListPage';

describe('Employee List Page Tests', () => {

    beforeEach(() => {
        cy.visit('/Account/Login');
        loginPage.typeUsername('admin');
        loginPage.typePassword('password123');
        loginPage.clickLogin();
        cy.visit('/Employee'); 
    });

    it('should display the employee table', () => {
        employeeListPage.elements.employeeTable().should('be.visible');
    });

    it('should validate a specific employee exists', () => {
        employeeListPage.rowShouldContain('John Doe');
    });

    });
