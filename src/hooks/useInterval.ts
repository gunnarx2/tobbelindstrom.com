import { useEffect, useRef, useCallback } from 'react';

type IntervalFunction = () => unknown | void;

export const useInterval = (
  callback: IntervalFunction,
  delay?: number
): void => {
  const savedCallback = useRef<IntervalFunction | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const tick = useCallback(() => {
    savedCallback.current?.();
  }, []);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, tick]);
};
