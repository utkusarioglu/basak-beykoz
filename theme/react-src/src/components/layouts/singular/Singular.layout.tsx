import React from 'react';
import type { FC } from 'react';
import SingularView from '../../views/singular/Singular.view';
import CategoryPostsFeedView from '../../views/category-posts-feed/CategoryPostsFeed.view';
import type { SingularSliceState } from '../../../slices/singular/singular.slice.types';

interface SingularLayoutProps {
  singular: SingularSliceState;
}

const SingularLayout: FC<SingularLayoutProps> = ({ singular }) => {
  return (
    <>
      {singular.render && (
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
              <CategoryPostsFeedView slug={singular.category} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default SingularLayout;
