import React from 'react';
import CategoryPostsFeedView from '../../views/category-posts-feed/CategoryPostsFeed.view';
import { BLOG_POSTS_CATEGORY } from '../../../config';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

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
      <p>Blog</p>
      <CategoryPostsFeedView slug={BLOG_POSTS_CATEGORY} />
    </>
  );
};

export default BlogRoute;
