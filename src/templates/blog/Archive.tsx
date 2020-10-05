import React, { useMemo } from 'react';
import { graphql } from 'gatsby';

import { Seo } from 'components/tools';
import { Archive } from 'components/ui/blog';
import maskable from 'assets/images/maskable.png';

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

export default ({ data }: Props) => {
  const config = useMemo(
    () => ({
      description:
        'Developer with passion for frontend and an eye for design. This website is created to help others and educate myself to become a greater instructor.',
      url: `${process.env.GATSBY_ORIGIN}/`
    }),
    []
  );

  return (
    <>
      <Seo
        title="Frontend developer in Uppsala"
        description={config.description}
        url={config.url}
      >
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "tobbelindstrom.com",
              "description": "${config.description}",
              "url": "${config.url}",
              "image": "${process.env.GATSBY_ORIGIN}/share-image.jpg",
              "logo": "${process.env.GATSBY_ORIGIN}${maskable}"
            }
          `}
        </script>
      </Seo>
      <Archive posts={data.allMdx.edges} />
    </>
  );
};

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
