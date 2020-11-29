---
title:        useEventListener(👂)
description:  "New hook every day #2. With this hook you can easily add event
              listeners and it will remove itself for you to avoid memory
              leaks."
spoiler:      "New hook every day #2. With this hook you can easily add event
              listeners and it will remove itself for you to avoid memory
              leaks."
date:         2020-08-02
---

## #2 hook of the week

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

With this hook you can easily add event listeners and it will remove itself
to avoid memory leaks. Element supports `refs`, `document` and `window`.

I'm using my [isSSR](/blog/useMutationObserver/#is-server-side-rendering) and
[getRefElement()](/blog/useMutationObserver/#get-ref-element) utility.

```ts
import { useRef, useEffect, useCallback, RefObject } from 'react';
import { isSSR, getRefElement } from './utils';

interface UseEventListener {
  type: keyof WindowEventMap;
  listener: EventListener;
  element?: RefObject<Element> | Document | Window | null;
  options?: AddEventListenerOptions;
}

export const useEventListener = ({
  type,
  listener,
  element = isSSR ? undefined : window,
  options
}: UseEventListener): void => {
  const savedListener = useRef<EventListener>();

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  const handleEventListener = useCallback((event: Event) => {
    savedListener.current?.(event);
  }, []);

  useEffect(() => {
    const target = getRefElement(element);
    target?.addEventListener(type, handleEventListener, options);
    return () => target?.removeEventListener(type, handleEventListener);
  }, [type, element, options, handleEventListener]);
};
```

## Usage

Just a simple showcase that `console.log()` the event when a user clicks on
the element. If we wouldn't pass an element it would fallback to the `window`.

```tsx
import React from 'react';
import { useEventListener } from './hooks';

const Component = () => {
  const ref = useRef(null);

  useEventListener({
    element: ref,
    type: 'click',
    listener: (event) => console.log(event),
    options: { passive: true }
  });

  return <div ref={ref} />;
};

export default Component;
```

## The end 👂

I hope you found this helpful.
