import React from 'react';
import type { FC } from 'react';
import SingularView from '../../views/singular/Singular.view';
import CategoryPostsFeedView from '../../views/category-posts-feed/CategoryPostsFeed.view';
import type { SingularSliceRenderEnabled } from '../../../slices/singular/singular.slice.types';
import StandardLayout from '../standard/Standard.layout';
import { HOME_SLUG } from '../../../config';

interface SingularLayoutProps {
  singular: SingularSliceRenderEnabled;
}

const SingularLayout: FC<SingularLayoutProps> = ({ singular }) => {
  return (
    <StandardLayout
      title={singular.title}
      hideThumbnail={hideThumbnail(singular.slug)}
      hideTitle={hideTitle(singular.slug)}
    >
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
    </StandardLayout>
  );
};

function hideTitle(slug: string) {
  switch (slug) {
    case HOME_SLUG:
      return true;

    default:
      return false;
  }
}

function hideThumbnail(slug: string) {
  switch (slug) {
    case HOME_SLUG:
      return true;

    default:
      return false;
  }
}

export default SingularLayout;
