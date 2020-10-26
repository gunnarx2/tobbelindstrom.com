import { tabbable } from 'tabbable';

import { Test } from 'consts/trapFocus';
import { ClassNames } from 'consts/tabAccess';

describe('Trap focus', () => {
  beforeEach(() => {
    cy.visit('/blog/useTrapFocus/');
    cy.get('body').then(($body) => $body.addClass(ClassNames.IS_TABBING));
  });

  it('123', () => {
    cy.get(`[data-test="${Test.TOGGLE}"]`).click();
    cy.focused().should('have.data', 'test', Test.INITIAL_FOCUS);

    cy.get(`[data-test="${Test.CONTENT}"]`).then(($content) => {
      if ($content?.length) {
        const tabbableNodes = tabbable($content[0]);
        for (let step = 0; step < tabbableNodes.length; step += 1) {
          cy.focused().tab();
        }
        cy.focused().then(($focused) => {
          if ($focused?.length) {
            expect(tabbableNodes.includes($focused[0])).to.eq(true);
          }
        });
      }
    });

    cy.get(`[data-test="${Test.CONTENT}"]`).then(($content) => {
      if ($content?.length) {
        const tabbableNodes = tabbable($content[0]);
        for (let step = 0; step < tabbableNodes.length; step += 1) {
          cy.focused().tab({ shift: true });
        }
        cy.focused().then(($focused) => {
          if ($focused?.length) {
            expect(tabbableNodes.includes($focused[0])).to.eq(true);
          }
        });
      }
    });

    cy.focused()
      .type('{esc}')
      .then(() => {
        cy.focused().should('have.data', 'test', Test.TOGGLE);
      });
  });
});
