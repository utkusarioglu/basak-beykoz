import React from 'react';
import { useEffect, useState, useRef } from 'react';
import SingularLayout from '../../layouts/singular/Singular.layout';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSingular } from '../../../slices/singular/singular.slice';
import { HOME_SLUG } from '../../../config';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import prefetch from '../../../services/prefetch.service';
import LoaderHtmlView from '../../views/loader-html/LoaderHtml.view';
import { useErrorHandler } from 'react-error-boundary';

const SingularRoute = () => {
  const handleError = useRef(useErrorHandler());
  const { slug } = useParams<{ slug: string }>();
  const cleanedSlug = slug !== undefined ? slug : HOME_SLUG;
  const [onScreenSlug, setOnScreenSlug] = useState('');
  const singular = useSelector(selectSingular);

  useEffect(() => {
    if (!singular.render || cleanedSlug !== onScreenSlug) {
      prefetch
        .singular({ slug: cleanedSlug })
        .then(() => setOnScreenSlug(cleanedSlug))
        .catch(handleError.current);
    }
  }, [cleanedSlug, singular.render, onScreenSlug]);

  if (!singular.render) {
    return <LoaderHtmlView />;
  }

  const { pageTitle, titleSeparator, pageTagline } = window.config;
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  return (
    <>
      <Helmet>
        <title>
          {`${pageTitle} ${titleSeparator} ${
            singular.slug === HOME_SLUG ? pageTagline : singular.title
          }`}
        </title>
      </Helmet>
      <SingularLayout singular={singular} />
    </>
  );
};

export default SingularRoute;
