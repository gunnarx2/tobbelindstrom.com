import { useCallback, RefObject } from 'react';

import { useEventListener } from 'hooks';

export const useClickOutside = (
  ref: RefObject<Element>,
  callback: (event: MouseEvent) => void
): void => {
  const handleClick = useCallback(
    (event) => {
      if (!ref.current?.contains(event.target)) {
        callback(event);
      }
    },
    [callback, ref]
  );

  useEventListener({
    type: 'click',
    listener: handleClick
  });
};
