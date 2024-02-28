Feature: Happy Paths

  Scenario: Opening a search engine page
    Given the user visits the page '/'
    Then the user clicks the element which says 'N of Smiths Ferry'
