import { isSSR } from 'utils';

export const isLocalhost = (): boolean => {
  if (!isSSR) {
    const { hostname } = window.location;
    return Boolean(
      hostname === 'localhost' ||
        hostname === '[::1]' ||
        hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    );
  }

  return false;
};
