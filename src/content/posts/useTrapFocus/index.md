---
title:        useTrapFocus(🎯)
description:  With useTrapFocus(🎯) you will be able to trap the focus order and extend
              it with some grateful options.
spoiler:      With this hook you will be able to trap the focus order and extend
              it with some grateful options.
date:         2020-10-26
---

## Trap user ⛺

[WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) is growing for each day.
Today we're going to target tabbing and focus order.

A common mistake with modals is that developers doesn't trap the focus order. So
when a user opens a modal and starts tabbing it's not guaranteed that the focus
is within the modal.

In this blog post I'll showcase a hook I've created to take care of this.

## Showcase 💼

Want to try it? Just toggle the modal below and start tabbing.

import { UseTrapFocus } from 'components/ui/blog';

<UseTrapFocus />

## The hook 🎣

For those who haven't figured it out yet, this only works on devices with a keyboard.

I'm using my [useEventListener()](/blog/useEventListener/) hook to listen for the
tab key, and using the [tabbable](https://github.com/focus-trap/tabbable) package
to get all tabbable DOM nodes within a containing node.

```ts
import {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
  MutableRefObject,
  RefObject
} from 'react';
import { tabbable, FocusableElement } from 'tabbable';
import { useEventListener } from './useEventListener';

type Node = HTMLDivElement | null;

interface Options {
  includeContainer?: boolean;
  initialFocus?: 'container' | RefObject<Node> | null;
  returnFocus?: boolean;
  updateNodes?: boolean;
}

export const useTrapFocus = (options?: Options): MutableRefObject<Node> => {
  const node = useRef<Node>(null);
  const { includeContainer, initialFocus, returnFocus, updateNodes } = useMemo<
    Options
  >(
    () => ({
      includeContainer: false,
      initialFocus: null,
      returnFocus: true,
      updateNodes: false,
      ...options
    }),
    [options]
  );
  const [tabbableNodes, setTabbableNodes] = useState<FocusableElement[]>([]);
  const previousFocusedNode = useRef<Node>(document.activeElement as Node);

  const setInitialFocus = useCallback(() => {
    if (initialFocus === 'container') {
      node.current?.focus();
    } else {
      initialFocus?.current?.focus();
    }
  }, [initialFocus, node]);

  const updateTabbableNodes = useCallback(() => {
    const { current } = node;

    if (current) {
      const getTabbableNodes = tabbable(current, { includeContainer });
      setTabbableNodes(getTabbableNodes);
      return getTabbableNodes;
    }

    return [];
  }, [includeContainer]);

  useEffect(() => {
    updateTabbableNodes();
    if (node.current) setInitialFocus();
  }, [setInitialFocus, updateTabbableNodes]);

  useEffect(() => {
    return () => {
      const { current } = previousFocusedNode;
      if (current && returnFocus) current.focus();
    };
  }, [returnFocus]);

  const handleKeydown = useCallback(
    (event) => {
      const { keyCode, shiftKey } = event;

      let getTabbableNodes = tabbableNodes;
      if (updateNodes) getTabbableNodes = updateTabbableNodes();

      if (keyCode === 9 && getTabbableNodes.length) {
        const firstNode = getTabbableNodes[0];
        const lastNode = getTabbableNodes[getTabbableNodes.length - 1];
        const { activeElement } = document;

        if (!getTabbableNodes.includes(activeElement as FocusableElement)) {
          event.preventDefault();
          shiftKey ? lastNode.focus() : firstNode.focus();
        }

        if (shiftKey && activeElement === firstNode) {
          event.preventDefault();
          lastNode.focus();
        }

        if (!shiftKey && activeElement === lastNode) {
          event.preventDefault();
          firstNode.focus();
        }
      }
    },
    [tabbableNodes, updateNodes, updateTabbableNodes]
  );

  useEventListener({
    type: 'keydown',
    listener: handleKeydown
  });

  return node;
};
```

## Usage

Here you can see a stripped version of the showcase.

```tsx
import React, { useRef } from 'react';
import { useTrapFocus } from './useTrapFocus';

const Component = () => {
  const initialFocusRef = useRef(null);
  const trapRef = useTrapFocus({
    // Incudes container (trapRef) in the tabbable nodes
    includeContainer: true,
    // Can also be set as 'container' which will focus trapRef
    initialFocus: initialFocusRef,
    // Return focus to the element that had focus before trapped
    returnFocus: true,
    // Update nodes on each tab, can be useful if tabbable nodes
    // is rendered dynamic in some way
    updateNodes: false
  });

  return (
    <div ref={trapRef} tabIndex={0}>
      Lorem ipsum{' '}
      <button type="button" ref={initialFocusRef}>
        dolor
      </button>
    </div>
  );
};

export default Component;
```

## The end 🎯

I hope you found this helpful.
