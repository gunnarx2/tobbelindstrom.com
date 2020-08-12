import React, { ReactNode, ElementType } from 'react';
import classNames from 'classnames';

import { WaveIcon } from 'assets/icons';
import styles from './Wave.module.scss';

export interface WaveFillAndBackgroundColor {
  fill: 'primary' | 'alpha' | 'eta';
  backgroundColor: 'alpha' | 'delta' | 'eta';
}

interface Props {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
}

const Wave = ({
  children,
  className,
  fill,
  backgroundColor,
  as
}: Props & WaveFillAndBackgroundColor) => {
  const Element = as || 'section';

  return (
    <Element
      className={classNames(styles.root, className, {
        [styles[`${fill}Fill`]]: fill,
        [styles[`${backgroundColor}BackgroundColor`]]: backgroundColor
      })}
    >
      {children}
      <div className={styles.iconHolder}>
        <WaveIcon />
      </div>
    </Element>
  );
};

export default Wave;
