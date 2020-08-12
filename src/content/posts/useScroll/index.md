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

I'm using my [isSSR](/blog/useMutationObserver/#is-server-side-rendering) utility
and [useEventListener()](/blog/useEventListener/) hook to get the scroll data.

```ts
import { useState, useCallback, useMemo } from 'react';
import { throttle } from 'lodash';
import { isSSR } from './utils';
import { useEventListener } from './useEventListener';

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
```

## Usage

On scroll we `console.log()` its direction and amount, and [throttle](https://lodash.com/docs/4.17.15#throttle)
it with a 500 milliseconds wait timeout.

```tsx
import React, { useEffect } from 'react';
import { useScroll } from './useScroll';

const Component = () => {
  const scroll = useScroll(500);

  useEffect(() => {
    console.log(scroll);
  }, [scroll]);

  return null;
};

export default Component;
```

## The end 📜

I hope you found this helpful.
