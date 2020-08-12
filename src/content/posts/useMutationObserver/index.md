---
title:        useMutationObserver(👀)
description:  "New hook every day #1. This hook uses MutationObserver to watch
              for changes being made to a defined target. Target element supports
              both refs and query selectors."
spoiler:      "New hook every day #1. This hook uses MutationObserver to watch
              for changes being made to a defined target."
date:         2020-08-01
---

## New hook every day for one week 🔥

For a whole week I'll post a new hook every day. All hooks will support Server-Side
Rendering (SSR) and have TypeScript implemented.

I will not describe the hooks in great detail, I'll just present them and show how
it's implemented. Then you can do whatever you want with them.

Every hook is also available [here](https://github.com/gunnarx2/tobbelindstrom.com/tree/master/src/hooks),
together with a range of other hooks.

## The hook 🎣

This is the #1 hook of the week and it uses [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
to watch for changes being made to a defined target. Target element supports both
`refs` and `query selectors`.

I'm using my [isSSR](#is-server-side-rendering) and
[getElement()](#get-element) utility.

```ts
import { useEffect, useMemo, RefObject } from 'react';
import { isSSR, getElement } from './utils';

interface Props {
  target?: RefObject<Element> | Element | Node | null;
  options?: MutationObserverInit;
  callback?: MutationCallback;
}

export const useMutationObserver = ({
  target,
  options = {},
  callback
}: Props): void => {
  const getTarget = useMemo(() => getElement(target), [target]);
  const observer = useMemo(
    () =>
      !isSSR
        ? new MutationObserver((mutationRecord, mutationObserver) => {
            callback?.(mutationRecord, mutationObserver);
          })
        : null,
    [callback]
  );

  useEffect(() => {
    if (observer && getTarget) {
      observer.observe(getTarget, options);
      return () => observer.disconnect();
    }
  }, [getTarget, observer, options]);
};
```

## Usage

Every time `aria-hidden` changes we'll `console.log()` its value. I'm using the
[getElement()](#get-element) utility.

```tsx
import React, { useRef, useCallback, RefObject } from 'react';
import { getElement } from './utils';
import { useMutationObserver } from './useMutationObserver';

const Component = () => {
  const ref = useRef(null);

  const handleMutations = useCallback((mutations) => {
    mutations.forEach(
      ({
        type,
        target
      }: {
        type: MutationRecordType;
        target: Element | null;
      }) => {
        if (type === 'attributes') {
          console.log(getElement(target)?.getAttribute('aria-hidden'));
        }
      }
    );
  }, []);

  useMutationObserver({
    target: ref,
    options: { attributes: true },
    callback: handleMutations
  });

  return <div ref={ref} aria-hidden="false" />;
};

export default Component;
```

## Utilities

Throughout this weeks hooks I'll reuse two utilities.

### Get element

With this utility we can pass `refs` and `query selectors`, and it will return
the element for us.

```ts
import { RefObject } from 'react';

export const getElement = <T = undefined>(
  element?: RefObject<Element> | Element | null | T
): Element | null | undefined | T =>
  element && 'current' in element ? element.current : element;
```

### Is Server-Side Rendering

This utility will detect if your application is running SSR or not.

```ts
export const isSSR: boolean = !(
  typeof window !== 'undefined' && window.document?.createElement
);
```

## The end 👀

I hope you found this helpful.
