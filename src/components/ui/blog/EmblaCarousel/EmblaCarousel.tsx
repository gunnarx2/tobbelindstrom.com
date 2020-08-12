import React, { useState, useEffect, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';

import { DotButton, PrevButton, NextButton } from './EmblaCarouselButtons';
import styles from './EmblaCarousel.module.scss';

const EmblaCarousel = () => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index) => embla?.scrollTo(index), [embla]);
  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (embla) {
      setSelectedIndex(embla.selectedScrollSnap());
      setPrevBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
    }
  }, [embla]);

  useEffect(() => {
    if (embla) {
      setScrollSnaps(embla.scrollSnapList());
      embla.on('select', onSelect);
      onSelect();
    }
  }, [embla, onSelect]);

  return (
    <div className={styles.root}>
      <div className={styles.embla}>
        <div className={styles.inner}>
          <EmblaCarouselReact className={styles.viewport}>
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
          </EmblaCarouselReact>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
        <div className={styles.dots}>
          {scrollSnaps.map((snap, index) => (
            <DotButton
              key={index}
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
