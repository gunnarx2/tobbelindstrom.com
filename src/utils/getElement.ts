import { RefObject } from 'react';

export const getElement = <T = undefined>(
  element?: RefObject<Element> | Element | null | T
): Element | null | undefined | T =>
  element && 'current' in element ? element.current : element;
