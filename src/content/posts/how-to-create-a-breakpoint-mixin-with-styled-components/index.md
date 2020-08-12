---
title:        How to create a breakpoint mixin with styled-components
description:  CSS-in-JS is getting more common within modern frontend and
              styled-components is one of these libraries. It's one the most
              popular libraries within CSS-in-JS because of its innovation
              and familiarity with zero-configuration.
spoiler:      CSS-in-JS is getting more common within modern frontend and
              styled-components is one of these libraries.
date:         2019-01-03
---

## What is styled-components? 🤷

CSS-in-JS is getting more common within modern frontend and [styled-components](https://styled-components.com/)
is one of these libraries. It's one the most popular libraries within CSS-in-JS
because of its innovation and familiarity with zero-configuration. Developers
don't have to think about unique selector names, styled-components takes care of
this.

> Utilising tagged template literals (a recent addition to JavaScript) and the
> power of CSS, styled-components allows you to write actual CSS code to style
> your components. It also removes the mapping between components and styles –
> using components as a low-level styling construct could not be easier!
>
> [View source](https://styled-components.com/docs)

## Useful information 📝

This blog post is based on a mobile-first architecture. If your project is based
on some other architecture you just have to tweak the function a little.

You'll notice that I'm using `_` (underscore) as the first character in the stylesheet
filenames, the reason for that is to easily recognize a file that contains styling
and to reflect the [partial](https://sass-lang.com/guide#topic-4) logic from SCSS.

## Doing it with SCSS

Just to compare with a common usecase of a SCSS breakpoint mixin I've written the
most simple:

```scss
// Define breakpoints
$breakpoints: (
  sm: 768px,
  md: 992px,
  lg: 1200px
);

// Create mixin
@mixin respond-to($breakpoint) {
  @media (min-width: #{map-get($breakpoints, $breakpoint)}) {
    @content;
  }
}

// Example usage
html {
  background-color: lime;

  @include respond-to(sm) {
    background-color: aqua;
  }
}
```

## Doing it with styled-components 💖

Now it's time to build the same logic but with styled-components. We'll do it in
the same order as I explained in the SCSS usecase.

### Define breakpoints

Create a file named *_variables.js* and export a const as below. The keys in the
object will be used throughout your application and will relate to the defined
value. There's no limit to these breakpoints, but to keep a consistent application
I recommend around four breakpoints.

```js
export const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px'
};
```

### Create mixin

Now it's time to create the mixin, do it in a file named *_respondTo.js*. We have
to import two things for this mixin to work, `css` from `styled-components` and
`breakpoints` that we just created from *_variables.js*.

```js
import { css } from 'styled-components';
import { breakpoints } from './_variables';

export const respondTo = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);
```

### Example usage

Lets try using our mixin in a component. Import `styled` from `styled-components`
and our mixin `respondTo` from *_respondTo.js*. It could look something like this:

```js
import styled from 'styled-components';
import { respondTo } from './_respondTo';

// Background color changes to
// aqua from breakpoint sm (768px)
export const ExampleComponent = styled.div`
  background-color: lime;

  ${respondTo.sm`
    background-color: aqua;
  `}
`;
```

### Add breakpoint

Now lets say that you want a new breakpoint and use it in our `ExampleComponent`,
then you have add it within *_variables.js* and use it as following:

```js{6}
export const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1400px' // This one is new
};
```

```js{16}
import styled from 'styled-components';
import { respondTo } from './_respondTo';

// Background color changes to aqua
// from breakpoint sm (768px) and
// changes to purple from our newly
// created breakpoint xl (1400px)
export const ExampleComponent = styled.div`
  background-color: lime;

  ${respondTo.sm`
    background-color: aqua;
  `}

  ${respondTo.xl`
    background-color: purple;
  `}
`;
```

## Good job 💅

You've just learned how to create a consistent and scaleable breakpoint mixin
for an mobile-first application.

Do you want to learn more? Go to their [documentation](https://styled-components.com/docs)
and have fun 🤡
