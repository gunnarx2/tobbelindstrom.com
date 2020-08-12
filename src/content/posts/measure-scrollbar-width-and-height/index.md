---
title:        Measure scrollbar width and height 📐
description:  Is it possible to measure the scrollbar? And what's
              the point if doing that?
spoiler:      I thought it was difficult to measure the scrollbar,
              but after some research I changed my mind.
date:         2019-01-15
---

## What's the point of this? 🧐

I noticed an irritating thing when I developed a modal component. The
most common thing with modals is that you set `overflow: hidden` on the
`<body>` to prevent the scroll. If the browser has a scrollbar that takes
up space the `overflow: hidden` will make the content jump to the right,
and then jump back to the left when the modal is closed. This is very
annoying and gives a bad impression. So how can we solve this? First we
have to measure the scollbar...

## Can we measure the scrollbar? 😲

Yes we can, and it's quite simple. We need to create a `<div>` and inject
it into the DOM, and then measure the scrollbar of that element. Sounds
quite simple, right?

Some styling is necessary for this measuring to work. First we need to
append some offscreen positioning so the user doesn't see it, then give
it `overflow: scroll` so the scrollbar is visible for our measurement.

With the styled element in the page we can measure the scrollbar. To get
the width we'll subtract `offsetWidth` with the `clientWidth`, and if you
want the height you'll just use `offsetHeight` and `clientHeight` instead.

The last step is removing the `<div>` from the DOM. Here you can see the
function:

```jsx
export const getScrollbarSize = () => {
  const { body } = document;
  const scrollDiv = document.createElement('div');

  // Append element with defined styling
  scrollDiv.setAttribute(
    'style',
    'width: 1337px; height: 1337px; position: absolute; left: -9999px; overflow: scroll;'
  );
  body.appendChild(scrollDiv);

  // Collect width & height of scrollbar
  const calculateValue = (type) =>
    scrollDiv[`offset${type}`] - scrollDiv[`client${type}`];
  const scrollbarWidth = calculateValue('Width');
  const scrollbarHeight = calculateValue('Height');

  // Remove element
  body.removeChild(scrollDiv);

  return {
    width: scrollbarWidth,
    height: scrollbarHeight
  };
};
```

With `getScrollbarSize()` function we're getting both the width and height
of the scrollbar. So how did this function solve my problem with the modal?
I just appended `margin-right` with the width amount of the scrollbar on the
content container.

An example of how to access it you simple do something like this:

```jsx
import { getScrollbarSize } from './getScrollbarSize';

const { height, width } = getScrollbarSize();
console.log(width); // Width of scrollbar
console.log(height); // Height of scrollbar
```

## Congratulations 🎉

You just learned how easy it is to measure the width and height of the
scrollbar. I hope you find this useful. Peace ☮
