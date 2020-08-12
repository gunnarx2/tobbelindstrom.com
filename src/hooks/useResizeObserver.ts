import {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useResizeObserver = (): [
  Dispatch<SetStateAction<Element | null>>,
  ResizeObserverEntry | null
] => {
  const [
    observerEntry,
    setObserverEntry
  ] = useState<ResizeObserverEntry | null>(null);
  const [node, setNode] = useState<Element | null>(null);
  const observer = useRef<ResizeObserver | null>(null);

  const disconnect = useCallback(() => observer.current?.disconnect(), []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => setObserverEntry(entry));
    if (node) observer.current.observe(node);
  }, [node]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  return [setNode, observerEntry];
};
