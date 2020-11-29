---
title:        useScroll(📜)
description:  "New hook every day #7. With this hook you get scroll amount on y
              axis and the current direction, and with the opportunity to throttle the callback."
spoiler:      "New hook every day #7. Get scroll amount on y axis and the current
              direction, and with the opportunity to throttle the callback."
date:         2020-08-07
---

## #7 hook of the week

To remind you of the purpose and goal of this week:

> For a whole week I'll post a new hook every day. All hooks will support Server-Side
> Rendering (SSR) and have TypeScript implemented.
>
> I will not describe the hooks in great detail, I'll just present them and show
> how it's implemented. Then you can do whatever you want with them.
>
> Every hook is also available [here](https://github.com/gunnarx2/tobbelindstrom.com/tree/master/src/hooks),
> together with a range of other hooks.
>
> [View source](/blog/useMutationObserver/#new-hook-every-day-for-one-week-)

## Showcase 🔥

Here you can see the difference between no [throttle](https://lodash.com/docs/4.17.15#throttle)
and throttle with a 500 milliseconds wait timeout.

import { UseScroll } from 'components/ui/blog';

<UseScroll />

## The hook 🎣

With this hook you get scroll amount on y axis and the current direction, and with
the opportunity to [throttle](https://lodash.com/docs/4.17.15#throttle) the callback.

I'm using my [isSSR](/blog/useMutationObserver/#is-server-side-rendering) utility,
[getRefElement()](/blog/useMutationObserver/#get-ref-element) utility and
[useEventListener()](/blog/useEventListener/) hook to get the scroll data.

```ts
import { useState, useCallback, useMemo, RefObject } from 'react';
import { throttle } from 'lodash';
import { useEventListener } from './hooks';
import { isSSR, getRefElement } from './utils';

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
```

## Usage

On scroll we `console.log()` its direction and amount, and [throttle](https://lodash.com/docs/4.17.15#throttle)
it with a 500 milliseconds wait timeout.

```tsx
import React, { useEffect, useRef } from 'react';
import { useScroll } from './hooks';

const Component = () => {
  const ref = useRef(null);
  const scroll = useScroll({
    wait: 500,
    element: ref
  });

  useEffect(() => {
    console.log(scroll);
  }, [scroll]);

  return <div ref={ref} />;
};

export default Component;
```

## The end 📜

I hope you found this helpful.
