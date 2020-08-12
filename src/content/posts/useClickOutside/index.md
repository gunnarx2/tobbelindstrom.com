---
title:        useClickOutside(👇)
description:  "New hook every day #6. Trigger a callback when the user clicks outside
              of a defined element."
spoiler:      "New hook every day #6. Trigger a callback when the user clicks outside
              of a defined element."
date:         2020-08-06
---

## #6 hook of the week

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

Every time you click outside the element below I'll increase the number of clicks
by one.

import { UseClickOutside } from 'components/ui/blog';

<UseClickOutside />

## The hook 🎣

Trigger a callback when the user clicks outside of a defined element.

I'm using my [useEventListener()](/blog/useEventListener/) hook to listen for
click event.

```ts
import { useCallback, RefObject } from 'react';
import { useEventListener } from './useEventListener';

export const useClickOutside = (
  ref: RefObject<Element>,
  callback: (event: MouseEvent) => void
): void => {
  const handleClick = useCallback(
    (event) => {
      if (!ref.current?.contains(event.target)) {
        callback(event);
      }
    },
    [callback, ref]
  );

  useEventListener({
    type: 'click',
    listener: handleClick
  });
};
```

## Usage

When a user clicks outside of the defined `ref` element we `console.log()` its event.

```tsx
import React, { useRef } from 'react';
import { useClickOutside } from './useClickOutside';

const Component = () => {
  const ref = useRef(null);

  useClickOutside(ref, (event) => {
    console.log(event);
  });

  return <div ref={ref} />;
};

export default Component;
```

## The end 👇

I hope you found this helpful.
