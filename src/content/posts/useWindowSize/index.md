---
title:        useWindowSize(📺)
description:  "New hook every day #4. Get window width and height with the
              opportunity to debounce the resize event."
spoiler:      "New hook every day #4. Get window width and height with the
              opportunity to debounce the resize event."
date:         2020-08-04
---

## #4 hook of the week

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

Resize your browser `window` and the size will be displayed below. It uses a 250
milliseconds wait timeout.

import { UseWindowSize } from 'components/ui/blog';

<UseWindowSize />

## The hook 🎣

Get window width and height with the opportunity to [debounce](https://lodash.com/docs/4.17.15#debounce)
the callback.

I'm using my [isSSR](/blog/useMutationObserver/#is-server-side-rendering)
utility and [useResize()](/blog/useResize/) hook to get the window size when a resize
is triggered.

```ts
import { useState, useCallback } from 'react';
import { isSSR } from './utils';
import { useResize } from './hooks';

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
```

## Usage

When the width or height changes we'll [debounce](https://lodash.com/docs/4.17.15#debounce)
it with a 1000 milliseconds wait timeout and `console.log()` its sizes.

```tsx
import React, { useEffect } from 'react';
import { useWindowSize } from './hooks';

const Component = () => {
  const { width, height } = useWindowSize(1000);

  useEffect(() => {
    console.log(width, height);
  }, [width, height]);

  return null;
};

export default Component;
```

## The end 📺

I hope you found this helpful.
