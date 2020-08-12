import React, { ReactNode } from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface Props {
  children: ReactNode;
  to: string;
  className?: string;
  ariaLabel?: string;
  tabIndex?: number;
}

const Link = ({
  children,
  to,
  className,
  ariaLabel,
  tabIndex,
  ...props
}: Props) => {
  const internal = /^\/(?!\/)|^#/.test(to);

  if (internal) {
    return (
      <GatsbyLink
        to={to}
        className={className}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
        {...props}
      >
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a
      href={to}
      className={className}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
