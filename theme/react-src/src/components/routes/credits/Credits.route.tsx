import React from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

const CreditsRoute = () => {
  const { pageTitle, titleSeparator } = window.config;
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);
  const routeTitle = 'Teşekkürler';

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} {titleSeparator} {routeTitle}
        </title>
      </Helmet>
      <p>Credits</p>
    </>
  );
};

export default CreditsRoute;
