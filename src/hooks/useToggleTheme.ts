import { useCallback, useState } from 'react';

import { isSSR } from 'utils';

export const useToggleTheme = (): ['dark' | 'light', () => void] => {
  const [theme, setTheme] = useState(!isSSR ? window.__THEME__ : 'dark');

  const handleToggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    window.__SET_THEME__(newTheme);
    setTheme(newTheme);
  }, [theme]);

  return [theme, handleToggleTheme];
};
