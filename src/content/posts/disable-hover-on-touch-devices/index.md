---
title:        Disable :hover on touch devices 📵
description:  Hover effects are unnecessary when the user is on a touch
              device because it's not possible to perform a hover. On some
              touch devices you can perform the hover effect by performing
              a long touch, but this is just an unnecessary task for the
              browser.
spoiler:      Hover effects are unnecessary when the user is on a touch
              device because it's not possible to perform a hover.
date:         2018-11-05
---

## Why? 🤔

Simple, the hover effect is unnecessary when the user is on a touch device
because it's not possible to perform a hover. On some touch devices you can
perform the hover effect by performing a long touch, but this is just an
unnecessary task for the browser.

## Detect touch devices

A key function of this course of action is to detect the touch devices,
otherwise we don't know when to disable the hover effect. There have never
been a simple or great solution for this, just some sniffing after devices.

A lot of developers uses JavaScript to detect touch devices, they listens
for a combination of touch and mouse events. The problem with this approach
is that it's not 100% reliable, in the highly evolving touch device industry
the logics are constantly changing and are not consistent between different
devices. And if the user disables JavaScript the function will not trigger.

But do we really have to detect **all** touch devices? Could there be a way of
detecting just the hover function? We are going to use media queries for this
approach. The hover media feature detects the user's ability to hover over
elements and it's not dependent of JavaScript. With this approach we don't
have to detect all touch devices, we're only detecting the ability to hover.

> The hover media feature is used to query the user’s ability to hover over
> elements on the page with the primary pointing device. If a device has multiple
> pointing devices, the hover media feature must reflect the characteristics of
> the “primary” pointing device, as determined by the user agent.
>
> [View source](https://drafts.csswg.org/mediaqueries-4/#hover)

## CSS media interaction

The [support](https://caniuse.com/#feat=css-media-interaction) for media interactions
are getting better and therefore we're going use it. One way of using this is to
wrap all `:hover` effects within a `@media (hover:hover)`:

```scss
// When user's primary input mechanism can
// hover over elements all anchors will
// get a background color of purple
@media (hover:hover) {
  a:hover {
    background-color: purple;
  }
}
```

The problem with this approach is that unsupported browsers will not execute
the hover effect even though the user's are sitting on a computer with a pointer.

So how can we solve this? Instead of looking for browsers that's supporting hover,
we could look for browsers that's **not**. But how is this helping us? Well, we could
make the hover effect the same as the initial styling when hover isn't supported.
I know it's hard to understand, maybe some code will help you:

```scss
$background-init: aqua; // Initial color is aqua
$background-hover: lime; // Hover color is lime

.disable-hover-when-not-supported {
  background-color: $background-init;

  &:hover {
    background-color: $background-hover;

    // Primary input mechanism can NOT hover over elements
    // and therefore we'll set it to the initial style
    @media (hover:none), (hover:on-demand) {
      background-color: $background-init;
    }
  }
}
```

So in the background the browser is performing the hover effect, but it doesn't have
to render the styling because it's the same as the initial style. Another good thing
with this approach is that unsupported browser will see the hover effect.

## Read more 🤓

Read these articles if want a greater understanding of all the fundamentals.

- [https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features)
- [https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)
- [https://dev.opera.com/articles/media-features/](https://dev.opera.com/articles/media-features/)
