import React, { useCallback } from 'react';

import { useScroll } from 'hooks';
import styles from './UseScroll.module.scss';

const UseScroll = () => {
  const scrollWait0 = useScroll(0);
  const scrollWait500 = useScroll(500);

  const renderScrollAmount = useCallback(
    (scrollAmount?: number) => scrollAmount && Math.round(scrollAmount),
    []
  );

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.describe}>No throttle</div>
        <div className={styles.scroll}>{renderScrollAmount(scrollWait0.y)}</div>
        <div className={styles.describe}>
          {scrollWait0.direction || 'Direction...'}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.describe}>Throttle 500</div>
        <div className={styles.scroll}>
          {renderScrollAmount(scrollWait500.y)}
        </div>
        <div className={styles.describe}>
          {scrollWait500.direction || 'Direction...'}
        </div>
      </div>
    </div>
  );
};

export default UseScroll;
