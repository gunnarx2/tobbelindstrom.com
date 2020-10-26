import {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
  MutableRefObject,
  RefObject
} from 'react';
import { tabbable, FocusableElement } from 'tabbable';

import { useEventListener } from 'hooks';

type Node = HTMLDivElement | null;

interface Options {
  includeContainer?: boolean;
  initialFocus?: 'container' | RefObject<Node> | null;
  returnFocus?: boolean;
  updateNodes?: boolean;
}

export const useTrapFocus = (options?: Options): MutableRefObject<Node> => {
  const node = useRef<Node>(null);
  const { includeContainer, initialFocus, returnFocus, updateNodes } = useMemo<
    Options
  >(
    () => ({
      includeContainer: false,
      initialFocus: null,
      returnFocus: true,
      updateNodes: false,
      ...options
    }),
    [options]
  );
  const [tabbableNodes, setTabbableNodes] = useState<FocusableElement[]>([]);
  const previousFocusedNode = useRef<Node>(document.activeElement as Node);

  const setInitialFocus = useCallback(() => {
    if (initialFocus === 'container') {
      node.current?.focus();
    } else {
      initialFocus?.current?.focus();
    }
  }, [initialFocus, node]);

  const updateTabbableNodes = useCallback(() => {
    const { current } = node;

    if (current) {
      const getTabbableNodes = tabbable(current, { includeContainer });
      setTabbableNodes(getTabbableNodes);
      return getTabbableNodes;
    }

    return [];
  }, [includeContainer]);

  useEffect(() => {
    updateTabbableNodes();
    if (node.current) setInitialFocus();
  }, [setInitialFocus, updateTabbableNodes]);

  useEffect(() => {
    return () => {
      const { current } = previousFocusedNode;
      if (current && returnFocus) current.focus();
    };
  }, [returnFocus]);

  const handleKeydown = useCallback(
    (event) => {
      const { keyCode, shiftKey } = event;

      let getTabbableNodes = tabbableNodes;
      if (updateNodes) getTabbableNodes = updateTabbableNodes();

      if (keyCode === 9 && getTabbableNodes.length) {
        const firstNode = getTabbableNodes[0];
        const lastNode = getTabbableNodes[getTabbableNodes.length - 1];
        const { activeElement } = document;

        if (!getTabbableNodes.includes(activeElement as FocusableElement)) {
          event.preventDefault();
          shiftKey ? lastNode.focus() : firstNode.focus();
        }

        if (shiftKey && activeElement === firstNode) {
          event.preventDefault();
          lastNode.focus();
        }

        if (!shiftKey && activeElement === lastNode) {
          event.preventDefault();
          firstNode.focus();
        }
      }
    },
    [tabbableNodes, updateNodes, updateTabbableNodes]
  );

  useEventListener({
    type: 'keydown',
    listener: handleKeydown
  });

  return node;
};
