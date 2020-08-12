describe('Theme', () => {
  const localStorageKey = 'theme';

  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="floating-toggle"]').as('toggle');
    cy.get('[data-test="floating-action-theme"]').as('actionTheme');
    cy.clearLocalStorage(localStorageKey).then((ls) => {
      expect(ls.getItem(localStorageKey)).to.eq(null);
    });
  });

  it('Toggle between dark and light', () => {
    cy.get('body').should('have.class', 'dark-theme');
    cy.get('@toggle').click();
    cy.get('@actionTheme').click();
    cy.get('body').should('have.class', 'light-theme');
  });

  it('Stored within local storage', () => {
    cy.get('@toggle').click();
    cy.get('@actionTheme')
      .click()
      .should(() => {
        expect(localStorage.getItem(localStorageKey)).to.eq('light');
      });
    cy.get('@actionTheme')
      .click()
      .should(() => {
        expect(localStorage.getItem(localStorageKey)).to.eq('dark');
      });
    cy.reload().should(() => {
      expect(localStorage.getItem(localStorageKey)).to.eq('dark');
    });
  });
});
