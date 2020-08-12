declare namespace Cypress {
  interface Chainable {
    injectAxe(): Chainable<EventEmitter>;
    checkA11y(
      context?: ElementContext,
      options?: RunOptions
    ): Chainable<EventEmitter>;
  }
}
