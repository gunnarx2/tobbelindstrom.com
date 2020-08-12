import React from 'react';
import { graphql } from 'gatsby';

import { Seo } from 'components/tools';
import { Post } from 'components/ui/blog';

export interface NextAndPrevious {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
  };
  id: string;
}

export interface PageContext {
  id: string;
  next?: NextAndPrevious;
  previous?: NextAndPrevious;
  slug: string;
}

export interface Post {
  body: string;
  timeToRead: number | string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
  };
}

interface Props {
  data: {
    mdx: Post;
  };
  pageContext: PageContext;
}

export default ({ data, pageContext }: Props) => {
  const { frontmatter, body, timeToRead } = data.mdx;

  return (
    <>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description}
        url={`${process.env.GATSBY_ORIGIN}${pageContext.slug}`}
      />
      <Post
        frontmatter={frontmatter}
        body={body}
        timeToRead={timeToRead}
        pageContext={pageContext}
      />
    </>
  );
};

export const query = graphql`
  query PostQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
      timeToRead
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
