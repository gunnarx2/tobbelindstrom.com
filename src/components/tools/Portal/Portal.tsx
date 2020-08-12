import { useMemo, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { isSSR } from 'utils';

interface Props {
  children: ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: Props) => {
  const portalSelector = useMemo(
    () => (!isSSR ? document.querySelector(selector) : null),
    [selector]
  );

  if (children && portalSelector) {
    return createPortal(children, portalSelector);
  }

  return null;
};

export default Portal;
