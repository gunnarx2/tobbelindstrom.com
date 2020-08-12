import React from 'react';

import { Link } from 'components/tools';
import { ArchivePost } from 'templates/blog/Archive';
import styles from './BlogPlate.module.scss';

const BlogPlate = ({ node }: ArchivePost) => {
  const { fields, frontmatter, timeToRead } = node;

  return (
    <Link className={styles.root} to={fields.slug}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{frontmatter.title}</h2>
        <p className={styles.spoiler}>{frontmatter.spoiler}</p>
        <div className={styles.information}>
          <span>{frontmatter.date}</span>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <span>{timeToRead} min read</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogPlate;
