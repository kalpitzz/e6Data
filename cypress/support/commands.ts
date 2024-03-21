/// <reference types="cypress" />



Cypress.Commands.add('dataCy', (value) => {
    cy.get(`[data-cy=${value}]`)
});

Cypress.Commands.add('waitForVerification', (value: string) => {
    return cy.wait(value)
        .then((intercept: any) => {
            return intercept.response?.body;
        });
});

export { };