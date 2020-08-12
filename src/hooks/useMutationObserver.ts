import { useEffect, useMemo, RefObject } from 'react';

import { isSSR, getElement } from 'utils';

interface Props {
  target?: RefObject<Element> | Element | Node | null;
  options?: MutationObserverInit;
  callback?: MutationCallback;
}

export const useMutationObserver = ({
  target,
  options = {},
  callback
}: Props): void => {
  const getTarget = useMemo(() => getElement(target), [target]);
  const observer = useMemo(
    () =>
      !isSSR
        ? new MutationObserver((mutationRecord, mutationObserver) => {
            callback?.(mutationRecord, mutationObserver);
          })
        : null,
    [callback]
  );

  useEffect(() => {
    if (observer && getTarget) {
      observer.observe(getTarget, options);
      return () => observer.disconnect();
    }
  }, [getTarget, observer, options]);
};
