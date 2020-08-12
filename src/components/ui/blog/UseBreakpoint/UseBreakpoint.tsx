import React from 'react';

import { useBreakpoint } from 'hooks';
import styles from './UseBreakpoint.module.scss';

const UseBreakpoint = () => {
  const breakpoint = useBreakpoint();

  return (
    <div className={styles.root}>
      <div className={styles.describe}>Current breakpoint:</div>
      <div className={styles.breakpoint}>{breakpoint}</div>
    </div>
  );
};

export default UseBreakpoint;
