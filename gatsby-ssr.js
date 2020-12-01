import React from 'react';

import favicon from 'assets/images/favicon.png';

export const onRenderBody = ({
  setHeadComponents,
  setPostBodyComponents,
  setPreBodyComponents
}) => {
  setPreBodyComponents([
    <noscript key="noscript">
      This app works best with JavaScript enabled.
    </noscript>,
    <script
      key="theme"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var theme;

            function setTheme(newTheme) {
              window.__THEME__ = newTheme;
              theme = newTheme;
              document.body.classList.remove('dark-theme', 'light-theme');
              document.body.classList.add(newTheme + '-theme');
            }

            try {
              theme = localStorage.getItem('theme');
            } catch (error) {
              console.error(error);
            }

            window.__SET_THEME__ = function(newTheme) {
              setTheme(newTheme);
              try {
                localStorage.setItem('theme', newTheme);
              } catch (error) {
                console.error(error);
              }
            }

            setTheme(theme || 'dark');
          })();
        `
      }}
    />
  ]);
  setHeadComponents([
    <meta
      key="mobile-web-app-capable"
      name="mobile-web-app-capable"
      content="yes"
    />,
    <meta
      key="apple-mobile-web-app-capable"
      name="apple-mobile-web-app-capable"
      content="yes"
    />,
    <meta
      key="apple-mobile-web-app-title"
      name="apple-mobile-web-app-title"
      content="tobbelindstrom.com"
    />,
    <meta
      key="apple-mobile-web-app-status-bar-style"
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />,
    <meta
      key="og:image"
      property="og:image"
      content={`${process.env.GATSBY_ORIGIN}/share-image.jpg`}
    />,
    <meta
      key="twitter:image"
      name="twitter:image"
      content={`${process.env.GATSBY_ORIGIN}/share-image.jpg`}
    />,
    <link key="favicon" rel="icon" href={favicon} />
  ]);
  setPostBodyComponents([
    <div
      key="service-worker"
      id="service-worker"
      aria-hidden="true"
      role="complementary"
    />,
    <div key="modal" id="modal" role="dialog" aria-label="modal" />
  ]);
};
