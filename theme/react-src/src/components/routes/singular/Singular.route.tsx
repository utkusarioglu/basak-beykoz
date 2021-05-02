import React from 'react';
import { useEffect } from 'react';
import SingularLayout from '../../layouts/singular/Singular.layout';
import { cleanSlug } from '../../../utils/slug.util';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSingular } from '../../../slices/singular/singular.slice';
import { HOME_SLUG } from '../../../config';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import prefetch from '../../../services/prefetch.service';
import { setIsLoading } from '../../../slices/app/app.slice';

const SingularRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const cleanedSlug = slug !== undefined ? slug : 'home';
  const { pageTitle, titleSeparator, pageTagline } = window.config;
  const singular = useSelector(selectSingular);
  const { pathname, search } = window.location;
  ReactGA.pageview(pathname + search);

  useEffect(() => {
    if (!singular.render) {
      // setIsLoading(true);
      prefetch.singular(cleanedSlug);
      // .then(() => setIsLoading(false));
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
        <div>
          <h1 role="img" aria-label="cat" style={{ textAlign: 'center' }}>
            😺
          </h1>
          <h4 style={{ textAlign: 'center' }}>Kedi sayfayı yüklüyor...</h4>
        </div>
      )}
    </>
  );
};

export default SingularRoute;
