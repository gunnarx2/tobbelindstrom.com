describe('Page not found', () => {
  it('Should display 404 page', () => {
    cy.visit('/404/');
    cy.get('h1').contains('Page not found 😢');
  });
});
