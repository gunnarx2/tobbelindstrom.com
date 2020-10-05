import React, { useMemo } from 'react';

import { NotFound } from 'components/ui/general';
import { Seo } from 'components/tools';
import maskable from 'assets/images/maskable.png';

export default () => {
  const config = useMemo(
    () => ({
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum tellus at iaculis dignissim. In scelerisque lorem in nulla euismod consequat.',
      url: `${process.env.GATSBY_ORIGIN}/404/`
    }),
    []
  );

  return (
    <>
      <Seo
        title="Page not found 😢"
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
      <NotFound />
    </>
  );
};
