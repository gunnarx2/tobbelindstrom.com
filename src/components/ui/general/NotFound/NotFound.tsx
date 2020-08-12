import React from 'react';

import { Hero } from 'components/ui/general';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <Hero
          title="Page not found 😢"
          paragraph={`
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum
            tellus at iaculis dignissim. In scelerisque lorem in nulla euismod consequat.
          `}
          large
          wave={{ fill: 'primary', backgroundColor: 'alpha' }}
        />
      </main>
    </div>
  );
};

export default NotFound;
