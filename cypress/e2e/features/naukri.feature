Feature: Naukri.com Profile Management
  As a job seeker
  I want to login to Naukri.com
  And update my profile with a new CV
  So that I can keep my profile up to date

  Scenario: Login and Update Profile with CV
    Given I am on the Naukri.com homepage
    When I click on the login button
    And I enter my email and password
    And I click the submit button
    Then I should be logged in successfully
    And I handle any popup that appears
    When I click on my profile icon
    And I click on "View & Update Profile"
    And I click on "Update Resume"
    And I upload my CV file
    Then I should see the upload confirmation
    And the upload date should be today's date 