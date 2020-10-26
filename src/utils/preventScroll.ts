import { isSSR } from 'utils';
import { ClassNames } from 'consts/preventScroll';

export const preventScroll = (shouldPrevent: boolean): void => {
  if (!isSSR) {
    const { classList } = document.body;
    shouldPrevent
      ? classList.add(ClassNames.PREVENT_SCROLL)
      : classList.remove(ClassNames.PREVENT_SCROLL);
  }
};
