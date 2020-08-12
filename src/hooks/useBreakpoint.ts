import { useEffect, useState, useCallback } from 'react';

import { useWindowSize } from 'hooks';
import { isSSR } from 'utils';

export const useBreakpoint = (): string | undefined => {
  const { width } = useWindowSize();
  const getBreakpoint = useCallback(
    () =>
      isSSR
        ? undefined
        : window
            .getComputedStyle(document.body, '::after')
            .content.replace(/"/g, ''),
    []
  );
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  useEffect(() => {
    setBreakpoint(getBreakpoint);
  }, [width, getBreakpoint]);

  return breakpoint;
};
