import React from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet-async';
import StandardLayout from '../../layouts/standard/Standard.layout';

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
      <StandardLayout title="Credits">
        <p>Thank youuu</p>
      </StandardLayout>
    </>
  );
};

export default CreditsRoute;
