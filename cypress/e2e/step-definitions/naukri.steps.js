import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

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

  cy.visit('https://www.naukri.com/', {
    timeout: 60000,
    retryOnStatusCodeFailure: true,
    retryOnNetworkFailure: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  // Wait for the page to be fully loaded
  cy.get('body', { timeout: 60000 }).should('be.visible');
  cy.wait(2000); // Additional wait for any dynamic content
});

When('I click on the login button', () => {
  cy.get('a[title="Jobseeker Login"]', { timeout: 60000 })
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true })
    .wait(1000); // Wait for animation/transition
});

When('I enter my email and password', () => {
  // Wait for login form to be visible
  cy.get('div.login-layer', { timeout: 60000 }).should('be.visible');

  cy.get('input[type="text"][placeholder*="Email"]')
    .should('be.visible')
    .clear() // Clear any existing value
    .type(Cypress.env('naukri_email'), { force: true, delay: 100 });

  cy.get('input[type="password"]')
    .should('be.visible')
    .clear() // Clear any existing value
    .type(Cypress.env('naukri_password'), { force: true, delay: 100 });
});

When('I click the submit button', () => {
  cy.get('button[type="submit"]')
    .should('be.visible')
    .and('not.be.disabled')
    .click({ force: true });
  
  // Wait for login to complete with increased timeout
  cy.wait(15000);
});

Then('I should be logged in successfully', () => {
  // Verify we're on the homepage after login with retry
  cy.url().should('include', '/mnjuser/homepage', { timeout: 30000 });
});

Then('I handle any popup that appears', () => {
  // Check if we need to handle popup with retry
  cy.get('body', { timeout: 30000 }).then(($body) => {
    if ($body.find('div[id=_0rt6i2tpjNavbar]').length > 0) {
      cy.log('Popup found: Closing popup');
      cy.get('div[id=_0rt6i2tpjNavbar]')
        .should('be.visible')
        .click({ force: true });
      cy.wait(2000);
    } else {
      cy.log('No popup found: Continuing');
    }
  });
});

When('I click on my profile icon', () => {
  cy.get('div[class="nI-gNb-drawer__icon-img-wrapper"]', { timeout: 60000 })
    .should('be.visible')
    .click({ force: true })
    .wait(1000); // Wait for menu to appear
});

When('I click on {string}', (linkText) => {
  cy.contains(linkText, { timeout: 60000 })
    .should('be.visible')
    .click({ force: true })
    .wait(1000); // Wait for page transition
});

When('I upload my CV file', () => {
  // Get the first PDF file from fixtures directory
  cy.task('getPdfFileName').then((fileName) => {
    cy.get('input[value="Update resume"]', { timeout: 60000 })
      .should('exist')
      .attachFile(fileName);
    
    cy.log(`Uploading CV file: ${fileName}`);
  });
});

Then('I should see the upload confirmation', () => {
  cy.task('getPdfFileName').then((fileName) => {
    cy.contains(fileName, { timeout: 60000 })
      .should('be.visible');
    cy.log(`Verified upload of file: ${fileName}`);
  });
});

Then('the upload date should be today\'s date', () => {
  const currentDate = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Kolkata'
  });

  cy.contains(`Uploaded on ${currentDate}`, { timeout: 60000 })
    .should('be.visible');
}); 