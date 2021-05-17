import React from 'react';
import { useEffect, useRef } from 'react';
import SingularLayout from '../../layouts/singular/Singular.layout';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSingular } from '../../../slices/singular/singular.slice';
import { HOME_SLUG } from '../../../config';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet-async';
import prefetch from '../../../services/prefetch.service';
import LoaderHtmlView from '../../views/loader-html/LoaderHtml.view';
import { useErrorHandler } from 'react-error-boundary';
import {
  enableIsLoadingDelayed,
  disableIsLoadingDelayed,
} from '../../../slices/app/app.slice';
import { cleanSlug } from '../../../utils/slug.util';

const SingularRoute = () => {
  const handleError = useRef(useErrorHandler());
  const { slug } = useParams<{ slug: string }>();
  const cleanedSlug = cleanSlug(slug);
  const singular = useSelector(selectSingular);

  useEffect(() => {
    let cancelIsLoadingDelayed = singular.render && enableIsLoadingDelayed();
    prefetch
      .singular({ slug: cleanedSlug })
      .catch(handleError.current)
      .finally(() => {
        if (singular.render) {
          cancelIsLoadingDelayed && cancelIsLoadingDelayed();
          disableIsLoadingDelayed();
        }
      });

    return () => {
      cancelIsLoadingDelayed && cancelIsLoadingDelayed();
    };
  }, [cleanedSlug, singular.render]);

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
