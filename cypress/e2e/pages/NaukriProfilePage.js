class NaukriProfilePage {
    // Selectors
    elements = {
        profileIcon: 'div[class="nI-gNb-drawer__icon-img-wrapper"]',
        updateResumeButton: 'input[value="Update resume"]',
        fileInput: 'input[type="file"]',
        viewUpdateProfileLink: 'a[class="nI-gNb-info__sub-link"]'
    }

    // Actions
    clickProfileIcon() {
        cy.get(this.elements.profileIcon, { timeout: 60000 })
            .should('be.visible')
            .click({ force: true })
            .wait(1000);
    }

    clickLink(linkText) {
        if (linkText === 'View & Update Profile') {
            cy.log('Attempting to click View & Update Profile link');
            cy.get(this.elements.viewUpdateProfileLink, { timeout: 60000 })
                .should('be.visible')
                .click({ force: true })
                .wait(1000);
        } else if (linkText === 'Update resume') {
            cy.log('Attempting to click Update resume button');
            cy.get(this.elements.updateResumeButton, { timeout: 60000 })
                .should('be.visible')
                .click({ force: true })
                .wait(1000);
        }
    }

    uploadCV(fileName) {
        cy.url().should('include', '/mnjuser/profile', { timeout: 60000 });
        cy.wait(2000);
        
        // First click the Update Resume button
        cy.get(this.elements.updateResumeButton, { timeout: 60000 })
            .should('be.visible')
            .click({ force: true })
            .wait(2000);

        // Then upload the file
        cy.get(this.elements.fileInput, { timeout: 60000 })
            .should('exist')
            .attachFile(fileName)
            .wait(5000); // Wait for upload to complete

        // Verify the upload was successful
        cy.contains('Resume has been successfully uploaded.', { timeout: 60000 })
            .should('be.visible');
    }

    verifyUpload(fileName) {
        cy.contains(fileName, { timeout: 60000 })
            .should('be.visible');
    }

    verifyUploadDate() {
        const date = new Date();
        const istDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const month = istDate.toLocaleString('en-US', { month: 'short', timeZone: 'Asia/Kolkata' });
        const day = istDate.getDate().toString().padStart(2, '0');
        const year = istDate.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;

        cy.contains(`Uploaded on ${formattedDate}`, { timeout: 60000 })
            .should('be.visible');
    }
}

export default new NaukriProfilePage(); 