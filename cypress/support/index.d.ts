import './commands';


declare global {
    namespace Cypress {
        interface Chainable {
            dataCy(value: string): Chainable<Element>;
            waitForVerification(value: string): Chainable<Interception>
        }
    }
}