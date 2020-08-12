import React from 'react';

import { NotFound } from 'components/ui/general';
import { Seo } from 'components/tools';

export default () => (
  <>
    <Seo
      title="Page not found 😢"
      description={`
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum
        tellus at iaculis dignissim. In scelerisque lorem in nulla euismod consequat.
      `}
      url={`${process.env.GATSBY_ORIGIN}/404/`}
    />
    <NotFound />
  </>
);
