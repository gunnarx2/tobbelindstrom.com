import React, { ReactNode, useEffect } from 'react';

import { ServiceWorker, Floating } from 'components/ui/general';
import { useTabAccess, useKonamiCode } from 'hooks';
import 'styles/_global.scss';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const success = useKonamiCode();

  useEffect(() => {
    if (success) {
      document.body?.classList.add('konami-code');
    }
  }, [success]);

  useTabAccess();

  return (
    <>
      {children}
      <Floating />
      <ServiceWorker />
    </>
  );
};

export default Layout;
