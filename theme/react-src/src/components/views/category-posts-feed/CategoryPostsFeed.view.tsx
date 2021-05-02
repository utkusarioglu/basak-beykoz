import React from 'react';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import PostCardView from '../post-card/PostCard.view';
import PostCardSkeletonsView from './PostCardSkeletons.view';
import { selectPosts } from '../../../slices/category-posts/categoryPosts.slice';
import prefetch from '../../../services/prefetch.service';
interface CategoryPostsFeedViewProps {
  slug: string;
}

const CategoryPostsFeedView: FC<CategoryPostsFeedViewProps> = ({
  slug: requestSlug,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { items: posts, slug: storeSlug, fetchTime } = useSelector(selectPosts);

  useEffect(() => {
    if (storeSlug !== requestSlug || fetchTime === 0) {
      setIsLoading(true);
      prefetch.categoryPosts(requestSlug).then(() => setIsLoading(false));
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <PostCardSkeletonsView count={5} minOpacity={0.5} />
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <PostCardView key={post.id} asSkeleton={false} item={post} />
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
