describe('Konami code', () => {
  const className = 'konami-code';
  const sequence =
    '{uparrow}{uparrow}{downarrow}{downarrow}{leftarrow}{rightarrow}{leftarrow}{rightarrow}ba';

  beforeEach(() => {
    cy.visit('/').get('main');
  });

  it(`"${className}" class is added to the <body> on success`, () => {
    cy.get('body').type(sequence);
    cy.get('body').should('have.class', className);
  });

  it(`Don't reset sequence if it starts with more than two {uparrow}'s`, () => {
    cy.get('body').type(`{uparrow}${sequence}`);
    cy.get('body').should('have.class', className);
  });
});
