import React from 'react';
import type { FC } from 'react';
import { selectIsLoading } from '../../../slices/app/app.slice';
import { useSelector } from 'react-redux';

import PostCardView from '../post-card/PostCard.view';
import PostCardSkeletonsView from './PostCardSkeletons.view';
import { selectPosts } from '../../../slices/category-posts/categoryPosts.slice';

interface CategoryPostsFeedViewProps {
  slug: string;
}

const CategoryPostsFeedView: FC<CategoryPostsFeedViewProps> = ({ slug }) => {
  const { items: posts } = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);

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
