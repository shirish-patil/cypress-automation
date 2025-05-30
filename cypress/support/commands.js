// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Import cypress-file-upload
import 'cypress-file-upload';

// Custom command to log important network requests
Cypress.Commands.add('logImportantRequest', (message) => {
  cy.log(`🔵 ${message}`);
});

// Override cy.intercept to only log important requests
Cypress.Commands.overwrite('intercept', (originalFn, ...args) => {
  const [matcher, response] = args;
  if (typeof matcher === 'string' && !matcher.includes('cloudgateway')) {
    cy.logImportantRequest(`Network Request: ${matcher}`);
  }
  return originalFn(...args);
}); 