import { Test } from 'consts/floating';

describe('Accessibility tests', () => {
  const screenResolutions = [
    [320, 568],
    [480, 800],
    [Cypress.config().viewportWidth, Cypress.config().viewportHeight]
  ];
  const a11yOptions = {
    rules: {
      'color-contrast': { enabled: false },
      'heading-order': { enabled: false }
    }
  };

  screenResolutions.forEach(([width, height]: number[]) => {
    it(`Archive page for ${width}x${height}`, () => {
      cy.viewport(width, height);
      cy.visit('/').get('main').injectAxe();
      cy.checkA11y(undefined, a11yOptions);
    });

    it(`Post page for ${width}x${height}`, () => {
      cy.viewport(width, height);
      cy.fixture('posts.json').then((posts: string[]) => {
        if (Array.isArray(posts)) {
          posts.forEach((post: string) => {
            cy.visit(`/blog/${post}/`).get('main').injectAxe();
            cy.checkA11y(undefined, a11yOptions);
          });
        }
      });
    });

    it(`Not found page for ${width}x${height}`, () => {
      cy.viewport(width, height);
      cy.visit('/404/').get('main').injectAxe();
      cy.checkA11y(undefined, a11yOptions);
    });

    it(`Floating actions for ${width}x${height}`, () => {
      cy.viewport(width, height);
      cy.get(`[data-test="${Test.TOGGLE}"]`).as('toggle');
      cy.get('@toggle').click().checkA11y(undefined, a11yOptions);
      cy.get('@toggle').click().checkA11y(undefined, a11yOptions);
    });
  });
});
