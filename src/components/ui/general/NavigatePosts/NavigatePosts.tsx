import React from 'react';

import { Link } from 'components/tools';
import { Container, StyledLinks } from 'components/ui/general';
import { NextAndPrevious } from 'templates/blog/Post';
import styles from './NavigatePosts.module.scss';

interface Props {
  next?: NextAndPrevious;
  previous?: NextAndPrevious;
}

const NavigatePosts = ({ next, previous }: Props) => {
  return (
    <StyledLinks
      as="nav"
      className={styles.root}
      aria-label="Navigate between posts"
    >
      <Container>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            {previous && (
              <>
                <h4 className={styles.listHeading}>← Previous post</h4>
                <Link to={previous.fields.slug}>
                  {previous.frontmatter.title}
                </Link>
              </>
            )}
          </li>
          <li className={styles.listItem}>
            {next && (
              <>
                <h4 className={styles.listHeading}>Next post →</h4>
                <Link to={next.fields.slug}>{next.frontmatter.title}</Link>
              </>
            )}
          </li>
        </ul>
      </Container>
    </StyledLinks>
  );
};

export default NavigatePosts;
