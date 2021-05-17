import React from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet-async';
import StandardLayout from '../../layouts/standard/Standard.layout';

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
      <StandardLayout title="404">
        <p>Not found</p>
      </StandardLayout>
    </>
  );
};

export default NotFoundRoute;
