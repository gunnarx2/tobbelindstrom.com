import { useCallback } from 'react';

import { useEventListener } from 'hooks';

export const useKeyPress = (
  key: number,
  callback: (event: KeyboardEvent) => void
): void => {
  const handleKeydown = useCallback(
    (event) => {
      if (event.keyCode === key) {
        callback(event);
      }
    },
    [callback, key]
  );

  useEventListener({
    type: 'keydown',
    listener: handleKeydown,
    options: { passive: true }
  });
};
