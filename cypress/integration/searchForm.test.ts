describe('Search form', () => {
  const dummyValue = 'Lorem ipsum dolor sit amet';

  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="search-form-input"]').as('input');
    cy.get('@input').clear();
    cy.get('[data-test="search-form-clear"]').as('clear');
  });

  it('Session storage', () => {
    cy.get('@input').type(dummyValue);
    cy.get('@input').should('have.value', dummyValue);
    cy.reload();
    cy.window().its('sessionStorage').its('search').should('eq', dummyValue);
    cy.get('@input').should('have.value', dummyValue);
    cy.get('@input').clear();
    cy.window()
      .its('sessionStorage')
      .its('search')
      .its('length')
      .should('be', 0);
  });

  it('Clear input with button', () => {
    cy.get('@input').type(dummyValue);
    cy.get('@input').its('length').should('be', dummyValue.length);
    cy.get('@clear').click();
    cy.get('@input').its('length').should('be', 0);
  });

  it('Clear button should only be visible when input contains something', () => {
    cy.get('@clear').should('not.be.visible');
    cy.get('@input').type(dummyValue);
    cy.get('@clear').should('be.visible');
  });

  it('Remove focus from input on escape key', () => {
    cy.get('@input').focus();
    cy.get('@input').should('have.focus');
    cy.get('@input').type('{esc}');
    cy.get('@input').should('not.have.focus');
  });

  it('Remove focus from input on submit', () => {
    cy.get('@input').focus();
    cy.get('@input').should('have.focus');
    cy.get('@input').type('{enter}');
    cy.get('@input').should('not.have.focus');
  });

  it('Feed should have some posts with correct search query', () => {
    cy.get('[data-test="archive-feed-item"]').as('archiveFeedItem');
    cy.get('@archiveFeedItem').its('length').should('be.gt', 0);
    cy.get('@input').type('ResizeObserver');
    cy.get('@archiveFeedItem').its('length').should('be.gt', 0);
    cy.get('@clear').click();
    cy.get('@input').type('styled-components');
    cy.get('@archiveFeedItem').its('length').should('be.gt', 0);
  });

  it('Feed should not have any posts with incorrect search query', () => {
    cy.get('@input').type(dummyValue);
    cy.get('[data-test="archive-feed-nothing"]').as('archiveFeedNothing');
    cy.get('@archiveFeedNothing').its('length').should('not.be', 1);
    cy.get('@archiveFeedNothing').contains(
      `Nothing matches ${dummyValue}, please try again...`
    );
  });
});
