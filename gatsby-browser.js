import * as Sentry from '@sentry/react';

import { isProduction } from 'utils';

export const onServiceWorkerUpdateReady = () => {
  document.getElementById('service-worker').setAttribute('aria-hidden', false);
};

export const onClientEntry = () => {
  if (isProduction && process.env.GATSBY_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.GATSBY_SENTRY_DSN,
      release: process.env.GATSBY_SENTRY_RELEASE,
      environment: process.env.GATSBY_SENTRY_ENVIRONMENT
    });
  }
};
