describe('Naukri Login and Profile Update', () => {
  beforeEach(() => {
    cy.log('Starting test: Clearing cookies and cache');
    // Clear cookies and cache before each test
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Handle uncaught exceptions
    cy.on('uncaught:exception', (err, runnable) => {
      cy.log('Caught uncaught exception:', err.message);
      // returning false here prevents Cypress from failing the test
      return false;
    });
  });

  it('should login to Naukri, update profile and upload CV', () => {
    cy.log('Step 1: Visiting Naukri.com');
    // Visit the site with increased timeout and retry options
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

    cy.log('Step 2: Waiting for page to load');
    // Wait for the page to load with increased timeout
    cy.get('body', { timeout: 60000 }).should('be.visible');

    // Check if we need to login
    cy.log('Step 3: Checking login status');
    cy.get('body').then(($body) => {
      if ($body.find('a[title="Jobseeker Login"]').length > 0) {
        cy.log('Login required: Proceeding with login process');
        // Need to login
        cy.get('a[title="Jobseeker Login"]', { timeout: 60000 })
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

        cy.log('Step 4: Verifying login form');
        // Verify login form is visible with increased timeout
        cy.get('div.login-layer', { timeout: 60000 }).should('be.visible');

        cy.log('Step 5: Entering email');
        // Enter email - using a more specific selector
        cy.get('input[type="text"][placeholder*="Email"]')
          .should('be.visible')
          .type(Cypress.env('naukri_email'), { force: true });

        cy.log('Step 6: Entering password');
        // Enter password
        cy.get('input[type="password"]')
          .should('be.visible')
          .type(Cypress.env('naukri_password'), { force: true });

        cy.log('Step 7: Clicking login button');
        // Click login button
        cy.get('button[type="submit"]')
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });

        cy.log('Step 8: Skipping OTP verification for now');
        // Wait for login to complete and page to load
        cy.wait(10000);

        /* OTP Verification Steps - Commented out for now
        cy.log('Step 8: Waiting for OTP input');
        // Wait for OTP input field to appear with increased timeout
        cy.get('input[type="text"][placeholder*="OTP"]', { timeout: 60000 })
          .should('be.visible')
          .then(() => {
            cy.log('Step 9: Please enter the OTP and click verify. Then click the Resume button in Cypress to continue.');
            // Pause the test and wait for manual OTP entry
            cy.pause();
            
            cy.log('Step 10: Verifying OTP submission');
            // After OTP is entered manually, click verify
            cy.get('button:contains("Verify")')
              .should('be.visible')
              .click({ force: true });

            // Wait for login to complete and page to load
            cy.log('Step 11: Waiting for login to complete');
            cy.wait(10000); // Increased wait time after OTP verification
          });
        */
      } else {
        cy.log('Already logged in: Proceeding with profile update');
      }
    });

    cy.log('Step 9: Checking for popup');
    // Handle popup if it appears
    cy.get('body').then(($body) => {
      if ($body.find('div[id=_0rt6i2tpjNavbar]').length > 0) {
        cy.log('Popup found: Closing popup');
        // If popup exists, click close button
        cy.get('div[id=_0rt6i2tpjNavbar]')
          .should('be.visible')
          .click({ force: true });
        // Wait for popup to close
        cy.wait(2000);
      } else {
        cy.log('No popup found: Continuing');
      }
    });

    cy.log('Step 10: Clicking profile icon');
    // Click on profile icon - using a more specific selector
    cy.get('div[class="nI-gNb-drawer__icon-img-wrapper"]', { timeout: 60000 })
      .should('be.visible')
      .click({ force: true });

    cy.log('Step 11: Clicking View & Update Profile link');
    // Click on 'View & Update Profile' link
    cy.contains('View & Update Profile', { timeout: 60000 })
      .should('be.visible')
      .click({ force: true });

    cy.log('Step 12: Waiting for profile page to load');
    // Wait for profile page to load
    cy.wait(5000);

    cy.log('Step 13: Clicking Update Resume button');
    // Click on 'Update resume' button
    cy.get('input[value="Update resume"]', { timeout: 60000 })
      .should('be.visible')
      .click({ force: true });

    cy.log('Step 14: Uploading CV file');
    // Upload CV file
    cy.get('input[type="file"]', { timeout: 60000 })
      .should('exist')
      .attachFile('ShirishPatil.pdf');

    cy.log('Step 15: Waiting for upload to complete');
    // Wait for upload to complete
    cy.wait(5000);

    cy.log('Step 16: Validating resume upload');
    // Validate resume upload
    cy.contains('ShirishPatil.pdf', { timeout: 60000 })
      .should('be.visible');

    // Get current date in IST timezone in the format "MMM DD, YYYY"
    const currentDate = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    });

    cy.log('Step 17: Validating upload date');
    // Validate upload date
    cy.contains(`Uploaded on ${currentDate}`, { timeout: 60000 })
      .should('be.visible');

    cy.log('Test completed successfully!');
  });
}); 