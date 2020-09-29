---
title:        Cancellation with switchMap and custom promises ⛔
description:  I will show you a simple snippet that uses axios to perform
              custom promises within switchMap.
spoiler:      I will show you a simple snippet that uses axios to perform
              custom promises within switchMap.
date:         2020-09-29
---

## RxJS 🔥🚒

For some time I've used [RxJS](https://github.com/ReactiveX/rxjs) together
with [redux-observable](https://github.com/redux-observable/redux-observable)
and it's truly a beast of combination. In their own words:

> **RxJS**  
> RxJS is a library for composing asynchronous and event-based programs by
> using observable sequences.
> 
>  **redux-observable**  
> RxJS-based middleware for Redux. Compose and cancel async actions to create
> side effects and more.

## Cancellation ⛔

The greatness of [switchMap](https://rxjs.dev/api/operators/switchMap) is its
cancelling effect. On each emission the previous inner observable is cancelled
and the new observable is subscribed.

A common use case is to call [ajax](https://rxjs-dev.firebaseapp.com/api/ajax/ajax)
to perform http requests. It's nothing wrong with that, it has a built-in functionality
that takes care of the cancellation. But what if we want to perform a custom promise
and respect the power of switchMap's cancellation?

Here you have a simple snippet that uses [axios](https://github.com/axios/axios)
to perform the custom promise:

```ts
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Observable, PartialObserver } from 'rxjs';

export const getAsObservable = (url: string, config?: AxiosRequestConfig) =>
  Observable.create((observer: PartialObserver<AxiosResponse>) => {
    const cancelToken = axios.CancelToken.source();

    axios
      .get(url, {
        cancelToken: cancelToken.token,
        ...config
      })
      .then(
        (result) => {
          observer.next?.(result);
          observer.complete?.();
        },
        (error) => {
          if (axios.isCancel(error)) {
            observer.complete?.();
          } else {
            observer.error?.(error);
          }
        }
      );

    return () => cancelToken.cancel();
  });
```

Then you just have to include the snippet together with
[from](https://rxjs.dev/api/index/function/from).

```ts
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { getAsObservable } from './getAsObservable';

action$.pipe(
  switchMap(() =>
    from(getAsObservable('{insert-url}')).pipe(
      ...
    )
  )
);
```

So what happens here? Well, I'll try to explain it briefly.

When a new emission appears switchMap's previous inner observable is
cancelled and the new observable is subscribed. When the new emission
appears we'll let axios know about this, axios then uses its own cancelling
features to cancel the pending http request and initialize the next.

## Want to learn more? 📚

This was just the tip of the iceberg.

[RxJS](https://github.com/ReactiveX/rxjs) and
[redux-observable](https://github.com/redux-observable/redux-observable)
have a pretty steep learning curve, but when you've mastered it you can
accomplish greatness. Visit their GitHub pages and navigate from there
to learn more.
