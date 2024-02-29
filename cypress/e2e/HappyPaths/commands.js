// eslint-disable-next-line import/no-extraneous-dependencies
import { Given, When } from 'cypress-cucumber-preprocessor/steps';

Given('the user visits the page {string}', (page) => {
  cy.visit(page);
});

Given('wait for page to load', () => {
  cy.wait(2000);
});

Given('wait for {string} seconds', (seconds) => {
  cy.wait(`${seconds}000`);
});

Given('the page hyperlink should contain {string}', (page) => {
  cy.url().should('include', page);
});

Given('type {string} into input element with this test id {string}', (inputValue, testId) => {
  cy.get(`[data-testid=${testId}]`).type(inputValue, { force: true });
});

When('the user should see the string {string}', (string) => {
  cy.get('body').contains(string);
});

Given('the user selects the first child of the element with the test id {string}', (testId) => {
  cy.get(`[data-testid=${testId}]`).first().click();
});

When('there should be no text in the element with the datatest-id {string}', (datatestId) => {
  cy.get(`[data-testid=${datatestId}]`).invoke('val').should('have.length', 0);
});

When('there should be text in the element with the datatest-id {string}', (datatestId) => {
  console.log('==================================');
  console.log(cy.get(`[data-testid=${datatestId}]`));
  cy.get(`[data-testid=${datatestId}]`).then(($el) => {
    const text = $el.text(); // Now you have the text "Backpack"
    cy.expect(text.length).to.be.gt(1);
  });
});

When('the user should not see the string {string}', (string) => {
  cy.get('body').should('not.contain', string);
});

When('the user clicks on the first element which says {string}', (string) => {
  cy.get('body').contains(string).first().click();
});

When('the user clicks the element which says {string}', (string) => {
  cy.get('body').contains(string).click();
});

When('the user types {string} into the input element with the name {string}', (userInput, inputBoxName) => {
  cy.get(`input[name=${inputBoxName}]`).type(userInput);
});
