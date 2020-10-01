# tobbelindstrom.com :fire:

Personal blog created to help others and educate myself to become a greater instructor.

## Usage

Recommended node version is defined in `.nvmrc`.

- `yarn install` - Install packages
- `yarn start` - Start development server on port *1234*
- `yarn build` - Build project to the public folder
- `yarn serve` - Serve the public folder on port *1337*
- `yarn clean` - Clean up some local folders
- `yarn cypress:open` - Open [Cypress](https://www.cypress.io/) test runner
- `yarn cypress:run` - Run [Cypress](https://www.cypress.io/) tests to completion
- `yarn cypress:start` - Start development server together with `cypress:open`
- `yarn cypress:ci` - Continuous integration together with `cypress:run`
- `yarn prettier:report` - Report any [Prettier](https://prettier.io/) issues
- `yarn prettier:fix` - Fix any [Prettier](https://prettier.io/) issues
- `yarn eslint:report` - Report any [ESLint](https://eslint.org/) issues
- `yarn eslint:fix` - Fix any [ESLint](https://eslint.org/) issues
- `yarn stylelint:report` - Report any [stylelint](https://stylelint.io/) issues
- `yarn stylelint:fix` - Fix any [stylelint](https://stylelint.io/) issues
- `yarn markdown:report` - Report any [markdownlint](https://github.com/DavidAnson/markdownlint/)
  issues
- `yarn markdown:fix` - Fix any [markdownlint](https://github.com/DavidAnson/markdownlint/)
  issues

## Environment variables

- `GATSBY_ORIGIN` - Origin of site
- `GATSBY_SENTRY_DSN` - Public project DSN
- `GATSBY_SENTRY_RELEASE` - Release number
- `GATSBY_SENTRY_ENVIRONMENT` - Application environment
