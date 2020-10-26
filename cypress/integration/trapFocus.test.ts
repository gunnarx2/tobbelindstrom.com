import { tabbable } from 'tabbable';

import { Test } from 'consts/trapFocus';
import { ClassNames } from 'consts/tabAccess';

describe('Trap focus', () => {
  beforeEach(() => {
    cy.visit('/blog/useTrapFocus/');
    cy.get('body').then(($body) => $body.addClass(ClassNames.IS_TABBING));
    cy.get(`[data-test="${Test.TOGGLE}"]`).click();
  });

  it('Initial focus element', () => {
    cy.focused().should('have.data', 'test', Test.INITIAL_FOCUS);
  });

  it('Focus is still trapped when tabbed more than the length of tabbable nodes', () => {
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
  });

  it('Focus is still trapped when tabbed with shift key more than the length of tabbable nodes', () => {
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
  });

  it('Return focus', () => {
    cy.focused()
      .type('{esc}')
      .then(() => {
        cy.focused().should('have.data', 'test', Test.TOGGLE);
      });
  });
});
