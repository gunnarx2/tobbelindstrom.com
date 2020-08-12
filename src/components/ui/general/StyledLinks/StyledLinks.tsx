import React, { ReactNode, ElementType } from 'react';
import classNames from 'classnames';

import styles from './StyledLinks.module.scss';

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

const StyledLinks = ({ children, as, className, ...props }: Props) => {
  const Element = as || 'div';
  return (
    <Element className={classNames(styles.root, className)} {...props}>
      {children}
    </Element>
  );
};

export default StyledLinks;
