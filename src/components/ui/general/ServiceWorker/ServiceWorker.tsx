import React, { useCallback, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Portal } from 'components/tools';
import { Container } from 'components/ui/general';
import { useMutationObserver } from 'hooks';
import { isSSR, getElement } from 'utils';
import { Transition } from 'consts/serviceWorker';
import styles from './ServiceWorker.module.scss';

const ServiceWorker = () => {
  const serviceWorkerSelector = useMemo(() => '#service-worker', []);
  const [shouldRender, setShouldRender] = useState(false);

  const handleMutations = useCallback((mutations) => {
    mutations.forEach(
      ({
        type,
        target
      }: {
        type: MutationRecordType;
        target: Element | null;
      }) => {
        if (type === 'attributes') {
          setShouldRender(
            getElement(target)?.getAttribute('aria-hidden') !== 'true'
          );
        }
      }
    );
  }, []);

  useMutationObserver({
    target: !isSSR ? document.querySelector(serviceWorkerSelector) : null,
    options: { attributes: true },
    callback: handleMutations
  });

  return (
    <AnimatePresence>
      {shouldRender && (
        <Portal selector={serviceWorkerSelector}>
          <motion.div
            key="service-worker"
            transition={{
              duration: Transition.DURATION,
              ease: Transition.EASE
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.root}
          >
            <Container>
              <div className={styles.inner}>
                <div className={styles.content}>
                  <div className={styles.background}>
                    <h4 className={styles.title}>New content available</h4>
                    <div className={styles.buttons}>
                      <button
                        type="button"
                        className={styles.reload}
                        onClick={() => window.location.reload()}
                      >
                        Update content
                      </button>
                      <span className={styles.separator} />
                      <button
                        type="button"
                        className={styles.close}
                        onClick={() => setShouldRender(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default ServiceWorker;
