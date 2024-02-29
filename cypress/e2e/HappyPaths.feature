Feature: Happy Paths

  Scenario: The filter works correctly
  # Grab first element text
  # Grab second element text
  # Paste first element text into filter box
  # Ensure that second element text does not appear on page
    Given the user visits the page '/'
    Given the user should see the string 'Centro'
    When type 'idaho' into input element with this test id 'filter-input'
    When wait for page to load
    Then the user should not see the string 'Centro'
    Then the user should see the string 'Idaho'

  Scenario: The display widget shows the earthquake info
    Given the user visits the page '/'
    Given there should be no text in the element with the datatest-id 'magnitude'
    # When the user selects the first child of the element with the test id 'earthquake-list'
    When the user clicks on the first element which says 'Idaho'
    When wait for page to load
    Then there should be text in the element with the datatest-id 'magnitude'
