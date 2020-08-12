---
title:        Iterate over objects with ES7 🔥
description:  Learn how to create a reusable function that iterates
              over objects with a ES7 method. We'll use Object.entries
              and for...of.
spoiler:      Learn how to create a reusable function that iterates
              over objects with a ES7 method.
date:         2018-11-21
---

## Why not use the regular for...in loop?

A problem with the [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
loop is that it iterates through properties in the prototype chain.
When you iterates over an object with the `for...in` loop you need
to check if the property belongs to the object. You can do this with
[hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty),
but we're going to do it with another approach.

We're going to use the [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
loop. Both `for...in` and `for...of` statements iterate over something,
but the main difference between them is in what they iterate over. The
`for...in` statement iterates over the enumerable properties of an
object, in an arbitrary order. The `for...of` statement iterates over
data that the iterable object defines to be iterated over.

## The for...in loop

There's no major problem with the `for...in` loop, it just has some
destructive approach. Here's a basic example with the necessary
`hasOwnProperty()`:

```jsx
const testObject = {
  name: 'Walter White',
  nickname: 'Heisenberg',
  badass: true
};

for (const variable in testObject) {
  if (testObject.hasOwnProperty(variable)) {
    console.log([ variable, testObject[variable] ]);
  }
}
```

## Iterate with ES7 😍

To iterate with ES7 we're going to use [Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries).
`Object.entries` creates an array of arrays. Each inner array has two
items, the first item is the key and the second item is the value. Lets
see what `Object.entries` gives us:

```jsx
const testObject = {
  name: 'Walter White',
  nickname: 'Heisenberg',
  badass: true
};

console.log(Object.entries(testObject));
// Output: [ ['name', 'Walter White'], ['nickname', 'Heisenberg'], ['badass', true] ]
```

When you see that we're getting an array you're probably thinking "Can
we not just use `forEach()`?", yes you can, but `for...of` is faster and
unlike `forEach()` it works with `break`, `continue` and `return`.

Create a file with the name of `forEachObject.js`. In our `for...of`
loop we're [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
the array of arrays to get the key and value. Then we'll execute the
function and pass down the key and value as arguments:

```jsx
export const forEachObject = (objects, action) => {
  for (const [ key, value ] of Object.entries(objects)) {
    action(key, value);
  }
};
```

To make use of `forEachObject()` we'll have to import it and execute
it like this:

```jsx
import { forEachObject } from './forEachObject';

const testObject = {
  name: 'Walter White',
  nickname: 'Heisenberg',
  badass: true
};

forEachObject(testObject, (key, value) => {
  console.log(key); // 'name', 'nickname', 'badass'
  console.log(value); // 'Walter White', 'Heisenberg', true
});
```

## We've learned something

Good job, you're done! As I said earlier there's no major problem
with the `for...in` loop, it just has some destructive approach.
Therefore we created a more modern approach with a combination of
`Object.entries` and `for...of`. I hope this article has learned
you something 🎉✌️
