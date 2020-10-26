import React, { useState } from 'react';

import { Test } from 'consts/trapFocus';
import { Wrapper, TrapFocus } from 'components/ui/modals';
import styles from './UseTrapFocus.module.scss';

const UseTrapFocus = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.root}>
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        data-test={Test.TOGGLE}
      >
        Toggle modal{' '}
        <span role="img" aria-label="Sparkles emoji">
          ✨
        </span>
      </button>
      <Wrapper visible={visible} onClose={() => setVisible(false)}>
        <TrapFocus />
      </Wrapper>
    </div>
  );
};

export default UseTrapFocus;
