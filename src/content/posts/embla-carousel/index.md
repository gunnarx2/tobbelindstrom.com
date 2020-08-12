---
title:        Embla Carousel 🍀
description:  Embla's purpose is to provide a low level carousel and allow
              developers to extend it by using its available methods. Extend
              it with some very basic JavaScript and build awesome physics
              simulated carousels. It's dependency free and 100% open source.
spoiler:      Extensible low level carousels for the web. Extend it with
              basic JavaScript and build awesome physics simulated carousels.
date:         2019-09-07
---

## Just another carousel? 🤨

No, this is something else. My good friend [David Cetinkaya](https://twitter.com/david_cetinkaya)
has studied physics within JavaScript and created this smooth and light
weight carousel. In his own words:

> Embla's purpose is to provide a low level carousel and allow developers to
> extend it by using its available methods. Extend it with some very basic
> JavaScript and build awesome physics simulated carousels. It's dependency
> free and 100% open source.

## Show me a demo already 🔥

Visit the [GitHub page](https://github.com/davidcetinkaya/embla-carousel)
to view all options and API references.

import { EmblaCarousel } from 'components/ui/blog';

<EmblaCarousel />

## Is it easy to use?

Yes, with some decent knowledge. The package doesn't come with e.g. predefined
arrows and dots, you have to use your knowledge to create them using the API.
But at the same time, it's not rocket science 🚀

Here's the most basic example, it's just the carousel as it is.

```jsx
import React, { useEffect } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';

const EmblaCarousel = () => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        console.log(`Index is ${embla.selectedScrollSnap()}`);
      });
    }
  }, [embla]);

  return (
    <EmblaCarouselReact>
      <div style={{ display: 'flex' }}>
        <div style={{ minWidth: '100%' }}>Slide 1</div>
        <div style={{ minWidth: '100%' }}>Slide 2</div>
        <div style={{ minWidth: '100%' }}>Slide 3</div>
      </div>
    </EmblaCarouselReact>
  );
};

export default EmblaCarousel;
```

## Want to learn more? 📚

There's so much more to this carousel. Visit the [GitHub page](https://github.com/davidcetinkaya/embla-carousel)
or his own [demo page](https://davidcetinkaya.github.io/embla-carousel/)
to learn more.

Are you convinced to use this carousel? Yes, me too. Do you want to know
something even more awesome? It's dependency free and 100% open source 🎈
