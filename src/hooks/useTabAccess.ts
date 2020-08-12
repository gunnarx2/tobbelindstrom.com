import { useState, useCallback } from 'react';

import { useEventListener } from 'hooks';

export const useTabAccess = (): boolean => {
  const [isTabbing, setIsTabbing] = useState(false);

  const handleKeydown = useCallback(
    ({ keyCode }) => {
      if (keyCode === 9 && !isTabbing) {
        setIsTabbing(true);
        document.body?.classList.add('is-tabbing');
      }
    },
    [isTabbing]
  );

  const handleMousedown = useCallback(() => {
    if (isTabbing) {
      setIsTabbing(false);
      document.body?.classList.remove('is-tabbing');
    }
  }, [isTabbing]);

  useEventListener({
    type: 'keydown',
    listener: handleKeydown,
    options: { passive: true }
  });

  useEventListener({
    type: 'mousedown',
    listener: handleMousedown
  });

  return isTabbing;
};
