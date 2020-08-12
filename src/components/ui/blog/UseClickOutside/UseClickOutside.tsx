import React, { useRef, useState } from 'react';

import { useClickOutside } from 'hooks';
import styles from './UseClickOutside.module.scss';

const UseClickOutside = () => {
  const [clicks, setClicks] = useState(0);
  const ref = useRef(null);

  useClickOutside(ref, () => {
    setClicks(clicks + 1);
  });

  return (
    <div ref={ref} className={styles.root}>
      <div className={styles.describe}>
        Amount of clicks outside this element:
      </div>
      <div className={styles.size}>{clicks}.</div>
    </div>
  );
};

export default UseClickOutside;
