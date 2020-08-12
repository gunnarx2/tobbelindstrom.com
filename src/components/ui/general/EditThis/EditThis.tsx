import React from 'react';

import { Link } from 'components/tools';
import { Container, StyledLinks } from 'components/ui/general';
import styles from './EditThis.module.scss';

interface Props {
  type: 'page' | 'post';
  url: string;
}

const EditThis = ({ type, url }: Props) => {
  return (
    <div className={styles.root}>
      <StyledLinks className={styles.inner}>
        <Container>
          Edit this {type} on{' '}
          <Link
            to={`https://github.com/gunnarx2/tobbelindstrom.com/tree/master${url}`}
          >
            GitHub
          </Link>
        </Container>
      </StyledLinks>
    </div>
  );
};

export default EditThis;
