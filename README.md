# Naukri.com Automation Project

This project contains automated tests for Naukri.com using Cypress with Cucumber BDD framework. The tests cover the login and profile update functionality.

## Prerequisites

- Node.js (v16.x or later)
- npm (Node Package Manager)
- Git

## Project Structure

```
naukri-automation/
├── cypress/
│   ├── e2e/
│   │   ├── features/           # Cucumber feature files
│   │   ├── step-definitions/   # Step definition files
│   │   └── pages/             # Page Object Model files
│   ├── fixtures/              # Test data files
│   └── support/               # Support files and commands
├── package.json
└── cypress.config.js
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd naukri-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `cypress.env.json` file in the root directory with your credentials:
   ```json
   {
     "naukri_email": "your-email@example.com",
     "naukri_password": "your-password"
   }
   ```

4. Add your CV file:
   - Place your CV file in `cypress/fixtures/` directory
   - The file must be in PDF format
   - The test will automatically detect and use the PDF file
   - Only one PDF file should be present in fixtures directory

## Running Tests

1. Run tests using command line:
   ```bash
   npx cypress run --spec "cypress/e2e/features/naukri.feature"
   ```

2. Or open Cypress Test Runner:
   ```bash
   npx cypress open
   ```
   Then select "E2E Testing" and choose your preferred browser.

## Test Scenarios

The project includes the following test scenarios:

1. Login to Naukri.com
   - Enter credentials
   - Handle login process
   - Verify successful login

2. Update profile with new CV
   - Navigate to profile section
   - Upload new CV
   - Verify upload success

3. Verify CV upload date
   - Check upload confirmation
   - Verify current date in IST timezone

## Manual Steps

Currently, there is one manual step in the automation flow:

1. OTP Verification
   - After entering credentials, Naukri sends an OTP to your registered email/phone
   - The test will pause at this step
   - You need to:
     1. Check your email/phone for the OTP
     2. Enter the OTP in the verification field
     3. Click the "Verify" button
     4. Click the "Resume" button in Cypress to continue the test

   Note: This step is currently manual because:
   - Naukri's OTP system is designed to prevent automated access
   - It adds an extra layer of security
   - Future automation possibilities:
     - Integration with email APIs to fetch OTP
     - Integration with SMS APIs for phone OTP
     - Using browser automation to handle OTP input
     - Implementing a retry mechanism for failed OTP attempts

## Page Objects

The project uses Page Object Model for better maintainability:

1. `NaukriLoginPage.js`
   - Handles login-related actions
   - Manages login form interactions
   - Handles popups

2. `NaukriProfilePage.js`
   - Manages profile-related actions
   - Handles CV upload
   - Verifies upload status

## Important Notes

- Tests use IST timezone for date verification
- Network requests are filtered for better performance
- CV file is automatically detected from fixtures directory
- Proper error handling for uncaught exceptions
- Retry mechanism for network failures
- Manual OTP verification step is required

## Troubleshooting

1. If you encounter timeout issues:
   - Check your internet connection
   - Verify the website is accessible
   - Check the defaultCommandTimeout in cypress.config.js

2. If tests fail due to element not found:
   - Check if the website structure has changed
   - Verify selectors in page objects
   - Ensure you're logged out before running tests

3. For CV upload issues:
   - Verify the CV file exists in fixtures directory
   - Check file format (PDF)
   - Ensure file size is within limits
   - Make sure only one PDF file is present in fixtures directory

4. For OTP verification issues:
   - Ensure you have access to the registered email/phone
   - Check spam folder for OTP email
   - Verify the OTP hasn't expired
   - Make sure to click "Resume" in Cypress after verification

## Best Practices

1. Always pull the latest changes before starting work
2. Keep your credentials secure in cypress.env.json
3. Don't commit sensitive information
4. Follow the BDD structure for new scenarios
5. Use page objects for better maintainability
6. Add appropriate logging for debugging
7. Be prepared for the manual OTP step

## Support

For any issues or questions:
1. Check the existing documentation
2. Review the test logs
3. Contact the team lead

## License

This project is for internal use only. 