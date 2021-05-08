import React from 'react';
import { FC } from 'react';
import PostCardView from '../post-card/PostCard.view';

interface PostCardSkeletonsViewProps {
  count: number;
  minOpacity: number;
}

/**
 * Produces a unique filler for each call
 */
let getFiller = (function* () {
  const starter = '-';
  let index = 1;
  while (true) {
    yield starter.repeat(++index);
  }
})();

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
          slug={getFiller.next().value}
          title={getFiller.next().value}
          date="1970-01-01 00:00:00"
          excerpt={getFiller.next().value}
          thumbnail={getFiller.next().value}
          categories={[getFiller.next().value, getFiller.next().value]}
        />
      ))}
  </>
);

export default PostCardSkeletonsView;
