import { ClassNames } from 'consts/konamiCode';

describe('Konami code', () => {
  const sequence =
    '{uparrow}{uparrow}{downarrow}{downarrow}{leftarrow}{rightarrow}{leftarrow}{rightarrow}ba';

  beforeEach(() => {
    cy.visit('/').get('main');
  });

  it(`"${ClassNames.KONAMI_CODE}" class is added to the <body> on success`, () => {
    cy.get('body').type(sequence);
    cy.get('body').should('have.class', ClassNames.KONAMI_CODE);
  });

  it(`Don't reset sequence if it starts with more than two {uparrow}'s`, () => {
    cy.get('body').type(`{uparrow}${sequence}`);
    cy.get('body').should('have.class', ClassNames.KONAMI_CODE);
  });
});
