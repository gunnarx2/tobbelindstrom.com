import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';

import { useResizeObserver, useInterval } from 'hooks';
import styles from './ResizeObserver.module.scss';

interface Props {
  number: string | number;
}

const Item = ({ number }: Props) => {
  const [ref, entry] = useResizeObserver();

  const getContentRect = useCallback(
    (key: 'width' | 'height') =>
      entry?.contentRect && Math.round(entry.contentRect[key]),
    [entry]
  );

  return (
    <div
      className={classNames(styles.box, {
        [styles[`number${number}`]]: number
      })}
    >
      <div ref={ref} className={styles.inner}>
        {getContentRect('width')}x{getContentRect('height')}
      </div>
    </div>
  );
};

const ResizeObserver = () => {
  const [number, setNumber] = useState(1);

  useInterval(() => {
    setNumber(number === 1 ? 2 : 1);
  }, 2500);

  useEffect(() => {
    setTimeout(() => setNumber(2), 125);
  }, []);

  return (
    <div className={styles.root}>
      {[0, 1, 2, 3].map((key) => (
        <Item key={key} number={number} />
      ))}
    </div>
  );
};

export default ResizeObserver;
