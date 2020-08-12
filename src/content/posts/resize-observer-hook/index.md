---
title:        ResizeObserver hook 📌
description:  There are a lot of solutions out there that responds to
              changes in an elements size. The Resize Observer API
              provides a performant mechanism by which code can monitor
              an element for changes to its size.
spoiler:      The Resize Observer API provides a performant mechanism by
              which code can monitor an element for changes to its size.
date:         2019-10-30
---

## Resize Observer API

As [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API)
shortly describes it:

> The Resize Observer API provides a performant mechanism by which code can
> monitor an element for changes to its size, with notifications being
> delivered to the observer each time the size changes.

## TL;DR

A simple example of what you can accomplish.

import { ResizeObserver } from 'components/ui/blog';

<ResizeObserver />

I've used a [polyfill](https://www.npmjs.com/package/resize-observer-polyfill)
to increase the support.

```jsx
import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = () => {
  const [observerEntry, setObserverEntry] = useState({});
  const [node, setNode] = useState(null);
  const observer = useRef(null);

  const disconnect = useCallback(() => observer.current?.disconnect(), []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => setObserverEntry(entry));
    if (node) observer.current.observe(node);
  }, [node]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  return [setNode, observerEntry];
};

export default useResizeObserver;
```

Then simply use it in your component.

```jsx
import useResizeObserver from './useResizeObserver';

const Component = () => {
  const [ref, entry] = useResizeObserver();
  return <div ref={ref} />;
};
```

The `entry` (ResizeObserverEntry) contains the data you're looking for.

```jsx
interface DOMRectReadOnly {
  +x: number;
  +y: number;
  +width: number;
  +height: number;
  +top: number;
  +right: number;
  +bottom: number;
  +left: number;
};

interface ResizeObserverEntry {
  +target: Element;
  +contentRect: DOMRectReadOnly;
};
```

## Why should I use this? 🤨

There are a lot of solutions out there that responds to changes in an
elements size. The majority of these have performance issues and listens
for a lot more than they should. A common solution is to listen for the
window resize event and recalculate the new dimensions (or other features)
of the element. But what if the elements size changes but not the window?

Another use case where the window resize event can’t help us is when
elements are added or removed from the DOM dynamically. This happens more
frequent in the modern SPA.

## Basic usage

Forget about the hook for a moment, we'll get back to that later on.

First we'll setup the observer, this will be used for the observing
elements that we're going to provide.

```jsx
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log(entry);
  }
});
```

Now it's time to [observe()](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe)
our desired element, so we need to select it and **observe** it with
`resizeObserver` that we just created.

```jsx
const body = document.querySelector('body');
resizeObserver.observe(body);
```

Now resize your browser and look inside your console.

At some point you probably want to stop listening to this observer, otherwise
you could get memory leaks. In the `useResizeObserver()` hook we're using the
[disconnect()](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/disconnect)
method to cleanup, but you can also use the [unobserve()](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/unobserve)
method.

> The disconnect() method of the ResizeObserver interface unobserves all
> observed Element or SVGElement targets.
>
> [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/disconnect)

> The unobserve() method of the ResizeObserver interface ends the observing
> of a specified Element or SVGElement.
>
> [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/unobserve)

Both use cases are simple:

```jsx
resizeObserver.disconnect();
resizeObserver.unobserve(body);
```

## More advanced usage 🤯

Now we'll use the hook I appended at the beginning of this post. Actually, I
wouldn't call this advanced because the hook makes it easy for us.

The code below is a compressed version of the example I provided earlier. What
it does is to append the width and height of the provided ref.

```jsx
import React, { useCallback } from 'react';
import useResizeObserver from './useResizeObserver';

const Component = () => {
  const [ref, { contentRect }] = useResizeObserver();

  const getContentRect = useCallback(
    (key) => contentRect && Math.round(contentRect[key]),
    [contentRect]
  );

  return (
    <div ref={ref}>
      {getContentRect('width')}x{getContentRect('height')}
    </div>
  );
};

export default Component;
```

## The end ⌛

I didn't go into detail of the hook, because the Resize Observer API is so
self-explanatory. Instead I focused on the basic usage of it.

This post is short and simple, the hook itself does the work. Use it as
much as you want.
