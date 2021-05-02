import React from 'react';
import { useEffect } from 'react';
import SingularLayout from '../../layouts/singular/Singular.layout';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSingular } from '../../../slices/singular/singular.slice';
import { HOME_SLUG } from '../../../config';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import prefetch from '../../../services/prefetch.service';
import InlineLoaderView from '../../views/inline-loader/InlineLoader.view';

const SingularRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const cleanedSlug = slug !== undefined ? slug : 'home';
  const { pageTitle, titleSeparator, pageTagline } = window.config;
  const singular = useSelector(selectSingular);
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  useEffect(() => {
    if (!singular.render) {
      prefetch.singular(cleanedSlug);
    }
  }, []);

  return (
    <>
      {singular.render ? (
        <>
          <Helmet>
            <title>
              {pageTitle} {titleSeparator}{' '}
              {singular.slug === HOME_SLUG ? pageTagline : singular.title}
            </title>
          </Helmet>
          <SingularLayout singular={singular} />
        </>
      ) : (
        <InlineLoaderView />
      )}
    </>
  );
};

export default SingularRoute;
