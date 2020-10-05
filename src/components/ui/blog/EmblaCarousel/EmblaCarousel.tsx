import React, { useState, useEffect, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';

import { DotButton, PrevButton, NextButton } from './EmblaCarouselButtons';
import styles from './EmblaCarousel.module.scss';

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [
    emblaApi
  ]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      emblaApi.on('select', onSelect);
      onSelect();
    }
  }, [emblaApi, onSelect]);

  return (
    <div className={styles.root}>
      <div className={styles.embla}>
        <div className={styles.inner}>
          <div ref={emblaRef} className={styles.viewport}>
            <div className={styles.container}>
              {[0, 1, 2, 3, 4].map((number) => (
                <div
                  key={number}
                  className={styles.slide}
                  data-test="embla-slide"
                  aria-hidden={selectedIndex !== number}
                >
                  <div className={styles.slideInner}>
                    <div className={styles.slideContent}>{number + 1}.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
        <div className={styles.dots}>
          {scrollSnaps.map((snap, index) => (
            <DotButton
              key={snap}
              index={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
