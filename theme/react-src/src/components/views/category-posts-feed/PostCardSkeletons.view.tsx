import React from 'react';
import { FC } from 'react';
import PostCardView from '../post-card/PostCard.view';

interface PostCardSkeletonsViewProps {
  count: number;
  minOpacity: number;
}

const PostCardSkeletonsView: FC<PostCardSkeletonsViewProps> = ({
  count,
  minOpacity,
}) => (
  <>
    {Array(count)
      .fill(undefined)
      .map((_, i) => (
        <PostCardView
          key={i}
          asSkeleton={true}
          opacity={1 - (i * (1 - minOpacity)) / count}
        />
      ))}
  </>
);

export default PostCardSkeletonsView;
