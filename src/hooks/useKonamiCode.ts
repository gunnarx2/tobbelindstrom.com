import { useEffect, useCallback, useState, useMemo } from 'react';
import { isEqual } from 'lodash';

import { useEventListener } from 'hooks';

export const useKonamiCode = (): boolean => {
  const konamiCode = useMemo(
    () => [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    []
  );
  const [success, setSuccess] = useState(false);
  const [userKeys, setUserKeys] = useState<number[]>([]);

  const clearSequence = useCallback(() => {
    setUserKeys([]);
  }, []);

  const handleKeydown = useCallback(
    ({ keyCode }) => {
      if (konamiCode[userKeys.length] === keyCode) {
        setUserKeys([...userKeys, keyCode]);
        return;
      }

      if (
        userKeys.length < 3 &&
        userKeys.toString() === `${konamiCode[0]},${konamiCode[1]}` &&
        keyCode === konamiCode[0]
      ) {
        return;
      }

      clearSequence();
    },
    [clearSequence, konamiCode, userKeys]
  );

  useEffect(() => {
    if (isEqual(userKeys, konamiCode)) {
      setSuccess(true);
      clearSequence();
    }
  }, [clearSequence, konamiCode, userKeys]);

  useEffect(() => {
    return () => clearSequence();
  }, [clearSequence]);

  useEventListener({
    type: 'keydown',
    listener: handleKeydown,
    options: { passive: true }
  });

  return success;
};
