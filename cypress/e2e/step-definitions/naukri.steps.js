import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import NaukriLoginPage from '../pages/NaukriLoginPage';
import NaukriProfilePage from '../pages/NaukriProfilePage';

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Log the error for debugging
  cy.log('Caught uncaught exception:', err.message);
  
  // Don't fail the test for AbortError
  if (err.name === 'AbortError') {
    return false;
  }
  
  // For other errors, you might want to fail the test
  return false;
});

Given('I am on the Naukri.com homepage', () => {
  // Clear cookies and cache before starting
  cy.clearCookies();
  cy.clearLocalStorage();
  NaukriLoginPage.visitHomePage();
});

When('I click on the login button', () => {
  NaukriLoginPage.clickLoginButton();
});

When('I enter my email and password', () => {
  NaukriLoginPage.enterCredentials(
    Cypress.env('naukri_email'),
    Cypress.env('naukri_password')
  );
});

When('I click the submit button', () => {
  NaukriLoginPage.clickSubmit();
});

Then('I should be logged in successfully', () => {
  // Verify we're on the homepage after login with retry
  cy.url().should('include', '/mnjuser/homepage', { timeout: 30000 });
});

Then('I handle any popup that appears', () => {
  NaukriLoginPage.handlePopup();
});

When('I click on my profile icon', () => {
  NaukriProfilePage.clickProfileIcon();
});

When('I click on {string}', (linkText) => {
  NaukriProfilePage.clickLink(linkText);
});

When('I upload my CV file', () => {
  // Get the first PDF file from fixtures directory
  cy.task('getPdfFileName').then((fileName) => {
    NaukriProfilePage.uploadCV(fileName);
  });
});

Then('I should see the upload confirmation', () => {
  cy.task('getPdfFileName').then((fileName) => {
    NaukriProfilePage.verifyUpload(fileName);
  });
});

Then('the upload date should be today\'s date', () => {
  NaukriProfilePage.verifyUploadDate();
}); 