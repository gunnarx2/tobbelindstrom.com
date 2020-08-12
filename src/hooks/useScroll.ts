import { useState, useCallback, useMemo } from 'react';
import { throttle } from 'lodash';

import { useEventListener } from 'hooks';
import { isSSR } from 'utils';

interface Scroll {
  y?: number;
  direction?: 'up' | 'down';
}

export const useScroll = (wait: number = 250): Scroll => {
  const [scroll, setScroll] = useState<Scroll>({
    y: isSSR ? undefined : window.pageYOffset,
    direction: undefined
  });

  const scrollFunc = useCallback(() => {
    const { pageYOffset } = window;
    const setDirection = (prev: Scroll) => {
      if (prev.y !== undefined) {
        return prev.y > pageYOffset ? 'up' : 'down';
      }
    };

    setScroll((prev) => ({
      y: pageYOffset,
      direction: setDirection(prev)
    }));
  }, []);

  const handleScroll = useMemo(
    () =>
      wait !== 0 ? throttle(() => scrollFunc(), wait) : () => scrollFunc(),
    [wait, scrollFunc]
  );

  useEventListener({
    type: 'scroll',
    listener: handleScroll,
    options: { passive: true }
  });

  return scroll;
};
