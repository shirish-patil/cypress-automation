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
│   │   └── step-definitions/   # Step definition files
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
     "email": "your-email@example.com",
     "password": "your-password"
   }
   ```

4. Add your CV file:
   - Place your CV file in `cypress/fixtures/` directory
   - Name it `ShirishPatil.pdf` (or update the file name in the test if using a different name)

## Running Tests

1. Open Cypress Test Runner:
   ```bash
   npx cypress open
   ```

2. Choose "E2E Testing"

3. Select your preferred browser (Chrome/Electron)

4. Click on the feature file you want to run:
   - `naukri.feature` - Contains the login and profile update scenarios

## Test Scenarios

The project includes the following test scenarios:

1. Login to Naukri.com
2. Update profile with new CV
3. Verify CV upload date

## Important Notes

- The tests include handling of OTP verification (currently commented out)
- Popup handling is implemented for various scenarios
- Tests use IST timezone for date verification
- Network requests are logged for debugging purposes

## Troubleshooting

1. If you encounter timeout issues:
   - Check your internet connection
   - Verify the website is accessible
   - Increase timeout in `cypress.config.js` if needed

2. If tests fail due to element not found:
   - Check if the website structure has changed
   - Verify selectors in step definitions
   - Ensure you're logged out before running tests

3. For CV upload issues:
   - Verify the CV file exists in fixtures directory
   - Check file format (PDF)
   - Ensure file size is within limits

## Contributing

1. Create a new branch for your changes
2. Follow the existing code structure
3. Update documentation if needed
4. Create a pull request

## Best Practices

1. Always pull the latest changes before starting work
2. Keep your credentials secure
3. Don't commit sensitive information
4. Follow the BDD structure for new scenarios
5. Add appropriate logging for debugging

## Support

For any issues or questions:
1. Check the existing documentation
2. Review the test logs
3. Contact the team lead

## License

This project is for internal use only. 