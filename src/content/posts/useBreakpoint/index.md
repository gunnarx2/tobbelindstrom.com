---
title:        useBreakpoint(💔)
description:  "New hook every day #5. With this hook we can communicate the use of
              breakpoints between SCSS and JavaScript."
spoiler:      "New hook every day #5. With this hook we can communicate the use of
              breakpoints between SCSS and JavaScript."
date:         2020-08-05
---

## #5 hook of the week

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

This website only uses two breakpoints, these are *xs (480px)* and *sm (768px)*.
Resize your browser window between these breakpoints and you'll see it change below.

import { UseBreakpoint } from 'components/ui/blog';

<UseBreakpoint />

## Why?

A common issue between non CSS-in-JS styling and JavaScript is shared breakpoints.
You want the css and js to listen to the same collection of breakpoints.

I will show you a way of doing so with SCSS and JavaScript.

## Define breakpoints

We'll define the collection of breakpoints within a SCSS map and expose it to
the `<body>`.

```scss
// Define breakpoints
$breakpoints: (
  sm: 768px,
  md: 992px,
  lg: 1200px
);

// Simple media query mixin
@mixin respond-to($breakpoint) {
  @media (min-width: #{map-get($breakpoints, $breakpoint)}) {
    @content;
  }
}

// Expose breakpoints
body::after {
  position: absolute;
  left: -1337px;
  visibility: hidden;
  user-select: none;
  pointer-events: none;
  opacity: 0;
  font-size: 0;
  z-index: -1;

  @each $breakpoint-key, $breakpoint-value in $breakpoints {
    @if ($breakpoint-key == 'sm') {
      content: 'sm';
    } @else {
      @include respond-to($breakpoint-key) {
        content: '#{$breakpoint-key}';
      }
    }
  }
}
```

If you inspect the source code of this website you'll see this logic in use.

## The hook 🎣

With this hook we can communicate the use of breakpoints between SCSS and JavaScript.

I'm using my [isSSR](/blog/useMutationObserver/#is-server-side-rendering)
utility and [useWindowSize()](/blog/useWindowSize/) hook to get the breakpoint.

```ts
import { useEffect, useState, useCallback } from 'react';
import { isSSR } from './utils';
import { useWindowSize } from './hooks';

export const useBreakpoint = (): string | undefined => {
  const { width } = useWindowSize();
  const getBreakpoint = useCallback(
    () =>
      isSSR
        ? undefined
        : window
          .getComputedStyle(document.body, '::after')
          .content.replace(/"/g, ''),
    []
  );
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  useEffect(() => {
    setBreakpoint(getBreakpoint);
  }, [width, getBreakpoint]);

  return breakpoint;
};
```

## Usage

When the breakpoint changes we'll `console.log()` it.

```tsx
import React, { useEffect } from 'react';
import { useBreakpoint } from './hooks';

const Component = () => {
  const breakpoint = useBreakpoint();

  useEffect(() => {
    console.log(breakpoint);
  }, [breakpoint]);

  return null;
};

export default Component;
```

## The end 💔

I hope you found this helpful.
