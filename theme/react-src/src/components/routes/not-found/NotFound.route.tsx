import React from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

const NotFoundRoute = () => {
  const { pageTitle, titleSeparator } = window.config;
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);
  const routeTitle = 'Paylaşımlar';

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} {titleSeparator} {routeTitle}
        </title>
      </Helmet>
      <p>Not found</p>
    </>
  );
};

export default NotFoundRoute;
