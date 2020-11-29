import { useState, useCallback, useMemo, RefObject } from 'react';
import { throttle } from 'lodash';

import { useEventListener } from 'hooks';
import { isSSR, getRefElement } from 'utils';

interface Scroll {
  y?: number;
  x?: number;
  direction?: 'up' | 'right' | 'down' | 'left';
}

interface UseScroll {
  wait?: number;
  element?: RefObject<Element> | Window | null;
}

export const useScroll = (options?: UseScroll): Scroll => {
  const { wait, element } = {
    wait: 250,
    element: isSSR ? undefined : window,
    ...options
  };

  const getScrollOffset = useCallback(
    (direction: 'y' | 'x') => {
      const target = getRefElement(element);

      if (isSSR || !target) {
        return undefined;
      }

      if ('window' in target) {
        return direction === 'y' ? target.pageYOffset : target.pageXOffset;
      }

      if ('nodeType' in target) {
        return direction === 'y' ? target.scrollTop : target.scrollLeft;
      }
    },
    [element]
  );

  const [scroll, setScroll] = useState<Scroll>({
    y: getScrollOffset('y'),
    x: getScrollOffset('x'),
    direction: undefined
  });

  const setDirection = useCallback(
    ({ y, x }: Scroll) => {
      const yOffset = getScrollOffset('y');
      const xOffset = getScrollOffset('x');

      if (
        y !== undefined &&
        x !== undefined &&
        yOffset !== undefined &&
        xOffset !== undefined
      ) {
        if (y > yOffset) return 'up';
        if (y < yOffset) return 'down';
        if (x > xOffset) return 'left';
        if (x < xOffset) return 'right';
      }
    },
    [getScrollOffset]
  );

  const scrollFunc = useCallback(() => {
    const yOffset = getScrollOffset('y');
    const xOffset = getScrollOffset('x');

    setScroll((prev) => ({
      y: yOffset,
      x: xOffset,
      direction: setDirection(prev)
    }));
  }, [getScrollOffset, setDirection]);

  const handleScroll = useMemo(
    () =>
      wait !== 0 ? throttle(() => scrollFunc(), wait) : () => scrollFunc(),
    [wait, scrollFunc]
  );

  useEventListener({
    type: 'scroll',
    listener: handleScroll,
    element,
    options: { passive: true }
  });

  return scroll;
};
