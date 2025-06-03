class NaukriLoginPage {
    // Selectors
    elements = {
        loginButton: 'a[title="Jobseeker Login"]',
        loginForm: 'div.login-layer',
        emailInput: 'input[type="text"][placeholder*="Email"]',
        passwordInput: 'input[type="password"]',
        submitButton: 'button[type="submit"]',
        popupClose: 'div[id=_0rt6i2tpjNavbar]'
    }

    // Actions
    visitHomePage() {
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
        cy.get('body', { timeout: 60000 }).should('be.visible');
        cy.wait(2000);
    }

    clickLoginButton() {
        cy.get(this.elements.loginButton, { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .click({ force: true })
            .wait(1000);
    }

    enterCredentials(email, password) {
        cy.get(this.elements.loginForm, { timeout: 60000 }).should('be.visible');
        
        cy.get(this.elements.emailInput)
            .should('be.visible')
            .clear()
            .type(email, { force: true, delay: 100 });

        cy.get(this.elements.passwordInput)
            .should('be.visible')
            .clear()
            .type(password, { force: true, delay: 100 });
    }

    clickSubmit() {
        cy.get(this.elements.submitButton)
            .should('be.visible')
            .and('not.be.disabled')
            .click({ force: true });
        cy.wait(15000);
    }

    handlePopup() {
        cy.get('body', { timeout: 30000 }).then(($body) => {
            if ($body.find(this.elements.popupClose).length > 0) {
                cy.log('Popup found: Closing popup');
                cy.get(this.elements.popupClose)
                    .should('be.visible')
                    .click({ force: true });
                cy.wait(2000);
            } else {
                cy.log('No popup found: Continuing');
            }
        });
    }
}

export default new NaukriLoginPage(); 