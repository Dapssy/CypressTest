// cypress/pages/employeeListPage.js

class EmployeeListPage {

    elements = {
        pageTitle: () => cy.get('h2'),                    // <h2>Employee List</h2>
        addEmployeeButton: () => cy.contains('Add Employee'),
        employeeTable: () => cy.get('table'),
        tableRows: () => cy.get('table tbody tr'),
        logoutLink: () => cy.contains('Logout'),
    }

    clickAddEmployee() {
        this.elements.addEmployeeButton().click();
    }

    clickEmployeeByName(name) {
        cy.contains('tbody tr', name).click();  
        // more precise than table tbody tr
    }

    rowShouldContain(name) {
        this.elements.tableRows().should('contain.text', name);
        // ensures test fails if name not found
    }
}

module.exports = new EmployeeListPage();
