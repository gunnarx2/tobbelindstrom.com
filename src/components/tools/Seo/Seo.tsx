import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  title: string;
  description?: string;
  lang?: string;
  url: string;
  meta?: {
    name?: string;
    content: string;
    property?: string;
  }[];
}

const Seo = ({ title, description, lang = 'en', meta = [], url }: Props) => {
  const {
    site: { siteMetadata }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      link={[
        {
          rel: 'canonical',
          href: url
        }
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `article`
        },
        {
          property: 'og:site_name',
          content: 'tobbelindstrom.com'
        },
        {
          property: 'og:locale',
          content: 'en_EN'
        },
        {
          property: 'og:url',
          content: url
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.author
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        ...meta
      ]}
    />
  );
};

export default Seo;
