import React from 'react';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import PostCardView from '../post-card/PostCard.view';
import PostCardSkeletonsView from './PostCardSkeletons.view';
import { selectPosts } from '../../../slices/category-posts/categoryPosts.slice';
import prefetch from '../../../services/prefetch.service';
interface CategoryPostsFeedViewProps {
  categorySlug: string;
  excludePostSlug?: string;
}

const CategoryPostsFeedView: FC<CategoryPostsFeedViewProps> = ({
  categorySlug: requestSlugCsv,
  excludePostSlug = undefined,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { items: posts } = useSelector(selectPosts);

  useEffect(() => {
    prefetch.categoryPosts({
      slug: requestSlugCsv,
      onFetchStart: () => setIsLoading(true),
      onFetchComplete: () => setIsLoading(false),
    });
  }, [requestSlugCsv]);

  return (
    <>
      {isLoading ? (
        <PostCardSkeletonsView count={5} minOpacity={0.3} />
      ) : posts.length > 0 ? (
        posts
          .filter((post) => post.slug !== excludePostSlug)
          .map((post) => (
            <PostCardView key={post.id} asSkeleton={false} {...post} />
          ))
      ) : (
        <NoPostsView />
      )}
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
