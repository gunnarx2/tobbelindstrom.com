import React, { useState, useRef, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useLocation } from '@reach/router';

import { Link } from 'components/tools';
import { Container } from 'components/ui/general';
import {
  useKeyPress,
  useClickOutside,
  useToggleTheme,
  usePrevious
} from 'hooks';
import {
  PlusIcon,
  GitHubIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  BarsIcon
} from 'assets/icons';
import { Test } from 'consts/floating';
import styles from './Floating.module.scss';

const Floating = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useToggleTheme();
  const location = useLocation();
  const previousLocation = usePrevious(location);

  const handleClose = useCallback(() => {
    if (open) setOpen(false);
  }, [open]);

  useEffect(() => {
    if (location.pathname !== previousLocation?.pathname) {
      handleClose();
    }
  }, [handleClose, location, previousLocation]);

  useKeyPress(27, () => {
    handleClose();
  });

  useClickOutside(ref, () => {
    handleClose();
  });

  return (
    <nav
      ref={ref}
      className={classNames(styles.root, {
        [styles.open]: open
      })}
    >
      <Container>
        <div className={styles.inner}>
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setOpen(!open)}
            data-test={Test.TOGGLE}
            aria-label={`${open ? 'Close' : 'Open'} floating actions`}
          >
            <div className={styles.toggleBars}>
              <BarsIcon />
            </div>
            <div className={styles.togglePlus}>
              <PlusIcon />
            </div>
          </button>
          <div
            className={styles.actions}
            aria-hidden={!open}
            data-test={Test.ACTIONS}
          >
            <div className={styles.action}>
              <Link
                to="/"
                className={styles.actionButton}
                tabIndex={open ? 0 : -1}
                data-test={Test.ACTION_HOME}
                ariaLabel="Go to home page"
              >
                <HomeIcon />
                <div className={styles.actionButtonLabel}>Go to home page</div>
              </Link>
            </div>
            <div className={classNames(styles.action)}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => toggleTheme()}
                tabIndex={open ? 0 : -1}
                data-test={Test.ACTION_THEME}
                aria-label={`Activate ${
                  theme === 'dark' ? 'light' : 'dark'
                } mode`}
              >
                <div className={styles.actionButtonSun}>
                  <SunIcon />
                </div>
                <div className={styles.actionButtonMoon}>
                  <MoonIcon />
                </div>
                <div className={styles.actionButtonLabel}>
                  Activate {theme === 'dark' ? 'light' : 'dark'} mode
                </div>
              </button>
            </div>
            <div className={styles.action}>
              <Link
                to="https://github.com/gunnarx2/tobbelindstrom.com/"
                className={styles.actionButton}
                tabIndex={open ? 0 : -1}
                ariaLabel="GitHub repository"
              >
                <GitHubIcon />
                <div className={styles.actionButtonLabel}>
                  GitHub repository
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Floating;
