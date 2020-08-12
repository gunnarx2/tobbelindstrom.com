import { useEffect, useRef } from 'react';

export const usePrevious = <T extends {}>(value: T): T | undefined => {
  const previousValue = useRef<T>();

  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  return previousValue.current;
};
