import React from 'react';

import { useWindowSize } from 'hooks';
import styles from './UseWindowSize.module.scss';

const UseWindowSize = () => {
  const { width, height } = useWindowSize();

  return (
    <div className={styles.root}>
      <div className={styles.describe}>Current window size:</div>
      <div className={styles.size}>
        {width}x{height}
      </div>
    </div>
  );
};

export default UseWindowSize;
