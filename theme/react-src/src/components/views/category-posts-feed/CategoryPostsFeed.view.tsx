import React from 'react';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import PostCardView from '../post-card/PostCard.view';
import PostCardSkeletonsView from './PostCardSkeletons.view';
import { selectPosts } from '../../../slices/category-posts/categoryPosts.slice';
import prefetch from '../../../services/prefetch.service';
import { useErrorHandler } from 'react-error-boundary';
interface CategoryPostsFeedViewProps {
  categorySlug: string;
  excludePostSlug?: string;
}

const CategoryPostsFeedView: FC<CategoryPostsFeedViewProps> = ({
  categorySlug: requestSlugCsv,
  excludePostSlug = undefined,
}) => {
  const handleError = useRef(useErrorHandler());
  const { items, fetchTime } = useSelector(selectPosts);

  useEffect(() => {
    prefetch
      .categoryPosts({
        slug: requestSlugCsv,
      })
      .catch(handleError.current);
  }, [requestSlugCsv]);

  if (fetchTime === 0) {
    return <PostCardSkeletonsView count={5} minOpacity={0.3} />;
  }

  if (fetchTime !== 0 && items.length === 0) {
    return <NoPostsView />;
  }

  return (
    <>
      {items
        .filter((post) => post.slug !== excludePostSlug)
        .map((post) => (
          <PostCardView key={post.id} asSkeleton={false} {...post} />
        ))}
    </>
  );
};

const NoPostsView = () => (
  <p>
    Burada pek birşey yok{' '}
    <span role="img" aria-label="suspicious">
      🤨
    </span>
  </p>
);

export default CategoryPostsFeedView;
