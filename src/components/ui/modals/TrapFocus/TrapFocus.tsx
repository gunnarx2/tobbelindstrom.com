import React, { useRef } from 'react';
import { motion } from 'framer-motion';

import { Test, Transition } from 'consts/trapFocus';
import { useClickOutside, useTrapFocus } from 'hooks';
import { CrossIcon, HeisenbergIcon } from 'assets/icons';
import styles from './TrapFocus.module.scss';

interface Props {
  onClose?: () => void;
}

const TrapFocus = ({ onClose }: Props) => {
  const initialFocusRef = useRef(null);
  const trapRef = useTrapFocus({
    includeContainer: true,
    initialFocus: initialFocusRef.current,
    returnFocus: true,
    updateNodes: false
  });

  useClickOutside(trapRef, () => onClose?.());

  return (
    <motion.div
      key="root"
      ref={trapRef}
      className={styles.root}
      data-test={Test.CONTENT}
      transition={{
        duration: Transition.DURATION,
        delay: Transition.DURATION / 2,
        ease: Transition.EASE
      }}
      initial={{ opacity: 0, scale: 1.25 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75, transition: { delay: 0 } }}
      tabIndex={0}
    >
      <div className={styles.hero}>
        <HeisenbergIcon />
      </div>
      <div className={styles.content}>
        <h3>Start tabbing</h3>
        <p>
          Lorem ipsum <span tabIndex={0}>dolor</span> sit amet,{' '}
          <span
            tabIndex={0}
            data-test={Test.INITIAL_FOCUS}
            ref={initialFocusRef}
          >
            consectetur
          </span>{' '}
          adipiscing elit. Pellentesque a velit dolor.{' '}
          <span tabIndex={0}>Aenean semper</span> scelerisque nunc vitae{' '}
          <span tabIndex={0}>malesuada</span>.
        </p>
      </div>
      <button
        type="button"
        className={styles.close}
        data-test={Test.CLOSE}
        aria-label="Close modal"
        onClick={() => onClose?.()}
      >
        <CrossIcon />
      </button>
    </motion.div>
  );
};

export default TrapFocus;
