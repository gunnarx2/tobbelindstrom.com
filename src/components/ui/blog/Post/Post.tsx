import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import {
  Container,
  Wave,
  NavigatePosts,
  EditThis,
  Hero,
  StyledLinks
} from 'components/ui/general';
import { Link } from 'components/tools';
import { Post as PostType, PageContext } from 'templates/blog/Post';
import styles from './Post.module.scss';

interface Props {
  pageContext: PageContext;
}

const Post = ({
  frontmatter,
  body,
  timeToRead,
  pageContext
}: Props & PostType) => {
  const { title, date } = frontmatter;
  const { next, previous } = pageContext;

  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <Hero
          title={title}
          date={date}
          timeToRead={timeToRead}
          wave={{ fill: 'primary', backgroundColor: 'alpha' }}
        />
        <Wave className={styles.post} fill="alpha" backgroundColor="delta">
          <StyledLinks className={styles.inner}>
            <Container>
              <div className={styles.body}>
                <MDXProvider
                  components={{
                    pre: (props) => <pre tabIndex="0" {...props} />,
                    a: (props) => <Link to={props.href} {...props} />
                  }}
                >
                  <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
              </div>
            </Container>
          </StyledLinks>
        </Wave>
      </main>
      <footer>
        <NavigatePosts next={next} previous={previous} />
        <EditThis
          type="post"
          url={`/src/content/posts/${pageContext.slug
            .replace(/\//g, '')
            .substr(4)}/index.md`}
        />
      </footer>
    </div>
  );
};

export default Post;
