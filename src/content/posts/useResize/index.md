---
title:        useResize(🛠)
description:  "New hook every day #3. A callback will be triggered when a resize event
              takes place. The hook can be debounced to be helpful to the browser."
spoiler:      "New hook every day #3. A callback will be triggered when a resize event
              takes place. The hook can be debounced to be helpful to the browser."
date:         2020-08-03
---

## #3 hook of the week

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

## The hook 🎣

A callback will be triggered when a resize event takes place. The hook can be
[debounced](https://lodash.com/docs/4.17.15#debounce) to be helpful to the browser.

I'm using my [useEventListener()](/blog/useEventListener/) hook to listen for
resize events.

```ts
import { useMemo } from 'react';
import { debounce } from 'lodash';
import { useEventListener } from './hooks';

export const useResize = (
  callback: (event: Event) => void,
  wait: number = 250
): void => {
  const handleResize = useMemo(
    () =>
      wait !== 0
        ? debounce((event: Event) => callback(event), wait)
        : (event: Event) => callback(event),
    [wait, callback]
  );

  useEventListener({
    type: 'resize',
    listener: handleResize,
    options: { passive: true }
  });
};
```

## Usage

On resize we `console.log()` its event and [debounce](https://lodash.com/docs/4.17.15#debounce)
it with a 500 milliseconds wait timeout.

```tsx
import React from 'react';
import { useResize } from './hooks';

const Component = () => {
  useResize((event) => {
    console.log(event);
  }, 500);

  return null;
};

export default Component;
```

## The end 🛠

I hope you found this helpful.
