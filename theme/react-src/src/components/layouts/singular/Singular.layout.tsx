import React from 'react';
import type { FC } from 'react';
import SingularView from '../../views/singular/Singular.view';
import CategoryPostsFeedView from '../../views/category-posts-feed/CategoryPostsFeed.view';
import type { SingularSliceRenderEnabled } from '../../../slices/singular/singular.slice.types';

interface SingularLayoutProps {
  singular: SingularSliceRenderEnabled;
}

const SingularLayout: FC<SingularLayoutProps> = ({ singular }) => {
  return (
    <>
      <h2>{singular.title}</h2>
      <SingularView {...singular} />

      {singular.type === 'post' && (
        <>
          <h3>
            Daha fazlası{' '}
            <span role="img" aria-label="love">
              💙
            </span>
          </h3>
          <CategoryPostsFeedView
            categorySlug={singular.category}
            excludePostSlug={singular.slug}
          />
        </>
      )}
    </>
  );
};

export default SingularLayout;
