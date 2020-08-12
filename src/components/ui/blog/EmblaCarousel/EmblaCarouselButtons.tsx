import React, { memo } from 'react';
import classNames from 'classnames';

import { AngleIcon } from 'assets/icons';
import styles from './EmblaCarousel.module.scss';

interface DotButtonProps {
  selected: boolean;
  onClick: () => void;
  index: number;
}

interface PrevAndNextButtonProps {
  enabled: boolean;
  onClick: () => void;
}

export const DotButton = memo(
  ({ selected, onClick, index }: DotButtonProps) => (
    <button
      type="button"
      aria-label={`Carousel dots button for slide ${index + 1}`}
      data-test="embla-dot"
      className={classNames(styles.dot, {
        [styles.isSelected]: selected
      })}
      onClick={onClick}
    />
  )
);

export const PrevButton = memo(
  ({ enabled, onClick }: PrevAndNextButtonProps) => (
    <button
      type="button"
      aria-label={
        enabled
          ? 'Go to previous carousel slide'
          : `Can't go to previous carousel slide`
      }
      data-test="embla-prev"
      className={classNames(styles.button, styles.buttonPrev)}
      onClick={onClick}
      disabled={!enabled}
      aria-disabled={!enabled}
    >
      <AngleIcon />
    </button>
  )
);

export const NextButton = memo(
  ({ enabled, onClick }: PrevAndNextButtonProps) => (
    <button
      type="button"
      aria-label={
        enabled
          ? 'Go to next carousel slide'
          : `Can't go to next carousel slide`
      }
      data-test="embla-next"
      className={classNames(styles.button, styles.buttonNext)}
      onClick={onClick}
      disabled={!enabled}
      aria-disabled={!enabled}
    >
      <AngleIcon />
    </button>
  )
);
