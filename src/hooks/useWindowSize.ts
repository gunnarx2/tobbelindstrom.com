import { useState, useCallback } from 'react';

import { useResize } from 'hooks';
import { isSSR } from 'utils';

export const useWindowSize = (
  wait: number = 250
): {
  width?: number;
  height?: number;
} => {
  const getWindowSize = useCallback(
    () => ({
      width: isSSR ? undefined : window.innerWidth,
      height: isSSR ? undefined : window.innerHeight
    }),
    []
  );
  const [windowSize, setWindowSize] = useState(getWindowSize);

  useResize(() => {
    setWindowSize(getWindowSize);
  }, wait);

  return windowSize;
};
