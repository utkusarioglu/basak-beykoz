import React from 'react';
import SingularLayout from '../../layouts/singular/Singular.layout';
import { useSelector } from 'react-redux';
import { selectSingular } from '../../../slices/singular/singular.slice';
import { HOME_SLUG } from '../../../config';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

const SingularRoute = () => {
  const { pageTitle, titleSeparator, pageTagline } = window.config;
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);
  const singular = useSelector(selectSingular);

  return (
    <>
      {singular.render && (
        <Helmet>
          <title>
            {pageTitle} {titleSeparator}{' '}
            {singular.slug === HOME_SLUG ? pageTagline : singular.title}
          </title>
        </Helmet>
      )}
      <SingularLayout singular={singular} />
    </>
  );
};

export default SingularRoute;
