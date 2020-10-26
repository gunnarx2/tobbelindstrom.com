import { Test } from 'consts/embla';

describe('Embla carousel', () => {
  const slides = [0, 1, 2, 3, 4];
  const isSelectedClass = 'is-selected';
  const isSelectedClassWithCssModules = 'isSelected';

  beforeEach(() => {
    cy.visit('/blog/embla-carousel/');
    cy.get(`[data-test="${Test.SLIDE}"]`).as('slide');
    cy.get(`[data-test="${Test.DOT}"]`).as('dot');
  });

  it(`"${isSelectedClass}" class is appended to the correct slide`, () => {
    const testEverySlide = (selectedSlides: number[]) => {
      selectedSlides.forEach((slide) =>
        cy.get('@slide').eq(slide).should('have.class', isSelectedClass)
      );
      slides
        .filter((slide) => !selectedSlides.includes(slide))
        .forEach((slide) =>
          cy.get('@slide').eq(slide).should('not.have.class', isSelectedClass)
        );
    };

    cy.get(`[data-test="${Test.NEXT}"]`).as('next');
    cy.get(`[data-test="${Test.PREVIOUS}"]`).as('previous');
    testEverySlide([0, 1, 4]);
    cy.get('@next').click();
    testEverySlide([0, 1, 2]);
    cy.get('@previous').click();
    cy.get('@previous').click();
    testEverySlide([0, 3, 4]);
    cy.get('@dot').eq(3).click();
    testEverySlide([2, 3, 4]);
  });

  it('Selected state for dots', () => {
    const testEveryDot = (selectedDot: number) => {
      cy.get('@dot').then(($elements) => {
        expect(
          $elements[selectedDot]
            .getAttribute('class')
            ?.includes(isSelectedClassWithCssModules)
        ).to.eq(true);
      });
      slides
        .filter((dot) => dot !== selectedDot)
        .forEach((dot) =>
          cy.get('@dot').then(($elements) => {
            expect(
              $elements[dot]
                .getAttribute('class')
                ?.includes(isSelectedClassWithCssModules)
            ).to.eq(false);
          })
        );
    };

    testEveryDot(0);
    cy.get('@dot').eq(3).click();
    testEveryDot(3);
    cy.get('@dot').eq(1).click();
    cy.get('@dot').eq(4).click();
    testEveryDot(4);
  });
});
