import React, { ReactNode, ReactElement, cloneElement, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Portal } from 'components/tools';
import { Transition } from 'consts/trapFocus';
import { useKeyPress } from 'hooks';
import { preventScroll } from 'utils';
import styles from './Wrapper.module.scss';

interface Props {
  children: ReactNode;
  visible: boolean;
  onClose?: () => void;
}

const Wrapper = ({ children, visible, onClose }: Props) => {
  useKeyPress(27, () => onClose?.());

  useEffect(() => {
    if (visible) preventScroll(true);
    return () => preventScroll(false);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <Portal selector="#modal">
          <motion.div
            key="root"
            className={styles.root}
            transition={{ duration: Transition.DURATION }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.inner}>
              <div className={styles.body}>
                <div className={styles.dialog}>
                  {cloneElement(children as ReactElement<any>, {
                    onClose
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default Wrapper;
