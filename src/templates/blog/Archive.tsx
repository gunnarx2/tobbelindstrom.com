import React from 'react';
import { graphql } from 'gatsby';

import { Seo } from 'components/tools';
import { Archive } from 'components/ui/blog';

export interface ArchivePost {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      date: string;
      spoiler: string;
      title: string;
    };
    id: string;
    timeToRead: number | string;
  };
}

interface Props {
  data: {
    allMdx: {
      edges: ArchivePost[];
    };
  };
}

export default ({ data }: Props) => (
  <>
    <Seo
      title="Frontend developer in Uppsala"
      description={`
        Developer with passion for frontend and an eye for design. This website is
        created to help others and educate myself to become a greater instructor.
      `}
      url={`${process.env.GATSBY_ORIGIN}/`}
    />
    <Archive posts={data.allMdx.edges} />
  </>
);

export const query = graphql`
  query ArchiveQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          timeToRead
          frontmatter {
            title
            spoiler
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
