import React from 'react';
import CategoryPostsFeedView from '../../views/category-posts-feed/CategoryPostsFeed.view';
import { BLOG_POSTS_CATEGORY } from '../../../config';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet-async';
import StandardLayout from '../../layouts/standard/Standard.layout';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallbackView from '../../views/error-fallback-lazy/ErrorFallbackLazy.view';

const BlogRoute = () => {
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
      <StandardLayout
        title="Blog"
        thumbnailUrl="/wp-content/uploads/yazilar-feature-image.jpg"
      >
        <ErrorBoundary FallbackComponent={ErrorFallbackView}>
          <CategoryPostsFeedView categorySlug={BLOG_POSTS_CATEGORY} />
        </ErrorBoundary>
      </StandardLayout>
    </>
  );
};

export default BlogRoute;
